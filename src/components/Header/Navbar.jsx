import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import nav01 from "../../assets/Logo/nav01.webp";
import MenuDropdown from "./MenuDropdown";
import CartDropdown from "./CartDropdown";

function Navbar() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target)) setIsCartOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="Navbar fixed z-1000 bg-white/80 border border-gray-300 rounded-2xl flex justify-between left-0 right-0 mx-auto w-[calc(100%-1rem)] max-w-[calc(100%-1.5rem)] mt-4 p-4 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
      <div className="NavbarLogo flex items-center">
        <Link to="/">
          <img src={nav01} className="h-8" alt={t("header.logo_alt")} />
        </Link>
      </div>

      <div className="NavbarMenu flex gap-6">
        <MenuDropdown
          ref={menuRef}
          isOpen={isMenuOpen}
          toggle={() => setIsMenuOpen(!isMenuOpen)}
        />
        <CartDropdown
          ref={cartRef}
          isOpen={isCartOpen}
          toggle={() => setIsCartOpen(!isCartOpen)}
          navigate={navigate}
        />
      </div>
    </nav>
  );
}

export default Navbar;
