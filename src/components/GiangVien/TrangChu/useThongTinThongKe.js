import { useQuery } from "@tanstack/react-query";
import { thongKeDeTai } from "../../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";

function useThongTinThongKe() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { data: thongTinThongKe, isLoading } = useQuery({
    queryKey: ["thongKeDeTai"],
    queryFn: () => thongKeDeTai({ maGiangVien: thongTinNguoiDung.maGiangVien }),
  });

  return { thongTinThongKe, isLoading };
}

export default useThongTinThongKe;
