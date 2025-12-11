"use client";
import Image from "next/image";
import React from "react";

const STRAPI_URL = "http://localhost:1337";

function HeroSection({ hero }) {
  if (!hero) return null;

  const image = hero.image; // apne field name ke hisaab se
  const imageUrl = image?.url
    ? `http://localhost:1337${image.url}`
    : "/placeholder.jpg";

  const imgWidth = image?.width || 1920; // fallback agar Strapi se na aaye
  const imgHeight = image?.height || 100; // fallback

  return (
    <>
      <main
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative lg:px-0 isolate bg-gray-900"
      >
        {/* <div className="absolute bottom-0 w-full h-24 sm:h-32 md:h-36 lg0 -z-10" /> */}

        <section className="px-6">
          <div className="mx-auto max-w-[1170px] mt-10 lg:mt-0 lg:py-10">
            <div className="grid grid-cols-12 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
              {/* TEXT SECTION - Bottom aligned */}
              <article className="order-last flex items-end text-white col-span-12 lg:order-1 lg:col-span-8">
                <div className="mb-7 lg:mb-0">
                  <h1 className="text-2xl lg:text-[36px] pt-3 font-bold text-white text-left lg:pt-0 leading-[140%]">
                    {hero.title}
                  </h1>

                  <p className="text-lg lg:text-2xl pt-3 font-semibold text-white text-left">
                    {hero.description}
                  </p>
                </div>
              </article>

              {/* BOOKING FORM SECTION - Same as previous */}
              <aside className="order-first bg-white/95 text-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm border col-span-12 flex items-end justify-center sm:mt-2 lg:order-2 lg:col-span-4">
                <div className="w-full">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                    Book Your Ride
                  </h2>

                  <p className="text-sm text-gray-500 mb-6">
                    Get an instant quote & confirm your luxury ride in seconds.
                  </p>

                  <form className="space-y-4">
                    {/* Pickup */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        placeholder="Airport, Hotel, Home..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                    </div>

                    {/* Dropoff */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dropoff Location
                      </label>
                      <input
                        type="text"
                        placeholder="Destination"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                    </div>

                    {/* Date / Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Passengers + Vehicle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passengers
                        </label>
                        <input
                          type="number"
                          min={1}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vehicle Type
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-black">
                          <option>Standard</option>
                          <option>Business</option>
                          <option>First Class</option>
                          <option>SUV</option>
                        </select>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-black text-white font-semibold py-2.5 text-sm md:text-base hover:bg-gray-900 transition"
                    >
                      Get Instant Quote
                    </button>

                    <p className="text-[11px] text-gray-500 text-center mt-2">
                      No hidden charges. Free cancellation up to 24 hours before
                      pickup.
                    </p>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HeroSection;
