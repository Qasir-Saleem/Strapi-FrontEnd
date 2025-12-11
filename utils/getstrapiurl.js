import React from "react";

export default function getstrapiurl() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
}
