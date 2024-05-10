import React from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { HiCamera } from "react-icons/hi";
import { Spinner } from "../../ui/Spinner";
import { TabContentContents, TabHeaderContents } from "../../ui/Tab";
import { P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import Logo from "../../../public/hinhanh/iuh_logo_2.png";
import ThongTinCaNhanGiangVien from "../../components/GiangVien/ThongTinGiangVien/ThongTinCaNhan";
import toast from "react-hot-toast";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import { capNhatAnhDaiDien } from "../../API/giangVien/DeTai";

const TrangChuContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin-bottom: 3.2rem;
`;

const TitleContainer = styled.article`
  position: relative;
  margin-top: 1.6rem;
  width: 100%;
  height: 20rem;
  background-color: #fff;
  box-shadow: 0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  text-align: right;
  align-self: end;
  gap: 0.8rem;
`;

const Figure = styled.figure`
  width: 9.6rem;
  height: 9.6rem;
  border: 3px solid var(--color--secondary_5);
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 20%);
  box-sizing: content-box;
  display: flex;

  & > button {
    position: absolute;
    top: 80%;
    left: 70%;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    margin: auto;
    align-self: center;
    border-radius: 50%;
    justify-self: center;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  top: calc(50% + 3.2rem);
  left: 50%;
  transform: translate(-50%, 0%);
  box-sizing: content-box;
`;

const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 0.6rem;
`;

const TabArr = [
  {
    header: "Thông tin cá nhân",
    content: <ThongTinCaNhanGiangVien />,
  },
  {
    header: "Đổi mật khẩu",
    // content: <DoiMatKhauConainer />,
  },
];

const GiangVienThongTinGiangVien = () => {
  const [isActive, setIsActive] = useState(0);
  const { data, isLoading } = UseThongTinTaiKhoan();
  const [newTabArr] = useState([...TabArr]);
  const inputHinhAnh = useRef(null);

  const { mutate: capNhatAnhMutate, isLoading: capNhatAnhLoading } =
    useMutation({
      mutationFn: capNhatAnhDaiDien,
      onSuccess: () => {
        toast.success("Cập nhật ảnh đại diện thành công");
        window.location.reload();
      },
      onError: () => {
        toast.error("Cập nhật ảnh đại diện thất bại");
      },
    });

  const handleCapNhatAnh = () => {
    if (inputHinhAnh.current && inputHinhAnh.current.files.length > 0) {
      let formData = new FormData();
      formData.append("maGiangVien", data.maGiangVien);
      formData.append("hinhanh", inputHinhAnh.current.files[0]);
      if (capNhatAnhMutate) {
        capNhatAnhMutate(formData);
      } else {
        console.error("capNhatAnhMutate is not defined or is not a function");
      }
      inputHinhAnh.current.value = "";
    } else {
      console.error("No file selected or inputHinhAnh.current is not defined");
    }
  };

  return (
    <TrangChuContainer>
      {isLoading && (
        <div className="flex flexCenter g-center h-80">
          <Spinner color="var(--color--main_7)" />
        </div>
      )}
      {!isLoading && (
        <>
          <TitleContainer>
            <Figure>
              <ImgBox>
                <img src={`${data.hinhAnh || Logo}`} alt="Avatar" />
              </ImgBox>
              <Button
                size="sm"
                shadow="none"
                bgcolor="var(--color--secondary_3)"
                onClick={() => inputHinhAnh.current.click()}
              >
                <form>
                  <input
                    type="file"
                    ref={inputHinhAnh}
                    onChange={handleCapNhatAnh}
                    style={{ display: "none" }}
                  />
                </form>
                <HiCamera />
              </Button>
            </Figure>
            <InfoContainer>
              <P2
                size="1.6"
                color="var(--color--secondary_8)"
                className="bold textCenter"
              >
                {data.tenGiangVien}
              </P2>
              <P2 size="1.4" className=" textCenter">
                {data.maGiangVien} /{" "}
                {+data.vaiTro === 1 ? "Giảng viên" : "Trưởng bộ môn"}
              </P2>
            </InfoContainer>
          </TitleContainer>

          <Container>
            <TabHeaderContents
              TabArr={newTabArr}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <TabContentContents TabArr={newTabArr} isActive={isActive} />
          </Container>
        </>
      )}
    </TrangChuContainer>
  );
};

export default GiangVienThongTinGiangVien;
