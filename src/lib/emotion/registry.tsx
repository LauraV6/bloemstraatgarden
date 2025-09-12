'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache, { EmotionCache } from '@emotion/cache';

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => {
    const emotionCache = createCache({ key: 'emotion' });
    emotionCache.compat = true;
    return emotionCache;
  });

  useServerInsertedHTML(() => {
    const serialized = Object.values((cache as EmotionCache).inserted).join(' ');
    if (!serialized) return null;
    
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${Object.keys((cache as EmotionCache).inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: serialized,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}