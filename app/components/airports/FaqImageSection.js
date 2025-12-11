"use client";
import React, { useState } from "react";
import Image from "next/image";
import RichTextRenderer from "../RichTextRenderer";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function FaqImageSection({ section }) {
  if (!section) return null;
  console.log(section, "qqqqq");

  const faqItems = section.Faq_Data || [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openId, setOpenId] = useState(faqItems[0]?.id || null);

  // ---------- IMAGE HANDLING START ----------
  const front = section.frontimage;
  let media = null;

  if (Array.isArray(front) && front.length > 0) {
    // case 1: array
    media = front[0];
  } else if (front?.data) {
    // case 2: relation style { data: { attributes: {...} } }
    media = Array.isArray(front.data)
      ? front.data[0]?.attributes
      : front.data.attributes;
  } else if (front?.url) {
    // case 3: simple object (jo tumhari screenshot me hai)
    media = front;
  }

  const imageUrl = media?.url
    ? `${STRAPI_URL}${media.url}`
    : "/placeholder.jpg";
  const imageWidth = media?.width || 540;
  const imageHeight = media?.height || 480;
  // ---------- IMAGE HANDLING END ----------

  return (
    <section className="py-12  px-6">
      <div className="max-w-[1170px] mx-auto ">
        <div className="text-center">
          {section.title && (
            <h2 className="text-4xl font-bold mb-3">{section.title}</h2>
          )}

          {section.richtext && (
            <div className="text-black mb-6">
              <RichTextRenderer content={section.richtext} />
            </div>
          )}
        </div>

        <div className="grid gap-14 mt-12 lg:grid-cols-2 items-center">
          {/* RIGHT: image */}
          <div className="flex justify-center  lg:justify-start">
            <img
              src={imageUrl}
              alt={media?.alternativeText || "faq image"}
              className="w-full"
            />
          </div>

          {/* LEFT: text + FAQs */}
          {/* LEFT: text + FAQs */}
          <div>
            {/* FAQ LIST */}
            <div className="space-y-3">
              {faqItems.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      setOpenId((prev) => (prev === item.id ? null : item.id))
                    }
                    className={`cursor-pointer flex gap-3 items-start rounded-2xl border px-3 py-3.5 transition-colors
            ${
              isOpen
                ? "bg-[#F7EFD6] border border-[#A7A7AA]" // active = yellow card
                : "bg-[#E8E8E8] border border-[#A7A7AA]" // inactive = light grey
            }`}
                  >
                    <div className="flex items-center mb-1.5 gap-4">
                      {/* plus / minus ci rcle */}
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-xl 
                ${
                  isOpen
                    ? "bg-[#d5af34] text-black" // filled gold circle
                    : "bg-[#D9D9D9] text-gray-700" // grey circle
                }`}
                      >
                        {isOpen ? "−" : "+"}
                      </div>

                      {/* title */}
                    </div>
                    <div className="">
                      <h3 className={`text-lg  md:text-lg ${isOpen && 'font-bold'}`}>
                        {item.title}
                      </h3>

                      {/* description only when open */}
                      {isOpen && (
                        <p className="mt-3 text-sm md:text-base text-black leading-[29px]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {section.description && (
          <p className="text-black mt-5 text-center text-lg ">
            {section.description}
          </p>
        )}
      </div>
    </section>
  );
}
