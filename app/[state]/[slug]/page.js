"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Head from "next/head";

import HeroSection from "./heroSection";
import ServicesIntro from "./ServicesIntro";
import ContactPage from "@/app/components/Contact";
import SideSection from "./SideSection";
import Footer from "@/app/components/Footer";
import Faq1 from "@/app/components/Faq";
import Navbar from "@/app/components/Navbar";

import CityHeroSection from "../../components/city/heroSection";
import ServicesIntroCity from "@/app/components/city/ServicesIntro";
import SideSectionCity from "@/app/components/city/SideSection";
import FleetSectionCity1 from "../../components/city/FleetSectionCity";
import FaqImageSection1 from "@/app/components/city/FaqImageSection";
import RouteAccordion2 from "@/app/components/city/RouteAccordion";
import Faq2 from "../../components/city/Faq2";
import Banner from "../../components/airports/Review";

// ✅ Env se lo, warna localhost use karlo
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ---------- API HELPERS ----------

const fetchServicePage = async (state, slug) => {
  const res = await axios.get(`${STRAPI_URL}/api/services`, {
    params: {
      "filters[States][$eq]": state,
      "filters[slug][$eq]": slug,
      "populate[HeroSections][populate]": "image",
      "populate[ServiceCard][populate][ServiceCard][populate]": "image",
      "populate[SeoTags]": "*",
      "populate[Faq][populate][Faq_Data]": "*",
    },
  });

  return res.data?.data?.[0] || null;
};

const fetchCityPage = async (state, slug) => {
  const res = await axios.get(`${STRAPI_URL}/api/city-pages`, {
    params: {
      "filters[city][$eq]": state,
      "filters[slug][$eq]": slug,
      "filters[Slug_Active][$eq]": true,
      "populate[Hero_Section][populate]": "bgImage",
      "populate[ServiceCard][populate][ServiceCard][populate]": "image",
      "populate[SideSection][populate]": "image",
      "populate[Faq][populate][Faq_Data]": "*",
      "populate[Fleetsection][populate][Fleet][populate]": "*",
      "populate[Faqimage][populate][Faq_Data]": "*",
      "populate[Seo]": "*", // city seo block
      "populate[MainRoute][populate][route]": "*",
    },
  });

  return res.data?.data?.[0] || null;
};

// ---------- SEO HELPERS ----------

const toTitle = (value) => {
  if (!value) return "";
  return value
    .toString()
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

// services ke liye
const getServiceSeoData = (data, state, slug) => {
  const tag = Array.isArray(data.SeoTags) ? data.SeoTags[0] : data.SeoTags;

  const fallbackTitle = `${toTitle(slug)} - ${toTitle(state)}`;

  const title =
    tag?.title ||
    tag?.metaTitle ||
    data.Meta_Title ||
    data.title ||
    fallbackTitle ||
    "Detail Page";

  const description =
    tag?.Description ||
    tag?.metaDescription ||
    data.Description ||
    data.description ||
    "";

  const canonical =
    tag?.cannonicalUrl ||
    tag?.canonicalUrl ||
    data.cannonical_Url ||
    data.canonicalUrl ||
    "";

  return { title, description, canonical };
};

// city-pages ke liye
const getCitySeoData = (data, state, slug) => {
  let seo = data.Seo;
  if (Array.isArray(seo)) seo = seo[0]; // agar array ho

  const fallbackTitle = `${toTitle(slug)} in ${toTitle(state)}`;

  const title =
    seo?.metaTitle ||
    seo?.title ||
    data.Meta_Title ||
    data.title ||
    fallbackTitle ||
    "Detail Page";

  const description =
    seo?.metaDescription ||
    seo?.Description ||
    seo?.description ||
    data.Description ||
    data.description ||
    "";

  const canonical =
    seo?.canonicalUrl ||
    seo?.cannonicalUrl ||
    data.cannonical_Url ||
    data.canonicalUrl ||
    "";

  return { title, description, canonical };
};

// ---------- MAIN COMPONENT ----------

export default function ServiceDetailPage() {
  const { state, slug } = useParams();

  const [pageData, setPageData] = useState(null);
  const [isCityPage, setIsCityPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state || !slug) return;

    const loadPage = async () => {
      try {
        setLoading(true);

        // 1) Service try karo
        const serviceItem = await fetchServicePage(String(state), String(slug));

        if (serviceItem) {
          setPageData(serviceItem);
          setIsCityPage(false);
          return;
        }

        // 2) City try karo
        const cityItem = await fetchCityPage(String(state), String(slug));

        if (cityItem) {
          setPageData(cityItem);
          setIsCityPage(true);
          return;
        }

        setPageData(null);
      } catch (error) {
        console.error("Error loading page:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [state, slug]);

  if (loading) return <p>Loading...</p>;
  if (!pageData) return <p>404 – Page not found</p>;

  const data = pageData.attributes || pageData;

  // 🔥 yahan se decide kar rahe hain kaunsa SEO helper use ho
  const { title, description, canonical } = isCityPage
    ? getCitySeoData(data, state, slug)
    : getServiceSeoData(data, state, slug);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
      </Head>

      <div>
        {isCityPage ? (
          <>
            <Navbar />
            <CityHeroSection hero={data.Hero_Section} />
            <Banner />
            <ServicesIntroCity section={data.ServiceCard} />
            <SideSectionCity side={data.SideSection} />
            <FleetSectionCity1 section={data.Fleetsection} />
            <FaqImageSection1 section={data.Faqimage} />
            <RouteAccordion2 section={data.MainRoute} />
            <Faq2 faqSection={data.Faq} />
            <Footer />
          </>
        ) : (
          <>
            <HeroSection hero={data.HeroSections} />
            <Banner />
            <SideSection />
            <ServicesIntro section={data.ServiceCard} />
            <ContactPage />
            <Faq1 faqSection={data.Faq} />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
