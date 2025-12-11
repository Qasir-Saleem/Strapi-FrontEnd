"use client";
import React from "react";

const STRAPI_URL = "http://localhost:1337";

// Strapi RichText (array) -> HTML string
function richTextToHtml(nodes) {
  if (!Array.isArray(nodes)) return "";

  const renderChild = (child) => {
    if (!child) return "";

    if (child.type === "text") {
      // simple text
      return child.text || "";
    }

    if (child.type === "link") {
      const inner =
        (child.children || []).map(renderChild).join("") || child.url || "";

      const url = child.url || "#";

      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${inner}</a>`;
    }

    // fallback
    return child.text || "";
  };

  return nodes
    .map((block) => {
      const inner = (block.children || []).map(renderChild).join("");
      return `<p>${inner}</p>`;
    })
    .join("");
}

function CityHeroSection({ hero }) {
  if (!hero) return null;

  const data = Array.isArray(hero) ? hero[0] : hero;
  console.log("CITY HERO DATA:", data);

  const imgAttr = data?.bgImage?.data?.attributes || data?.bgImage;
  const imageUrl = imgAttr?.url
    ? `${STRAPI_URL}${imgAttr.url}`
    : "/placeholder.jpg";

  // ⚠️ tumhare field ka naam `descriptio1` hai (t missing)
  const shortDesc =
    data.descriptio1 || data.description1 || data.des1 || data.subTitle || "";

  const richDescHtml = richTextToHtml(data.description);

  return (
    <section
      className="w-full py-10 text-white relative"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="a" /> */}

      <div className="px-6 pt-12">
        <div className=" mx-auto max-w-[1170px]">
          <div className="grid grid-cols-12 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
            {/* LEFT: Text Content (NOW BOTTOM ALIGNED) */}
            <div className="order-last flex items-end text-white col-span-12 lg:order-1 lg:col-span-8">
              <div className="mb-7 lg:mb-0">
                <h1 className="text-2xl md:text-[36px] text-white font-bold mb-4">
                  {data.title}
                </h1>

                {shortDesc && (
                  <p className="text-lg md:text-3xl font-bold text-white italic text-white mb-4">
                    {shortDesc}
                  </p>
                )}

                {richDescHtml && (
                  <div
                    className="mt-2 text-white text-sm md:text-base leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: richDescHtml }}
                  />
                )}
              </div>
            </div>

            {/* RIGHT: Booking Form */}
            <div className="order-first bg-white/95 text-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm border col-span-12 flex items-end justify-center sm:mt-2 lg:order-2 lg:col-span-4">
              <div className="w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                  Book Your Ride
                </h2>

                <form className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-black text-white font-semibold py-2.5 text-sm md:text-base hover:bg-gray-900 transition"
                  >
                    Get Instant Quote
                  </button>

                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    No hidden charges. Free cancellation up to 24 hours before
                    pickup.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CityHeroSection;
