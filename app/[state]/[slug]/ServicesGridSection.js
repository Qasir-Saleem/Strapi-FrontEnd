// app/[state]/[slug]/ServicesGridSection.js
"use client";
import React from "react";

const STRAPI_URL = "http://localhost:1337";

function getImageUrl(image) {
  if (!image) return null;
  if (image.url) return STRAPI_URL + image.url;
  if (image.data?.attributes?.url) return STRAPI_URL + image.data.attributes.url;
  return null;
}

export default function ServicesGridSection({ grid }) {
  if (!grid) return null;

  const { heading, subheading, ServiceCard } = grid;

  // Rich text se plain text (pehla paragraph)
  const subText = subheading?.[0]?.children?.[0]?.text || "";

  return (
    <section style={{ padding: "60px 40px", background: "#f4f4f4" }}>
      {/* Top heading + paragraph */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, marginBottom: 10 }}>{heading}</h2>
        <p style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
          {subText}
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {ServiceCard?.map((card) => {
          const imgUrl =
            getImageUrl(card.image) ||
            "https://placehold.co/400x260?text=Service";

          const descText =
            card.Description?.[0]?.children?.[0]?.text || "";

          return (
            <article
              key={card.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={imgUrl}
                alt={card.title}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />

              <div style={{ padding: 16 }}>
                <h3
                  style={{
                    fontSize: 18,
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </h3>

                <p style={{ fontSize: 14, lineHeight: 1.5 }}>{descText}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
