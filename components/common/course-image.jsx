"use client";

import { useEffect, useRef, useState } from "react";

import { DEFAULT_COURSE_IMAGE } from "@/lib/constants";

/**
 * A course card's image: the CMS's own image when it sends one, otherwise
 * `DEFAULT_COURSE_IMAGE`. If the CMS image fails to load (e.g. a path that
 * does not exist), it swaps to the default once — so a card never shows a
 * broken-image icon. Takes plain `<img>` props; lazy-loaded unless a caller passes `loading`.
 */
export default function CourseImage({ src, alt = "Edstellar corporate training course", ...props }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const imageSrc = !src || failed ? DEFAULT_COURSE_IMAGE : src;

  // The server-rendered <img> can fail before React hydrates, and React does
  // not replay that `error` event — so check on mount whether it already
  // finished loading with nothing to show.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0 && imageSrc !== DEFAULT_COURSE_IMAGE) {
      setFailed(true);
    }
  }, [imageSrc]);

  return (
    <img decoding="async" loading="lazy"
      {...props}
      ref={ref}
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== DEFAULT_COURSE_IMAGE) setFailed(true);
      }}
    />
  );
}
