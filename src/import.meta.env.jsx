// Acessando as variáveis de ambiente
const flightsUrl = import.meta.env.VITE_VAMSYS_FLIGHTS_URL;
const statisticsUrl = import.meta.env.VITE_VAMSYS_STATISTICS_URL;
const metarUrl = import.meta.env.VITE_CHECKWX_METAR_URL;
const pilotUrl = import.meta.env.VITE_VAMSYS_PILOT_URL; // Nova variável para o endpoint do piloto
const authToken = import.meta.env.VITE_VAMSYS_AUTH_TOKEN;
const apiKey = import.meta.env.VITE_CHECKWX_API_KEY;

// Função para validar variáveis de ambiente
const validateEnvVariables = () => {
  if (!authUrl || !flightsUrl || !statisticsUrl || !metarUrl || !pilotUrl || !authToken || !apiKey) {
    throw new Error("Variáveis de ambiente não configuradas corretamente.");
  }
};

// Função para fazer requisições genéricas
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao fazer requisição para ${url}:`, error);
    throw error;
  }
};

// Exemplo de requisição para buscar voos ativos
const fetchFlights = async () => {
  validateEnvVariables();
  return makeRequest(flightsUrl, {
    headers: {
      Authorization: authToken,
    },
  });
};

// Exemplo de requisição para buscar estatísticas da airline
const fetchStatistics = async () => {
  validateEnvVariables();
  return makeRequest(statisticsUrl, {
    headers: {
      Authorization: authToken,
    },
  });
};

// Exemplo de requisição para buscar METAR de um aeroporto
const fetchMetar = async (airportCode) => {
  validateEnvVariables();
  const url = `${metarUrl}${airportCode}/decoded`;
  return makeRequest(url, {
    headers: {
      "X-API-Key": apiKey,
    },
  });
};

// Nova função para buscar dados do piloto
const fetchPilot = async (pilotId) => {
  validateEnvVariables();
  const url = `${pilotUrl}/${pilotId}`; // Exemplo: /pilots/{id}
  return makeRequest(url, {
    headers: {
      Authorization: authToken,
    },
  });
};

// Exemplo de uso
(async () => {
  try {
    const flights = await fetchFlights();
    console.log("Voos ativos:", flights);

    const statistics = await fetchStatistics();
    console.log("Estatísticas:", statistics);

    const metar = await fetchMetar("SBGR"); // Exemplo: Código do aeroporto de Guarulhos
    console.log("METAR:", metar);

    const pilot = await fetchPilot("12345"); // Exemplo: ID do piloto
    console.log("Dados do piloto:", pilot);
  } catch (error) {
    console.error("Erro no processo:", error);
  }
})();
