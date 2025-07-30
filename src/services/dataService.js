import axios from "axios";

export async function getConstituents() {
  const res = await axios.get("/data/constituyentes/constituentsList.json");
  const data = res.data?.data?.constituents || [];

  // Mapear cada instrumento con su variación (similar a getInstrumentSummary)
  return await Promise.all(
    data.map(async (item) => {
      try {
        const summaryRes = await axios.get(
          `/data/resumen/${item.codeInstrument}.json`
        );
        const price = summaryRes.data?.data?.price || {};
        const last = parseFloat(price.lastPrice);
        const close = parseFloat(price.closePrice);
        const variacion =
          !isNaN(last) && !isNaN(close) ? ((last - close) / close) * 100 : 0;

        return {
          ...item,
          valor_actual: last || "-",
          variacion: variacion || 0,
        };
      } catch {
        return { ...item, valor_actual: "-", variacion: 0 };
      }
    })
  );
}

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

export async function getInstrumentHistory(symbol) {
  const res = await axios.get(`/data/history/history-${symbol}.json`);
  return res.data?.data?.chart || [];
}
