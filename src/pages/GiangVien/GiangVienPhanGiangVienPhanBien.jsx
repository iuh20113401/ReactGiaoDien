import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

import { H5, P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import { layDanhSachPhanCongPhanBien } from "../../API/giangVien/phanGiangVienPhanBien";
import {
  DanhSachDoAnContainer,
  PhanGiangVienPhanBien,
} from "../../components/GiangVien/DanhSachDoAnContainer";
const PhanGiangVienPhanBienContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
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
export function GiangVienPhanGiangVienPhanBien() {
  const [active, setActive] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["danhSachPhanCongPhanBien"],
    queryFn: layDanhSachPhanCongPhanBien,
  });
  const [searchTen, setSearchTen] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  function SetParam(field, value) {
    searchParam.set(field, value);
    setSearchParam(searchParam);
  }
  const DanhSachDoAn = useMemo(() => {
    return data?.filter((dt) => {
      const isSearchTen = searchTen
        ? dt.tenDeTai.toLowerCase().includes(searchTen.toLowerCase())
        : true;
      const param = searchParam.get("giangvien");
      const isSearchParam = param ? dt.maGiangVien === +param : true;
      return isSearchParam && isSearchTen;
    });
  }, [data, searchParam, searchTen]);
  return (
    !isLoading && (
      <>
        <PhanGiangVienPhanBienContainer>
          <H5>Phân giảng viên phản biện</H5>
          <Container>
            <InputContainer type="inputGroup">
              <span>
                <HiSearch />
              </span>
              <InputContainer.Input
                type="text"
                placeholder="Nhập tên đề tài cần tìm"
                id="tendetai"
                size="block"
                value={searchTen}
                onChange={(e) => setSearchTen(e.target.value)}
              />
            </InputContainer>
            <InputContainer type="horizontal" gap="2.4">
              <InputContainer.Select
                size="block"
                onChange={(e) => SetParam("giangvien", e.target.value)}
              >
                <option value="">Theo giảng viên</option>
                <option value="2011340341">Trần Thị Kim Chi</option>
                <option value="2011340342">Huỳnh Nam</option>
                <option value="2011340343">Võ Ngọc Tấn Phước</option>
              </InputContainer.Select>
              <InputContainer.Select size="block">
                <option value="0">Theo tag</option>
                <option value="">HTML</option>
                <option value="">CSS</option>
                <option value="">Phân tích dữ liệu</option>
                <option value="">Javascript</option>
              </InputContainer.Select>
              <InputContainer.Select size="block">
                <option value="0">Chọn theo kỹ năng yêu cầu</option>
                <option value="0">HTML</option>
                <option value="0">CSS</option>
                <option value="0">Javascript</option>
                <option value="0">Phân tích yêu cầu</option>
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
          <article className="flex flexColumn g-8">
            <div className="flex flexCenter g-spaceBetween">
              <P2>{DanhSachDoAn.length} Đồ án</P2>
              <InputContainer.Select>
                <option value="">Sắp xếp theo </option>
                <option value="0">Tên đề tài tăng dẫn </option>
                <option value="1">Tên đề tài giảm dẫn </option>
              </InputContainer.Select>
            </div>
            <Container>
              <DanhSachDoAnContainer
                DanhSachDoAn={DanhSachDoAn}
                setChiTiet={setActive}
              />
            </Container>
          </article>
        </PhanGiangVienPhanBienContainer>
        {active && (
          <PhanGiangVienPhanBien
            da={DanhSachDoAn.find((da) => da.maDoAn === active)}
            setActive={setActive}
          />
        )}
      </>
    )
  );
}
export default GiangVienPhanGiangVienPhanBien;
