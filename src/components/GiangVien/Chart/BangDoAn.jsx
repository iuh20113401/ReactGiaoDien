import React from "react";

import { P2 } from "../../../ui/Typography";
import Table, { Col, Col2, Col3, Row, TieuDe } from "../../../ui/Table";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { layDanhSachDoAn } from "../../../API/giangVien/DoAn";

function DanhSachDoAnContainer({ DanhSachDoAn, setActive, refetch }) {
  return (
    <Table customwidth="150">
      <TieuDe>
        <Col className="g-center">
          <P2 size="1.4" className="textCenter">
            <strong>STT</strong>
          </P2>
        </Col>
        <Col2 className="g-center">
          <P2 size="1.4" className="textCenter">
            <strong>Mã đồ án</strong>
          </P2>
        </Col2>
        <Col3 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Tên đề tài</strong>
          </P2>
        </Col3>
        <Col2 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Tiến độ hoàn thành</strong>
          </P2>
        </Col2>
        <Col2 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Tên sinh viên 1</strong>
          </P2>
        </Col2>
        <Col2 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Tên sinh viên 2</strong>
          </P2>
        </Col2>
      </TieuDe>
      {DanhSachDoAn?.map((da, index) => {
        return <ChiTietDoAn da={da} index={index + 1} key={da.maDeTai} />;
      })}
    </Table>
  );
}
function ChiTietDoAn({ da, index }) {
  return (
    <Row key={da.MaDeTai}>
      <Col className="flexCenter g-center">{index}</Col>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{da.maDoAn}</P2>
      </Col2>
      <Col3 className="flexCenter g-center">
        {" "}
        <P2 size="1.4">{da.tenDeTai}</P2>
      </Col3>{" "}
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{da.mucDoHoanThanh}%</P2>
      </Col2>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{da.tenSinhVien1}</P2>
      </Col2>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{da.tenSinhVien2 || "Trống"}</P2>
      </Col2>
    </Row>
  );
}
const BangDoAnContainer = styled.article`
  width: auto;
  height: 100%;
  overflow-x: scroll;
  max-height: 500px;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
`;
function BangDoAn() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();

  const { data, isLoading } = useQuery({
    queryKey: ["dsDoAn"],
    queryFn: () => layDanhSachDoAn(thongTinNguoiDung.maGiangVien),
  });
  return (
    <BangDoAnContainer>
      {!isLoading && <DanhSachDoAnContainer DanhSachDoAn={data} />}
    </BangDoAnContainer>
  );
}

export default BangDoAn;
