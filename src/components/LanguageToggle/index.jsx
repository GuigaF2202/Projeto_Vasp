import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200"
    >
      <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
      <span>{language === 'en' ? 'EN' : 'PT'}</span>
    </button>
  );
}

export default LanguageToggle; 