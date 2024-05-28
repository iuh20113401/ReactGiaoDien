import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useThongTinThongKe from "../TrangChu/useThongTinThongKe";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const newName = [
  "",
  "Chờ duyệt",
  "Đã duyệt",
  "Không duyệt",
  "Đã đăng ký",
  "Đã đầy",
];
export default function DeTaiChart() {
  const { thongTinThongKe: data } = useThongTinThongKe();
  const keys = Object.keys(data.thongKeDeTaiTheoTrangThai);
  const values = Object.values(data.thongKeDeTaiTheoTrangThai);

  const newData = keys.reduce((acc, key, index) => {
    index > 0 &&
      values[index] > 0 &&
      acc.push({ name: newName[index], value: values[index] });
    return acc;
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Pie
          data={newData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {newData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
