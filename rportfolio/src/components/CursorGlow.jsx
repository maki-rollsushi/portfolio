import { useEffect, useRef } from "react";

/**
 * CursorGlow — a soft radial gradient orb that lazily follows the cursor.
 * Hidden on touch devices automatically via CSS.
 * Place this as the FIRST child in App so it sits behind everything.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    let raf;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      // Lerp toward target for smooth lag effect
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.left = `${cx}px`;
        glowRef.current.style.top = `${cy}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
