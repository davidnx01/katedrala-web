"use client";

import { Printer, Share2 } from "lucide-react";

interface ArticleActionsProps {
  title: string;
  shareLabel: string;
  printLabel: string;
}

export function ArticleActions({ title, shareLabel, printLabel }: ArticleActionsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={handleShare}
        className="flex min-h-10 items-center gap-1.5 rounded-lg border border-stone bg-white px-4 text-[13px] font-medium text-[#7A756B] hover:border-gold hover:text-navy"
      >
        <Share2 size={16} aria-hidden="true" />
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex min-h-10 items-center gap-1.5 rounded-lg border border-stone bg-white px-4 text-[13px] font-medium text-[#7A756B] hover:border-gold hover:text-navy"
      >
        <Printer size={16} aria-hidden="true" />
        {printLabel}
      </button>
    </div>
  );
}
