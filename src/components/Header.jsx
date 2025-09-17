import NavBar from './NavBar';
import React, { useState, useEffect } from "react";

const locales = [
  "en-GB","ar-SA","zh-CN","de-DE","es-ES","fr-FR","hi-IN","it-IT","in-ID",
  "ja-JP","ko-KR","nl-NL","no-NO","pl-PL","pt-BR","sv-SE","fi-FI","th-TH",
  "tr-TR","uk-UA","vi-VN","ru-RU","he-IL"
];

const getFlagSrc = (countryCode) =>
  /^[A-Z]{2}$/.test(countryCode)
    ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : "";

const Header = () => {

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
  return (
    <div className=''>
      <div className='flex items-center justify-between container mx-auto'>
        <div className='flex items-center justify-start gap-4 py-6'>
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
              <img src={getFlagSrc(otherIntl.region)} alt={otherLangName} />
            </li>
          );
        })}
      </ul>
          </div>|
          <p  style={{ textDecoration: "none", color: "black" }}>
            Mail to webzedcontact@gmail.com
          </p>|
          <p  style={{ textDecoration: "none", color: "black" }}>
            Helpline 4534345656
          </p>
        </div>
        <div>
          Log in
        </div>
      </div>
      <NavBar/>
    </div>
  );
};

export default Header;