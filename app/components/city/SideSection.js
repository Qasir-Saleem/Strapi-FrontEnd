"use client";

import Image from "next/image";
import React from "react";

const STRAPI_URL = "http://localhost:1337";

// Strapi RichText (array) -> HTML string
function richTextToHtml(nodes) {
  if (!Array.isArray(nodes)) return "";

  const renderChild = (child) => {
    if (!child) return "";

    if (child.type === "text") {
      return child.text || "";
    }

    if (child.type === "link") {
      const inner =
        (child.children || []).map(renderChild).join("") || child.url || "";

      const url = child.url || "#";

      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${inner}</a>`;
    }

    return child.text || "";
  };

  return nodes
    .map((block) => {
      const inner = (block.children || []).map(renderChild).join("");
      return `<p>${inner}</p>`;
    })
    .join("");
}

// ✅ yahan se image ko normalize kar rahe hain
function getImageAttrs(image) {
  if (!image) return null;

  // 1) Strapi v4: { data: { attributes } } OR { data: [ { attributes } ] }
  if (image.data) {
    if (Array.isArray(image.data)) {
      return image.data[0]?.attributes || null;
    }
    return image.data.attributes || null;
  }

  // 2) Direct array of files: [ { url, width, height } ]
  if (Array.isArray(image)) {
    return image[0] || null;
  }

  // 3) Direct object: { url, width, height }
  if (image.url) {
    return image;
  }

  return null;
}

function CitySideSection({ side }) {
  if (!side) return null;

  const data = Array.isArray(side) ? side[0] : side;
  console.log("CITY SIDE DATA:", data);

  const { title, description, image } = data || {};

  const descriptionHtml = richTextToHtml(description);

  const imgAttr = getImageAttrs(image);
  console.log("CITY SIDE IMAGE ATTR:", imgAttr);

  const imageUrl = imgAttr?.url ? `${STRAPI_URL}${imgAttr.url}` : null;
  const width = imgAttr?.width || 600;
  const height = imgAttr?.height || 400;

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
      </div>

      <div className="flex flex-col mt-12 md:flex-row items-center gap-10">
        {/* RIGHT: Image */}
        <div className="md:w-1/2 flex justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={imgAttr?.alternativeText || title}
              width={width}
              height={height}
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          )}
        </div>

        {/* LEFT: Text */}
        <div className="md:w-1/2">
          {descriptionHtml && (
            <div
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          <button className="bg-black rounded-lg text-white px-4 py-2 mt-4">
            Book now
          </button>
        </div>
      </div>
    </section>
  );
}

export default CitySideSection;
