import React from "react";
import "./App.css";
import { Typography } from "@mui/material";
import { useWindowWidth } from "./hooks/useWindowsWidth";
import { Routes, Route, Link } from "react-router-dom";
import WebSocket from "./pages/WebSocket";
import SpotRatesPage from "./pages/SpotRatesPage";
import { Button } from "@mui/material";

function App() {
  const windowWidth = useWindowWidth();
  return (
    <div className="App">
      <div className="header">
        <Typography variant="h4" component="h1">
          Guilherme Gradaschi
        </Typography>
        <Typography variant="h6" component="h5">
          Prova de Desenvolvimento de Aplicação Web com Comunicação em Tempo
          Real
        </Typography>
        <div
          style={{
            display: "flex",
            width: "30%",
            justifyContent: "space-between",
            flexDirection: windowWidth < 900 ? "column" : "row",
          }}
        >
          <Button component={Link} to="/" variant="contained" color="primary">
            WebSocket
          </Button>
          <Button
            component={Link}
            to="/api"
            variant="contained"
            color="primary"
          >
            Spot Rates
          </Button>
        </div>
      </div>
      <div
        className="content"
        style={{
          flexDirection: windowWidth < 900 ? "column" : "row",
        }}
      >
        <Routes>
          <Route path="/" element={<WebSocket />} />
          <Route path="/api" element={<SpotRatesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
