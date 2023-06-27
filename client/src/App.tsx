import React from "react";
import "./App.css";
import TaskStarter from "./components/TaskStarter";
import LogViewer from "./components/LogViewer";

function App() {
  return (
    <div className="App">
      <h1>Guilherme Gradaschi</h1>
      <span>
        Prova de Desenvolvimento de Aplicação Web com Comunicação em Tempo Real
      </span>
      <TaskStarter />
      <LogViewer />
    </div>
  );
}

export default App;
