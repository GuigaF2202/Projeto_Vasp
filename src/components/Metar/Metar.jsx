import React, { useEffect, useState, useCallback } from "react";
import "../../assets/css/metar.css";

const Metar = ({ airportCode }) => {
  const [metarData, setMetarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetarData = useCallback(async () => {
    if (!airportCode) return;

    try {
      setLoading(true);
      setError(null);

      // Usando a variável de ambiente REACT_APP_CHECKWX_API_KEY
      const response = await fetch(
        `${process.env.REACT_APP_CHECKWX_METAR_URL}${airportCode}/decoded`,
        {
          headers: { "X-API-Key": process.env.REACT_APP_CHECKWX_API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data?.data?.length > 0) {
        setMetarData(data.data[0]);
      } else {
        throw new Error("Nenhum dado METAR encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar METAR:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [airportCode]);

  useEffect(() => {
    fetchMetarData();
  }, [fetchMetarData]);

  return (
    <div className="metar-section">
      <h4 className="metar-title">METAR {airportCode}</h4>
      {loading ? (
        <p>Carregando METAR...</p>
      ) : error ? (
        <p className="metar-error">Erro: {error}</p>
      ) : metarData ? (
        <div className="metar-card">
          <div className="metar-info">
            <span>
              <strong>Condições: </strong> {metarData.flight_category || "N/A"}
            </span>
            <span>
              <strong> Vento: </strong> {metarData.wind?.degrees || "N/A"}°/{""}
              {metarData.wind?.speed_kts || "N/A"} Kts
            </span>
            <span>
              <strong> Visibilidade: </strong>{" "}
              {metarData.visibility?.meters || "N/A"} Metros
            </span>
          </div>
          <p className="raw-metar">{metarData.raw_text || "N/A"}</p>
        </div>
      ) : (
        <p>Nenhum dado METAR disponível.</p>
      )}
    </div>
  );
};

export default Metar;
