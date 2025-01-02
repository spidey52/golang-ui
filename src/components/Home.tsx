import { colors, Stack, Typography } from "@mui/material";
import { BarChart, Gauge, PieChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import API_ENDPOINTS from "../config/api_endpoints";

type Metrics = {
 cpu: number[];
 memory: {
  total: number;
  used: number;
  free: number;
 };
 disk: {
  total: number;
  used: number;
  free: number;
 };

 network: { bytes_sent: number; bytes_recv: number; name: string }[];
};
const initialState: Metrics = {
 cpu: [],
 memory: {
  total: 0,
  used: 0,
  free: 0,
 },
 disk: {
  total: 0,
  used: 0,
  free: 0,
 },
 network: [],
};

function convertBytes(bytes: number) {
 const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

 if (bytes === 0) {
  return "0 Byte";
 }

 const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));

 return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
const chartHeight = 200;
const chartWidth = 400;

const useTrades = () => {
 const fetchTrades = async () => {
  return axios.get("http://localhost:8081/trade/", {
   withCredentials: true,
   headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdHlhbSIsImlzcyI6InRlc3QiLCJleHAiOjE3MjkxODM3NDF9.QbnwT0eeqOXYB9vwMitK84V1wg_Pk_qXTWHlVtV3ywU`,
   },
  });
 };

 return useQuery({
  queryKey: ["trades"],
  queryFn: fetchTrades,
 });
};

const HomePage = () => {
 const [metrics, setMetrics] = useState<Metrics>(initialState);
 const { data: trades } = useTrades();
 console.log(trades);

 const networkDetails = useMemo(() => {
  const filteredMetrics = metrics.network.filter((el) => {
   const minThreshold = 1024;
   return el.bytes_recv > minThreshold || el.bytes_sent > minThreshold;
  });

  filteredMetrics.sort((a, b) => {
   const aTotal = a.bytes_recv + a.bytes_sent;
   const bTotal = b.bytes_recv + b.bytes_sent;
   return bTotal - aTotal;
  });
  return filteredMetrics;
 }, [metrics.network]);

 useEffect(() => {
  const socket = new WebSocket(API_ENDPOINTS.metrics.socket);

  socket.onopen = () => {
   console.log("Connected to metrics socket");
  };

  socket.onmessage = (event) => {
   const data = JSON.parse(event.data);
   setMetrics(data);
  };

  socket.onerror = (error) => {
   console.error("Error: ", error);
  };

  socket.onclose = () => {
   console.log("Disconnected from metrics socket");
  };

  return () => {
   socket.close();
  };
 }, []);

 return (
  <div>
   <h2>Metrics</h2>

   <Stack
    spacing={2}
    sx={{
     height: 250,
     alignItems: "center",
     border: "1px solid #ccc",
     borderRadius: 2,
    }}
   >
    <BarChart
     layout='horizontal'
     yAxis={[
      {
       id: "barCategories",
       data: metrics.cpu.map((_, index) => index),
       scaleType: "band",
       label: "cpu",
      },
     ]}
     xAxis={[
      {
       id: "barValues",
       min: 0,
       max: 100,

       scaleType: "linear",

       label: "cpu usage",
       labelStyle: {
        letterSpacing: 0.5,
        fontSize: 14,
        fontWeight: 500,
       },

       colorMap: {
        type: "piecewise",
        thresholds: [0, 15, 30, 50, 75, 90, 100],

        colors: [colors.green[200], colors.green[400], colors.green[600], colors.orange[200], colors.orange[400], colors.red[400], colors.red[600]],
       },
      },
     ]}
     series={[
      {
       data: metrics.cpu.map((value) => value),
      },
     ]}
     width={chartWidth}
     height={chartHeight}
    />
    <Gauge
     value={(metrics.memory.used / metrics.memory.total) * 100}
     width={chartWidth}
     height={chartHeight}
     startAngle={-110}
     endAngle={110}
     text={`
    Memory Usage ${((metrics.memory.used / metrics.memory.total) * 100).toFixed(2)}%
    `}
    />
    <PieChart
     series={[
      {
       data: [
        {
         id: "used",
         value: metrics.disk.used,
         color: colors.red[400],
         label: "Used",
        },
        {
         id: "free",
         value: metrics.disk.free,
         color: colors.green[400],
         label: "Free",
        },
       ],

       valueFormatter: (context) => {
        const value = (context.value / 1024 / 1024 / 1024).toFixed(2);
        return `${value} GB`;
       },

       arcLabel: "formattedValue",
      },
     ]}
     width={chartWidth}
     height={chartHeight}
    />

    <Stack
     direction='column'
     sx={{
      width: chartWidth,
      height: chartHeight,

      overflow: "auto",

      // hide scrollbar
      "&::-webkit-scrollbar": {
       display: "none",
      },
     }}
    >
     <Typography variant='h6'>Network</Typography>

     {networkDetails.map((network) => (
      <Stack
       key={network.name}
       spacing={2}
       direction='row'
       sx={{
        justifyContent: "start",
        alignItems: "start",
       }}
      >
       <Typography
        variant='h6'
        sx={{
         flex: 1,
         color: colors.blue[400],
        }}
       >
        {network.name}
       </Typography>
       <Typography
        variant='body1'
        sx={{
         flex: 1,
         color: colors.red[400],
        }}
       >
        {" "}
        {convertBytes(network.bytes_sent)}
       </Typography>
       <Typography
        variant='body1'
        sx={{
         flex: 1,
         color: colors.green[400],
        }}
       >
        {" "}
        {convertBytes(network.bytes_recv)}
       </Typography>
      </Stack>
     ))}
    </Stack>
   </Stack>
  </div>
 );
};

export default HomePage;
