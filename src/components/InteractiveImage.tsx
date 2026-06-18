import { useState } from "react";
import { DEFAULT_FALLBACK_IMAGES } from "../data";

interface InteractiveImageProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  parentClass?: string;
}

export default function InteractiveImage({
  id,
  src,
  alt,
  className = "",
  parentClass = "relative overflow-hidden group",
}: InteractiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleError = () => {
    if (!hasFailed) {
      setHasFailed(true);
      // Fallback to high resolution Unsplash matching copy
      const fallback = DEFAULT_FALLBACK_IMAGES[src];
      if (fallback) {
        setCurrentSrc(fallback);
      } else {
        setCurrentSrc(`https://picsum.photos/seed/${alt.replace(/\s+/g, "")}/1200/800`);
      }
    }
  };

  return (
    <div className={parentClass} id={id}>
      {loading && (
        <div className="absolute inset-0 bg-neutral-900/10 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoading(false)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${
          loading ? "opacity-0 blur-md" : "opacity-100 blur-0"
        } ${className}`}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
    </div>
  );
}
