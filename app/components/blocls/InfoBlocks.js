import { StrapiImage } from "../StrapiImage";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

/** @typedef {import('@/types').InfoBlockProps} InfoBlockProps */

/**
 * @param {InfoBlockProps} props
 */
export function InfoBlock({ theme, reversed, image, headline, content, cta }) {
  const buttonBg = theme === "orange" ? "bg-orange-500" : "bg-teal-500";

  return (
    <section className={`info info--${theme} ${reversed && "info--reversed"}`}>
      <div
        className={`flex flex-col gap-12 md:flex-row items-center justify-between w-full max-w-[1170px] mx-auto space-y-6 md:space-y-0 ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Left Side Image */}
        <div className="w-full md:w-1/2">
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || "No alternative text provided"}
            height={500}
            width={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 space-y-4 text-left">
          <h2
            className={`info__headline text-3xl font-bold ${
              theme === "orange" ? "text-orange-500" : "text-teal-500"
            }`}
          >
            {headline}
          </h2>
          <div className="copy text-lg text-gray-700">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {cta && (
            <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
              <button
                type="submit"
                className={`px-6 text-bold py-3 ${buttonBg} text-white rounded-lg shadow-md hover:opacity-90 transition`}
              >
                {cta.text}
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
