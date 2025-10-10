import { useTranslation } from "react-i18next";

export default function ScrollingBanner() {
  const { t } = useTranslation("global");
  const repetitions = 8;

  return (
    <div className="relative w-full">
      <div
        className="bg-yellow-400 border-t border-yellow-500 py-2"
        style={{ transform: "skewY(-2deg)", transformOrigin: "left center" }}
      >
        <div style={{ transform: "skewY(0deg)", transformOrigin: "left center" }}>
          <div className="flex animate-scroll gap-8 min-w-max">
            {Array.from({ length: repetitions * 2 }).map((_, i) => (
              <span
                key={i}
                className="text-white font-extrabold text-xl text-base uppercase tracking-wider"
              >
                {t("header.now-with-free-shipping")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
