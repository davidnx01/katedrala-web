"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { preconnect } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type HeroSlide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string };

interface HeroSlideshowProps {
  /** Already in display order. Must start with an image — it is the LCP element. */
  slides: HeroSlide[];
}

/** How long a photo stays on screen. */
const PHOTO_DURATION_MS = 4000;
/** Crossfade length — must match `duration-1000` below. */
const FADE_MS = 1000;
/** A video that still can't play this long after its turn came is skipped. */
const VIDEO_WAIT_LIMIT_MS = 6000;
/** HTMLMediaElement.HAVE_FUTURE_DATA — enough buffered to start playing smoothly. */
const HAVE_FUTURE_DATA = 3;

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

/** Videos only where they won't hurt: no reduced motion, no data saver, no 2G. */
function canUseVideo(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return false;
  return true;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const motionAllowedSnapshot = () => !window.matchMedia(REDUCED_MOTION_QUERY).matches;
const noSubscription = () => () => {};
/** Server render and hydration: photos only, no motion — identical markup everywhere. */
const serverSnapshot = () => false;

/** Resolves once the page (and its LCP photo) finished loading and the main thread is idle,
 *  so the first video never competes with the critical resources. */
function afterPageSettles(callback: () => void): () => void {
  let idleHandle: number | undefined;
  let timeoutHandle: number | undefined;
  const requestIdle = window.requestIdleCallback as Window["requestIdleCallback"] | undefined;
  const schedule = () => {
    if (requestIdle) {
      idleHandle = requestIdle(callback, { timeout: 2000 });
    } else {
      timeoutHandle = window.setTimeout(callback, 300);
    }
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
    if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
  };
}

/**
 * Hero crossfade slideshow mixing photos and short muted video clips.
 *
 * Performance model:
 * - The first slide is always a photo (`priority`), so LCP never waits on video.
 * - No video byte is requested until the page has loaded and gone idle.
 * - At most three <video> elements exist at once: the one fading out, the one
 *   playing, and the NEXT one, which is mounted with `preload="auto"` while the
 *   current slide is showing — so by the time its turn comes it is buffered.
 *   Everything else is unmounted, which frees its decoder and memory.
 * - If the next video isn't playable yet when its turn comes, the current slide
 *   simply stays a little longer; if it still can't play (or autoplay is blocked,
 *   e.g. iOS Low Power Mode) the slideshow falls back to photos only.
 * - Everything pauses while the tab is hidden or the hero is scrolled out of view.
 */
export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());

  const motionAllowed = useSyncExternalStore(
    subscribeReducedMotion,
    motionAllowedSnapshot,
    serverSnapshot,
  );
  const videoCapable = useSyncExternalStore(noSubscription, canUseVideo, serverSnapshot);
  /** Flipped on for good when autoplay is refused or the connection is too slow. */
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [videoLoadingStarted, setVideoLoadingStarted] = useState(false);
  const hasVideos = slides.some((slide) => slide.kind === "video");
  const videoAllowed = motionAllowed && videoCapable && hasVideos && !videoDisabled;
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  /** Increments each time a slide becomes active, which remounts it and restarts its zoom. */
  const [runs, setRuns] = useState(() => slides.map(() => 0));
  /** Set when the slideshow wants to move on but the next video isn't buffered yet. */
  const [waitingForNext, setWaitingForNext] = useState(false);

  // Play order as indices into `slides`, so React keys (and mounted videos) stay stable
  // when videos get switched off mid-show.
  const order = useMemo(
    () =>
      videoAllowed
        ? slides.map((_, index) => index)
        : slides.flatMap((slide, index) => (slide.kind === "image" ? [index] : [])),
    [slides, videoAllowed],
  );
  const count = order.length;
  const activeSlide = order[active % Math.max(count, 1)];
  const nextSlide = count > 1 ? order[(active + 1) % count] : undefined;

  // --- Start fetching videos only after the page settled -----------------------------------
  useEffect(() => {
    if (!videoAllowed || videoLoadingStarted) return;
    return afterPageSettles(() => {
      const firstVideo = slides.find((slide) => slide.kind === "video");
      if (firstVideo) {
        try {
          preconnect(new URL(firstVideo.src, window.location.href).origin);
        } catch {
          // Malformed URL — the <video> itself will just fail and get skipped.
        }
      }
      setVideoLoadingStarted(true);
    });
  }, [videoAllowed, videoLoadingStarted, slides]);

  // --- Pause when hidden ------------------------------------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const observer = root
      ? new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          update();
        })
      : null;
    if (root) observer?.observe(root);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const goTo = useCallback(
    (nextPosition: number) => {
      const target = order[nextPosition % count];
      setPrevious(activeSlide);
      setActive(nextPosition % count);
      setRuns((current) =>
        current.map((value, index) => (index === target ? value + 1 : value)),
      );
      setWaitingForNext(false);
    },
    [order, count, activeSlide],
  );

  /** Move on now if the next slide is ready, otherwise hold the current one until it is. */
  const advance = useCallback(() => {
    if (count < 2 || nextSlide === undefined) return;
    if (slides[nextSlide].kind === "image") {
      goTo(active + 1);
      return;
    }
    const nextVideo = videoRefs.current.get(nextSlide);
    if (nextVideo && nextVideo.readyState >= HAVE_FUTURE_DATA) goTo(active + 1);
    else setWaitingForNext(true);
  }, [count, nextSlide, slides, active, goTo]);

  // --- Photo timer ------------------------------------------------------------------------
  useEffect(() => {
    if (!motionAllowed || !visible || count < 2) return;
    if (slides[activeSlide]?.kind !== "image") return;
    const timer = window.setTimeout(advance, PHOTO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [motionAllowed, visible, count, slides, activeSlide, runs, advance]);

  // --- Waiting for a not-yet-buffered next video ------------------------------------------
  useEffect(() => {
    if (!waitingForNext || nextSlide === undefined || !visible) return;
    const video = videoRefs.current.get(nextSlide);
    const onReady = () => goTo(active + 1);
    // Give up on this video and turn videos off: the connection is clearly too slow.
    const giveUp = window.setTimeout(() => {
      setVideoDisabled(true);
      setWaitingForNext(false);
    }, VIDEO_WAIT_LIMIT_MS);
    video?.addEventListener("canplay", onReady, { once: true });
    if (video && video.readyState >= HAVE_FUTURE_DATA) onReady();
    return () => {
      window.clearTimeout(giveUp);
      video?.removeEventListener("canplay", onReady);
    };
  }, [waitingForNext, nextSlide, visible, active, goTo]);

  // --- Active video playback --------------------------------------------------------------
  useEffect(() => {
    if (slides[activeSlide]?.kind !== "video") return;
    const video = videoRefs.current.get(activeSlide);
    if (!video) return;
    if (!visible) {
      video.pause();
      return;
    }
    let advanced = false;
    const leave = () => {
      if (advanced) return;
      advanced = true;
      advance();
    };
    // Start the crossfade just before the clip ends, so it never freezes on its last frame.
    const onTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime <= FADE_MS / 1000) leave();
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", leave);
    video.play().catch((error: unknown) => {
      const name = error instanceof DOMException ? error.name : "";
      // Autoplay refused (iOS Low Power Mode, browser policy) — photos only from now on.
      if (name === "NotAllowedError") setVideoDisabled(true);
      // Unplayable file — skip it. (AbortError = a pause interrupted play(); harmless.)
      else if (name === "NotSupportedError") leave();
    });
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", leave);
    };
  }, [slides, activeSlide, visible, runs, advance]);

  // Rewind a video once it has fully faded out, so its next turn starts from the beginning.
  useEffect(() => {
    if (previous === null || slides[previous]?.kind !== "video") return;
    const timer = window.setTimeout(() => {
      const video = videoRefs.current.get(previous);
      if (video && previous !== activeSlide) {
        video.pause();
        video.currentTime = 0;
      }
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [previous, activeSlide, slides]);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-navy">
      {slides.map((slide, index) => {
        const isActive = index === activeSlide;

        if (slide.kind === "image") {
          return (
            <div
              key={`image-${index}-${slide.src}`}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <div key={runs[index]} className="animate-hero-zoom absolute inset-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        }

        // Only the outgoing, the playing and the upcoming video exist in the DOM.
        const mounted =
          videoAllowed &&
          videoLoadingStarted &&
          (isActive || index === nextSlide || index === previous);
        if (!mounted) return null;

        return (
          <video
            key={`video-${index}-${slide.src}`}
            ref={(element) => {
              if (element) {
                element.muted = true;
                element.defaultMuted = true;
                videoRefs.current.set(index, element);
              } else {
                videoRefs.current.delete(index);
              }
            }}
            src={slide.src}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden
            tabIndex={-1}
            onError={() => {
              // Broken file — skip it instead of stalling the whole slideshow.
              if (index === nextSlide && waitingForNext) goTo(active + 2);
            }}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100" : "opacity-0",
            )}
          />
        );
      })}
    </div>
  );
}
