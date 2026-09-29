"use client";

import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  maxOffset?: number;
  invert?: boolean;
}

export default function ParallaxImage({
  children,
  className = "",
  speed = 0.18,
  maxOffset = 40,
  invert = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      raf.current = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const delta = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      const offset = Math.max(
        -maxOffset,
        Math.min(maxOffset, invert ? -delta : delta)
      );
      el.style.transform = `translateY(${offset}px)`;
    };
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed, maxOffset, invert]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}