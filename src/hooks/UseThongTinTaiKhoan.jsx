import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { layThongTin } from "../API/DangNhap";
import Cookies from "universal-cookie";

function UseThongTinTaiKhoan() {
  const cookies = new Cookies();
  const { taiKhoan, vaiTro } = cookies?.get("user") || {
    taiKhoan: null,
    vaiTro: null,
  };

  // Sử dụng useState để lưu trữ trạng thái đã thực hiện truy vấn hay chưa
  const [queried, setQueried] = useState(false);

  // Sử dụng queryClient để lấy dữ liệu từ cache
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
    queryFn: () => layThongTin({ maTaiKhoan: taiKhoan, vaiTro }),
    retry: 2,
    staleTime: 0,
    enabled: !queried, // Chỉ kích hoạt query lần đầu tiên
    onError: (error) => {
      if (error?.status === 401) {
        console.error("Authentication error: Access is denied.");
      }
    },
    onSuccess: () => {
      setQueried(true); // Đánh dấu đã thực hiện truy vấn
    },
  });

  return { data, isLoading, isError, error };
}

export default UseThongTinTaiKhoan;
