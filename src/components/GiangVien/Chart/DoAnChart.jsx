import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import useThongTinThongKe from "../TrangChu/useThongTinThongKe";

export default function DoAnChart() {
  const { thongTinThongKe: data } = useThongTinThongKe();
  const TienDoData = data.thongKeTienDo;
  const data01 = TienDoData?.reduce(
    (acc, item) => {
      if (+item.trangThai === 0) {
        acc[0].value += 1;
      } else {
        acc[1].value += 1;
      }
      return acc;
    },
    [
      { name: "Chưa phê duyệt", value: 0 },
      { name: "Đã phê duyệt", value: 0 },
    ]
  );
  const data02 = TienDoData.reduce(
    (acc, item) => {
      if (+item.tienDo < 25) {
        acc[0].value += 1;
      } else if (+item.tienDo >= 25 && +item.tienDo < 50) {
        acc[1].value += 1;
      } else if (+item.tienDo >= 50 && +item.tienDo < 75) {
        acc[2].value += 1;
      } else {
        acc[3].value += 1;
      }
      return acc;
    },
    [
      { name: "<25%", value: 0 },
      { name: "25-50%", value: 0 },
      { name: "50-75%", value: 0 },
      { name: ">75%", value: 0 },
    ]
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
