import React from 'react';
import { Carousel } from "flowbite-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import vatLogo from "../../assets/vat.png";
import vatLogoDark from "../../assets/vat-dark.png";
import sysLogo from "../../assets/sys.png";
import sysLogoDark from "../../assets/sys-dark.png";
import vaLogo from "../../assets/va-1.svg";
import fallbackImage from "../../assets/fallback-image.jpg"; // Imagem de fallback importada

const translations = {
  en: {
    title: "Partners",
    description: "Meet our partners who make the best flight simulation experience possible"
  },
  pt: {
    title: "Parceiros",
    description: "Conheça nossos parceiros que tornam possível a melhor experiência em simulação de voo"
  },
  es: {
    title: "Socios",
    description: "Conozca a nuestros socios que hacen posible la mejor experiencia en simulación de vuelo"
  }
};

const CarouselComponent = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language as keyof typeof translations];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImage; // Usando a imagem importada de fallback
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 512 512" 
            height="1.5em" 
            width="1.5em" 
            className="text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect 
              width="448" 
              height="320" 
              x="32" 
              y="128" 
              fill="none" 
              strokeLinejoin="round" 
              strokeWidth="32" 
              rx="48" 
              ry="48"
            ></rect>
            <path 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="32" 
              d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32m112 112H32m288 0v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24"
            ></path>
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.description}
        </p>
      </div>
      <div className="h-40 sm:h-48 xl:h-56 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <Carousel slideInterval={5000} className="bg-white dark:bg-gray-800">
          <div className="flex items-center justify-center h-full p-4">
            <a 
              href="https://vatsim.net/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit VAT website"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={theme === 'dark' ? vatLogo : vatLogoDark}
                alt="Logo VAT" 
                className="object-contain max-h-full"
                onError={handleImageError}
              />
            </a>
          </div>
          <div className="flex items-center justify-center h-full p-4">
            <a 
              href="https://vamsys.io/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit VAMSYS website"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={theme === 'dark' ? sysLogo : sysLogoDark}
                alt="Logo SYS" 
                className="object-contain max-h-full"
                onError={handleImageError}
              />
            </a>
          </div>
          <div className="flex items-center justify-center h-full p-4">
            <a 
              href="https://br.ivao.aero/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit IVAO website"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={vaLogo} 
                alt="Logo VA" 
                className="object-contain max-h-full w-auto max-w-[400px] sm:max-w-[500px]"
                onError={handleImageError} // Usando o método de fallback
              />
            </a>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;