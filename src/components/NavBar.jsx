import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const locales = [
  "en-GB", "ar-SA", "zh-CN", "de-DE", "es-ES", "fr-FR", "hi-IN", "it-IT",
  "in-ID", "ja-JP", "ko-KR", "nl-NL", "no-NO", "pl-PL", "pt-BR", "sv-SE",
  "fi-FI", "th-TH", "tr-TR", "uk-UA", "vi-VN", "ru-RU", "he-IL",
];

const getFlagSrc = (countryCode) =>
  /^[A-Z]{2}$/.test(countryCode)
    ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : "";

const NavBar = ({ searchTerm, setSearchTerm, cart }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const browserLang = new Intl.Locale(navigator.language).language;
    const match = locales.find(
      (locale) => new Intl.Locale(locale).language === browserLang
    );
    if (match) setSelectedLocale(match);
  }, []);

  const intlLocale = new Intl.Locale(selectedLocale);
  const langName = new Intl.DisplayNames([selectedLocale], { type: "language" }).of(intlLocale.language);
  const otherLocales = locales.filter((loc) => loc !== selectedLocale);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert("You are logged out!");
    } else {
      navigate("/login");
    }
  };

    const [toggle, setToggle] = useState(false);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);
    const [scrolled, setScrolled] = useState(false); // For background styling
    const [isVisible, setIsVisible] = useState(true); // For show/hide
    const [prevScrollPos, setPrevScrollPos] = useState(0); // Tracks scroll direction

    // Handle clicks outside to close the menu
    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            (!menuButtonRef.current || !menuButtonRef.current.contains(event.target))
        ) {
            setToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Smooth scroll to section
    const handleScroll = (e, sectionId) => {
        e.preventDefault();
        setIsClicked(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: "smooth",
            });
            setToggle(false);
        }
    };

    // Scroll logic for show/hide and background change
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Update scrolled state for background styling
            if (currentScrollPos > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Show/hide navbar based on scroll direction
            if (currentScrollPos < 50) {
                setIsVisible(true); // Show near the top
            } else if (currentScrollPos > prevScrollPos) {
                setIsVisible(false); // Hide when scrolling down
            } else {
                setIsVisible(true); // Show when scrolling up
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const handleScrollToTop   = (e, targetId) => {
        e.preventDefault();
        if (targetId === "") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

  return (
    <nav className={` header ${scrolled ? "scrolled" : " "} z-[150] w-full header backgronsdvg   ${
            isVisible ? "translate-y-0 transition-transform duration-300 " : "-translate-y-full transition-transform duration-300 "}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between container mx-auto py-5  sm:px-0 px-[24px] taoalnumbering">
        <div className="flex items-center gap-4">
          <div className="dropdown" tabIndex="0">
            <button id="dropdown-btn" className="flex items-center gap-2">
              <img src={getFlagSrc(intlLocale.region)} alt={langName} className="w-5 h-5"/>
              {langName}
            </button>
            <ul className="dropdown-content absolute bg-white shadow-md mt-1 rounded hidden">
              {otherLocales.map((locale) => {
                const otherIntl = new Intl.Locale(locale);
                const otherLangName = new Intl.DisplayNames([locale], { type: "language" }).of(otherIntl.language);
                return (
                  <li key={locale} className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => setSelectedLocale(locale)}>
                    <img src={getFlagSrc(otherIntl.region)} alt={otherLangName} className="inline w-4 h-4 mr-1"/>
                    {otherLangName}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <span>|</span> */}
          <p className="text-gray-700 lg:block hidden">Mail: webzedcontact@gmail.com</p>
          {/* <span>|</span> */}
          <p className="text-gray-700 sm:block hidden">Helpline: 4534345656</p>
        </div>

        <div className="flex items-center gap-6">
          {/* <div className="cursor-pointer" >
            {isLoggedIn ? "Logout" : "Log in"}
          </div> */}
          <button
              onClick={handleLoginLogout}
              class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
            >
              {isLoggedIn ? "Logout" : "Log in"}
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
              ></span>
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
              ></span>
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
              ></span>
              <span
                class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                >{isLoggedIn ? "Logout" : "Log in"}</span
              >
            </button>
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FiShoppingCart className="text-2xl"/>
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className=" border-t-[1px] flex justify-between items-center py-[20px] sm:py-[25px] lg:py-[30px] relative  md:overflow-hidden backgroundimage px-[24px] sm:px-[30px] lg:px-[40px] shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="Logo"
              className="w-auto h-8 sm:h-10"
            />
          </div>

          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-lg border-gray-300 pl-5 pr-10 py-3 rounded-xl w-56 sm:w-64 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-500"/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
