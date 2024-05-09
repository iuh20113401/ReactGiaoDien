import styled from "styled-components";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { H5 } from "../../ui/Typography";
import OverviewChart from "../../components/GiangVien/TrangChu/OvewiewChart";
import DeTaiSection from "../../components/GiangVien/TrangChu/DeTaiSection";
import { thongKeDeTai } from "../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import Loading from "../Loading";
const TrangChuContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function GiangVienTrangChu() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { data: thongTinThongKe, isLoading } = useQuery({
    queryKey: ["thongKeDeTai"],
    queryFn: () => thongKeDeTai({ maGiangVien: thongTinNguoiDung.maGiangVien }),
  });
  return (
    <TrangChuContainer>
      <H5>Chào mừng quay lại</H5>
      {isLoading && <Loading size={8.4} color="var(--color--main_7)" />}
      {!isLoading && (
        <>
          <OverviewChart thongKeThongKe={thongTinThongKe} />
          <DeTaiSection thongKeThongKe={thongTinThongKe} />
        </>
      )}
    </TrangChuContainer>
  );
}

export default GiangVienTrangChu;
