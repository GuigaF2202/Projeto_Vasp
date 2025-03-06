import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importando Link
import logo from '../../assets/logo.png';

function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { label: language === 'en' ? 'Home' : 'Início', href: '/' },
    { label: language === 'en' ? 'Fleet' : 'Frota', href: 'https://vamsys.io/phoenix/resources/aircraft' },
    { label: language === 'en' ? 'Live Map' : 'Mapa ao Vivo', href: '/flight-map' },
    { label: language === 'en' ? 'Events' : 'Eventos', href: '/events' }, // Link para Eventos
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="VASP Virtual" 
              className="h-8 w-auto"
            />
          </div>

          {/* Navegação */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Botão Despacho e Ícones */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle language"
            >
              <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
              <span className="ml-2 text-sm">{language === 'en' ? 'EN' : 'PT'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="w-5 h-5"
              />
            </button>

            <a
              href="https://vamsys.io/phoenix/flight-center/book"
              className="inline-block px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Despacho Operacional
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
