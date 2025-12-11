import React from "react";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Strapi richtext ko plain text me convert karne wala helper
function extractText(node) {
  if (!node) return "";

  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map((n) => extractText(n)).join(" ");
  }

  if (typeof node === "object") {
    if (node.text) return node.text;
    if (node.children) return extractText(node.children);
  }

  return "";
}

export default function FleetSectionCity({ section }) {
  if (!section) return null;

  const fleets = section.Fleet || [];

  // top richtext (jo tumne upar likh lagayi hai)
  const sectionRich = extractText(section.richtext);

  return (
    <section className="py-12 ">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top heading */}
        <div className="text-center mb-10">
          {section.title && (
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {section.title}
            </h2>
          )}

          {section.description && (
            <p className="text-gray-600 text-lg">{section.description}</p>
          )}

          {sectionRich && (
            <p className="mt-4 text-gray-700 leading-relaxed">{sectionRich}</p>
          )}
        </div>

        {/* Fleet cards */}
        {fleets.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {fleets.map((item) => {
              // 👇 yahan se image ka URL nikal raha hai
              const img = item.Fleet; // screenshot me ye pura object tha
              const imageUrl =
                img && img.url ? `${STRAPI_URL}${img.url}` : null;

              const itemRich = extractText(item.richtext);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <div className="flex bg-[#EFE7CE] py-5 justify-center">
                    {imageUrl && <img src={imageUrl} alt={item.Title} />}
                  </div>

                  {/* TEXT */}
                  <div className="p-5 text-center">
                    {item.Title && (
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.Title}
                      </h3>
                    )}

                    {item.Description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.Description}
                      </p>
                    )}

                    {itemRich && (
                      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                        {itemRich}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
