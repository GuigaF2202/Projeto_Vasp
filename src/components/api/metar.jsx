const METAR_API = {
    baseURL: 'https://avwx.rest/api',
    token: '3ANqkPf4rLL6ZYYt7rRtYmDoyXMP3NXdSqTvl3TJAB0'
  };
  
  const CHECKWX_API = {
    baseURL: 'https://api.checkwx.com/metar',
    token: '6612e7e8e7d742dbaffa90bebf9cb91f'
  };
  
  export const fetchMetarData = async (icao) => {
    try {
      const headers = new Headers();
      headers.append("X-API-Key", CHECKWX_API.token);
  
      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };
  
      const response = await fetch(`${CHECKWX_API.baseURL}/${icao}/decoded`, requestOptions);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error('Erro ao buscar METAR');
      }
  
      return result.data[0];
    } catch (error) {
      console.error('Erro na API METAR:', error);
      return null;
    }
  };
  
  export const fetchMetarLayers = async (bounds) => {
    try {
      const response = await fetch(`${METAR_API.baseURL}/station/near/${bounds.lat},${bounds.lng}`, {
        headers: {
          'Authorization': `Bearer ${METAR_API.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar camada METAR');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API METAR:', error);
      return null;
    }
  };