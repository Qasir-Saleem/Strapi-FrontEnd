'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
const DialogPanel = dynamic(() => import('@headlessui/react').then((mod) => mod.DialogPanel), {
  ssr: false,
});
// eslint-disable-next-lie import/order
import dynamic from 'next/dynamic';
const Dialog = dynamic(() => import('@headlessui/react').then((mod) => mod.Dialog), { ssr: false });

// const XMarkIcon = dynamic(() => import('@heroicons/react/24/outline').then((mod) => mod.XMarkIcon), { ssr: false });

// // Import icons for phone and email
// const ChevronRightIcon = dynamic(() => import('@heroicons/react/24/outline').then((mod) => mod.ChevronRightIcon), {
//   ssr: false,
// });
// const Popover = dynamic(() => import('@material-tailwind/react').then((mod) => mod.Popover), {
//   ssr: false,
// });
// const PopoverHandler = dynamic(() => import('@material-tailwind/react').then((mod) => mod.PopoverHandler), {
//   ssr: false,
// });
// const PopoverContent = dynamic(() => import('@material-tailwind/react').then((mod) => mod.PopoverContent), {
//   ssr: false,
// });

// const MegaMenu = dynamic(() => import('../components/MegaMenu'));
// import CustomerLogIn from './customerLogIn';
// import AirportTransfer from '../../../public/homePage/megamenu-Icons/airportTransfer1.svg';
// import AirportService from '../../../public/homePage/megamenu-Icons/airportservice1.svg';
// import ChauffeurServices from '../../../public/homePage/megamenu-Icons/chauffeurservice1.svg';
// import SpecialEvents from '../../../public/homePage/megamenu-Icons/specialevent1.svg';
// import HourlyHire from '../../../public/homePage/megamenu-Icons/hourlyhire1.svg';
// import PointoPoint from '../../../public/homePage/megamenu-Icons/pointopoint1.svg';
// import CityTours from '../../../public/homePage/megamenu-Icons/citytour1.svg';
// import Citytocity from '../../../public/homePage/megamenu-Icons/citytocity1.svg';
// import LimoService from '../../../public/homePage/megamenu-Icons/limoservice1.svg';
// import CorporateEvent from '../../../public/homePage/megamenu-Icons/corporateevent1.svg';
// import PartnerShip from '../../../public/homePage/megamenu-Icons/partnership1.svg';
// import ChauffeurPartner from '../../../public/homePage/megamenu-Icons/citytocity1.svg';
// import Meeting from '../../../public/homePage/megamenu-Icons/meeting1.svg';
import PrestigeRideLogo from '../../public/Logo.svg';
import Arrow from '../../public/servicearrow.svg';

// import { useStoreActions } from '@/utils/utils';
// import { useUser } from '@/store/storeContext';
// import config from '@/api/config';

// mobile view service
// const consumerServices = [
//   {
//     name: 'Airport Transfer',
//     link: '/services/airport-transfer',
//     icon: AirportTransfer,
//   },
//   {
//     name: 'Chauffeur Services',
//     link: '/services/chauffeur-service',
//     icon: ChauffeurServices,
//   },
//   {
//     name: 'Special Events',
//     link: '/services/special-events',
//     icon: SpecialEvents,
//   },
//   {
//     name: 'Airport Car Service',
//     link: '/services/airport-car-service',
//     icon: AirportService,
//   },
//   {
//     name: 'Hourly Hire',
//     link: '/services/hourly-hire',
//     icon: HourlyHire,
//   },

//   {
//     name: 'Point to Point Car Service',
//     link: '/services/point-to-point',
//     icon: PointoPoint,
//   },
//   {
//     name: 'City to City',
//     link: '/services/city-to-city',
//     icon: Citytocity,
//   },
//   {
//     name: 'City Tours',
//     link: '/services/city-tour',
//     icon: CityTours,
//   },
//   {
//     name: 'Limo Service',
//     link: '/services/limo-service',
//     icon: LimoService,
//   },
// ];

