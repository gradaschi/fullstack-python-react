import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function LogViewer() {
  const [logs, setLogs] = useState<Array<string>>([]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:5000");

    socket.on("log", (data: any) => {
      const { message } = data;
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Log Viewer</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
