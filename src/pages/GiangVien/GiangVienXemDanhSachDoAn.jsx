import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";

import { H5, P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import { layDanhSachDoAn } from "../../API/giangVien/DoAn";
import { DanhSachDoAnContainer } from "../../components/GiangVien/XemDanhSachDoAn/DanhSachDoAnContainer";
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
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
export const DoAnLeft = styled.aside`
  width: 9.6rem;
  height: 6.4rem;
  border-radius: 50%;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
export const DoAnRight = styled.aside`
  width: 75%;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const ButtonDangKy = styled.div`
  width: 15%;
`;

export const DoAnContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  backface-visibility: hidden;
  transition: all 0.3s ease;
`;
export const TagList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

function GiangVienXemDanhSachDoAn() {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data, isLoading } = useQuery({
    queryKey: ["dsDoAn"],
    queryFn: () => layDanhSachDoAn(thongTinNguoiDung.maGiangVien),
  });
  const [searchTen, setSearchTen] = useState("");
  const [searchDeTai, setSearchDeTai] = useState("");
  const DanhSachSinhVien = useMemo(() => {
    if (!data) return [];
    const normalizedSearchTen = searchTen.toLowerCase();
    const normalizedSearchDeTai = searchDeTai.toLowerCase();
    return data.filter((dt) => {
      const hoTenMatches = normalizedSearchTen
        ? dt.tenSinhVien1.toLowerCase().includes(normalizedSearchTen) ||
          dt.tenSinhVien2?.toLowerCase().includes(normalizedSearchTen)
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
      <H5>Xem danh sách đồ án</H5>
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
          <Button
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            size="lg"
          >
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
            <DanhSachDoAnContainer DanhSachDoAn={DanhSachSinhVien} />
          </Container>
        )}
      </div>
    </XemDanhSachSinhVienContainer>
  );
}
export default GiangVienXemDanhSachDoAn;
