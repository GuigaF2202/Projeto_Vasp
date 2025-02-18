import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext"; // Pegando o tema do contexto

function CookieBanner() {
  const { language } = useLanguage();
  const { theme } = useTheme(); // Obtendo o tema atual do site
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!acceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const denyCookies = () => {
    setIsVisible(false);
  };

  // Traduções
  const translations = {
    pt: {
      message: "Usamos cookies para melhorar sua experiência. Ao continuar navegando, você aceita nossa",
      policy: "Política de Cookies",
      accept: "Aceitar",
      deny: "Negar"
    },
    en: {
      message: "We use cookies to improve your experience. By continuing to browse, you accept our",
      policy: "Cookie Policy",
      accept: "Accept",
      deny: "Deny"
    }
  };

  const t = translations[language] || translations.en;

  return isVisible ? (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-6 rounded-lg shadow-lg max-w-lg w-full flex flex-col items-center backdrop-blur-md text-center transition-all
        ${theme === "dark" ? "bg-gray-900/90 text-white" : "bg-gray-100/90 text-gray-800"}`}
    >
      <p className="text-sm leading-relaxed">
        {t.message}{" "}
        <a href="/politica-de-cookies" className="underline text-blue-400 hover:text-blue-300">
          {t.policy}
        </a>.
      </p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={denyCookies}
          className={`py-2 px-6 rounded-lg transition-all ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}
        >
          {t.deny}
        </button>
        <button
          onClick={acceptCookies}
          className={`py-2 px-6 rounded-lg transition-all ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {t.accept}
        </button>
      </div>
    </div>
  ) : null;
}

export default CookieBanner;
