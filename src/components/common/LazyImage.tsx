'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  quality?: number;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  fill = false,
  style,
  quality = 75
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <div className={`relative ${className || ''}`} style={style}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={responsiveSizes}
          quality={quality}
          priority={priority}
          className={`
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          `}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={responsiveSizes}
          quality={quality}
          priority={priority}
          className={`
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          `}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}