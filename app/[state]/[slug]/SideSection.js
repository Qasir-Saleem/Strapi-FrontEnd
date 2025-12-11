"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

function SideSection() {
  const { state, slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state || !slug) return;

    axios
      .get("http://localhost:1337/api/services", {
        params: {
          "filters[States][$eq]": state,
          "filters[slug][$eq]": slug,
          "populate[SideSection][populate]": "image",
        },
      })
      .then((res) => {
        const item = res.data?.data?.[0] || null;

        console.log("SERVICE RESPONSE:", item);
        console.log("SIDE SECTION:", item?.SideSection);

        setService(item);
      })
      .catch((err) =>
        console.error("SERVICE API ERROR:", err.response?.data || err.message)
      )
      .finally(() => setLoading(false));
  }, [state, slug]);

  if (loading) return <p>Loading...</p>;
  if (!service?.SideSection) return null;

  const { title, description, image, altTags } = service.SideSection;

  // 👇 image array se pehla image object nikaal rahe hain
  const imageFile = Array.isArray(image) ? image[0] : image;

  const imageUrl = imageFile?.url
    ? `http://localhost:1337${imageFile.url}`
    : null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* RIGHT: Image */}
        <div className="md:w-1/2 flex justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={altTags || title}
              width={imageFile?.width || 600}
              height={imageFile?.height || 400}
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              priority
            />
          )}
        </div>
        {/* LEFT: Text */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        <button className="bg-black rounded-lg text-white px-4 py-2 mt-4">book now </button>
        </div>
      </div>
    </section>
  );
}

export default SideSection;
