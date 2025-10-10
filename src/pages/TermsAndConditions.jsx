//TermsAndConditions.jsx
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const TermsAndConditions = () => {
  const { t } = useTranslation("global");

  return (
    <div className="container mx-auto px-6 py-16 mt-20 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-600 flex items-center gap-4">
        <Icon icon="icon-park-twotone:align-text-left-one" className="w-10 h-10 flex-shrink-0 text-pink-800" />
        {t("terms.title")}
      </h1>

      <div className="text-gray-700 leading-8 max-w-4xl space-y-10 text-justify">
        {[
          ["introduction_title", "introduction"],
          ["product_description_title", "product_description"],
          ["purchase_process_title", "purchase_process"],
          ["prices_and_payments_title", "prices_and_payments"],
          ["shipping_and_delivery_title", "shipping_and_delivery"],
          ["returns_and_refunds_title", "returns_and_refunds"],
          ["limitation_of_liability_title", "limitation_of_liability"],
          ["force_majeure_title", "force_majeure"],
          ["intellectual_property_title", "intellectual_property"],
          ["privacy_title", "privacy"],
          ["modifications_title", "modifications"],
        ].map(([titleKey, contentKey]) => (
          <section key={titleKey}>
            <h2 className="text-2xl font-semibold text-gray-600 mb-3">{t(`terms.${titleKey}`)}</h2>
            <p className="text-gray-500">{t(`terms.${contentKey}`)}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;