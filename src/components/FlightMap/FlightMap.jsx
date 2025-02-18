import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../../context/LanguageContext';
import 'leaflet/dist/leaflet.css';
import planeIcon from '../../assets/plane.webp';
import Sidebar from '../Sidebar/Sidebar';
import loadingGif from '../../assets/loading.gif';
import 'leaflet-rotatedmarker';
import headerImage from "../../assets/vaspsiebar.jpg";

function FlightMap() {
  const mapRef = useRef(null);
  const { language } = useLanguage();
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapTheme, setMapTheme] = useState('light');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [metarData, setMetarData] = useState(null);
  const [pilotUserName, setPilotUserName] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Configurações do mapa
  const mapStyle = useMemo(() => ({
    height: "100%",
    width: "100%",
    background: mapTheme === 'dark' ? '#1a1a1a' : '#f2f2f2'
  }), [mapTheme]);

  const tileLayerUrl = useMemo(() => 
    mapTheme === 'dark'
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    [mapTheme]
  );

  // Busca de voos
  const fetchFlights = useCallback(async () => {
    try {
      const form = new FormData();
      form.append('airline_id', '323');
      
      const response = await fetch(process.env.REACT_APP_VAMSYS_FLIGHTS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VAMSYS_AUTH_TOKEN}`,
        },
        body: form,
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const data = await response.json();
      const flightArray = Object.values(data?.data?.flights || {}).map((flight) => {
        let title, description;
        if (flight.pilot.rank.abbreviation) {
          title = `${flight.user.name}, ${flight.pilot.rank.abbreviation} - ${flight.pilot.username}`;
          description = `<p>${flight.departureAirport.identifiers} to ${flight.arrivalAirport.identifiers}</p>`;
        } else {
          title = `${flight.user.name} - ${flight.pilot.username}`;
          description = `<p>${flight.departureAirport.identifiers} to ${flight.arrivalAirport.identifiers}</p>`;
        }

        return {
          callsign: flight.booking.callsign,
          flightNumber: flight.booking.flightNumber,
          altitude: flight.progress.altitude,
          speed: flight.progress.groundSpeed,
          heading: flight.progress.magneticHeading,
          latitude: parseFloat(flight.progress.latitude),
          longitude: parseFloat(flight.progress.longitude),
          departure: flight.departureAirport.icao,
          arrival: flight.arrivalAirport.icao,
          aircraft: flight.aircraft.type,
          phase: flight.progress.currentPhase,
          network: flight.booking.network,
          distanceRemaining: flight.progress.distanceRemaining,
          pilotUsername: flight.pilot?.username,
          timestamp: new Date().getTime(), // Adiciona timestamp único
          title, // Adiciona o título ao objeto de voo
          description // Adiciona a descrição ao objeto de voo
        };
      });
  
      setFlights(flightArray);
      setIsLoading(false);
      setError(null);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setFlights([]);
    }
  }, []);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  // Busca METAR
  const fetchMetarData = useCallback(async (airportCode) => {
    try {
      const response = await fetch(
       `${process.env.REACT_APP_CHECKWX_METAR_URL}${airportCode}/decoded`,
        {
          headers: { "X-API-Key": process.env.REACT_APP_CHECKWX_API_KEY },
        }
      );
  
      if (!response.ok) return null;
  
      const data = await response.json();
      return data?.data?.[0] || null;
    } catch (error) {
      console.error('Erro METAR:', error);
      return null;
    }
  }, []);

  // Busca nome do piloto
  const fetchPilotUserName = useCallback(async (username) => {
    try {
      const form = new FormData();
      form.append('username', username);

      const response = await fetch(process.env.REACT_APP_VAMSYS_PILOT_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VAMSYS_AUTH_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar piloto: ${response.status}`);
      }

      const data = await response.json();
      return data?.data?.user_name || null;
    } catch (error) {
      console.error('Erro ao buscar piloto:', error);
      return null;
    }
  }, []);

  // Manipulador de clique no marcador
  const handleMarkerClick = useCallback(async (flight) => {
    setSelectedFlight(prev => prev?.callsign === flight.callsign ? null : flight);
    setShowSidebar(true);

    const [metar, userName] = await Promise.all([
      fetchMetarData(flight.departure),
      flight.pilotUsername ? fetchPilotUserName(flight.pilotUsername) : null
    ]);

    setMetarData(metar);
    setPilotUserName(userName);
  }, [fetchMetarData, fetchPilotUserName]);

  // Criação de ícone memoizada
  const createAirplaneIcon = useCallback((rotation) => 
    L.icon({
      iconUrl: planeIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
      rotationAngle: rotation,
      rotationOrigin: 'center center'
    }), [planeIcon]); // Adicione planeIcon como dependência

  // Renderização condicional de texto
  const t = useCallback((pt, en) => 
    language === 'pt' ? pt : en, [language]);

  return (
    <div id="flight-map" className="pt-16 pb-12 px-4">
      <div className="container mx-auto relative">
        {/* Botão de tema */}
        <button
          onClick={() => setMapTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          className="absolute top-4 left-4 z-20 px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg shadow-lg hover:opacity-90 transition-all"
          aria-label={t('Alternar tema', 'Toggle theme')}
        >
          {mapTheme === 'dark' ? '🌞 ' + t('Modo Claro', 'Light Mode') : '🌙 ' + t('Modo Escuro', 'Dark Mode')}
        </button>

        {/* Título principal */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {t('Mapa de Voos em Tempo Real', 'Live Flight Map')}
        </h2>

        {/* Container do mapa */}
        <div className="relative h-[700px] rounded-lg overflow-hidden bg-gray-900 shadow-2xl border border-gray-800">

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="relative h-full">
                  <img 
                    src={loadingGif}
                    alt="Loading"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-white font-medium">
                  {t('Carregando voos...', 'Loading flights...')}
                </p>
              </div>
            </div>
          )}

          {/* Mapa */}
          <MapContainer
            ref={mapRef}
            center={[-15.7801, -47.9292]}
            zoom={4}
            style={mapStyle}
            zoomControl={false}
            className="z-10"
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              url={tileLayerUrl}
              attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {/* Marcadores de voos */}
            {flights.map((flight) => (
              <Marker
                key={`${flight.callsign}-${flight.timestamp}`}
                position={[flight.latitude, flight.longitude]}
                icon={createAirplaneIcon(flight.heading)}
                rotationAngle={flight.heading}
                rotationOrigin="center center"
                eventHandlers={{
                  click: () => handleMarkerClick(flight),
                  mouseover: (e) => e.target.openPopup(),
                  mouseout: (e) => e.target.closePopup()
                }}
              >
                <Popup className="custom-popup">
                  <div className="flight-popup min-w-[250px] space-y-2">
                    <h3 className="text-lg font-bold text-blue-400">{flight.callsign}</h3>
                    <div className="flex items-center justify-center bg-gray-800 text-white py-3 rounded-lg">
                      <img 
                        src={headerImage} 
                        alt="Flight Header" 
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-1 text-gray-100 mt-2">
                      {t('Callsign:', 'Callsign:')}  <div className= "text-md text-orange-500">{flight.callsign} </div>
                      <p>{t('Partida:', 'Departure:')} {flight.departure}</p>
                      <p>{t('Chegada:', 'Arrival:')} {flight.arrival}</p>
                      <p>{t('Restantes', 'Remaining')}: {flight.distanceRemaining} nm</p>
                      <p>{t('Fase', 'Phase')}: {flight.phase}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>

          {/* Sidebar */}
          {showSidebar && selectedFlight && (
            <Sidebar
              mapTheme={mapTheme}
              flightData={selectedFlight}
              metarData={metarData}
              pilotUserName={pilotUserName}
              onClose={() => {
                setShowSidebar(false);
                setSelectedFlight(null);
              }}
            />
          )}

          {/* Status de atualização */}
          <div className="absolute bottom-4 left-4 z-20 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('Última atualização:', 'Last update:')} {lastUpdate.toLocaleTimeString()}
            </p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="absolute top-4 left-4 z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <strong>{t('Erro:', 'Error:')}</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightMap;
