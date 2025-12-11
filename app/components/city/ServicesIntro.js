"use client";

import Image from "next/image";
import React from "react";

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
  if (!section || !Array.isArray(section) || section.length === 0) return null;

  const sectionObj = section[0];

  const {
    heading,
    subheading,
    ServiceCard: cards = [],
  } = sectionObj;

  const subheadingText = extractPlainText(subheading);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-3">{heading}</h2>
        <p className="text-gray-700 whitespace-pre-line">{subheadingText}</p>
      </div>

      <div className="grid md:grid-cols-4  gap-6">
        {cards.map((card) => {
          const imgUrl = card.image?.url
            ? `http://localhost:1337${card.image.url}`
            : "";

          return (
            <div
              key={card.id}
              className="overflow-hidden"
            >
           <div className="flex mt-3 h-20 justify-center">   {imgUrl && (
                <img
                  src={imgUrl}
                  alt={card.altstext || card.title}
                  className=""
                />
              )}
</div>
              <div className="p-4">
                <h3 className="font-bold text-center text-xl mb-2">
                  {card.title}
                </h3>

                <p className="text-black text-center text-sm">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