// const businessServices = [
//   {
//     name: 'Corporate Airport Transfer',
//     link: '/corporate/airport-transfer',
//     icon: AirportTransfer,
//   },
//   {
//     name: 'Client & Partner Travel',
//     link: '/corporate/client-partner',
//     icon: ChauffeurServices,
//   },
//   {
//     name: 'Corporate Event Transportation',
//     link: '/corporate/events',
//     icon: CorporateEvent,
//   },
//   {
//     name: 'Meetings & Offsite Events',
//     link: '/corporate/meeting-and-offsite-events',
//     icon: Meeting,
//   },
//   {
//     name: 'Strategic Partnership Program',
//     link: '/corporate/partnerships',
//     icon: PartnerShip,
//   },
//   {
//     name: 'Chauffeur Partner',
//     link: '/partner-with-prestige',
//     icon: ChauffeurPartner,
//   },
// ];

const topCities = [
  {
    name: 'New York',
    link: '/nyc/car-service',
  },
  {
    name: 'Miami',
    link: '/miami/car-service',
  },
  {
    name: 'Chicago',
    link: '/chicago/car-service',
  },
  {
    name: 'Orlando',
    link: '/orlando/car-service',
  },
  {
    name: 'Dallas',
    link: '/dallas/car-service',
  },
  {
    name: 'Washington DC',
    link: '/washington/car-service',
  },
  {
    name: 'Jersey City',
    link: '/jersey/car-service',
  },
  {
    name: 'View All',
    link: '/cities',
  },
];
const airports = [
  { name: 'JFK', link: '/nyc/car-service/jfk' },
  { name: 'DFW', link: '/dallas/car-service/dfw' },
  { name: 'IAH', link: '/houston/car-service/iah' },
  { name: 'MIA', link: '/miami/car-service/mia' },
  { name: 'EWR', link: '/nyc/car-service/ewr' },
  { name: 'DCA', link: '/washington/car-service/dca' },
  { name: 'BWI', link: '/baltimore/car-service/bwi' },
  { name: 'View All', link: '/airports' },
];

