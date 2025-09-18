import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const locales = [
  "en-GB",
  "ar-SA",
  "zh-CN",
  "de-DE",
  "es-ES",
  "fr-FR",
  "hi-IN",
  "it-IT",
  "in-ID",
  "ja-JP",
  "ko-KR",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "pt-BR",
  "sv-SE",
  "fi-FI",
  "th-TH",
  "tr-TR",
  "uk-UA",
  "vi-VN",
  "ru-RU",
  "he-IL",
];

const getFlagSrc = (countryCode) =>
  /^[A-Z]{2}$/.test(countryCode)
    ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : "";

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);

  useEffect(() => {
    const browserLang = new Intl.Locale(navigator.language).language;
    const match = locales.find(
      (locale) => new Intl.Locale(locale).language === browserLang
    );
    if (match) setSelectedLocale(match);
  }, []);

  const intlLocale = new Intl.Locale(selectedLocale);
  const langName = new Intl.DisplayNames([selectedLocale], {
    type: "language",
  }).of(intlLocale.language);

  const otherLocales = locales.filter((loc) => loc !== selectedLocale);
  const navigate = useNavigate();
  return (
    <nav>
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center justify-start gap-4 py-6">
          <div className="dropdown" tabIndex="0">
            <button id="dropdown-btn">
              <img src={getFlagSrc(intlLocale.region)} alt={langName} />
              {langName}
              <span className="arrow-down"></span>
            </button>
            <ul className="dropdown-content" id="dropdown-content">
              {otherLocales.map((locale) => {
                const otherIntl = new Intl.Locale(locale);
                const otherLangName = new Intl.DisplayNames([locale], {
                  type: "language",
                }).of(otherIntl.language);

                return (
                  <li
                    key={locale}
                    onMouseDown={() => setSelectedLocale(locale)}
                  >
                    {otherLangName}
                    <img
                      src={getFlagSrc(otherIntl.region)}
                      alt={otherLangName}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          |
          <p style={{ textDecoration: "none", color: "black" }}>
            Mail to webzedcontact@gmail.com
          </p>
          |
          <p style={{ textDecoration: "none", color: "black" }}>
            Helpline 4534345656
          </p>
        </div>
        <div>Log in</div>
      </div>
      <div className="flex items-center bg-[#253849] px-6 h-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-semibold cursor-pointer">
            <img
              src="https://shop.sprwforge.com/uploads/header-logo.svg"
              alt="loading...."
              className="className='cursor-pointer relative flex  items-center justify-start Froggo-Logo w-full h-[24px] sm:h-[32px] 2xl:h-[38.7px]"
              onClick={() => navigate("/")}
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
            <FiSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
