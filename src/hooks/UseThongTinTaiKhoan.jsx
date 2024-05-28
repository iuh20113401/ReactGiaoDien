import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { layThongTin } from "../API/DangNhap";

function UseThongTinTaiKhoan() {
  const item = localStorage.getItem("user");
  const { taiKhoan, vaiTro } = JSON.parse(item)?.user || {};
  const [queried, setQueried] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
    queryFn: () => {
      console.log(taiKhoan, vaiTro);
      return layThongTin({ maTaiKhoan: taiKhoan, vaiTro });
    },
    retry: 2,
    staleTime: 0,
    enabled: !queried,
    onError: (error) => {
      if (error?.status === 401) {
        console.error("Authentication error: Access is denied.");
      }
    },
    onSuccess: () => {
      setQueried(true);
    },
  });

  return { data, isLoading, isError, error };
}

export default UseThongTinTaiKhoan;
