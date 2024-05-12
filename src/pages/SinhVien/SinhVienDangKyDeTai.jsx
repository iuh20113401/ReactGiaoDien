import React from "react";
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";

import { H6, PageHeader } from "../../ui/Typography";
import { IconDiv } from "../../ui/Container";
import { ButtonWithIcons } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import { DangKyDeTaiGrid } from "./DangKyDeTaiGrid";
import DanhSachDeTaiList from "./DangKyDeTaiList";
import { layDanhSachDeTai } from "../../API/sinhVien/DeTai";
import { HiX } from "react-icons/hi";
const DangKyDeTaiSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem 0;
  width: 100%;
  min-height: 100%;
  position: relative;
  min-height: 100vh;
  ${({ navactive }) =>
    navactive === "true" &&
    css`
      &::before {
        content: "";
        position: absolute;
        width: 101%;
        height: 100%;
        top: 0;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
      }
    `}
`;
const DangKyDeTaiContent = styled.article`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const FilterAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 20%;
  max-height: fit-content;
  padding: 1.6rem;
  border-right: 1px solid var(--color--secondary_3);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    &::-webkit-scrollbar {
      display: block;
    }
  }
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  @media screen and (max-width: 768px) {
    ${({ navactive }) =>
      navactive === "true"
        ? css`
            display: block;
            position: absolute;
            width: 30%;
            height: 100vh;
            top: 0;
            z-index: 10;
          `
        : css`
            display: none;
          `}
  }
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const FilterTitle = styled.p``;
const DanhSachDeTai = styled.aside`
  width: 80%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const FilterToggle = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    & {
      display: block;
      position: absolute;
      right: 1rem;
      cursor: pointer;
      z-index: 11;
    }
  }
`;

