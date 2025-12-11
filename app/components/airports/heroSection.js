'use client';
import BookingForm from '../BookingForm';

const STRAPI_URL = "http://localhost:1337";

export default function HeroSection({ hero }) {
console.log(hero,'qaa');

let bg = null;

  // case 1: Bgimage array (jaise screenshot me hai)
  if (Array.isArray(hero.Bgimage) && hero.Bgimage.length > 0) {
    bg = hero.Bgimage[0];
  }
  // case 2: agar kabhi Strapi is form me de: { Bgimage: { data: [...] } }
  else if (hero.Bgimage?.data) {
    bg = Array.isArray(hero.Bgimage.data)
      ? hero.Bgimage.data[0]?.attributes
      : hero.Bgimage.data.attributes;
  }

  const imageUrl = bg?.url ? `${STRAPI_URL}${bg.url}` : "/placeholder.jpg";
  const imgWidth = bg?.width || 1920;
  const imgHeight = bg?.height || 1000;
  return (
    <>
      
      <main className="relative lg:px-0 isolate bg-black overflow-hidden pt-8 sm:pt-14 bg-gray-900">
        <img
          // alt={alt}
          height={660}
          width={1920}
          src={imageUrl}
          priority={true}
          className="absolute inset-0 -z-10 size-full object-cover md:block hidden"
        />
        <div className="absolute bottom-0 w-full h-24 sm:h-32 md:h-36 lg:h-40 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />
        <section className="px-6">
          <div className="mx-auto max-w-[1170px] mt-10 lg:mt-0 lg:py-10">
            <div className="grid grid-cols-12 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
              {/* Image Section */}
              <article className="order-last flex items-end text-white col-span-12 lg:order-1 lg:col-span-8">
                <div className="mb-7 lg:mb-0">
      
                  <h1 className="text-2xl lg:text-[36px] font-inter pt-3 font-bold text-white text-left lg:pt-0 leading-[140%]">
                   {hero.title}
                  </h1> 
                  <p className="text-2xl mt-3 lg:text-[36px] font-basker font-semibold italic">
                  {hero.description}
                  </p>
                </div>
              </article>
              {/* Booking Form Section */}
              <aside className="order-first col-span-12 flex items-end justify-center sm:mt-2 lg:order-2 lg:col-span-4">
                <BookingForm />
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
