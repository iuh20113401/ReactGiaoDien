import { Line } from "react-chartjs-2";

export const LineChart = () => {
  // Dữ liệu và cấu hình cho biểu đồ
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Số lượng người dùng mới 2024",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};
