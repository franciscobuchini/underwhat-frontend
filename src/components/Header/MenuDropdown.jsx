import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const MenuDropdown = forwardRef(({ isOpen, toggle }, ref) => {
  const { t } = useTranslation("global");

  return (
    <div className="MenuButton flex" ref={ref}>
      <button
        onClick={toggle}
        className="rounded-full w-10 h-10 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        <Icon icon="icon-park-twotone:app-switch" className="text-pink-800 w-6 h-6" />
      </button>

      {isOpen && (
        <ul className="absolute right-20 top-12 w-48 bg-white border border-gray-300 rounded-2xl z-150 p-2">
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/team-outfit"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:basketball-clothes" className="w-6 h-6 text-pink-800" />
                {t("header.menu.team")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/faq"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:file-question" className="w-6 h-6 text-pink-800" />
                {t("header.menu.faq")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/terms-and-conditions"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:align-text-left-one" className="w-6 h-6 text-pink-800" />
                {t("header.menu.conditions")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/about"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:diving" className="w-6 h-6 text-pink-800" />
                {t("header.menu.about")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/shipping-calculator"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:ship" className="w-6 h-6 text-pink-800" />
                {t("header.menu.shipping-calculator")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
              to="/work-with-us"
            >
              <span className="flex items-center gap-2">
                <Icon icon="icon-park-twotone:concept-sharing" className="w-6 h-6 text-pink-800" />
                {t("header.menu.work-with-us")}
              </span>
            </Link>
          </li>

          <LanguageSelector />
        </ul>
      )}
    </div>
  );
});

export default MenuDropdown;
