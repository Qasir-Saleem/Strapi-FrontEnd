// frontend-strapi/app/data/gethomePage.j
import qs from "qs";
import { fetchAPI } from "@/utils/fatch-api";
import getstrapiurl from "@/utils/getstrapiurl"; // ✅ yeh ab sahi hai
const homequery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
          },
        },

        "blocks.info-block": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
      },
    },
  },
});

export async function gethomePage() {
  const path = "/api/home-page";
  const BASE_URL = getstrapiurl();
  const url = new URL(path, BASE_URL);
  url.search = homequery;

  return await fetchAPI(url.href, { method: "GET" });
}
