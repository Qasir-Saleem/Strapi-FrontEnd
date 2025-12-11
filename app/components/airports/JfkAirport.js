"use client";

import React from "react";
import RichTextRenderer from "../RichTextRenderer";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// simple richtext → plain text
function extractPlainText(richText) {
  if (!richText) return "";

  if (typeof richText === "string") return richText;

  if (Array.isArray(richText)) {
    return richText
      .map((block) =>
        block.children?.map((child) => child.text || "").join("")
      )
      .join(" ");
  }

  return "";
}

function JfkAirport({ section }) {
  // section = data.JfkAirports (jo Strapi se aa raha hai)
  if (!section) return null;

  const { title, description, richtext, ServiceCard = [] } = section;

  const richTextContent = extractPlainText(richtext);

  return (
    <section className="py-16 px-6">
      {/* TOP HEADING + SUBHEADING + TEXT */}
      <div className="max-w-[1170px] mx-auto  text-center">
        <h2 className="text-3xl md:text-[36px] font-extrabold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-3xl md:text-[32px] italic font-semibold text-black font-basker">
            {description}
          </p>
        )}

        {richTextContent && (
          <p className="mt-6 text-black leading-relaxed">
            <RichTextRenderer content={richtext} />
          </p>
        )}
      </div>

      {/* CARDS ROW */}
      <div className="mt-10 max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {ServiceCard.map((card) => {
          let imgUrl = "";

          if (card.image) {
            // case 1: flattened media
            if (card.image.url) {
              imgUrl = `${STRAPI_URL}${card.image.url}`;
            }
            // case 2: image: { data: { attributes: { url } } }
            else if (card.image.data?.attributes?.url) {
              imgUrl = `${STRAPI_URL}${card.image.data.attributes.url}`;
            }
          }

          const alt =
            card.alttext ||
            card.image?.alternativeText ||
            card.title ||
            "image";

          return (
            <div key={card.id} className="flex flex-col items-center">
              {/* IMAGE */}
              {imgUrl && (
                <div className="w-full rounded-3xl overflow-hidden shadow-md mb-4">
                  <img
                    src={imgUrl}
                    alt={alt}
                    className=""
                  />
                </div>
              )}

              {/* TITLE + DESCRIPTION */}
              <h3 className="text-lg text-black md:text-xl font-bold  mb-2 text-center">
                {card.title}
              </h3>

              <p className="text-sm md:text-base leading-relaxed text-center">
              <RichTextRenderer content={card.richtext} />
              </p>
           
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default JfkAirport;
