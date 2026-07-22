import { notFound } from "next/navigation";

/**
 * Catches any URL that doesn't match a real route. Without this, an unknown
 * path never enters the `[locale]` segment at all, so Next falls back to its
 * plain built-in 404 instead of the styled `[locale]/not-found.tsx`.
 */
export default function CatchAllPage(): never {
  notFound();
}
