import React from "react";
import "./App.css";
import TaskStarter from "./components/TaskStarter";
import LogViewer from "./components/LogViewer";
import { Typography } from "@mui/material";
import { useWindowWidth } from "./hooks/useWindowsWidth";

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
      </div>
      <div
        className="content"
        style={{
          flexDirection: windowWidth < 900 ? "column" : "row",
        }}
      >
        <TaskStarter />
        <LogViewer />
      </div>
    </div>
  );
}

export default App;
