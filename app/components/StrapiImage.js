import Image from "next/image";
import getStrapiURL from "@/utils/getstrapiurl";

/**
 * @typedef {Object} StrapiImageProps
 * @property {string} src
 * @property {string} alt
 * @property {string} [className]
 */

/**
 * @param {StrapiImageProps} props
 */
export function StrapiImage({ src, alt, className = "", ...rest }) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        height={200}

        className="w-full object-cover"
        {...rest}
      />
    </div>
  );
}

export function getStrapiMedia(url) {
  if (!url) return null;

  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;

  return getStrapiURL() + url;
}
