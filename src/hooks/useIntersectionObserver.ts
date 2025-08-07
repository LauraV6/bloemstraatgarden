import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [
  (node: Element | null) => void,
  IntersectionObserverEntry | undefined
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = useRef(false);

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]): void => {
    if (frozen.current && freezeOnceVisible) return;
    setEntry(entry);
    if (entry.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  }, [freezeOnceVisible]);

  const nodeRef = useRef<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const disconnect = useCallback(() => {
    const currentObserver = observer.current;
    currentObserver?.disconnect();
    observer.current = null;
  }, []);

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;

    disconnect();
    
    const newObserver = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    newObserver.observe(node);
    observer.current = newObserver;
  }, [threshold, root, rootMargin, updateEntry, disconnect]);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setEntry(undefined);
      return;
    }

    observe();
    return disconnect;
  }, [threshold, root, rootMargin, observe, disconnect]);

  const ref = (node: Element | null) => {
    if (nodeRef.current === node) return;
    
    disconnect();
    nodeRef.current = node;
    observe();
  };

  return [ref, entry];
}