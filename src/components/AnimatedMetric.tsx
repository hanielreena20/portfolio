import React, { useEffect, useRef, useState } from 'react';

interface AnimatedMetricProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  value,
  className = '',
  duration = 1000,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Match numbers with optional commas or decimals
    const match = value.match(/([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numStr = match[1];
    const rawNumber = parseFloat(numStr.replace(/,/g, ''));
    const isDecimal = numStr.includes('.');
    const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;
    const hasCommas = numStr.includes(',');

    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index || 0) + numStr.length);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = rawNumber * easeOut;

            let formattedNum: string;
            if (isDecimal) {
              formattedNum = currentNum.toFixed(decimalPlaces);
            } else {
              formattedNum = Math.round(currentNum).toString();
            }

            if (hasCommas) {
              const parts = formattedNum.split('.');
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              formattedNum = parts.join('.');
            }

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value); // Ensure exact final value matches
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
