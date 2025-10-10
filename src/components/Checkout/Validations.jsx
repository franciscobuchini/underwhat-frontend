// src/components/Validations.jsx
import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function Validations({ isSubmitting = false, formValid = true, showButton = true }) {
  const { t } = useTranslation("global");

  return (
    <div className="p-4 sm:p-6 border border-gray-300 rounded-2xl bg-white">
      <div className="w-full mt-2">
        <h6 className="text-lg font-bold text-gray-600 flex items-center gap-4">
          <Icon icon="icon-park-twotone:check-one" className="w-6 h-6 flex-shrink-0 text-pink-800" />
          {t("checkout.validations")}
        </h6>
        <hr className="mt-2" />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <input type="checkbox" id="userAgree" required className="h-4 cursor-pointer" />
        <label htmlFor="userAgree" className="text-gray-600 text-sm">
          {t("checkout.validation_text")}
        </label>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <input type="checkbox" id="priceAgree" required className="h-4 cursor-pointer" />
        <label htmlFor="priceAgree" className="text-gray-600 text-sm">
          {t("checkout.final_price_text")}
        </label>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <input type="checkbox" id="termsAgree" required className="h-4 cursor-pointer" />
        <label htmlFor="termsAgree" className="text-gray-600 text-sm">
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline">
            {t("checkout.agree_terms")}
          </a>
        </label>
      </div>

      {showButton && (
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            name="submitButton"
            disabled={!formValid || isSubmitting}
            className="w-full max-w-xs bg-pink-800 py-3 px-6 text-sm font-bold text-white hover:bg-pink-800 disabled:bg-gray-400 enabled:cursor-pointer rounded-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {t("checkout.confirming")}
              </>
            ) : (
              t("checkout.confirm_order")
            )}
          </button>
        </div>
      )}
    </div>
  );
}

