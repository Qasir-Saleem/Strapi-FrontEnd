import React from 'react';
import banner from '../../../public/banner.svg';
import Image from 'next/image';
const keywords = ['Seamless', 'Punctual', 'Professional'];

const Comfort = () => {
  return (
    <>
      <section className="relative lg:w-[730px]" aria-labelledby="keywords-heading">
        <Image
          src={banner}
          alt="Yellow banner background with right-end slanted slope"
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute inset-0 flex w-full items-center px-6 lg:justify-end lg:px-0 lg:pr-16">
          <div className="flex space-x-5 text-right font-bold text-black text-md md:text-lg" id="keywords-heading">
            {keywords.map((word, index) => (
              <span key={index}>
                {word}
                {index < keywords.length - 1 && <span className="px-2">&bull;</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Comfort;
