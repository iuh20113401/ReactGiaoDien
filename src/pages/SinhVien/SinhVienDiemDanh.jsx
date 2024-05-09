import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { layThongTinDiemDanh } from "../../API/sinhVien/DeTai";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import { CheckInPage } from "../../components/SinhVien/DiemDanh/CheckInPage";

function SinhVienDiemDanh() {
  const [searchParams, setSearchParams] = useSearchParams();
  const maDiemDanh = searchParams.get("maDiemDanh");
  const { data } = UseThongTinTaiKhoan();

  const {
    data: thongTinDiemDanh,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["layThongTinDiemDanh"],
    queryFn: () =>
      layThongTinDiemDanh({ maDiemDanh, maSinhVien: data?.maSinhVien }),
    enabled: !!maDiemDanh && !!data?.maSinhVien,
  });

  return thongTinDiemDanh && <CheckInPage data={thongTinDiemDanh} />;
}
export default SinhVienDiemDanh;
