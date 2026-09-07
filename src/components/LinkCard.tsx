"use client";

import type { LinkItem } from "@/data/links";

export default function LinkCard({ id, label, url }: LinkItem) {
  function handleClick() {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {
      // 클릭 집계 실패는 사용자 이동을 막지 않는다
    });
  }

  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-full border border-black/10 bg-neutral-50 px-6 py-3 text-center text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
    >
      {label}
    </a>
  );
}
