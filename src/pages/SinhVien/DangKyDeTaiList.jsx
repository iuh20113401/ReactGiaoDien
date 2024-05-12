import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiFilter, HiSearch } from "react-icons/hi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { P2 } from "../../ui/Typography";
import { Button, OutlineButton } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import Badges from "../../ui/Badge";
import { dangKyDeTai } from "../../API/sinhVien/DeTai";
import Loading from "../Loading";
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.6rem;
  transition: all 0.5s ease;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;
const rotateAndTranslate = keyframes`
  0% { 
    transform: rotateY(0) translateX(0); 
    opacity: 1;
  }
  50% { 
    opacity: 0.3;  
  }
  100% { 
    transform: rotateY(180deg) ; 
    opacity: 0;
  }
`;

const translateAndRotateBack = keyframes`
  0% { 
    transform: rotateY(180deg);
    opacity:0;
  }
  50% { 
    opacity:0.5;
  }
  100% { 
    transform: rotateY(0);
      opacity:1;
       }
`;

const FrontContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  backface-visibility: hidden;
  transition: all 0.3s ease;
  animation: ${({ type }) =>
    type === "active"
      ? css`
          ${translateAndRotateBack} 0.6s ease forwards
        `
      : css`
          ${rotateAndTranslate} 0.6s ease forwards
        `};
`;

const BackContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backface-visibility: hidden;
  gap: 0.8rem;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ type }) =>
    type === "active"
      ? css`
          ${translateAndRotateBack} 0.6s ease forwards
        `
      : css`
          ${rotateAndTranslate} 0.6s ease forwards
        `};
`;
const DeTaiListContaienr = styled.div`
  width: 100%;
  padding: 0 1.6rem;
`;
const DeTaiList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const DoAnLeft = styled.aside`
  width: 9.6rem;
  height: 6.4rem;
  border-radius: 50%;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const DoAnRight = styled.aside`
  width: 75%;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const ButtonDangKy = styled.div`
  width: 10%;
`;

const TagList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;
const HiddentElement = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${({ maxHeight }) => maxHeight};
`;
const FullScreenDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 100;
`;
const ButtonGroup = styled.div``;
const FilterToggle = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    & {
      display: flex;
      align-items: center;
      background-color: var(--color--secondary_3);
      width: 2rem;
      height: 3.2rem;
      cursor: pointer;
      z-index: 11;
    }
  }
