import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

function Hero() {
  const { language } = useLanguage();

  return (
    <section id="hero" className="relative h-screen bg-cover bg-center flex items-center justify-center text-white" 
      style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05")'}}>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          {language === 'en' ? 'Welcome to VASP Virtual' : 'Bem-vindo à VASP Virtual'}
        </h1>
        <p className="text-xl mb-8">
          {language === 'en' 
            ? 'Experience the golden age of Brazilian aviation in the virtual world'
            : 'Experimente a era de ouro da aviação brasileira no mundo virtual'}
        </p>
        <a 
          href="https://vamsys.io/login/registre-se" 
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === 'en' ? 'Become a Pilot' : 'Torne-se um Piloto'}
        </a>
      </div>
    </section>
  );
}

export default Hero;