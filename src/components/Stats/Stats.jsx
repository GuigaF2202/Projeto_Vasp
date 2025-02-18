import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CountUp from 'react-countup';

function Stats() {
  const { language } = useLanguage();
  const [statistics, setStatistics] = useState({
    totalFlights: 0,
    distance30Days: 0,
    totalHours: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VAMSYS_AUTH_TOKEN}`,
        },
      };

      const response = await fetch(
        process.env.REACT_APP_VAMSYS_STATISTICS_URL,
        options
      );

      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} - ${response.statusText}`
        );
      }

      const responseData = await response.json();

      if (!responseData || !responseData.data) {
        throw new Error('Dados da API inválidos ou ausentes');
      }

      const data = responseData.data;

      // Extração segura dos dados
      const totalFlights = data.pireps?.allTime?.count || 0;
      const distance30Days = data.pireps?.thirty?.distanceFlown || 0;
      const totalHours = data.flightTime?.allTime?.raw
        ? Math.round(data.flightTime.allTime.raw / 3600)
        : 0;

      // Atualiza o estado apenas se os dados mudaram
      if (
        totalFlights !== statistics.totalFlights ||
        distance30Days !== statistics.distance30Days ||
        totalHours !== statistics.totalHours
      ) {
        setStatistics({ totalFlights, distance30Days, totalHours });
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error.message, error.stack);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();

    const interval = setInterval(fetchStatistics, 300000); // Atualiza a cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  // Renderização condicional para estados de carregamento e erro
  if (loading) {
    return (
      <section className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Loading statistics...' : 'Carregando estatísticas...'}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">
            {language === 'en' ? 'Error loading statistics' : 'Erro ao carregar estatísticas'}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchStatistics();
            }}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
          >
            {language === 'en' ? 'Try again' : 'Tentar novamente'}
          </button>
        </div>
      </section>
    );
  }

  // Definição das estatísticas para renderização
  const stats = [
    {
      number: statistics.totalFlights,
      label: language === 'en' ? 'Total Flights' : 'Total de Voos',
      suffix: '',
    },
    {
      number: statistics.distance30Days,
      label: language === 'en' ? 'Distance (30 Days)' : 'Distância (30 Dias)',
      suffix: ' nm',
    },
    {
      number: statistics.totalHours,
      label: language === 'en' ? 'Total Hours' : 'Horas Totais',
      suffix: ' hrs',
    },
  ];

  return (
    <section id="stats" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800 dark:text-gray-200">
          {language === 'en' ? 'Vasp Virtual Statistics' : 'Estatísticas da Vasp Virtual'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                <CountUp
                  end={Number(stat.number)}
                  duration={2.5}
                  suffix={stat.suffix}
                  decimals={stat.suffix === ' hrs' ? 1 : 0}
                />
              </div>
              <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
