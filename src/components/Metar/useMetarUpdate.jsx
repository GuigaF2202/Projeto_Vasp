import { useState, useEffect, useCallback } from "react";

// URL base da API
const API_URL = "https://api.checkwx.com/metar/";

// Hook personalizado para buscar e atualizar dados METAR
const useMetarUpdate = (airportCode) => {
  const [metarData, setMetarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar dados METAR
  const fetchMetarData = useCallback(async () => {
    if (!airportCode) return;

    console.log(`Atualizando METAR para ${airportCode}...`);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_CHECKWX_METAR_URL}${airportCode}/decoded`, {
        headers: { "X-API-Key": process.env.REACT_APP_CHECKWX_API_KEY },
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data?.data?.length > 0) {
        setMetarData(data.data[0]); // Pegando a primeira resposta válida
      } else {
        throw new Error("Nenhum dado METAR encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar METAR:", err.message);
      setError(err.message);
      setMetarData(null);
    } finally {
      setLoading(false);
    }
  }, [airportCode]);

  // Efeito para agendar a busca e atualizações periódicas
  useEffect(() => {
    if (!airportCode) return;

    // Definir o próximo horário exato (XX:05)
    const now = new Date();
    let nextUpdate = new Date();
    nextUpdate.setMinutes(5);
    nextUpdate.setSeconds(0);

    while (nextUpdate <= now) {
      nextUpdate.setHours(nextUpdate.getHours() + 1);
    }

    const timeToNextUpdate = nextUpdate - now;
    console.log(`Próxima atualização do METAR em ${timeToNextUpdate / 60000} minutos`);

    // Agendar a primeira busca e configurar o intervalo
    const timeout = setTimeout(() => {
      fetchMetarData();
      const interval = setInterval(fetchMetarData, 60 * 60 * 1000); // Atualiza a cada 1 hora
      return () => clearInterval(interval);
    }, timeToNextUpdate);

    // Limpar o timeout ao desmontar o componente
    return () => clearTimeout(timeout);
  }, [airportCode, fetchMetarData]);

  // Retornar os dados, estado de carregamento e erros
  return { metarData, loading, error };
};

export default useMetarUpdate;
