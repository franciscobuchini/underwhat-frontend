import { useTranslation } from "react-i18next";

function HeaderText() {
  const { t } = useTranslation("global");

  return (
    <div
      className="
        absolute 
        top-1/3 sm:top-1/3
        left-1/2 
        transform -translate-x-1/2 
        -translate-y-[calc(50%-4rem)] 
        w-[90%] sm:w-auto 
        text-center 
        text-white 
        drop-shadow-sm 
        select-none 
        pointer-events-none
      "
    >
      <h1
        className="
          text-xl sm:text-2xl md:text-3xl lg:text-4xl 
          font-bold 
          tracking-tight 
          leading-snug
        "
      >
        {t("footer.tagline")}
      </h1>
    </div>
  );
}

export default HeaderText;