`;
function DanhSachDeTaiList({ danhSachDeTai, onClick }) {
  const [searchDeTai, setSearchDeTai] = useState("");
  const [deTaiDaLoc, setdeTaiDaLoc] = useState(danhSachDeTai);

  useEffect(() => {
    if (searchDeTai) {
      setdeTaiDaLoc(
        danhSachDeTai.filter((dt) =>
          dt.tenDeTai.toLowerCase().includes(searchDeTai.toLowerCase())
        )
      );
    } else {
      setdeTaiDaLoc(danhSachDeTai);
    }
  }, [searchDeTai, danhSachDeTai]);
  return (
    <>
      <DeTaiListContaienr className="flex flexColumn g-8 ">
        <div className="flex flexCenter g-spaceBetween">
          <P2>{danhSachDeTai.length} Đề tài</P2>
          <div className="flex flexCenter g-8">
            <form onSubmit={(e) => e.preventDefault()}>
              <InputContainer full="none" type="inputGroup">
                <span>
                  <HiSearch />
                </span>
                <InputContainer.Input
                  type="text"
                  value={searchDeTai}
                  onChange={(e) => setSearchDeTai(e.target.value)}
                  placeholder="Nhập tên đề tài cần tìm"
                  id={"timKiem"}
                />
              </InputContainer>
            </form>
            <FilterToggle onClick={onClick}>
              <HiFilter />
            </FilterToggle>
          </div>
        </div>
        <DeTaiList>
          {danhSachDeTai.length ? (
            <DanhSachDoAnContainer danhSachDeTai={deTaiDaLoc} />
          ) : (
            <P2>Không có đề tài nào</P2>
          )}
        </DeTaiList>
      </DeTaiListContaienr>
    </>
  );
}
function DanhSachDoAnContainer({ danhSachDeTai }) {
  return danhSachDeTai.map(
    (dt) => dt.soLuongDoAn < 2 && <ChiTietDeTai dt={dt} />
  );
}

function ChiTietDeTai({ dt }) {
  const [active, setActive] = useState(false);
  const [dangky, setDangKy] = useState(false);
  const detailsRef = useRef(null);
  const maxHeight = active ? `${detailsRef.current.scrollHeight}px` : "0";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const {
    mutate: dangKyMutate,
    isLoading,
    error,
  } = useMutation({
    mutationFn: dangKyDeTai,
    onSuccess: () => {
      toast.success("Đăng ký đề tài thành công");
      queryClient.invalidateQueries("thongTinTaiKhoan");
      navigate("/sinhvien/quanLyDeTai");
    },
    onError: (error) => {
      toast.error("Đăng ký đề tài không thành công " + error.message);
    },
  });
  function dangKyHandler(maDeTai, maGiangVien) {
    const maDoAn =
      maDeTai.toString().slice(0, 2) +
      new Date().getFullYear().toString().slice(-2) +
      thongTinNguoiDung.maSinhVien.toString().slice(-4);
    dangKyMutate({
      maDoAn,
      maSinhVien: thongTinNguoiDung.maSinhVien,
      maDeTai,
      maGiangVien,
    });
  }
  return (
    <>
      {isLoading && (
        <FullScreenDiv>
          <Loading size={8.4} color="var(--color--main_7)" />
        </FullScreenDiv>
      )}
      <Container
        onClick={(e) => {
          if (e.target.localName === "button") return;
          !dangky && setActive((a) => !a);
        }}
      >
        <FrontContainer type={!dangky ? "active" : "hidden"}>
          <DoAnLeft>
            <img
              src={dt.HinhAnh || "../public/hinhanh/iuh_logo_2.png"}
              alt="Hình ảnh đề tài"
            />
          </DoAnLeft>
          <DoAnRight>
            <P2 size="1.8" className="bold">
              {dt.tenDeTai}
            </P2>
            <div className="flex g-4">
              <TagList>
                {dt.Tag?.split(",").map((tag) => (
                  <Badges
                    bgcolor={"var(--color--main_2)"}
                    color={"var(--color--main_7)"}
                    label={tag}
                    key={tag}
                  />
                ))}
              </TagList>
            </div>
            <P2>
              Giảng viên hướng dẫn: <strong> {dt.tenGiangVien}</strong>
            </P2>
            <HiddentElement ref={detailsRef} maxHeight={maxHeight}>
              <P2>
                <strong>Mô tả:</strong>
              </P2>
              <div dangerouslySetInnerHTML={{ __html: dt.moTa }}></div>
              <P2>
                <strong>Kỹ năng cần có:</strong>
              </P2>
              <div dangerouslySetInnerHTML={{ __html: dt.kyNangCanCo }}></div>
              <P2>
                <strong>Kết quả cần đạt:</strong>
              </P2>
              <p>{dt.ketQuaCanDat}</p>
            </HiddentElement>
          </DoAnRight>
          <ButtonDangKy>
            <Button
              color="var(--color--secondary_1)"
              bgcolor="var(--color--main_7)"
              onClick={() => setDangKy(true)}
            >
              Đăng ký{" "}
            </Button>
          </ButtonDangKy>
        </FrontContainer>
        <BackContainer type={dangky ? "active" : "hidden"}>
          <P2>Bạn có chắc muốn đăng ký đề tài này</P2>
          <ButtonGroup className=" flex g-16">
            <OutlineButton
              color="var(--color--main_7)"
              onClick={() => setDangKy(false)}
            >
              Hủy
            </OutlineButton>
            <Button
              color="var(--color--secondary_1)"
              bgcolor="var(--color--main_7)"
              onClick={() => dangKyHandler(dt.maDeTai, dt.maGiangVien)}
            >
              Đăng ký
            </Button>
          </ButtonGroup>
        </BackContainer>
      </Container>
    </>
  );
}

export default DanhSachDeTaiList;
