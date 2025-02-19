import React, { useState, useEffect, useCallback } from "react";
import headerImage from "../../assets/vaspsiebar.jpg";
import "../../assets/css/sidebar.css";
import Metar from "../Metar/Metar";

function Sidebar({ flightData, metarData, pilotUserName, onClose, mapTheme }) {
  const themeClass = mapTheme === "dark" ? "dark-theme" : "light-theme";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Pequena animação antes de fechar completamente
  }, [onClose]);

  if (!flightData) return null;

  return (
    <div className={`sidebar-glass ${themeClass} ${isVisible ? "show" : "hide"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <img src={headerImage} alt="Flight Header" className="header-image" />
        <button className="close-btn" onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Informações do Voo */}
      <div className="compact-flight-info">
        <h3 className="flight-callsign">{flightData.callsign}</h3>

        <div className="info-grid">
          <InfoCard label="Piloto" value={pilotUserName} highlight />
          <InfoCard label="Rede" value={flightData.network || "N/A"} />  
          <InfoCard label="Aeronave" value={flightData.aircraft} />
          <InfoCard label="Partida" value={flightData.departure} />
          <InfoCard label="Chegada" value={flightData.arrival} />
          <InfoCard label="Altitude" value={`${flightData.altitude} ft`} />
          <InfoCard label="Velocidade" value={`${flightData.speed} kts`} />
          <InfoCard label="Fase" value={flightData.phase} />
          <InfoCard label="Distância Total" value={`${flightData.routeDistance} NM`} />
          <InfoCard label="Restante" value={`${flightData.distanceRemaining} NM`} />
        </div>

        {/* METAR Section */}
        {metarData && <Metar metarData={metarData} airportCode={flightData.departure} />}
      </div>
    </div>
  );
}

const InfoCard = ({ label, value, highlight }) => (
  <div className="info-card">
    <span className="info-label">{label}: </span>
    <span className="info-value" style={{ color: highlight ? "#FF5A1F" : "inherit" }}>
      {value || "N/A"}
    </span>
  </div>
);

export default React.memo(Sidebar);
