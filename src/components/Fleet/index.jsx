import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

function Fleet() {
  const { language } = useLanguage();

  const fleetData = {
    shortHaul: {
      title: language === 'en' ? 'Boeing Short-haul' : 'Boeing Curta Distância',
      aircraft: [
        {
          name: 'BOEING 737-800',
          specs: {
            total: 15,
            length: '39.5 m',
            wingspan: '35.8 m',
            height: '12.5 m',
            cruisingSpeed: '840 km/h',
            maxAltitude: '12,500 m',
            maxTakeoffWeight: '79,000 kg',
            maxLandingWeight: '66,360 kg',
            range: '5,765 km',
            cabinWidth: '3.54 m',
            seats: 189
          }
        }
      ]
    },
    mediumHaul: {
      title: language === 'en' ? 'Boeing Medium-haul' : 'Boeing Média Distância',
      aircraft: [
        {
          name: 'BOEING 767-300ER',
          specs: {
            total: 8,
            length: '54.9 m',
            wingspan: '47.6 m',
            height: '15.8 m',
            cruisingSpeed: '851 km/h',
            maxAltitude: '13,140 m',
            maxTakeoffWeight: '186,880 kg',
            maxLandingWeight: '145,150 kg',
            range: '11,070 km',
            cabinWidth: '4.72 m',
            seats: 240
          }
        }
      ]
    }
  };

  return (
    <section id="fleet" className="py-20 pt-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {language === 'en' ? 'Our Fleet' : 'Nossa Frota'}
        </h2>
        
        {Object.entries(fleetData).map(([category, data]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
              {data.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.aircraft.map((aircraft, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                      {aircraft.name}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(aircraft.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-200">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Fleet; 