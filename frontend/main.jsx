import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";
import "./index.css";
import { ThemeProvider } from "./src/context/ThemeContext.js";
import { AuthProvider } from "./src/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
