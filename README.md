# IPSA Instruments Dashboard

Aplicación en Vue 3 con Vite que muestra una lista de instrumentos financieros, permitiendo seleccionar cada uno para actualizar la información en distintos componentes como resumen, cabecera y gráfico.

---

## Tecnologías y herramientas

- Vue 3 (con `<script setup>`)
- Vite (como bundler y servidor de desarrollo)
- Pinia (gestor de estado global)
- Jest + Vue Test Utils (para testing, pendiente integración)
- Axios (para llamadas a servicios REST)
- Chart.js + vue-chartjs (para gráficos)
- Babel (para compatibilidad y transformaciones JS)

---

## Estructura del Proyecto

- `src/`
  - `components/`  
    Componentes individuales como SearchBarComponent, HeaderComponent, ChartComponent, etc.
  - `store/`  
    Pinia store para manejar estado global (`useInstrumentsStore.js`)
  - `services/`  
    Servicios que consumen APIs para datos (fetchConstituents, fetchSummary, fetchHistory)
  - `tests/`  
    Tests unitarios y de integración (pendiente ajuste final)
  - `App.vue`  
    Componente raíz
  - `main.js`  
    Inicialización de Vue y Pinia

---

## Scripts disponibles

- `npm run dev`  
  Levanta servidor de desarrollo Vite en modo hot reload
- `npm run build`  
  Genera build de producción optimizado
- `npm run preview`  
  Previsualiza la build de producción
- `npm run test`  
  Ejecuta tests con Jest (actualmente con problemas en configuración)

---

## Funcionalidades

- Lista interactiva de instrumentos financieros
- Selección de instrumento que actualiza los datos globales y refresca:
  - Cabecera con nombre y valor del índice
  - Gráfico con evolución del instrumento en varios periodos
  - Resumen detallado del instrumento seleccionado
- Barra de búsqueda para filtrar instrumentos
- Cambio entre índices diferentes (IPSA, IGPA, NASDAQ, etc.)
- Manejo centralizado de estado con Pinia

---

## Pendientes / Próximos pasos

- Ajustar y habilitar pruebas unitarias e integración con Jest y Vue Test Utils
- Mejorar estilos y experiencia UI/UX
- Optimizar carga y manejo de datos
- Manejar errores y estados de carga más detalladamente

---

## Instalación

Clonar repositorio, luego:

```bash
npm install
npm run dev
```

Autor

José Sepúlveda C. - Prueba Técnica
2025
