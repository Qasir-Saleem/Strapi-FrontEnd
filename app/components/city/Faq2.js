"use client";

import React, { useState } from "react";
import Script from "next/script";

function Faq({ faqSection }) {
  // agar Strapi me Faq repeatable component hai to pehla item lo
  const section = Array.isArray(faqSection) ? faqSection[0] : faqSection;

  if (!section) return null;

  const heading = section.title || "FAQ";
  const items = section.Faq_Data || [];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // JSON-LD schema (SEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => {
      const question = item.title || item.question || "";
      const answer = item.description || item.answer || "";
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    }),
  };

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">{heading}</h2>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const question = item.title || item.question;
            const answer = item.description || item.answer;

            return (
              <div
                key={index}
                className={`rounded-[28px] border overflow-hidden transition-colors
                ${
                  isOpen
                    ? "bg-amber-100 border-amber-300"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* round + / - icon */}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl text-gray-700">
                      {isOpen ? "−" : "+"}
                    </span>

                    <span className="font-medium text-gray-900 text-base sm:text-lg">
                      {question}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-16 pb-4 pt-1 text-sm text-gray-800">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* JSON-LD Schema for this page's FAQ */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default Faq;
