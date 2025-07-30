import axios from "axios";

// Obtener lista de instrumentos + sus resúmenes (con variaciones)
export async function getConstituents() {
  const res = await axios.get("/data/constituyentes/constituentsList.json");
  const instruments = res.data?.data?.constituents || [];

  // Cargar los resúmenes de cada instrumento
  const summaries = {};
  for (const instrument of instruments) {
    try {
      // Resumen básico
      const summaryRes = await axios.get(
        `/data/resumen/${instrument.codeInstrument}.json`
      );
      const price = summaryRes.data?.data?.price || {};
      const last = parseFloat(price.lastPrice);
      const close = parseFloat(price.closePrice);
      const varDia =
        !isNaN(last) && !isNaN(close) ? ((last - close) / close) * 100 : 0;

      // Histórico para cálculos adicionales
      const historyRes = await axios.get(
        `/data/history/history-${instrument.codeInstrument}.json`
      );
      const history = historyRes.data?.data?.chart || [];

      // Variaciones calculadas
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
    } catch (e) {
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
}

// Calcular variación a partir de días atrás
function calculateVariation(history, days) {
  if (!history.length) return "-";
  const last = parseFloat(history[history.length - 1].lastPrice);
  const pastData = history.find(
    (h) =>
      new Date(h.datetimeLastPrice) <
      new Date().setDate(new Date().getDate() - days)
  );
  if (!pastData) return "-";
  const past = parseFloat(pastData.lastPrice);
  return !isNaN(last) && !isNaN(past) ? ((last - past) / past) * 100 : "-";
}

// Calcular variación desde el inicio del año
function calculateYearToDate(history) {
  if (!history.length) return "-";
  const last = parseFloat(history[history.length - 1].lastPrice);
  const startYear = history.find(
    (h) =>
      new Date(h.datetimeLastPrice).getFullYear() === new Date().getFullYear()
  );
  if (!startYear) return "-";
  const first = parseFloat(startYear.lastPrice);
  return !isNaN(last) && !isNaN(first) ? ((last - first) / first) * 100 : "-";
}

// Obtener resumen de un índice (IPSA)
export async function getInstrumentSummary(symbol) {
  const res = await axios.get(`/data/resumen/${symbol}.json`);
  const price = res.data?.data?.price || {};
  const last = parseFloat(price.lastPrice);
  const close = parseFloat(price.closePrice);
  const variacion =
    !isNaN(last) && !isNaN(close) ? ((last - close) / close) * 100 : 0;

  return {
    valor_actual: last || "-",
    variacion: variacion || 0,
  };
}

// Obtener histórico de un instrumento/índice
export async function getInstrumentHistory(symbol) {
  const res = await axios.get(`/data/history/history-${symbol}.json`);
  return res.data?.data?.chart || [];
}