export default function Example() {
//   const { user } = useUser();
//   const { logOut } =  useStoreActions();
  const [openLogIn, setOpenLogIn] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState('bg-transparent');
  const [navbarShape, setNavbarShape] = useState('');
  const [navbarWidth, setNavbarWidth] = useState('mx-auto max-w-7xl');
  const [scrolled, setScrolled] = useState(false);
  const [setShowMegaMenu] = useState(false);
  const [showServiceMessage, setShowServiceMessage] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected navigation item

  // mega menu rendering
  const handleClick = (item) => {
    if (item.name === '/account/login') {
      setShowMegaMenu((prevState) => !prevState);
    } else if (item.name === 'SERVICE') {
      setShowServiceMessage((prevState) => !prevState); // Toggle "Hello Expanded"
    }
  };
  const service = [{ name: 'SERVICE', href: '#' }];

  const navigation = [
    { name: 'ABOUT', href: '/about-us', svg: '' },
    {
      name: 'CONTACT',
      href: '/contact-us',
      icons: [
        {
          name: 'name',
          type: 'email',
          href: 'mailto:contact@prestigeride.com',
          svg: '/email.svg',
        },
        {
          name: 'name',
          type: 'phone',
          href: 'tel:+1 (888) 346-9886',
          svg: '/phone.svg',
        },
      ],
    },
    ...(scrolled
      ? [
          {
            name: 'contact@prestigeride.com',
            href: 'mailto:contact@prestigeride.com',
            svg: '/email.svg',
          },
        ]
      : []),
    ...(scrolled
      ? [
          {
            name: '(888)346-9886',
            href: 'tel:+1(888) 346-9886',
            svg: '/phone.svg',
          },
        ]
      : []),
  ];

  // Rendering navigation items

  const navigation2 = [
    { name: 'SERVICES', href: '#', showArrow: true },
    { name: 'ABOUT', href: '/about-us', showArrow: false },
    { name: 'CONTACT US', href: '/contact-us', showArrow: false },
    { name: 'TOP CITIES', href: '', showArrow: true },
    { name: 'AIRPORTS', href: '', showArrow: true },
  ];

  // mobile view service function
  const handleNavigationClick = (item) => {
    if (item.name === 'SERVICES' || item.name === 'TOP CITIES' || item.name === 'AIRPORTS') {
      setSelectedItem(item.name); // Set selected item to control what is shown
    } else {
      setSelectedItem(null); // Reset if other navigation items are clicked
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on desktop (screen width >= 1024px)
      if (window.scrollY > 50) {
        setNavbarBackground('bg-black');
        setNavbarShape('rounded-full');
        setNavbarWidth('mt-3 max-w-7xl pr-5 pl-6');
        setScrolled(true);
        setShowServiceMessage(false); // Hide service message on scroll
      } else {
        setNavbarBackground('bg-transparent');
        setNavbarShape('');
        setNavbarWidth('mx-auto max-w-7xl');
        setScrolled(false);
      }
    };
    if (window.innerWidth >= 1024) {
      window.addEventListener('scroll', handleScroll);
    } else {
      // Always keep background black and padding consistent on mobile and tablet
      setNavbarBackground('bg-black');
      setNavbarShape('');
      setNavbarWidth('px-6 lg:px-7');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed mx-auto max-w-[1170px] inset-x-0 top-0 z-50 ${scrolled ? 'bg-white/30 backdrop-blur-sm rounded-b-[35px]' : 'bg-transparent'}`}
    >
      <header
        className={`mx-auto overflow-x-hidden inset-x-0 py-3 transition-all duration-300 ${navbarBackground} ${navbarShape} ${navbarWidth}`}
      >
        {/* {openLogIn && <CustomerLogIn openLogIn={openLogIn} setOpenLogIn={setOpenLogIn} />} */}
        <nav aria-label="Global" className="flex items-center justify-between">
          <Link href="/" className="w-2/3 md:w-auto">
            <span className="sr-only">Prestige Ride</span>
            <Image src={PrestigeRideLogo} alt="Prestige Ride Logo" />
          </Link>

          {/* When scrolled, show only logo, email, phone icons */}
          <div className="flex lg:hidden">
            <button
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                aria-hidden="true"
                className="size-6"
                fill="none"
                height="20"
                viewBox="0 0 32 20"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 20H16V16.6667H32V20ZM32 11.6667H0V8.33333H32V11.6667ZM32 3.33333H0V0H32V3.33333Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-3">
            <div className="hidden justify-between rounded-full bg-[#FFFFFF1A] px-7 lg:flex lg:gap-x-8">
              {service
                .filter((item) => !(item.name === 'SERVICE' && scrolled))
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center py-2 text-lg font-normal text-[#FFFFFF] hover:text-yellow"
                  >
                    <Link
                      className="flex  items-center"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {item.name}
                        <Image
                          src={Arrow}
                          alt="arrow icon"
                          className="size-4"
                          style={{
                            transform: showServiceMessage ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              {/* about or contact page with scroll email or number */}
              {navigation
                .filter((item) => !((item.name === 'ABOUT' && scrolled) || (item.name === 'CONTACT' && scrolled)))
                .map((item) => (
                  <div key={item.name} className="flex items-center py-2 text-lg font-normal text-[#FFFFFF]">
                    <Link className="flex  items-center gap-3 hover:text-yellow" href={item.href}>
                      {item.svg && <Image alt={item.name} height={18} loading="lazy" src={item.svg} width={18} />}
                      {item.name}
                    </Link>
                    {/* Display icons only for "CONTACT" */}
                    {item.icons?.map((icon, index) => (
                      <div key={index}>
                        <Link href={icon.href}>
                          <button key={index} className="ml-7">
                            <Image alt={icon.name} height={18} loading="lazy" src={icon.svg} width={18} />
                          </button>
                        </Link>
                      </div>
                    ))}
                    {/* Box to display selected contact detail */}
                    {/* {selectedContact && (
                    <div className="absolute mt-3 p-4 border border-gray-300 rounded bg-white text-black">
                      <p>{selectedContact}</p>
                    </div>
                  )} */}
                  </div>
                  
                ))}
            </div>
            <button className="flex items-center font-inter justify-center rounded-full bg-[#d5af34] px-6 py-2 text-lg font-normal">
                  BOOK NOW
                </button>
          </div>
        </nav>

        <Dialog className="lg:hidden" onClose={setMobileMenuOpen} open={mobileMenuOpen}>
          <div className="fixed inset-0 z-10" />

          <DialogPanel className="fixed inset-y-0 text-white right-0 z-50 w-[80%]  overflow-y-auto bg-black  shadow-[0_20px_45px_rgba(0,0,0,0.1)] shadow-yellow  sm:max-w-sm">
            <div className="flex items-center p-5  justify-end">
              <button
                className="-mt-3 rounded-md text-white"
                onClick={() => {
                  setMobileMenuOpen(false); // Close the menu
                  setSelectedItem(null); // Reset selected item
                }}
                type="button"
              >
                <span className="sr-only">Close menu</span>
                {/* <XMarkIcon aria-hidden="true" className="size-9 font-bold" /> */}
              </button>
            </div>

            <div className="mt-12 flow-root">
              <div className="-my-6 ">
                {/* {!selectedItem &&
                  (user?.account !== null ? (
                    <div className="px-7">
                      <div className="text-white">
                        <p className="text-xl font-bold">WELCOME BACK!</p>
                        <p className="text-lg">
                          {user?.account?.accountInformation?.firstName || ''}{' '}
                          {user?.account?.accountInformation?.lastName || ''}
                        </p>
                      </div>
                      <Link href={`${config.accountDomain}/account/account-information`}>
                        <button className="w-full rounded-lg bg-yellow px-4 py-2 text-md font-bold mt-4">
                          VIEW ACCOUNT
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex px-7 flex-col gap-5">
                      <button
                        onClick={() => setOpenLogIn(true)}
                        className="bg-[#D5AF34] rounded-lg p-3 text-black font-bold"
                      >
                        LOGIN
                      </button>
                      <Link href={`${config.accountDomain}/account/signup`}>
                        <button className="bg-white text-black rounded-lg p-3 font-bold uppercase w-full">
                          CREATE AN ACCOUNT
                        </button>
                      </Link>
                    </div>
                  ))} */}

                {/* <div className="space-y-7">
                  {selectedItem === null ? (
                    navigation2.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-4 px-7 mt-8 justify-between text-lg font-normal text-white"
                        onClick={() => handleNavigationClick(item)}
                      >
                        {item.name}
                        {item.showArrow && <ChevronRightIcon className="ml-2 size-6 text-white" />}
                      </Link>
                    ))
                  ) : (
                    <div>
                      {/* Back Button */}
                      <button
                        className="mb-4 gap-3 px-8 flex items-center text-lg font-normal text-white"
                        onClick={() => setSelectedItem(null)} // Reset to show navigation2
                      >
                        <svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0.332715 9.8092L8.28734 17.6842C8.50166 17.8891 8.78871 18.0025 9.08667 18C9.38462 17.9974 9.66964 17.8791 9.88033 17.6705C10.091 17.4619 10.2105 17.1797 10.2131 16.8848C10.2157 16.5898 10.1012 16.3056 9.89417 16.0934L3.87934 10.1388L18.8636 10.1388C19.165 10.1388 19.4541 10.0203 19.6672 9.80932C19.8803 9.59834 20 9.31219 20 9.01382C20 8.71546 19.8803 8.42931 19.6672 8.21833C19.4541 8.00735 19.165 7.88883 18.8636 7.88883L3.87934 7.88882L9.89417 1.9342C10.0027 1.83042 10.0893 1.70628 10.1488 1.56903C10.2084 1.43178 10.2397 1.28415 10.2411 1.13478C10.2424 0.9854 10.2136 0.837258 10.1565 0.699C10.0993 0.560742 10.015 0.435132 9.90826 0.329503C9.80156 0.223874 9.67468 0.14034 9.53503 0.0837737C9.39537 0.0272074 9.24573 -0.00125598 9.09485 4.29157e-05C8.94396 0.00134181 8.79484 0.0323763 8.6562 0.0913362C8.51756 0.150296 8.39217 0.235999 8.28734 0.343448L0.332715 8.21845C0.119677 8.42942 8.11675e-07 8.71551 7.85596e-07 9.01382C7.59517e-07 9.31213 0.119677 9.59823 0.332715 9.8092Z"
                            fill="white"
                          />
                        </svg>
                        Back
                      </button>

                   
            
              </div>
            </div>
          </DialogPanel>
        </Dialog>

        {/* SERVICE message displayed outside navigation */}
        {showServiceMessage && (
          <div className="mt-6 text-white hidden lg:block">
            {/* <MegaMenu /> */}
          </div>
        )}
      </header>
    </div>
  );
}
