import React, { useState } from "react";

// simple SVG icons (no extra package)
const ClockIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
    <path d="M12 7v5l3 2" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const RouteIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M5 6h6a4 4 0 0 1 4 4v.5a3.5 3.5 0 0 0 3.5 3.5H19"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M7 4L5 6l2 2"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18h-6a4 4 0 0 1-4-4v-.5A3.5 3.5 0 0 0 3.5 10H5"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19 16l2 2-2 2"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 transition-transform ${
      open ? "rotate-180" : "rotate-0"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M6 9l6 6 6-6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function RouteAccordion({ section }) {
  if (!section) return null;

  const routes = section.route || [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openIndex, setOpenIndex] = useState(0); // first open

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      {/* Heading */}
      {section.title && (
        <h2 className="text-3xl font-bold text-center mb-3">
          {section.title}
        </h2>
      )}

      {section.description && (
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          {section.description}
        </p>
      )}

      {/* Routes */}
      <div className="space-y-3">
        {routes.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id ?? index}
              className={`rounded-[28px] border overflow-hidden transition-colors
              ${
                isOpen
                  ? "bg-amber-100 border-amber-300"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {/* TOP ROW */}
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4"
              >
                {/* left: route name */}
                <span className="font-semibold text-gray-900 text-base sm:text-lg">
                  {item.routename}
                </span>

                {/* right: icons + time + distance + chevron */}
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-900">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <RouteIcon className="w-4 h-4" />
                    <span>{item.distance} mi</span>
                  </div>

                  <ChevronIcon open={isOpen} />
                </div>
              </button>

              {/* CONTENT */}
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-gray-800">
                  {item.description && (
                    <p className="mt-1">
                      <span className="font-semibold">
                        Major Attractions:{" "}
                      </span>
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
