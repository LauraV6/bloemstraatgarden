'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
}

export default function LazyLoad({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder = <div style={{ minHeight: '200px' }} />
}: LazyLoadProps) {
  const [ref, entry] = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  const isVisible = entry?.isIntersecting;

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : placeholder}
    </div>
  );
}