import Link from "next/link";
import { StrapiImage } from "../StrapiImage";

/** @typedef {import("@/types").HeroSectionProps} HeroSectionProps */

/**
 * @param {HeroSectionProps} props
 */
export function HeroSection({
  theme,
  heading,
  cta,
  image,
  logo,
  author,
  publishedAt,
  darken = false,
}) {
  // Tailwind dynamic bg issue fix
  const buttonBg = theme === "orange" ? "bg-orange-500" : "bg-teal-500";

  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <StrapiImage
          src={image.url}
          alt="hero image"
          className="object-cover object-bottom"
        />
        {darken && <div className="absolute inset-0 bg-black/40" />}
      </div>

      <div className="relative flex w-full max-w-[1170px] mx-auto">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 text-white space-y-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold">{heading}</h1>

          {author && (
            <p className="text-lg font-semibold opacity-90">{author}</p>
          )}

          {publishedAt && <p className="text-base opacity-80">{publishedAt}</p>}
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col space-y-4 max-w-lg">
          <h2 className="text-xl font-bold text-left">Book a Ride</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="pickup-location" className="block text-left">
                Pickup Location
              </label>
              <input
                id="pickup-location"
                type="text"
                className="w-full p-2 border rounded text-left"
              />
            </div>
            <div>
              <label htmlFor="dropoff-location" className="block text-left">
                Drop-off Location
              </label>
              <input
                id="dropoff-location"
                type="text"
                className="w-full p-2 border rounded text-left"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-left">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full p-2 border rounded text-left"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-left">
                Time
              </label>
              <input
                id="time"
                type="time"
                className="w-full p-2 border rounded text-left"
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-3 ${buttonBg} text-white rounded-lg shadow-md hover:opacity-90 transition`}
              >
                {cta ? cta.text : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Optional Logo */}
      {logo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || "No alternative text"}
            className={`w-24 h-24 object-contain ${
              theme === "orange"
                ? "invert-[62%] sepia-[21%] saturate-[1646%] hue-rotate-[348deg] brightness-[88%] contrast-[81%]"
                : ""
            }`}
            width={120}
            height={120}
          />
        </div>
      )}
    </section>
  );
}
