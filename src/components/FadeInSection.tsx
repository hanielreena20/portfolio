import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'none';
  amount?: number;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.1,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const yOffset = direction === 'none' ? 0 : 28;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: amount,
        margin: '0px 0px -50px 0px',
      }}
      transition={{
        duration: 0.7,
        delay: delay > 0 ? delay / 1000 : 0,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

