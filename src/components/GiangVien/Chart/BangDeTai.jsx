import React from "react";

import { P2 } from "../../../ui/Typography";
import Table, { Col, Col2, Col3, Row, TieuDe } from "../../../ui/Table";
import Badges from "../../../ui/Badge";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { useQuery } from "@tanstack/react-query";
import { layDanhSachDeTai } from "../../../API/giangVien/DeTai";
import styled from "styled-components";
const TrangThai = [
  {
    ten: "Chờ duyệt",
    bgcolor: "var(--color--red_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Không duyệt",
    bgcolor: "var(--color--red_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã duyệt",
    bgcolor: "var(--color--main_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã đăng ký",
    bgcolor: "var(--color--yellow_5)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã đầy",
    bgcolor: "var(--color--green_7)",
    color: "var(--color--secondary_1)",
  },
];
function DanhSachDeTaiContainer({ DanhSachDeTai, setActive, refetch }) {
  return (
    <Table>
      <TieuDe>
        <Col2 className="g-center">
          <P2 size="1.4" className="textCenter">
            <strong>Số thứ tự</strong>
          </P2>
        </Col2>
        <Col2 className="g-center">
          <P2 size="1.4" className="textCenter">
            <strong>Trạng thái</strong>
          </P2>
        </Col2>
        <Col3 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Hình ảnh đề tài</strong>
          </P2>
        </Col3>
        <Col3 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Tên đề tài</strong>
          </P2>
        </Col3>
        <Col2 className="flexCenter g-center">
          <P2 size="1.4">
            <strong>Số lượng đồ án</strong>
          </P2>
        </Col2>
      </TieuDe>
      {DanhSachDeTai.map((dt, index) => {
        return (
          <ChiTietDeTai
            dt={dt}
            index={index + 1}
            key={dt.MaDeTai}
            {...{ setActive, refetch }}
          />
        );
      })}
    </Table>
  );
}
function ChiTietDeTai({ dt, index }) {
  const tt = TrangThai.filter((tt) => dt.TrangThai === tt.ten)[0];
  return (
    <Row key={dt.MaDeTai}>
      <Col2 className="flexCenter g-center">{index}</Col2>
      <Col2 className="flexCenter g-center">
        {
          <Badges
            label={`${tt.ten}`}
            bgcolor={`${tt.bgcolor}`}
            color={tt.color}
          />
        }
      </Col2>
      <Col3 className="flexCenter g-center">
        <img
          src={dt.HinhAnh}
          alt={dt.TenDeTai}
          width={"100px"}
          height={"100px"}
        />
      </Col3>
      <Col3 className="flexCenter g-center">
        <P2 size="1.4">{dt.TenDeTai}</P2>
      </Col3>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{dt.soLuongDoAn}</P2>
      </Col2>
    </Row>
  );
}
const BangDeTaiContainen = styled.article`
  width: auto;
  height: 100%;
  overflow-x: scroll;
  grid-column: span 2;
  max-height: 500px;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
`;
function BangDeTai() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["deTai"],
    queryFn: () => layDanhSachDeTai(thongTinNguoiDung.maGiangVien),
  });
  return (
    <BangDeTaiContainen>
      {!isLoading && (
        <DanhSachDeTaiContainer DanhSachDeTai={data} refetch={refetch} />
      )}
    </BangDeTaiContainen>
  );
}

export default BangDeTai;
