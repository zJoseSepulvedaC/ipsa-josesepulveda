import axios from "axios";

// Obtener lista de instrumentos (dinámico según índice)
export async function getConstituents(index = "IPSA") {
  try {
    // Solo cargamos el JSON que tenemos (IPSA)
    if (index !== "IPSA") {
      console.warn(`No hay datos disponibles para ${index}`);
      return { instruments: [], summaries: {} };
    }

    const res = await axios.get("/data/constituyentes/constituentsList.json");
    const indexName = res.data?.data?.info?.name || "IPSA";

    const instruments =
      res.data?.data?.constituents.map((inst) => ({
        ...inst,
        index: indexName,
      })) || [];

    const summaries = {};
    for (const instrument of instruments) {
      try {
        const summaryRes = await axios.get(
          `/data/resumen/${instrument.codeInstrument}.json`
        );
        const price = summaryRes.data?.data?.price || {};
        const last = parseFloat(price.lastPrice);
        const close = parseFloat(price.closePrice);
        const varDia =
          !isNaN(last) && !isNaN(close) ? ((last - close) / close) * 100 : 0;

        const historyRes = await axios.get(
          `/data/history/history-${instrument.codeInstrument}.json`
        );
        const history = historyRes.data?.data?.chart || [];

        const var30d = calculateVariation(history, 30);
        const varAno = calculateYearToDate(history);
        const var12m = calculateVariation(history, 365);

        summaries[instrument.codeInstrument] = {
          ultimo: last || "-",
          monto: price.volumeMoney || "-",
          varDia: varDia,
          var30d: var30d,
          varAno: varAno,
          var12m: var12m,
        };
      } catch {
        summaries[instrument.codeInstrument] = {
          ultimo: "-",
          monto: "-",
          varDia: "-",
          var30d: "-",
          varAno: "-",
          var12m: "-",
        };
      }
    }

    return { instruments, summaries };
  } catch (error) {
    console.warn(`No hay datos disponibles para ${index}`);
    return { instruments: [], summaries: {} }; // Si falla, devolvemos vacío
  }
}

// Calcular variación
function calculateVariation(history, days) {
  if (!history || history.length < 2) return "-";
  const last = parseFloat(history[history.length - 1].lastPrice);
  const lastTs = history[history.length - 1].datetimeLastPriceTs;
  if (isNaN(last) || !lastTs) return "-";

  const targetTs = lastTs - days * 24 * 60 * 60;
  let pastData = history.find((h) => h.datetimeLastPriceTs <= targetTs);
  if (!pastData) pastData = history[0];
  const past = parseFloat(pastData.lastPrice);

  return !isNaN(past) ? ((last - past) / past) * 100 : "-";
}

// Calcular variación desde inicio de año
function calculateYearToDate(history) {
  if (!history || history.length < 2) return "-";
  const last = parseFloat(history[history.length - 1].lastPrice);
  const lastTs = history[history.length - 1].datetimeLastPriceTs;
  if (isNaN(last) || !lastTs) return "-";

  const currentYear = new Date(lastTs * 1000).getFullYear();
  let startYear = history.find(
    (h) => new Date(h.datetimeLastPriceTs * 1000).getFullYear() === currentYear
  );
  if (!startYear) startYear = history[0];
  const first = parseFloat(startYear.lastPrice);

  return !isNaN(first) ? ((last - first) / first) * 100 : "-";
}

// Obtener resumen de índice
export async function getInstrumentSummary(symbol) {
  try {
    const res = await axios.get(`/data/resumen/${symbol}.json`);
    const price = res.data?.data?.price || {};
    const last = parseFloat(price.lastPrice);
    const close = parseFloat(price.closePrice);
    const variacion =
      !isNaN(last) && !isNaN(close) ? ((last - close) / close) * 100 : null;

    return {
      valor_actual: !isNaN(last) ? last : null,
      variacion: variacion !== null ? variacion : null,
    };
  } catch (e) {
    console.warn(`Resumen no disponible para ${symbol}`);
    return { valor_actual: null, variacion: null };
  }
}

// Obtener histórico de índice
export async function getInstrumentHistory(symbol) {
  try {
    if (symbol !== "IPSA") return [];
    const res = await axios.get(`/data/history/history-${symbol}.json`);
    return res.data?.data?.chart || [];
  } catch (e) {
    return [];
  }
}
