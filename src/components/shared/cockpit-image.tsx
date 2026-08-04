'use client';

import {
  CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import Image, { type ImageProps } from 'next/image';

import cockpit, { type Asset, type ImageOptions } from '@/lib/client';
import { cn } from '@/lib/utils';
import { ImagePreset } from '@/types';

import placeholderImage from '@/public/circle-logo.png';
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
  colorMode?: 'auto' | 'light' | 'dark';
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
  colorMode = 'auto',
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
          'relative flex size-full items-center justify-center bg-slate-100/80 p-4 dark:bg-stone-950/80',
          containerClassName
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 p-2.5 shadow-md backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90">
          <Image
            src={placeholderImage}
            alt="Image placeholder"
            className="size-full object-contain opacity-70"
            priority={false}
          />
        </div>
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
    'relative size-full overflow-hidden',
    !containerClassName?.includes('bg-') &&
      (colorMode === 'dark'
        ? 'bg-stone-900/40'
        : colorMode === 'light'
          ? 'bg-slate-100/50'
          : 'bg-slate-100/50 dark:bg-stone-900/40'),
    imageState.error && 'bg-rose-500/10',
    containerClassName
  );

  return (
    <div ref={ref} className={containerClasses}>
      {/* Dual-Mode Adaptive Placeholder with Crisp Logo */}
      {shouldShowPlaceholder &&
        (typeof loaderPlaceholder === 'boolean' ? (
          <div
            className={cn(
              'absolute inset-0 z-10 flex size-full flex-col items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-500',
              colorMode === 'dark'
                ? 'bg-stone-900/40'
                : colorMode === 'light'
                  ? 'bg-slate-100/60'
                  : 'bg-slate-100/60 dark:bg-stone-900/40'
            )}
          >
            <div
              className={cn(
                'flex size-14 animate-pulse items-center justify-center rounded-2xl border p-2.5 shadow-md backdrop-blur-md',
                colorMode === 'dark'
                  ? 'border-white/10 bg-stone-900/60'
                  : colorMode === 'light'
                    ? 'border-slate-200/80 bg-white/80'
                    : 'border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-stone-900/60'
              )}
            >
              <Image
                src={placeholderImage}
                alt="Loading asset"
                className="size-full object-contain"
                priority={false}
              />
            </div>
          </div>
        ) : (
          loaderPlaceholder
        ))}

      {/* Main Image with Smooth Fade-In & Scale Transition */}
      {shouldRenderImage && (
        <Image
          src={url}
          alt={targetAsset.altText || targetAsset.title || ''}
          sizes={autoSizes}
          loading={inView ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized // true, as this is hosted on vercel, and dont want to use next's optimization in vercel.
          {...rest}
          className={cn(
            'transition-all duration-500 ease-out',
            imageState.isLoading
              ? 'scale-[0.98] opacity-0 blur-xs'
              : 'scale-100 opacity-100 blur-none',
            rest.className
          )}
          style={{
            objectPosition,
            ...(rest.style as CSSProperties),
          }}
        />
      )}

      {imageState.error && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-rose-500 dark:text-rose-400">
          Failed to load image
        </div>
      )}
    </div>
  );
}
