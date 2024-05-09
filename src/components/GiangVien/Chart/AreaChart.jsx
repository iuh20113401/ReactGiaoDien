import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const AreaChart = () => {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Visitors",
        data: [65, 59, 80, 81],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return <Line data={data} />;
};

export default AreaChart;
