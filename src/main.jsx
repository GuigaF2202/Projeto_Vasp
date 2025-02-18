import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importações de estilos
import './index.css';
import 'leaflet/dist/leaflet.css';

// Importações de configurações e bibliotecas
import './utils/fontawesome';
import './components/FlightMap/leaflet-setup';  // Certifique-se de que o arquivo leaflet-setup.js está correto

// Outras importações que você possa precisar
// import './some-other-file.css'; (por exemplo, se necessário)

// Renderizando o componente principal (App) no DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
