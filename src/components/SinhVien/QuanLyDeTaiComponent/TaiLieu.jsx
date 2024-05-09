import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { HiDocument } from "react-icons/hi";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";

import { H5, P2 } from "../../../ui/Typography";
import Table, { Col2, Col4, Row, TieuDe } from "../../../ui/Table";
import { Button, OutlineButton } from "../../../ui/Button";
import { DragAndDrop } from "./DragAndDrop";
import { layDanhSachTaiLieu } from "../../../API/sinhVien/DeTai";
import { formatDate } from "../../../utils/formatDate";
import useThongTinDoAn from "../../../hooks/sinhVien/useThongTinDoAn";
import Loading from "../../../pages/Loading";
import { Spinner } from "../../../ui/Spinner";
const TaiLieuContainer = styled.article`
  width: 100%;
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TaiLieuTitle = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1.6rem;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
`;
const TableContent = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1.6rem;
  border-radius: 0.3rem;
`;
const IconDiv = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.4rem;
  background-color: var(--color--main_2);
  border-radius: 0.6rem;
  margin-right: 1.6rem;
  & > svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color--main_5);
    align-items: center;
    justify-content: center;
  }
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
function TaiLieu() {
  const { data: thongTinDoAn } = useThongTinDoAn();
  const DoAn = thongTinDoAn.thongTinDoAn;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["danhSachTaiLieu"],
    queryFn: () => layDanhSachTaiLieu(DoAn.maDoAn),
  });
  const [isUpload, setIsUpload] = useState(false);
  return (
    <TaiLieuContainer>
      <TaiLieuTitle>
        <H5>Tài liệu</H5>
      </TaiLieuTitle>
      <OutlineButton
        color="var(--color--main_7)"
        onClick={() => setIsUpload((pre) => !pre)}
      >
        <P2
          className="flex g-center flexCenter g-8"
          color="var(--color--main_7)"
        >
          <HiMiniArrowUpTray />
          Upload tài liệu
        </P2>
      </OutlineButton>
      <Container>
        {isUpload && <DragAndDrop maDoAn={DoAn.maDoAn} refetch={refetch} />}
      </Container>
      <div>
        {isLoading && <Loading size={8.4} color="var(--color--main_7)" />}
        {!isLoading && <ThongTinTaiLieu danhSachTaiLieu={data} />}
      </div>
    </TaiLieuContainer>
  );
}
function ThongTinTaiLieu({ danhSachTaiLieu }) {
  return (
    <>
      <Table>
        <TieuDe>
          <Col4>
            <P2 color="var(--color--secondary_9)" className="semibold">
              Tên file
            </P2>
          </Col4>
          <Col2>
            <P2 color="var(--color--secondary_9)" className="semibold">
              Loại
            </P2>
          </Col2>
          <Col2>
            <P2 color="var(--color--secondary_9)" className="semibold">
              Kích thước
            </P2>
          </Col2>
          <Col2>
            <P2 color="var(--color--secondary_9)" className="semibold">
              Ngày đăng
            </P2>
          </Col2>
          <Col2>
            <P2 color="var(--color--secondary_9)" className="semibold">
              Hành động
            </P2>
          </Col2>
        </TieuDe>
      </Table>
      <TableContent>
        <Table>
          {danhSachTaiLieu.map((tl) => (
            <ChiTietTaiLieu taiLieu={tl} key={tl.maTaiLieu} />
          ))}
        </Table>
      </TableContent>
    </>
  );
}
function ChiTietTaiLieu({ taiLieu }) {
  let loaiIcon;
  switch (taiLieu.loai) {
    case "doc":
    case "docx":
      loaiIcon = <FaFileWord />;
      break;
    case "ppt":
    case "pptx":
      loaiIcon = <FaFilePowerpoint />;
      break;
    case "pdf":
      loaiIcon = <FaFilePdf />;
      break;
    default:
      loaiIcon = <HiDocument />;
  }
  return (
    <Row>
      <Col4>
        <IconDiv>{loaiIcon}</IconDiv>
        <P2 color="var(--color--secondary_8)" size="1.4" className="semibold">
          {taiLieu.tenTaiLieu}
        </P2>
      </Col4>
      <Col2>
        <P2 color="var(--color--secondary_8)" size="1.4">
          {taiLieu.loai}
        </P2>
      </Col2>
      <Col2>
        <P2 color="var(--color--secondary_8)" size="1.4">
          {Math.round(parseInt(taiLieu.dungLuong))} MB
        </P2>
      </Col2>
      <Col2>
        <P2 color="var(--color--secondary_8)" size="1.4">
          {formatDate(taiLieu.ngayDang)}
        </P2>
      </Col2>
      <Col2>
        <NavLink to={taiLieu.duongDan}>
          <Button bgcolor="var(--color--main_3)" color="var(--color--main_7)">
            Tải về
          </Button>
        </NavLink>
      </Col2>
    </Row>
  );
}
export default TaiLieu;
