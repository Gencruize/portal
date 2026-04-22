"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage may be blocked
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  const handleStorage = () => callback();
  window.addEventListener("storage", handleStorage);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", handleStorage);
  return () => {
    window.removeEventListener("storage", handleStorage);
    mql.removeEventListener("change", handleStorage);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  const setTheme = (t: Theme) => {
    try {
      window.localStorage.setItem("theme", t);
    } catch {
      return;
    }
    forceRender();
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
