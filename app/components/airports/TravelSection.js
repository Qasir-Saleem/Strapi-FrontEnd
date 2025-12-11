
"use client";

import React from "react";
import RichTextRenderer from "../RichTextRenderer";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function TravelSection({ section }) {
  if (!section) return null;

  // image
  let imgUrl = "";
  if (section.frontimage) {
    if (section.frontimage.url) {
      imgUrl = `${STRAPI_URL}${section.frontimage.url}`;
    } else if (section.frontimage.data?.attributes?.url) {
      imgUrl = `${STRAPI_URL}${section.frontimage.data.attributes.url}`;
    }
  }

  const faqs = section.Faq_Data || section.faq_data || [];

  return (
    <section className="py-14 px-6">
      <div className="max-w-[1170px] mx-auto ">
        {/* top heading + description */}
        <div className="max-w-[1170px] mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {section.title}
          </h2>
          <p className="text-black">
             <RichTextRenderer content={section.richtext} />
          </p>
        </div>

        {/* main 2-column layout */}
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* LEFT: faq list */}
          <div className="">
            {faqs.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                {/* green check icon */}
                <div className="mt-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 0C15.5219 0 20 4.47812 20 10C20 15.5219 15.5219 20 10 20C4.47812 20 0 15.5219 0 10C0 4.47812 4.47812 0 10 0ZM7.92337 13.2481L5.47513 10.7978C5.05803 10.3805 5.05795 9.69989 5.47513 9.28263C5.8924 8.86545 6.57599 8.86806 6.99023 9.28263L8.71622 11.01L13.0099 6.71628C13.4272 6.29901 14.1078 6.29901 14.525 6.71628C14.9423 7.13346 14.9417 7.8147 14.525 8.23138L9.47255 13.2839C9.05588 13.7005 8.37463 13.7011 7.95745 13.2839C7.94573 13.2721 7.93442 13.2602 7.92337 13.2481Z"
                      fill="#009900"
                    />
                  </svg>
                </div>

                <div>
                  <p className="">
                    {/* <span className="font-bold">{item.title}</span> */}
                    <RichTextRenderer content={item.richtext} className="text-xs" />
                   
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: image card */}
          <div className="flex justify-center">
            {imgUrl && (
              <div className="w-full  rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={imgUrl}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelSection;
