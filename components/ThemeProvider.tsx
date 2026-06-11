"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

// Read the value the blocking script already set — avoids a React/DOM mismatch
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"; // SSR guard
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  // Fallback: localStorage, then system
  const saved = localStorage.getItem("apex-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer runs once on client, reads the DOM directly
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Keep DOM in sync whenever theme changes (covers the initial mount too)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("apex-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
