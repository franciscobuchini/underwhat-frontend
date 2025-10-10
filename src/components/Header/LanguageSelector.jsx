import { useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { t, i18n } = useTranslation("global");
  const [open, setOpen] = useState(false);

  const icons = {
    en: "twemoji:flag-united-kingdom",
    es: "twemoji:flag-spain",
    fr: "twemoji:flag-france",
  };

  return (
    <div className="mt-2">
      <button
        className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <Icon icon="icon-park-twotone:text" className="w-6 h-6 text-pink-800" />
        {t("header.menu.language")}
      </button>
      {open && (
        <ul className="py-2 pl-6">
          {["en", "es", "fr"].map((lang) => (
            <li key={lang}>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
                onClick={() => i18n.changeLanguage(lang)}
              >
                <Icon icon={icons[lang]} className="w-6 h-6 opacity-60" />
                {t(`header.language_options.${lang}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
