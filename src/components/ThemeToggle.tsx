"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크모드 전환"
      className="fixed top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg shadow-sm transition-colors dark:border-white/10 dark:bg-neutral-800"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
