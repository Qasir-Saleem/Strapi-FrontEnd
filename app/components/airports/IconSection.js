"use client";

import React from "react";
import RichTextRenderer from "../RichTextRenderer";

const STRAPI_URL = "http://localhost:1337";

function extractPlainText(richText) {
  if (!richText) return "";

  if (typeof richText === "string") return richText;

  if (Array.isArray(richText)) {
    return richText
      .map((block) =>
        block.children?.map((child) => child.text || "").join("")
      )
      .join("\n");
  }

  return "";
}

export default function ServicesIntro({ section }) {
  console.log("IconsSection section =>", section);

  // yahan section object hai (IconsSection), array nahi
  if (!section) return null;

  const title = section.title;
  const Des = section.description;

  const cards = section.ServiceCard || [];

  return (
   <div className="px-6">
     <section className="max-w-[1170px] mx-auto py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-[36px] font-bold mb-3">{title}</h2>
      
     
          <p className="whitespace-pre-line">
        
            <RichTextRenderer content={section.richtext} />
          </p>
      
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card) => {
          let imgUrl = "";

          if (card.image) {
            // case 1: already flattened (jo tumhare screenshot jaisa hai)
            if (card.image.url) {
              imgUrl = `${STRAPI_URL}${card.image.url}`;
            }
            // case 2: agar kabhi image: { data: { attributes: { url } } } aaye
            else if (card.image.data?.attributes?.url) {
              imgUrl = `${STRAPI_URL}${card.image.data.attributes.url}`;
            }
          }

          const alt =
            card.alttext ||
            card.altstext ||
            card.image?.alternativeText ||
            card.title;

          return (
            <div
              key={card.id}
              className=""
            >
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={alt}
                  className="w-full h-24 object-contain p-4"
                />
              )}

              <div className="p-4 text-center font-inter">
                <h3 className="font-bold text-xl mb-2">
                  {card.title}
                </h3>

                <p className="text-lg">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>  
   </div>
  );
}
