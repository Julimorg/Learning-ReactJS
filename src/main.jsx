import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import StarRating from "./pages/DemoUsePopCorn/StartRating.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <StarRating/> */}
    </BrowserRouter>
  </React.StrictMode>
);
