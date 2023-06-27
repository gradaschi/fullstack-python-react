import React, { useState } from "react";
import axios from "axios";

export default function TaskStarter() {
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [param3, setParam3] = useState("");
  const [teste, setTeste] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/start", {
        param1,
        param2,
        param3,
        teste,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Task Starter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Param1:
          <input
            type="text"
            value={param1}
            onChange={(e) => setParam1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Param2:
          <input
            type="text"
            value={param2}
            onChange={(e) => setParam2(e.target.value)}
          />
        </label>
        <br />
        <label>
          Param3:
          <input
            type="number"
            value={param3}
            onChange={(e) => setParam3(e.target.value)}
          />
        </label>

        <br />

        <label>
          Teste:
          <input
            type="text"
            value={teste}
            onChange={(e) => setTeste(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Start Task</button>
      </form>
    </div>
  );
}
