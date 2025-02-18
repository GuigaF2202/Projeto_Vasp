import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import "./Events.css";


// Alterar para export default

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar eventos
  const fetchEvents = async () => {

    try {
      const options = {
        method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_VAMSYS_AUTH_TOKEN}`,
    },
      };

      const response = await fetch(process.env.REACT_APP_VAMSYS_EVENTS_URL, options);

      if (!response.ok) {
        throw new Error(`Erro ao buscar eventos: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || []; // Retorna o array de eventos ou um array vazio
    } catch (error) {
      throw new Error(`Erro na requisição: ${error.message}`);
    }
    const options = {
      method: 'POST',
      headers: {
        cookie: 'SERVER_USED=088685a6b44ca3c2',
        Authorization: 'Bearer 323|3mANJFqbmleC04wFvo0HaG3fEoCcAjhzIwI8w0gf5382b56d'
      }
    };

    const response = await fetch('https://vamsys.io/api/token/v1/discord/events', options);
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status} - ${response.statusText}`);
    }
    return response.json();

  };

  useEffect(() => {
    const getEvents = async () => {
      try {

        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);


  // Renderização de carregamento

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="animate-spin h-15 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  // Renderização de erro

  if (error) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Erro: {error}
        </div>
      </div>
    );
  }


  // Renderização dos eventos

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="flex flex-col items-center gap-8">

          {events.length > 0 ? (
            events.map((event) => (
              <Card 
                key={event.id} 
                className="w-full max-w-3xl p-8 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <Typography variant="h6" className="text-2xl font-bold text-blue-600">
                  {event.name || 'Nome não disponível'}
                </Typography>
                {event.image && (
                  <img src={event.image} alt={event.name} className="w-full h-auto rounded-lg mb-4" />
                )}
                <Typography className="text-lg text-gray-800">
                  Tipo: <span className="font-semibold">{event.subtype || 'Tipo não disponível'}</span>
                </Typography>
                <Typography className="text-lg text-gray-800">
                  Pontos: <span className="font-semibold">{event.points || 'Pontos não disponíveis'}</span>
                </Typography>
                <Typography className="text-lg text-gray-800">
                  Início: <span className="font-semibold">{event.event_start || 'Data de início não disponível'}</span>
                </Typography>
                <Typography className="text-lg text-gray-800">
                  Fim: <span className="font-semibold">{event.event_end || 'Data de fim não disponível'}</span>
                </Typography>
                <Typography className="text-lg text-gray-800">
                  Registro Necessário: <span className="font-semibold">{event.registration_required ? 'Sim' : 'Não'}</span>
                </Typography>
                <Typography className="text-gray-600 mt-2">
                  {event.markdown || 'Descrição não disponível'}
                </Typography>
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4">
                    Mais informações
                  </a>
                )}
              </Card>
            ))
          ) : (
            <Typography className="text-gray-600">Nenhum evento disponível no momento.</Typography>
          )}

          {events.map((event) => (
            <Card 
              key={event.id} 
              className="w-full max-w-3xl p-8 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <Typography variant="h6" className="text-2xl font-bold text-blue-600">{event.name || 'Nome não disponível'}</Typography>
              <img src={event.image} alt={event.name} className="w-full h-auto rounded-lg mb-4" />
              <Typography className="text-lg text-gray-800">Tipo: <span className="font-semibold">{event.subtype || 'Tipo não disponível'}</span></Typography>
              <Typography className="text-lg text-gray-800">Pontos: <span className="font-semibold">{event.points || 'Pontos não disponíveis'}</span></Typography>
              <Typography className="text-lg text-gray-800">Início: <span className="font-semibold">{event.event_start || 'Data de início não disponível'}</span></Typography>
              <Typography className="text-lg text-gray-800">Fim: <span className="font-semibold">{event.event_end || 'Data de fim não disponível'}</span></Typography>
              <Typography className="text-lg text-gray-800">Registro Necessário: <span className="font-semibold">{event.registration_required ? 'Sim' : 'Não'}</span></Typography>
              <Typography className="text-gray-600 mt-2">{event.markdown || 'Descrição não disponível'}</Typography>
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4">
                Mais informações
              </a>
            </Card>
          ))}

        </div>
      </div>
    </div>
  );
}
