"use client";

import Image, { type ImageProps } from "next/image";

interface SmartImageProps extends ImageProps {}

/**
 * next/image wrapper that renders the optimised image as-is (no loading
 * shimmer and no crossfade). Images are fetched in the background and simply
 * appear when ready, so nothing ever interrupts the page's entrance and slide
 * animations. The frame keeps the image's natural aspect/clipping identical.
 */
export default function SmartImage({
  src,
  alt,
  sizes,
  priority,
  fetchPriority,
  quality,
  className = "",
  ...rest
}: SmartImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-200/70">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
        quality={quality}
        className={className}
        {...rest}
      />
    </div>
  );
}