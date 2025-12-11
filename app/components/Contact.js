"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function Contact() {
  const { state, slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  // ------ Fetch contactUs content from Strapi ------
  useEffect(() => {
    if (!state || !slug) return;

    axios
      .get("http://localhost:1337/api/services", {
        params: {
          "filters[States][$eq]": state,
          "filters[slug][$eq]": slug,
          "populate[contactUs]": "*",
        },
      })
      .then((res) => {
        const item = res.data?.data?.[0] || null;

        console.log("SERVICE RESPONSE:", item);
        console.log("CONTACT US:", item?.contactUs);

        setService(item);
      })
      .catch((err) =>
        console.error("SERVICE API ERROR:", err.response?.data || err.message)
      )
      .finally(() => setLoading(false));
  }, [state, slug]);

  const contactUs = service?.contactUs || null;
  const { title, description } = contactUs || {};

  // ------ Form handlers ------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.firstName || !form.email || !form.message) {
      setStatus({
        type: "error",
        msg: "First name, email aur message required hain.",
      });
      return;
    }

    try {
      setSubmitting(true);

      await axios.post("http://localhost:1337/api/contact-forms", {
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          message: form.message,
          // optional: state & slug bhi save kar sakte ho
          serviceState: state,
          serviceSlug: slug,
        },
      });

      setStatus({
        type: "success",
        msg: "Message send ho gaya, thank you!",
      });

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Kuch issue aa gaya, thora der baad try karo.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!contactUs) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md border px-6 py-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* First Name */}
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="firstName"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 234 567 890"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              />
            </div>

            {/* Status */}
            {status && (
              <p
                className={`text-sm ${
                  status.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status.msg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-white font-medium disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
