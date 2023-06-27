import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./styles.css";

export default function LogViewer() {
  const [logs, setLogs] = useState<Array<string>>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  useEffect(() => {
    const socket: Socket = io("http://localhost:5000");

    socket.on("connect", () => {
      setConnectionStatus("Connected");
    });

    socket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    socket.on("log", (data: any) => {
      const { message } = data;
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="log-viewer-container">
      <h2>Log Viewer</h2>
      <p>
        Status:
        <span
          style={{
            marginLeft: "5px",
            color: connectionStatus === "Connected" ? "green" : "red",
          }}
        >
          {connectionStatus === "Connected" ? "Connected" : "Disconnected"}
        </span>
      </p>
      <div className="logs-container">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}
