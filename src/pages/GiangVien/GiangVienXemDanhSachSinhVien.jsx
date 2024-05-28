import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HiSearch } from "react-icons/hi";
import { FaFileExcel } from "react-icons/fa6";

import { H5, P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import Table, { Col, Col2, TieuDe } from "../../ui/Table";
import { layDanhSachSinhVien } from "../../API/giangVien/DoAn";
import { DanhSachDeTaiContainer } from "../../components/GiangVien/XemDanhSachSinhVien/DanhSachDeTaiContainer";
import Loading from "../Loading";

const XemDanhSachSinhVienContainer = styled.section`
  width: 100%;
  height: auto;
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
const XuatFileContainter = styled.div`
  position: fixed;
  right: 0;
  bottom: 5%;
`;
const createExcel = (data) => {
  const Heading = [
    [
      "Mã sinh viên",
      "Mã đồ án",
      "Họ tên",
      "Email",
      "Số điện thoại",
      "Lớp",
      "Tiến độ hoàn thành",
      "Tên đề tài",
    ],
  ];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(worksheet, Heading);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Tạo file excel từ workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(blob, "data.xlsx");
};
function GiangVienXemDanhSachSinhVien() {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data, isLoading } = useQuery({
    queryKey: ["dsDoAn"],
    queryFn: () => layDanhSachSinhVien(thongTinNguoiDung.maGiangVien),
  });
  const [searchTen, setSearchTen] = useState("");
  const [searchDeTai, setSearchDeTai] = useState("");
  const DanhSachSinhVien = useMemo(() => {
    if (!data) return [];
    const normalizedSearchTen = searchTen.toLowerCase();
    const normalizedSearchDeTai = searchDeTai.toLowerCase();
    return data.filter((dt) => {
      const hoTenMatches = normalizedSearchTen
        ? dt.hoTen.toLowerCase().includes(normalizedSearchTen)
        : true;
      const tenDeTaiMatches = normalizedSearchDeTai
        ? dt.tenDeTai.toLowerCase().includes(normalizedSearchDeTai)
        : true;

      return hoTenMatches && tenDeTaiMatches;
    });
  }, [data, searchTen, searchDeTai]);
  return isLoading ? (
    <Loading size={8.4} color="var(--color--main_7)" />
  ) : (
    <XemDanhSachSinhVienContainer>
      <H5>Xem danh sách sinh viên</H5>
      <XuatFileContainter>
        <Button
          bgcolor="var(--color--green_7)"
          onClick={() => createExcel(data)}
        >
          <FaFileExcel /> Xuất file excel
        </Button>
      </XuatFileContainter>
      <Container>
        <InputContainer type="inputGroup">
          <span>
            <HiSearch />
          </span>
          <InputContainer.Input
            type="text"
            placeholder="Nhập tên sinh viên cần tìm"
            id="tendetai"
            size="block"
            value={searchTen}
            onChange={(e) => setSearchTen(e.target.value)}
          />
        </InputContainer>
        <InputContainer type="inputGroup">
          <span>
            <HiSearch />
          </span>
          <InputContainer.Input
            type="text"
            placeholder="Tìm theo đề tài"
            id="tendetai"
            size="block"
            value={searchDeTai}
            onChange={(e) => setSearchDeTai(e.target.value)}
          />
        </InputContainer>
        <InputContainer type="horizontal" gap="2.4">
          <InputContainer.Select size="block">
            <option value="0">Sắp xếp theo</option>
            <option value="1">Mã đồ án tăng dần</option>
            <option value="2">Mã đồ án tăng dần</option>
            <option value="3">Tên đề tài</option>
            <option value="4">Tiến độ hoàn thành</option>
          </InputContainer.Select>
        </InputContainer>
        <div>
          <Button bgcolor="var(--color--main_7)" size="lg">
            Tìm kiếm
          </Button>
        </div>
      </Container>
      <div className="mt-2">
        <div className="flex g-spaceBetween">
          <P2>{DanhSachSinhVien.length} Kết quả</P2>
          <InputContainer.Select inputStyle="transparent">
            <option value="1">Danh sách</option>
            <option value="2">Lưới</option>
          </InputContainer.Select>
        </div>
        {!DanhSachSinhVien.length && (
          <Container className="flex flexCenter">
            <img
              src="../public/hinhanh/Nothing_here_yet_1.webp"
              alt="Nothing here yet"
              width={"512rem"}
              height={"512rem"}
            />
          </Container>
        )}

        {DanhSachSinhVien.length > 0 && (
          <Container className="mt-1">
            <Table gap="1.6">
              <TieuDe>
                <Col>
                  <P2 size="1.4">
                    <strong>STT</strong>
                  </P2>
                </Col>
                <Col2>
                  <P2 size="1.4">
                    <strong>Họ và tên</strong>
                  </P2>
                </Col2>
                <Col className="g-center">
                  <P2 size="1.4">
                    <strong>Lớp</strong>
                  </P2>
                </Col>
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

                <Col2>
                  <P2 size="1.4" className="textCenter">
                    <strong>Tên đè tài</strong>
                  </P2>
                </Col2>

                <Col2>
                  <P2 size="1.4">
                    <strong>Email</strong>
                  </P2>
                </Col2>
                <Col>
                  <P2 size="1.4">
                    <strong>SDT </strong>
                  </P2>
                </Col>
              </TieuDe>
              <DanhSachDeTaiContainer DanhSachSinhVien={DanhSachSinhVien} />
            </Table>
          </Container>
        )}
      </div>
    </XemDanhSachSinhVienContainer>
  );
}
export default GiangVienXemDanhSachSinhVien;
