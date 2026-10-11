import { useState } from "react";

// Shows a placeholder when the image URL is missing or broken
export default function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className="img-fallback">No image</div>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
