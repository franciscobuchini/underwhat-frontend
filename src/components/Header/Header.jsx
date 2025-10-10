import { useEffect } from "react";
import Navbar from "./Navbar";
import HeaderText from "./HeaderText";
import ScrollingBanner from "./ScrollingBanner";

function Header() {
  // === FINISHER HEADER ===
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js";
    script.async = true;
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 10,
          size: { min: 1300, max: 1500, pulse: 0 },
          speed: { x: { min: 0.1, max: 2.6 }, y: { min: 0.1, max: 0.6 } },
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
          blending: "overlay",
          opacity: { center: 0.3, edge: 0 },
          skew: -2,
          shapes: ["c"],
        });
      }
    };
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
  // === FIN FINISHER HEADER ===

  return (
    <div>
      <div className="header finisher-header sm:h-100 h-60 w-full relative z-900">
        <Navbar />
        <HeaderText />
      </div>
      <ScrollingBanner />
    </div>

  );
}

export default Header;
