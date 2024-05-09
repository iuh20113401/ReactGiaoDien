import { useQuery } from "@tanstack/react-query";
import { layThongTinDoAn } from "../../API/sinhVien/DeTai";
import UseThongTinTaiKhoan from "../UseThongTinTaiKhoan";

function useThongTinDoAn() {
  const { data: thongTinTaiKhoan } = UseThongTinTaiKhoan();
  return useQuery({
    queryKey: ["thongtindoan"],
    queryFn: () => layThongTinDoAn({ maSinhVien: thongTinTaiKhoan.maSinhVien }),
  });
}

export default useThongTinDoAn;
