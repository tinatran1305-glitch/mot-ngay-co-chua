"use client";

import React, { useState } from "react";

interface ChibiImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ChibiImage({
  src,
  fallbackSrc = "/images/chibi/fallback-chibi.svg",
  alt,
  className = "",
  priority = false,
}: ChibiImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  // Đồng bộ khi prop src thay đổi theo ngày/chủ đề
  React.useEffect(() => {
    setImgSrc(src);
    setHasErrored(false);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (!hasErrored) {
          setHasErrored(true);
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
    />
  );
}

