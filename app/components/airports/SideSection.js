"use client";

import React from "react";
import RichTextRenderer from "@/app/components/RichTextRenderer";

const STRAPI_URL = "http://localhost:1337";

function SideSection({ side }) {
  if (!side) return null;

  const data = Array.isArray(side) ? side[0] : side;
  console.log("CITY SIDE DATA:", data);

  const title = data.title || "";
  const description = data.description || [];

  let bg = null;

  if (Array.isArray(data.image) && data.image.length > 0) {
    bg = data.image[0];
  } else if (data.image?.data) {
    bg = Array.isArray(data.image.data)
      ? data.image.data[0]?.attributes
      : data.image.data.attributes;
  }

  const imageUrl = bg?.url ? `${STRAPI_URL}${bg.url}` : "/placeholder.jpg";

  return (
    <div className="px-6">
      <section className="max-w-[1170px] mx-auto py-20">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-[36px] font-extrabold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>

        {/* GRID layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* LEFT: Image */}
          <div className="">
            <img
              src={imageUrl}
              alt={title || "side image"}
              className="w-full "
            />
          </div>

          {/* RIGHT: Rich Text */}
          <div className="leading-relaxed">
            <RichTextRenderer content={description} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SideSection;
