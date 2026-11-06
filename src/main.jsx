import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/inter/wght.css";
import "./styles/global.css";
import App from "./App.jsx";
import { initAnalyticsFromConsent } from "./analytics.js";

initAnalyticsFromConsent();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
