import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register components and plugins
Chart.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const data = {
    labels: [
      "Đề tài đã duyệt",
      "Đề tài chưa duyệt",
      "Đề tài yêu cầu chỉnh sửa",
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Display the legend
        position: "bottom", // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    // Additional configuration for responsiveness and maintaining aspect ratio
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={data} options={options} />;
};
