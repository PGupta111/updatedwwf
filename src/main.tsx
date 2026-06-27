// src/main.tsx (Updated for Hostname Routing)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App"; // Your existing organization site component
import WW311 from "./WW311"; // The new 311 platform component
import "./index.css"; // Your existing styles

// This component decides which app to render based on the URL's hostname
function AppRouter() {
  const hostname = window.location.hostname;

  // Check if it's the 311 subdomain or a preview/local equivalent
  const is311Domain =
    hostname === "311.westwindsorforward.org" ||
    hostname.startsWith("311.") || // Catches Vercel preview URLs like 311.project.vercel.app
    (hostname === "localhost" && window.location.pathname.startsWith("/311")); // Basic local dev check

  return (
    <BrowserRouter>
      {is311Domain ? (
        // If on the 311 domain, WW311 handles all routes starting from '/'
        <Routes>
          <Route path="/*" element={<WW311 />} />
        </Routes>
      ) : (
        // Otherwise, the main App handles all routes starting from '/'
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
    <Analytics />
  </React.StrictMode>
);
