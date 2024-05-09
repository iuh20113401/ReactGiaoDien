import { useQuery } from "@tanstack/react-query";
import { layThongTin } from "../API/DangNhap";
import Cookies from "universal-cookie";

function UseThongTinTaiKhoan() {
  const cookies = new Cookies();
  const { taiKhoan, vaiTro } = cookies?.get("user") || {
    taiKhoan: null,
    vaiTro: null,
  };
  return useQuery({
    queryKey: ["thongTinTaiKhoan"],
    queryFn: () => layThongTin({ maTaiKhoan: taiKhoan, vaiTro }),
    retry: 2,
    staleTime: 0,
    onError: (error) => {
      if (error?.status === 401) {
        console.error("Authentication error: Access is denied.");
      }
    },
  });
}

export default UseThongTinTaiKhoan;
