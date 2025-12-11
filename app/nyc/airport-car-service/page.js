import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import HeroSection from "@/app/components/airports/heroSection";
import SideSection from "@/app/components/airports/SideSection";
import IconSection from "@/app/components/airports/IconSection";
import FaqImageSection from "@/app/components/airports/FaqImageSection";
import TravelSection from "@/app/components/airports/TravelSection";
import JfkAirport from "@/app/components/airports/JfkAirport";
import ContactUs from "@/app/components/airports/ContactUs";
import Banner from "@/app/components/airports/Review";
import Faq from "@/app/components/airports/Faq2";
import { notFound } from "next/navigation";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const BASE_URL = `${STRAPI_URL}/api/airport-pages`;

// ─────────────────────────────────────────────────────
// Common fetch function (SSR)
// ─────────────────────────────────────────────────────
async function getAirportPage() {
  const url = new URL(BASE_URL);

  // (OPTIONAL) Agar tum Strapi mein slug rakh rahi ho:
  // url.searchParams.set("filters[slug][$eq]", "nyc-airport-car-service");

  url.searchParams.set("populate[Hero_Section][populate]", "*");
  url.searchParams.set(
    "populate[IconsSection][populate][ServiceCard][populate]",
    "image"
  );
  url.searchParams.set(
    "populate[airportsection][populate][frontimage]",
    "true"
  );
  url.searchParams.set("populate[airportsection][populate][Faq_Data]", "true");
  url.searchParams.set("populate[SideSection][populate]", "*");
  url.searchParams.set("populate[TravelSection][populate][frontimage]", "true");
  url.searchParams.set("populate[TravelSection][populate][Faq_Data]", "true");
  url.searchParams.set(
    "populate[JfkAirports][populate][ServiceCard][populate]",
    "image"
  );
  url.searchParams.set("populate[contactUs][populate][Faq_Data]", "true");
  url.searchParams.set("populate[Faq][populate][Faq_Data]", "true");

  const res = await fetch(url.toString(), {
    // dev ke liye yeh better hai; production mein revalidate de sakti ho
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Strapi error status:", res.status);
    throw new Error("Failed to fetch airport page");
  }

  const json = await res.json();

  const firstEntry = Array.isArray(json.data) ? json.data[0] : json.data;

  if (!firstEntry) {
    // Strapi mein koi record hi nahi mila
    notFound();
  }

  return firstEntry;
}

// ─────────────────────────────────────────────────────
// Metadata (SEO)
// ─────────────────────────────────────────────────────
export async function generateMetadata() {
  const firstEntry = await getAirportPage();
  const attrs = firstEntry.attributes ?? firstEntry;

  return {
    title: attrs.Meta_Title || "NYC Airport Car Service",
    description: attrs.Meta_Description || "",
    alternates: {
      canonical:
        attrs.cannonicalUrl || "https://example.com/nyc/airport-car-service", // apna real domain lagana
    },
  };
}

// ─────────────────────────────────────────────────────
// Page component (Server Component)
// ─────────────────────────────────────────────────────
export default async function Page() {
  const firstEntry = await getAirportPage();
  const attrs = firstEntry.attributes ?? firstEntry;

  const heroData = attrs.Hero_Section ?? null;
  const sideSec = attrs.SideSection ?? null;
  const iconsSec = attrs.IconsSection ?? null;
  const airportSec = attrs.airportsection ?? null;
  const travelSec = attrs.TravelSection ?? null;
  const jfkAirp = attrs.JfkAirports ?? null;
  const contact = attrs.contactUs ?? null;
  const faqData = attrs.Faq ?? null;

  // Debug (sirf dev ke liye)
  // console.log("AIRPORT PAGE ATTRS ===>", attrs);

  return (
    <main className="bg-[#f5f5f5]">
      <Navbar />
      <HeroSection hero={heroData} />
      <Banner />
      <SideSection side={sideSec} />
      <IconSection section={iconsSec} />
      <TravelSection section={travelSec} />
      <FaqImageSection section={airportSec} />
      <JfkAirport section={jfkAirp} />
      <ContactUs section={contact} />
      <Faq faqSection={faqData} />
      <Footer />
    </main>
  );
}
