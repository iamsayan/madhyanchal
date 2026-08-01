'use client';

import { CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import cockpit, { type Asset, type ImageOptions } from '@/lib/client';
import { cn } from '@/lib/utils';
import { ImagePreset } from '@/types';

import placeholderImage from '@/public/logo.png';
import {
  type IntersectionOptions,
  useInView,
} from 'react-intersection-observer';

type CockpitImageProps = Omit<
  ImageProps,
  'loader' | 'src' | 'alt' | 'quality'
> & {
  asset: Asset | string;
  mode?: ImageOptions['m'];
  twidth?: number;
  theight?: number;
  preset?: ImagePreset;
  quality?: number;
  lazy?: boolean;
  loaderPlaceholder?: boolean | ReactNode;
  containerClassName?: string;
  intersectionOptions?: IntersectionOptions;
};

export default function CockpitImage({
  asset,
  preset,
  mode = 'bestFit',
  twidth = 1920,
  theight = 1080,
  quality = 90,
  lazy = true,
  loaderPlaceholder = true,
  containerClassName,
  intersectionOptions,
  ...rest
}: CockpitImageProps) {
  const [assetData, setAssetData] = useState<Asset | string>(asset);

  const [imageState, setImageState] = useState<{
    isLoading: boolean;
    error: boolean;
    useTransform: boolean;
  }>({
    isLoading: true,
    error: false,
    useTransform: true,
  });

  const hasAttemptedFallback = useRef(false);

  useEffect(() => {
    if (typeof asset === 'string' && asset.trim()) {
      cockpit
        .getAsset(asset.trim())
        .then((res) => {
          if (res?._id) setAssetData(res);
        })
        .catch(() => {});
    } else {
      setAssetData(asset);
    }
  }, [asset]);

  const targetAsset: Asset | null =
    typeof assetData === 'object' && assetData?._id
      ? assetData
      : typeof assetData === 'string' && assetData.trim()
        ? ({ _id: assetData.trim() } as Asset)
        : null;

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px 50px',
    fallbackInView: true,
    skip: !lazy,
    ...intersectionOptions,
  });

  const restWidth = rest.width;
  const restHeight = rest.height;

  if (!targetAsset || !targetAsset._id) {
    return (
      <div
        className={cn(
          'relative flex size-full items-center justify-center bg-gray-200',
          containerClassName
        )}
      >
        <Image
          src={placeholderImage}
          alt="Image placeholder"
          className="size-10 opacity-40"
          priority={false}
        />
      </div>
    );
  }

  const url = preset
    ? cockpit.getImagePresetUrl(targetAsset._id, preset, { o: 1 })
    : cockpit.getImageUrl(targetAsset._id, {
        o: 1,
        w: targetAsset.width || (restWidth as number) || twidth,
        h: targetAsset.height || (restHeight as number) || theight,
        q: quality,
        m: mode,
      });

  const objectPosition =
    targetAsset.fp &&
    typeof targetAsset.fp.x === 'number' &&
    typeof targetAsset.fp.y === 'number'
      ? `${targetAsset.fp.x * 100}% ${targetAsset.fp.y * 100}%`
      : undefined;

  const handleLoad = () => {
    setImageState((prev) => ({
      ...prev,
      isLoading: false,
      error: false,
    }));
    hasAttemptedFallback.current = false;
  };

  const handleError = () => {
    if (imageState.useTransform && !hasAttemptedFallback.current) {
      hasAttemptedFallback.current = true;
      setImageState((prev) => ({
        ...prev,
        useTransform: false,
        isLoading: true,
      }));
    } else {
      setImageState({
        isLoading: false,
        error: true,
        useTransform: false,
      });
    }
  };

  const autoSizes = (() => {
    if (rest.sizes) return rest.sizes;

    // Only apply sizes if we are in fill (responsive) mode.
    // Fixed-size images (width/height provided) should omit the sizes prop
    // to let Next.js generate a compact 1x/2x density-based srcset.
    if (rest.fill) {
      if (twidth && twidth !== 1920) {
        return `(max-width: ${twidth}px) 100vw, ${twidth}px`;
      }
      return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw';
    }

    return undefined;
  })();

  const shouldRenderImage = !lazy || inView;
  const shouldShowPlaceholder =
    imageState.isLoading && loaderPlaceholder !== false;

  const containerClasses = cn(
    'relative size-full',
    !containerClassName?.includes('bg-') && 'bg-gray-200',
    imageState.error && 'bg-red-100',
    containerClassName
  );

  return (
    <div ref={ref} className={containerClasses}>
      {shouldShowPlaceholder &&
        (typeof loaderPlaceholder === 'boolean' ? (
          <div className="relative flex size-full flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-white shadow-lg">
              <Image
                src={placeholderImage}
                alt="Image placeholder"
                className="size-10 opacity-40"
                priority={false}
              />
            </div>
          </div>
        ) : (
          loaderPlaceholder
        ))}

      {shouldRenderImage && (
        <Image
          src={url}
          alt={targetAsset.altText || targetAsset.title || ''}
          sizes={autoSizes}
          loading={inView ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized // true, as this is hosted on vercel, and dont want to use next's optimization is vercel.
          {...rest}
          style={{
            objectPosition,
            ...(rest.style as CSSProperties),
          }}
        />
      )}

      {imageState.error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          Failed to load image
        </div>
      )}
    </div>
  );
}
