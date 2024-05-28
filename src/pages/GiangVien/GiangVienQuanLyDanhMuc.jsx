import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { H5, P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import Table, { Col, Col2, Col3, Row, TieuDe } from "../../ui/Table";
import { layDanhSachDanhMuc } from "../../API/giangVien/DeTai";
import { Tooltip } from "../../ui/Tooltip";

const QuanLyDanhMucContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: var(--color--white);
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;

function GiangVienQuanLyDanhMuc() {
  return (
    <QuanLyDanhMucContainer>
      <H5>Quản lý danh mục đề tài</H5>
      <Button bgcolor="var(--color--main_7)">Thêm danh mục mới</Button>
      <Container>
        <Table>
          <TieuDe>
            <Col>
              <P2 className="bold">STT</P2>
            </Col>
            <Col2>
              <P2 className="bold">Tên danh mục</P2>
            </Col2>
            <Col3 className="g-center">
              <P2 className="bold">Mô tả</P2>
            </Col3>
            <Col2 className="g-center">
              <P2 className="bold">Số lượng đề tài</P2>
            </Col2>
            <Col2 className="g-center">
              <P2 className="bold">Số lượng đồ án</P2>
            </Col2>
            <Col2 className="g-center">
              <P2 className="bold">Thao tác</P2>
            </Col2>
          </TieuDe>
          <HienThiDanhSachDanhMuc />
        </Table>
      </Container>
    </QuanLyDanhMucContainer>
  );
}
function HienThiDanhSachDanhMuc() {
  const { data: danhSachDanhMuc, isLoading } = useQuery({
    queryKey: ["danhSachDanhMuc"],
    queryFn: layDanhSachDanhMuc,
  });
  if (isLoading) return;
  return danhSachDanhMuc.map((danhMuc, index) => (
    <HienThiChiTietDanhMuc key={danhMuc.ma} danhMuc={danhMuc} index={index} />
  ));
}
function HienThiChiTietDanhMuc({ danhMuc, index }) {
  return (
    <Row>
      <Col>
        <P2 size="1.4">{index + 1}</P2>
      </Col>
      <Col2>
        <P2 size="1.4">{danhMuc.tenDanhMuc}</P2>
      </Col2>
      <Col3>
        <P2 size="1.4">{danhMuc.moTa}</P2>
      </Col3>
      <Col2 className="g-center">
        <P2 size="1.4">{danhMuc.soLuongDeTai}</P2>
      </Col2>
      <Col2 className="g-center">
        <P2 size="1.4">{danhMuc.soLuongDoAn}</P2>
      </Col2>
      <Col2 className="g-center">
        <div className="flex flexColumn g-8">
          <Tooltip
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            size="sm"
            content="Chỉnh sửa"
            direction="top"
            tcolor="true"
            shadow="none"
          >
            <HiPencil />
          </Tooltip>
          <Tooltip
            bgcolor="var(--color--red_7)"
            color="var(--color--secondary_1)"
            size="sm"
            content="Xóa"
            direction="top"
            tcolor="true"
            shadow="none"
          >
            <HiTrash />
          </Tooltip>
        </div>
      </Col2>
    </Row>
  );
}
export default GiangVienQuanLyDanhMuc;
