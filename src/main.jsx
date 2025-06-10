import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { SensorProvider } from "./context/SensorContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SensorProvider>
        <App />
      </SensorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
