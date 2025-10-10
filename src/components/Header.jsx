import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../components/CartContext";
import nav01 from "../assets/Logo/nav01.webp";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

function Header() {
  const { t, i18n } = useTranslation("global");
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const notyf = new Notyf({
    types: [{ type: "error", background: "#f44336", duration: 2000, dismissible: false }],
  });

  const languageIcons = {
    en: "twemoji:flag-united-kingdom",
    es: "twemoji:flag-spain",
    fr: "twemoji:flag-france",
  };

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
    notyf.error(t("product.remove_from_cart"));
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuRef = useRef(null);
  const languageRef = useRef(null);
  const cartRef = useRef(null);

  // Cierra dropdowns al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
      if (languageRef.current && !languageRef.current.contains(event.target)) setIsLanguageOpen(false);
      if (cartRef.current && !cartRef.current.contains(event.target)) setIsCartOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === FINISHER HEADER ===
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js";
    script.async = true;
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
 "count": 10,
  "size": {
    "min": 1300,
    "max": 1500,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0.1,
      "max": 0.6
    },
    "y": {
      "min": 0.1,
      "max": 0.6
    }
  },
  "colors": {
    "background": "#9138e5",
    "particles": [
      "#ff4848",
      "#000000",
      "#2235e5",
      "#000000",
      "#ff0000"
    ]
  },
  "blending": "overlay",
  "opacity": {
    "center": 0.5,
    "edge": 0.05
  },
  "skew": -2,
  "shapes": [
    "c"
  ]
});
      }
    };
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
  // === FINISHER HEADER ===

  return (
    <div className="header finisher-header sm:h-100 h-60 w-full relative z-900">
      <nav className="Navbar fixed z-1000 bg-white/80 border border-gray-300 rounded-2xl flex justify-between left-0 right-0 mx-auto w-[calc(100%-1rem)] max-w-[calc(100%-1.5rem)] mt-4 p-4 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
        <div className="NavbarLogo flex items-center">
          <Link to="/">
            <img src={nav01} className="h-8" alt={t("header.logo_alt")} />
          </Link>
        </div>

        <div className="NavbarMenu flex gap-6">
          {/* Botón de menú */}
          <div className="MenuButton flex" ref={menuRef}>
            <button
              id="dropdown-nav"
              type="button"
              className="rounded-full w-10 h-10 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label="Dropdown"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon icon="icon-park-twotone:app-switch" className="text-pink-800 w-6 h-6 flex-shrink-0" />
            </button>

            {isMenuOpen && (
              <ul className="absolute right-20 top-12 w-48 bg-white border border-gray-300 rounded-2xl z-150 p-2" role="menu">
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/team-outfit">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:basketball-clothes" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.team")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/faq">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:file-question" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.faq")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/terms-and-conditions">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:align-text-left-one" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.conditions")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/about">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:diving" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.about")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/shipping-calculator">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:ship" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.shipping-calculator")}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl" to="/work-with-us">
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:concept-sharing" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.work-with-us")}
                    </span>
                  </Link>
                </li>

                {/* Idiomas */}
                <div ref={languageRef}>
                  <button
                    className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  >
                    <span className="flex items-center gap-2">
                      <Icon icon="icon-park-twotone:text" className="w-6 h-6 text-pink-800" />
                      {t("header.menu.language")}
                    </span>
                  </button>
                  {isLanguageOpen && (
                    <ul className="py-2 pl-6">
                      {["en", "es", "fr"].map((lang) => (
                        <li key={lang}>
                          <button
                            className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-2xl"
                            onClick={() => i18n.changeLanguage(lang)}
                          >
                            <Icon icon={languageIcons[lang]} className="w-6 h-6 opacity-60" />
                            {t(`header.language_options.${lang}`)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ul>
            )}
          </div>

          {/* Carrito */}
          <div className="CartButton flex" ref={cartRef}>
            <button
              className="rounded-full w-10 h-10 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <div className="CartIndicator relative">
                <span className="absolute -top-2 -right-2 bg-red-400 w-4 h-4 rounded-full font-semibold text-white text-center text-xs flex items-center justify-center">
                  {totalQuantity}
                </span>
                <Icon icon="icon-park-twotone:shopping" className="text-pink-800 w-6 h-6" />
              </div>
            </button>
            {isCartOpen && (
              <div className="absolute right-4 top-12 bg-white border border-gray-300 rounded-2xl z-50 p-3 min-w-[250px] max-h-[80vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <h6 className="text-gray-600 text-center text-sm">{t("cart.empty")}</h6>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-2 m-2">
                      <h6 className="text-gray-600 text-sm">
                        <span className="pr-1">{t("cart.subtotal")}</span>
                        {cartItems
                          .reduce((total, item) => total + item.product_selling * item.quantity, 0)
                          .toFixed(2)}{" "}
                        USD
                      </h6>
                      {totalQuantity < 3 ? (
                        <p className="text-red-400 text-sm">{t("cart.minimum_order", { min: 3 })}</p>
                      ) : (
                        <button
                          className="rounded-lg border border-green-600 text-green-600 bg-green-100 px-3 py-1 text-sm hover:outline-green-600 cursor-pointer"
                          onClick={() => navigate("/checkout")}
                        >
                          {t("cart.checkout")}
                        </button>
                      )}
                    </div>

                    <ul className="divide-y divide-gray-300">
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 border-b p-3 last:border-b-0">
                          <img src={item.image} alt={item.product_name} className="w-16 object-cover rounded-2xl" loading="lazy" />
                          <div className="flex flex-col flex-grow pr-4">
                            <h6 className="text-gray-600 font-medium text-sm">{item.product_name}</h6>
                            <p className="text-gray-400 text-sm">{item.product_category}</p>
                            <p className="text-gray-400 text-sm">{t("cart.size")}: {item.selectedSize}</p>
                            <p className="text-gray-400 text-sm">{t("cart.pieces")}: {item.quantity}</p>
                            {item.backNumber != null && (
                              <p className="text-gray-400 text-sm">
                                {t("product.number")} {item.backNumber}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-gray-600 text-sm">
                              {(item.product_selling * item.quantity).toFixed(2)} USD
                            </span>
                            <button
                              className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                              onClick={() => handleRemoveFromCart(index)}
                            >
                              {t("cart.remove")}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Texto centrado debajo del Navbar */}
      <div className="
        absolute 
        top-1/3
        left-1/2 
        transform -translate-x-1/2 
        -translate-y-[calc(50%-4rem)] 
        w-[90%] sm:w-auto 
        text-center 
        text-white 
        drop-shadow-sm 
        select-none 
        pointer-events-none
      ">
        <h1 className="
          text-xl sm:text-2xl md:text-3xl lg:text-4xl 
          font-bold 
          tracking-tight 
          leading-snug
        ">
          {t("footer.tagline")}
        </h1>
      </div>
    </div>
  );
}

export default Header;
