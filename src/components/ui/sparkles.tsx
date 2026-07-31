'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function SparklesCore({
  className,
  particleColor = '#f59e0b',
  particleCount = 30,
}: {
  className?: string;
  particleColor?: string;
  particleCount?: number;
}) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
  }, [particleCount, isMounted]);

  if (!isMounted) {
    return <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)} />;
  }

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: particleColor,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${particleColor}, 0 0 20px ${particleColor}`,
          }}
        />
      ))}
    </div>
  );
}
