"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/consent";

interface CookieSettingsButtonProps {
  label: string;
  className?: string;
}

/** Reopens the cookie banner so a visitor can review or withdraw consent at any time. */
export function CookieSettingsButton({ label, className }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
