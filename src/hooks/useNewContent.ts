'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const LAST_VISITED_KEY = 'lastVisited';
const UPDATE_DELAY_MS = 3000;

export function useNewContent() {
  const [lastVisited, setLastVisited] = useState<number | null>(null);
  const [newCount, setNewCount] = useState(0);
  const hasSetBadge = useRef(false);

  // Read lastVisited from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LAST_VISITED_KEY);

    if (stored) {
      // Returning visitor: show badges for articles newer than last visit
      setLastVisited(Number(stored));
      // Update after delay so badges remain visible on first render
      const timer = setTimeout(() => {
        localStorage.setItem(LAST_VISITED_KEY, String(Date.now()));
      }, UPDATE_DELAY_MS);
      return () => clearTimeout(timer);
    } else {
      // First visit ever: save timestamp, don't show any badges
      localStorage.setItem(LAST_VISITED_KEY, String(Date.now()));
      setLastVisited(Date.now());
    }
  }, []);

  const isNew = useCallback(
    (date: string): boolean => {
      if (lastVisited === null) return false;
      return new Date(date).getTime() > lastVisited;
    },
    [lastVisited],
  );

  // Set app badge when newCount changes
  useEffect(() => {
    if (hasSetBadge.current) return;
    if (newCount > 0 && 'setAppBadge' in navigator) {
      navigator.setAppBadge(newCount).catch(() => {});
      hasSetBadge.current = true;
    } else if (newCount === 0 && 'clearAppBadge' in navigator) {
      navigator.clearAppBadge().catch(() => {});
    }
  }, [newCount]);

  // Helper to let the consumer report the count (called after computing)
  const reportNewCount = useCallback((count: number) => {
    setNewCount(count);
  }, []);

  return { isNew, reportNewCount };
}
