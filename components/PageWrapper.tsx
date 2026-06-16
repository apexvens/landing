"use client";

import { useState } from "react";
import Loader from "./Loader";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  // Start with loader showing — no delay, no useEffect needed
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <Loader onDone={() => setDone(true)} />}
      <div
        style={{
          visibility: done ? "visible" : "hidden",
          // Prevent any layout shift while loader is active
          pointerEvents: done ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
