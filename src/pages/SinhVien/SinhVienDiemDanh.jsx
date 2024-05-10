import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { layThongTinDiemDanh } from "../../API/sinhVien/DeTai";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import { CheckInPage } from "../../components/SinhVien/DiemDanh/CheckInPage";
import toast from "react-hot-toast";
import { useEffect } from "react";

function SinhVienDiemDanh() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = UseThongTinTaiKhoan();
  const diemDanhData = searchParams.get("data");
  const { maSinhVien } = data || {};
  const maDiemDanh = JSON.parse(diemDanhData)?.maDiemDanh;
  const navigate = useNavigate();
  const {
    data: thongTinDiemDanh,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["layThongTinDiemDanh"],
    queryFn: () => layThongTinDiemDanh({ maDiemDanh, maSinhVien }),
    enabled: !!maDiemDanh && !!data?.maSinhVien,
  });
  useEffect(() => {
    const reload = setTimeout(() => {
      if (!maDiemDanh) {
        toast.error("Có lỗi xảy ra khi lấy thông tin điểm danh");
        navigate("/sinhvien/trangchu");
      }
    }, 1000);
    return () => clearTimeout(reload);
  }, [maDiemDanh, navigate]);
  return (
    !isLoading && thongTinDiemDanh && <CheckInPage data={thongTinDiemDanh} />
  );
}

export default SinhVienDiemDanh;
