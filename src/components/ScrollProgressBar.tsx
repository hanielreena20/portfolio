import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Dynamically calculate smooth color transitions as user scrolls (Blue -> Violet -> Pink -> Cyan -> Emerald)
  // Hue starts at 220 (Royal Blue) and shifts through ~140 degrees toward 360/0 (Magenta) and beyond to 160 (Emerald)
  const hueStart = 215; // Electric Blue
  const hueEnd = (215 + scrollProgress * 1.5) % 360;

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-60 h-[3px] bg-slate-200/50 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        id="scroll-progress-indicator"
        className="h-full transition-[width] duration-75 ease-out shadow-xs"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, hsl(${hueStart}, 90%, 55%), hsl(${hueEnd}, 92%, 58%))`,
          boxShadow: `0 0 8px hsl(${hueEnd}, 90%, 60%, 0.6)`,
        }}
      />
    </div>
  );
};
