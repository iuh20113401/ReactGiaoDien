import { useQuery } from "@tanstack/react-query";
import { layThongTinDoAn } from "../API/giangVien/DoAn";

function useThongTinDoAn({ maDoAn }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["thongTinDoAn", maDoAn],
    queryFn: () => layThongTinDoAn(maDoAn),
    enabled: !!maDoAn,
  });
  return { data, isLoading, isError, error };
}

export default useThongTinDoAn;
