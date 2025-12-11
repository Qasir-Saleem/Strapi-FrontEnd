"use client";
import React, { useState } from "react";
import Faqimage from "../../../public/uniqueService.webp";
import Image from "next/image";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// optional: richtext helper (agar baad me use karna ho)
function extractText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (typeof node === "object") {
    if (node.text) return node.text;
    if (node.children) return extractText(node.children);
  }
  return "";
}

export default function FaqImageSection({ section }) {
  if (!section) return null;

  const faqItems = section.Faq_Data || [];

  // image single media ho to:
  const imgAttr = section.image?.data?.attributes;
  const imageUrl = imgAttr?.url ? `${STRAPI_URL}${imgAttr.url}` : null;

  // simple accordion open/close
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openId, setOpenId] = useState(faqItems[0]?.id || null);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {section.title && (
            <h2 className="text-4xl font-bold mb-3">{section.title}</h2>
          )}

          {section.description && (
            <p className="text-gray-600 text-lg mb-6">{section.description}</p>
          )}

          {section.richtext && (
            <p className="text-gray-700 mb-6">
              {extractText(section.richtext)}
            </p>
          )}
        </div>
        <div className="grid gap-10 mt-12 lg:grid-cols-2 items-center">
          {/* LEFT: text + FAQs */}
          <div>
            {/* FAQ LIST */}
            <div className="space-y-3">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === item.id ? null : item.id))
                    }
                    className="w-full flex justify-between items-center px-4 py-3 bg-[#EFE7CE] hover:bg-[#EFE7CE]"
                  >
                    <span className="font-bold text-xl">{item.title}</span>
                    <span className="text-gray-500 text-xl leading-none">
                      {openId === item.id ? "−" : "+"}
                    </span>
                  </button>

                  {openId === item.id && (
                    <div className="px-4 py-3 bg-[#EFE7CE] text-sm text-gray-700">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="flex justify-center lg:justify-end">
            <Image src={Faqimage} alt="faq image" />
          </div>
        </div>
      </div>
    </section>
  );
}
