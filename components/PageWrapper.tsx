"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Loader from "./Loader";

// Context so any child (e.g. HeroSection) knows when the loader is done
// without prop-drilling through server components
const ReadyCtx = createContext(false);
export const useReady = () => useContext(ReadyCtx);

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Remove the server-rendered preload cover the instant React mounts.
    // By this point our JS <Loader> is already in the DOM, so there's no flash.
    document.getElementById("__apex_preload")?.remove();
  }, []);

  return (
    <ReadyCtx.Provider value={done}>
      {/* Loader sits on top */}
      {!done && <Loader onDone={() => setDone(true)} />}
      {/*
        visibility:hidden (not opacity:0 or display:none) keeps layout intact
        and prevents any JS timers inside children from running visually.
        Children ARE mounted — their effects run — but nothing is painted.
      */}
      <div style={{ visibility: done ? "visible" : "hidden" }}>
        {children}
      </div>
    </ReadyCtx.Provider>
  );
}
