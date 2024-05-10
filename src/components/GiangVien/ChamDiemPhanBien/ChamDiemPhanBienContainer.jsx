import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { P2 } from "../../../ui/Typography";
import Table, { Col, Col2, TieuDe } from "../../../ui/Table";
import { Container } from "../../../pages/GiangVien/GiangVienChamDiem";
import { layDanhSachPhanBien } from "../../../API/giangVien/DoAn";
import { XemChiTietDoAn } from "./XemChiTietDoAn";
import { DanhSachDiemPhanBienContainer } from "./DanhSachDiemPhanBienContainer";
import Loading from "../../../pages/Loading";
import NothingHere from "../../../../public/hinhanh/Nothing_here_yet_1.webp";
export const TagList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export function ChamDiemPhanBienContainer() {
  const [active, setActive] = useState(null);
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["dsDeTaiPhanBien"],
    queryFn: () => layDanhSachPhanBien(thongTinNguoiDung.maGiangVien),
  });
  const DanhSachSinhVien = !isLoading && data;

  const handleRowClick = (maDoAn) => {
    setActive(maDoAn);
  };

  return (
    <>
      {isLoading && <Loading size={8.4} color="var(--color--main_7)" />}
      {!isLoading && !DanhSachSinhVien.length && (
        <Container className="flex flexCenter">
          <img
            src={NothingHere}
            alt="Nothing here yet"
            width={"512rem"}
            height={"512rem"}
          />
        </Container>
      )}
      {!isLoading && (
        <>
          <Container>
            <Table gap="1.6">
              <TieuDe>
                <Col>
                  <P2 size="1.4">
                    <strong>STT</strong>
                  </P2>
                </Col>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Mã số sinh viên</strong>
                  </P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Họ và tên</strong>
                  </P2>
                </Col2>
                <Col className="g-center">
                  <P2 size="1.4">
                    <strong>Đồ án</strong>
                  </P2>
                </Col>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Giảng viên HD</strong>
                  </P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Điểm phản biện 1</strong>
                  </P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Điểm phản biện 2</strong>
                  </P2>
                </Col2>
              </TieuDe>
              <DanhSachDiemPhanBienContainer
                DanhSachSinhVien={DanhSachSinhVien}
                handleRowClick={handleRowClick}
              />
            </Table>
          </Container>
          {active && (
            <XemChiTietDoAn
              da={DanhSachSinhVien.find((da) => da.maDoAn === +active)}
              setActive={setActive}
            />
          )}
        </>
      )}
    </>
  );
}
