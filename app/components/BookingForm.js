import React from "react";
import Image from "next/image";
import TrustPilot from '../../public/trustPilotBookingForm.svg'
function BookingForm() {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="w-full max-w-md rounded-[15px] bg-white shadow-2xl border border-gray-200">
        {/* Tabs */}
        <div className="mb-5 flex rounded-t-2xl overflow-hidden border-b border-gray-200">
          <button className="flex-1 bg-white px-6 text-center tracking-wide  py-3 text-base font-bold ">
            POINT-TO-POINT
          </button>
          <button className="flex-1 bg-gray-100 px-4 py-3 text-center text-base text-sm font-bold tracking-wide text-gray-400">
            HOURLY
          </button>
        </div>

        {/* Form */}
        <form className="space-y-3 p-5">
          {/* Pickup */}
          <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2.5">
            <span className="mr-2 text-lg">📍</span>
            <input
              type="text"
              placeholder="Pickup Location"
              className="flex-1 text-sm placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              type="button"
              className="ml-2 rounded-full border border-gray-300 bg-[#F7EED6] px-4 py-1 text-xs font-semibold tracking-wide text-gray-900"
            >
              Add Stop
            </button>
          </div>

          {/* Dropoff */}
          <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2.5">
            <span className="mr-2 text-lg">📍</span>
            <input
              type="text"
              placeholder="Drop-off Location"
              className="flex-1 text-sm placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2.5">
              <span className="mr-2 text-lg">📅</span>
              <input
                type="date"
                className="w-full text-sm outline-none bg-transparent [color-scheme:light]"
              />
            </div>

            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2.5">
              <span className="mr-2 text-lg">🕒</span>
              <input
                type="time"
                className="w-full text-sm outline-none bg-transparent [color-scheme:light]"
              />
            </div>
          </div>

          {/* Info text */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs">⏱️</span>
            <p className="text-[11px] text-gray-600">
              Chauffeur will wait 25 minutes as a complimentary service
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-1 w-full rounded-xl bg-[#D6AE3F] py-3 text-sm font-extrabold tracking-[0.18em] text-black uppercase hover:brightness-95 transition"
          >
            Search
          </button>
        </form>
        
      </div>
      <div className="border-red-400 -mt-1.5 flex justify-center">
            <Image
              alt="Trust Pilot - City Tour Reviews and Ratings"
              src={TrustPilot}
              priority={true} // Ensure it's optimized for above-the-fold rendering
              quality={100} // Use maximum quality for SVG
              layout="intrinsic" // Adjust to use intrinsic size for better layout
            />
          </div>
    </div>
  );
}

export default BookingForm;
