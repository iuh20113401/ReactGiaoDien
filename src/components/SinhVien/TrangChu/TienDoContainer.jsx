import { useQuery } from "@tanstack/react-query";

import { P2 } from "../../../ui/Typography";
import CreateProgressBar from "../../../ui/ProgressBar";
import { layHuongDanTheoSinhVien } from "../../../API/sinhVien/DeTai";
export function TienDoContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["huongdan"],
    queryFn: () => layHuongDanTheoSinhVien({ maSinhVien: "20113401" }),
    onError: () => {
      data = [];
    },
  });
  const percent =
    (!isLoading &&
      Math.ceil(
        (data?.filter((dt) => dt.trangthai).length / data.length) * 100
      )) ||
    0;
  return (
    <>
      <P2>Tiến độ hoàn thành đồ án </P2>
      <CreateProgressBar
        size={1.6}
        color={"var(--color--main_7)"}
        percent={percent}
        label="50"
      />
    </>
  );
}
