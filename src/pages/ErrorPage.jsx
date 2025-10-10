import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorPage({ statusCode, message }) {
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-pink-800 mb-4">
          {statusCode}
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          {message}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-pink-800 hover:bg-pink-700 text-white rounded-lg  hover:cursor-pointer"
        >
          {t("error.return")}
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;