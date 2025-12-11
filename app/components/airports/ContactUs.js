"use client";

import React from "react";
import RichTextRenderer from "../RichTextRenderer";

function ContactUs({ section }) {
  if (!section) return null;

  const faqs = section.Faq_Data || section.faq_data || [];
  const title = section.title;
  const description = section.description;

  function handleSubmit(e) {
    e.preventDefault();
    // yahan baad me API hit waghera add kar sakte ho
    console.log("Contact form submit");
  }

  return (
    <section className=" py-16 px-6">
      <div className="max-w-[1170px] mx-auto ">
        {/* TOP MAIN HEADING */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-10">
          {title}
        </h2>

        {/* 2 COLUMN LAYOUT */}
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* LEFT: TEXT + BULLETS */}
          <div>
            {description && (
              <p className="text-black leading-[35px] mb-6">
                {description}
              </p>
            )}
          <RichTextRenderer content={section.richtext} />

            <div className="">
              {faqs.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  {/* green tick icon */}
                  <div className="mt-2 ">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5219 0 20 4.47812 20 10C20 15.5219 15.5219 20 10 20C4.47812 20 0 15.5219 0 10C0 4.47812 4.47812 0 10 0ZM7.92337 13.2481L5.47513 10.7978C5.05803 10.3805 5.05795 9.69989 5.47513 9.28263C5.8924 8.86545 6.57599 8.86806 6.99023 9.28263L8.71622 11.01L13.0099 6.71628C13.4272 6.29901 14.1078 6.29901 14.525 6.71628C14.9423 7.13346 14.9417 7.8147 14.525 8.23138L9.47255 13.2839C9.05588 13.7005 8.37463 13.7011 7.95745 13.2839C7.94573 13.2721 7.93442 13.2602 7.92337 13.2481Z" fill="#009900"/>
</svg>
                  </div>

                  <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                    <span className="font-[900]">
                      {item.title}
                    </span>
                        <span className="leading-[35px]">{item.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTACT FORM CARD */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 px-6 py-3">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-slate-900 mb-2">
              Contact Us for Corporate Queries
            </h3>
            <p className="text-sm text-slate-600 text-center mb-6">
              Fill out the contact form below, and we&apos;ll craft a solution
              just for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FIRST / LAST NAME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                 
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                 
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              {/* EMAIL + PHONE */}
         

              {/* MESSAGE */}
              <div>
               
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black resize-none"
                  placeholder="Enter your Message"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full mt-2 bg-black text-white font-semibold py-3 rounded-xl text-sm md:text-base tracking-wide hover:bg-slate-900 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
