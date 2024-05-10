import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = () => {
  const data = {
    labels: ["0%", "25%", ">25%", "50%", "50%", "75%", "100%"],
    datasets: [
      {
        label: "Số đồ án",
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart size adapts to parent container without maintaining the aspect ratio
    plugins: {
      legend: {
        display: true, // This will show the legend (label "Population" in this case)
        position: "top", // Positioning the legend at the top
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiến độ hoàn thành", // Label for the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng đề tài", // Label for the y-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
