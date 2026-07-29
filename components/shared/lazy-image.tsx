import Image from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
}: LazyImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      loading="lazy"
      className={className}
    />
  );
}
