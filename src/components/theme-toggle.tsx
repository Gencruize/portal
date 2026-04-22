"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors w-full"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-5 h-5" />
          <span className="font-medium">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5" />
          <span className="font-medium">Light Mode</span>
        </>
      )}
    </button>
  );
}
