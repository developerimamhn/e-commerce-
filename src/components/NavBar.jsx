import { useEffect, useState } from "react";
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

  return (
    <nav className="bg-white shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between container mx-auto px-6 py-3">
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

          <span>|</span>
          <p className="text-gray-700">Mail: webzedcontact@gmail.com</p>
          <span>|</span>
          <p className="text-gray-700">Helpline: 4534345656</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="cursor-pointer" onClick={handleLoginLogout}>
            {isLoggedIn ? "Logout" : "Log in"}
          </div>
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
      <div className="flex items-center bg-[#253849] px-6 h-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="Logo"
              className="w-auto h-8 sm:h-10"
            />
          </div>

          <div className="relative">
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