function SinhVienDangKyDeTai() {
  const { data, isLoading } = useQuery({
    queryKey: ["DanhSachDeTaiDangKy"],
    queryFn: () => layDanhSachDeTai(),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGiangVien, setSelectedGiangVien] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  function handlingChange(field = "sortby", value) {
    console.log(value);
    if (value === "" || value === null) {
      searchParams.delete(field);
    }
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }
  let DanhSachDeTaiDangKy = data;
  const chonGiangVien = (maGiangVien) => {
    const index = selectedGiangVien.indexOf(maGiangVien);
    if (index === -1) {
      setSelectedGiangVien([...selectedGiangVien, maGiangVien]);
    } else {
      setSelectedGiangVien(
        selectedGiangVien.filter((id) => id !== maGiangVien)
      );
    }
  };
  DanhSachDeTaiDangKy = useMemo(() => {
    if (!isLoading && data) {
      const direction = searchParams.get("sortby") === "tentangdan" ? 1 : -1;
      const filterDanhMuc = searchParams.get("danhmuc") || null;
      return data
        .filter((dt) => {
          if (selectedGiangVien.length === 0) return true;
          return selectedGiangVien.includes(dt.maGiangVien);
        })
        .filter((dt) => {
          if (filterDanhMuc === null) return true;
          return +dt.danhMuc === +filterDanhMuc;
        })
        .sort((a, b) => direction * a.tenDeTai.localeCompare(b.tenDeTai));
    }
    return data;
  }, [data, isLoading, searchParams, selectedGiangVien]);
  const danhSachGiangVien =
    !isLoading &&
    data.reduce((acc, curr) => {
      return acc.find((a) => a.maGiangVien === curr.maGiangVien)
        ? acc
        : [
            ...acc,
            { maGiangVien: curr.maGiangVien, tenGiangVien: curr.tenGiangVien },
          ];
    }, []);
  const danhSachDanhMuc =
    !isLoading &&
    DanhSachDeTaiDangKy.reduce((acc, curr) => {
      return acc.find((a) => a.maDanhMuc === curr.danhMuc)
        ? acc
        : [...acc, { maDanhMuc: curr.danhMuc, tenDanhMuc: curr.tenDanhMuc }];
    }, []);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  return (
    <DangKyDeTaiSection navactive={`${filterOpen}`}>
      <PageHeader>Danh sách đề tài</PageHeader>
      {!isLoading && (
        <DangKyDeTaiContent>
          <FilterAside navactive={`${filterOpen}`}>
            <FilterDiv>
              <div className="flex g-spaceBetween flexCenter">
                <FilterTitle>Sắp xếp</FilterTitle>
                <FilterToggle onClick={toggleFilter}>
                  <HiX />
                </FilterToggle>
              </div>
              <ButtonWithIcons
                bgcolor="var(--color--secondary_4)"
                color="var(--color--secondary_11)"
                shadow="none"
                onClick={() => handlingChange("sortby", "tentangdan")}
              >
                <IconDiv>
                  <HiMiniBarsArrowUp />
                </IconDiv>
                Theo tên đề tài tăng dần
              </ButtonWithIcons>
              <ButtonWithIcons
                bgcolor="var(--color--secondary_4)"
                color="var(--color--secondary_11)"
                shadow="none"
                onClick={() => handlingChange("sortby", "tengiamdan")}
              >
                <IconDiv>
                  <HiMiniBarsArrowDown />
                </IconDiv>
                Theo tên đề tài giảm dần
              </ButtonWithIcons>
            </FilterDiv>
            <H6>Lọc đề tài</H6>

            <FilterDiv>
              <FilterTitle>Theo giảng viên</FilterTitle>
              <InputContainer type="checkbox">
                <InputContainer.Checkbox
                  id="select-all-giangvien"
                  checked={
                    selectedGiangVien.length === danhSachGiangVien.length &&
                    selectedGiangVien.length !== 0
                  }
                  onChange={() =>
                    selectedGiangVien.length === danhSachGiangVien.length
                      ? setSelectedGiangVien([])
                      : setSelectedGiangVien(
                          danhSachGiangVien.map((gv) => gv.maGiangVien)
                        )
                  }
                />
                <InputContainer.Label>Chọn tất cả</InputContainer.Label>
              </InputContainer>
              {danhSachGiangVien?.map((dt) => (
                <InputContainer type="checkbox">
                  <InputContainer.Checkbox
                    id={dt.maGiangVien}
                    color="var(--color--secondary_10)"
                    checked={selectedGiangVien.includes(dt.maGiangVien)}
                    onChange={() => chonGiangVien(dt.maGiangVien)}
                  />
                  <InputContainer.Label>{dt.tenGiangVien}</InputContainer.Label>
                </InputContainer>
              ))}
            </FilterDiv>
            <FilterDiv>
              <FilterTitle>Theo danh mục đề tài</FilterTitle>
              {danhSachDanhMuc?.map((dm) => (
                <InputContainer type="checkbox" key={dm.maDanhMuc}>
                  <InputContainer.Checkbox
                    id={dm.maDanhMuc}
                    name={"danhmuc"}
                    color="var(--color--green_8 )"
                    onChange={(e) =>
                      handlingChange(
                        "danhmuc",
                        e.target.checked ? dm.maDanhMuc : ""
                      )
                    }
                  />
                  <InputContainer.Label>{dm.tenDanhMuc}</InputContainer.Label>
                </InputContainer>
              ))}
            </FilterDiv>
            <FilterDiv>
              <FilterTitle>Theo số lượng sinh viên đã đăng ký</FilterTitle>
              <InputContainer type="checkbox">
                <InputContainer.Radio
                  id={1}
                  name={"soluong"}
                  color="var(--color--red_7)"
                />
                <InputContainer.Label>0</InputContainer.Label>
              </InputContainer>
              <InputContainer type="checkbox">
                <InputContainer.Radio
                  id={1}
                  name={"soluong"}
                  color="var(--color--green_7)"
                />
                <InputContainer.Label>1</InputContainer.Label>
              </InputContainer>
            </FilterDiv>
          </FilterAside>
          <DanhSachDeTai>
            {!isLoading && DanhSachDeTaiDangKy && (
              <DanhSachDeTaiList
                danhSachDeTai={DanhSachDeTaiDangKy}
                onClick={toggleFilter}
              />
            )}
            {isLoading && (
              <div className="flex flexCenter g-center">
                <CgSpinner />
              </div>
            )}
          </DanhSachDeTai>
        </DangKyDeTaiContent>
      )}
    </DangKyDeTaiSection>
  );
}
export default SinhVienDangKyDeTai;
