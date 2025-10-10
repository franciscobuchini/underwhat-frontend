import React from "react";
import { Icon } from "@iconify/react";
import countries from "../../data/Countries";
import { useTranslation } from "react-i18next";

export default function ShippingDetails({
  userCountry,
  setUserCountry,
  zipCode,
  setZipCode
}) {
  const { t } = useTranslation("global");

  return (
    <div className="p-4 sm:p-6 border border-gray-300 rounded-2xl bg-white">
      <div className="w-full mb-4">
        <h6 className="text-lg font-bold text-gray-600 flex items-center gap-4">
          <Icon icon="icon-park-twotone:map" className="w-6 h-6 flex-shrink-0 text-pink-800" />
          {t("checkout.shipping_details")}
        </h6>
        <hr className="mt-2" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="userCountry">
            {t("checkout.select_country")} *
          </label>
          <select
            id="userCountry"
            name="userCountry"
            value={userCountry}
            onChange={(e) => setUserCountry(e.target.value)}
            required
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-600 focus:border-pink-800"
          >
            <optgroup label={t("checkout.popular_countries") || "Popular"}>
              {["AR","AU","CA","CO","FR","DE","HU","IT","IE","NL","NZ","PL","PT","SG","ZA","ES","TR","GB","US"].map(code => {
                const c = countries.find(x => x.code === code);
                return c ? <option key={code} value={c.label}>{c.label}</option> : null;
              })}
            </optgroup>
            <optgroup label={t("checkout.all_countries") || "All countries"}>
              {countries
                .filter(c => !["AR","AU","CA","CO","FR","DE","HU","IT","IE","NL","NZ","PL","PT","SG","ZA","ES","TR","GB","US"].includes(c.code))
                .map(({ code, label }) => <option key={code} value={label}>{label}</option>)}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="zipCode">
            {t("checkout.zip_code")} *
          </label>
          <input
            id="zipCode"
            name="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            type="text"
            placeholder="1234"
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-600 focus:border-pink-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="street">
            {t("checkout.street_name")} *
          </label>
          <input id="street" name="street" type="text" required placeholder="Main Street" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="number">
            {t("checkout.address_number")} *
          </label>
          <input id="number" name="number" type="text" required placeholder="123" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="apartment">
            {t("checkout.apartment_suite")}
          </label>
          <input id="apartment" name="apartment" type="text" placeholder="6th B" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="city">
            {t("checkout.city")}
          </label>
          <input id="city" name="city" type="text" placeholder="City" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="firstName">
            {t("checkout.first_name")} *
          </label>
          <input id="firstName" name="firstName" type="text" required placeholder={t("checkout.first_name_placeholder") || "Nombre"} className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="lastName">
            {t("checkout.last_name")} *
          </label>
          <input id="lastName" name="lastName" type="text" required placeholder={t("checkout.last_name_placeholder") || "Apellido"} className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-600" htmlFor="email">{t("checkout.email")} *</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3" />
        </div>
        <div className="flex gap-4">
  <div className="flex-shrink-0 w-20">
    <label className="block text-sm font-medium text-gray-600" htmlFor="areaCode">{t("checkout.area_code")}</label>
    <input
      id="areaCode"
      name="areaCode"
      type="text"
      placeholder="+01"
      className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3"
      maxLength={4}
    />
  </div>
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-600" htmlFor="phone">{t("checkout.phone_number")}</label>
    <input
      id="phone"
      name="phone"
      type="tel"
      placeholder="555 123456"
      className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3"
    />
  </div>
</div>
      </div>
      {/* Campos extra */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div className="w-full ">
          <label className="block text-sm font-medium text-gray-600" htmlFor="shippingInfo">{t('checkout.relevant_shipping_info')}</label>
          <textarea id="shippingInfo" name="shippingInfo" rows="1" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 resize-none" placeholder={t('checkout.shipping_info_placeholder')} />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600" htmlFor="forUsInfo">{t('checkout.relevant_forUs_info')}</label>
          <textarea id="forUsInfo" name="forUsInfo" rows="1" className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 resize-none overflow-hidden" placeholder={t('checkout.forUs_info_placeholder')} />
        </div>
      </div>
    </div>
  );
}
