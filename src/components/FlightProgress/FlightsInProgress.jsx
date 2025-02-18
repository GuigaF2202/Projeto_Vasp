import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const FlightsInProgress = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para calcular o progresso do voo
  const calculateProgress = (routeDistance, distanceRemaining) => {
    if (routeDistance <= 0 || distanceRemaining < 0) return 0;
    return ((routeDistance - distanceRemaining) / routeDistance) * 100;
  };

  // Efeito para buscar os voos em progresso
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const form = new FormData();
        form.append("airline_id", "323");

        const response = await fetch(
          process.env.REACT_APP_VAMSYS_FLIGHTS_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_VAMSYS_AUTH_TOKEN}`,
            },
            body: form,
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const flightArray = Object.values(data?.data?.flights || {}).map(
          (flight) => ({
            callsign: flight.booking?.callsign || "N/A",
            flightNumber: flight.booking?.flightNumber || "N/A",
            routeDistance: flight.progress?.routeDistance || 0,
            distanceRemaining: flight.progress?.distanceRemaining || 0,
          })
        );

        setFlights(flightArray);
      } catch (err) {
        console.error("Erro ao buscar voos:", err.message);
        setError(err.message);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    // Atualizar os voos a cada 30 segundos
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 mt-[-30px]">
      <h2 className="text-2xl text-center font-bold mb-4 text-gray-900 dark:text-white">
        Voos em Progresso
      </h2>

      {error && (
        <p className="text-red-500 text-center">
          Erro ao carregar voos: {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 text-center">Carregando voos...</p>
      ) : flights.length === 0 ? (
        <p className="text-orange-500 text-center">
          Nenhum voo em progresso no momento.
        </p>
      ) : (
        <div
          className={`grid gap-4 ${
            flights.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {flights.map((flight, index) => {
            const progress = Math.max(
              0,
              calculateProgress(
                flight.routeDistance || 0,
                flight.distanceRemaining || 0
              )
            ).toFixed(1);

            return (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 text-sm rounded-lg shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-md font-semibold text-gray-900 dark:text-white">
                    {flight.callsign} ({flight.flightNumber})
                  </span>
                  <span className="text-md font-semibold text-gray-900 dark:text-white">
                    Progresso: {progress}%
                  </span>
                </div>

                <ProgressBar progress={parseFloat(progress)} />
              </div>
            );
          })}
        </div>
      )}
    </div>  
  );
};

export default FlightsInProgress;
