import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 py-12">
        <div>
          <h4 className="font-bold mb-4 text-gray-700 dark:text-white">
            {language === 'en' ? 'Contact Us' : 'Contate-nos'}
          </h4>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>Email: contact@vaspvirtual.org</p>
            <p>Discord: VASP Virtual</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gray-700 dark:text-white">
            {language === 'en' ? 'Follow Us' : 'Siga-nos'}
          </h4>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/vasp.virtual2006/"
              className="text-gray-500 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>

            <a
              href="https://www.instagram.com/vasp.virtual2/"
              className="text-gray-500 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://discord.gg/AWWTHxpuqD"
              className="text-gray-500 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} size="lg" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gray-700 dark:text-white">
            {language === 'en' ? 'Legal' : 'Legal'}
          </h4>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 VASP Virtual</p>
            <p>
              {language === 'en'
                ? 'Not affiliated with the original VASP airline'
                : 'Não afiliada à companhia aérea VASP original'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
