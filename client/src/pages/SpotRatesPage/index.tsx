import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, CardContent, Typography } from "@mui/material";

const SpotRatesComponent = () => {
  const [spotRates, setSpotRates] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    socket.on("spot_rates", (data) => {
      console.log(data);
      setSpotRates(data.spot_rates);
    });

    const fetchSpotRates = () => {
      const data = {
        base: ["USD"],
        quote: ["EUR"],
      };

      socket.emit("fetch_spot_rates", data);
    };

    // Fetch spot rates immediately
    fetchSpotRates();

    // Fetch spot rates every second
    const interval = setInterval(fetchSpotRates, 5000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  if (spotRates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Spot Rates</h1>
      {spotRates.map((spotRate, index) => (
        <SpotRateCard key={index} spotRate={spotRate} />
      ))}
    </div>
  );
};

const SpotRateCard = ({ spotRate }: any) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {spotRate.base_currency}/{spotRate.quote_currency}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bid: {spotRate.bid}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ask: {spotRate.ask}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Midpoint: {spotRate.midpoint}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpotRatesComponent;
