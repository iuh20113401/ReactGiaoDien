import React from "react";
import { useQuery } from "@tanstack/react-query";

import { P2 } from "../../../ui/Typography";
import Table, { Col, Col2, TieuDe } from "../../../ui/Table";
import { Container } from "../../../pages/GiangVien/GiangVienChamDiem";
import { layDanhSachDiemQuaTrinh } from "../../../API/giangVien/DoAn";
import { DanhSachDiemQuaTrinhContainer } from "./DanhSachDiemQuaTrinhContainer";
import Loading from "../../../pages/Loading";
import NothingHere from "../../../../public/hinhanh/Nothing_here_yet_1.webp";
export function ChamDiemQuaTrinhContainer() {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["thongtindiemquatrinh"],
    queryFn: () => layDanhSachDiemQuaTrinh(thongTinNguoiDung.maGiangVien),
  });
  const DanhSachSinhVien = isLoading ? [] : data || [];
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
      {!isLoading && DanhSachSinhVien.length > 0 && (
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
                    <strong>Tiến độ hoàn thành</strong>
                  </P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Điểm giữa kỳ</strong>
                  </P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4">
                    <strong>Điểm cuối kỳ </strong>
                  </P2>
                </Col2>
              </TieuDe>
              <DanhSachDiemQuaTrinhContainer
                refetch={refetch}
                DanhSachSinhVien={DanhSachSinhVien}
              />
            </Table>
          </Container>
        </>
      )}
    </>
  );
}
