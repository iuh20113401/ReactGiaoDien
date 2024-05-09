import styled, { css, keyframes } from "styled-components";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { layDanhSachLoiMoi, thamGiaDoAn } from "../../../API/sinhVien/DeTai";
import Badges from "../../../ui/Badge";
import { P2 } from "../../../ui/Typography";
import { Button, OutlineButton } from "../../../ui/Button";
import Loading from "../../../pages/Loading";
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
const ChiTietDeTaiContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  border-radius: 0.6rem;
  transition: all 0.5s ease;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;
function LoiMoi() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { data: danhSachLoiMoi, isLoading } = useQuery({
    queryKey: ["danhSachLoiMoi"],
    queryFn: () => {
      return layDanhSachLoiMoi(thongTinNguoiDung.maSinhVien);
    },
  });

  return (
    <div>
      {!isLoading &&
        danhSachLoiMoi.map((dt) => (
          <ChiTietLoiMoi
            dt={dt}
            maSinhVien={thongTinNguoiDung.maSinhVien}
            key={dt.maDeTai}
          />
        ))}
    </div>
  );
}
function ChiTietLoiMoi({ dt, maSinhVien }) {
  const [active, setActive] = useState(false);
  const [thamGia, setThamGia] = useState(false);
  const detailsRef = useRef(null);
  const maxHeight = active ? `${detailsRef.current.scrollHeight}px` : "0";
  const queryClient = useQueryClient();
  const { mutate: thamGiaMutate, isLoading: thamGiaLoading } = useMutation({
    mutationFn: thamGiaDoAn,
    onSuccess: () => {
      setThamGia(false);
      queryClient.invalidateQueries("thongTinTaiKhoan");
      toast.success("Tham gia thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Tham gia không thành công");
    },
  });
  const thamGiaHandler = () => {
    thamGiaMutate({ maDoAn: dt.maDoAn, maSinhVien });
  };
  return thamGiaLoading ? (
    <FullScreenDiv>
      <Loading size={8.4} color="var(--color--main_7)" />
    </FullScreenDiv>
  ) : (
    <ChiTietDeTaiContainer
      onClick={(e) => {
        if (e.target.localName === "button") return;
        !thamGia && setActive((a) => !a);
      }}
    >
      <FrontContainer type={!thamGia ? "active" : "hidden"}>
        <DoAnLeft>
          <img
            src={dt.HinhAnh || "../public/hinhanh/iuh_logo_2.png"}
            alt="Hình ảnh đề tài"
          />
        </DoAnLeft>
        <DoAnRight>
          <P2 size="1.6" className="bold">
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

          <P2 size="1.4" className="mt-2">
            Giảng viên hướng dẫn: <strong> {dt.tenGiangVien}</strong>
          </P2>

          <div className="flex g-32">
            <P2 size="1.4">Mã đồ án: {dt.maDoAn}</P2>
            <P2 size="1.4">
              Mã sinh viên: <strong> {dt.maSinhVien}</strong>
            </P2>
            <P2 size="1.4">
              Sinh viên: <strong> {dt.tenSinhVien}</strong>
            </P2>
          </div>
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
            onClick={() => setThamGia(true)}
          >
            Tham gia{" "}
          </Button>
        </ButtonDangKy>
      </FrontContainer>
      <BackContainer type={thamGia ? "active" : "hidden"}>
        <P2>Bạn có chắc muốn tham gia đồ án này</P2>
        <ButtonGroup className=" flex g-16">
          <OutlineButton
            color="var(--color--main_7)"
            onClick={() => setThamGia(false)}
          >
            Hủy
          </OutlineButton>
          <Button
            color="var(--color--secondary_1)"
            bgcolor="var(--color--main_7)"
            onClick={() => thamGiaHandler()}
          >
            Tham gia
          </Button>
        </ButtonGroup>
      </BackContainer>
    </ChiTietDeTaiContainer>
  );
}
export default LoiMoi;
