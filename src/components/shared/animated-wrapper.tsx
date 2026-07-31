'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface AnimatedWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function AnimatedWrapper({
  children,
  delay = 0,
  direction = 'up',
  className,
  ...props
}: AnimatedWrapperProps) {
  const directions = {
    up: { y: 12, x: 0 },
    down: { y: -12, x: 0 },
    left: { x: 12, y: 0 },
    right: { x: -12, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-20px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.18,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
