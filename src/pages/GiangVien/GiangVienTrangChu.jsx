import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { H5 } from "../../ui/Typography";
import OverviewChart from "../../components/GiangVien/TrangChu/OvewiewChart";
import DeTaiSection from "../../components/GiangVien/TrangChu/DeTaiSection";
import { thongKeDeTai } from "../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import Loading from "../Loading";
import DoAnSection from "../../components/GiangVien/TrangChu/DoAnSection";
const TrangChuContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function GiangVienTrangChu() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { isLoading } = useQuery({
    queryKey: ["thongKeDeTai"],
    queryFn: () => thongKeDeTai({ maGiangVien: thongTinNguoiDung.maGiangVien }),
  });
  return (
    <TrangChuContainer>
      <H5>Chào mừng quay lại</H5>
      {isLoading && <Loading size={8.4} color="var(--color--main_7)" />}
      {!isLoading && (
        <>
          <OverviewChart />
          <DeTaiSection />
          <DoAnSection />
        </>
      )}
    </TrangChuContainer>
  );
}

export default GiangVienTrangChu;
