import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = () => {
  const data = {
    labels: ["ERP", "Ứng dụng", "Nghiên cứu công nghệ mới", "Kết hợp IOT"],
    datasets: [
      {
        label: "Danh mục đề tài",
        data: [300, 500, 100, 400],
        backgroundColor: "#60a5fa",
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
          text: "Tên danh mục", // Label for the x-axis
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

export default Histogram;
