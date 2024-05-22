import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { H6, P2 } from "../../ui/Typography";
import { Container, ThreeContainer } from "../../ui/Container";
import CardContainer from "../../ui/Card";
import { Button, OutlineButton } from "../../ui/Button";
import ReactQuill from "react-quill";
import { dangKyDeTai } from "../../API/sinhVien/DeTai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";

export const ContentDiv = styled.div``;
export const BadgesDiv = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;
const modules = {
  toolbar: false,
};

export function DanhSachDeTaiGrid({ danhSachDeTai }) {
  const newDs = chiaDeTaiTheoCot(danhSachDeTai, 3);
  return (
    <ThreeContainer>
      <Container>
        {newDs[0].map((dt, index) => (
          <ThongTinDeTai dt={dt} key={index} />
        ))}
      </Container>
      <Container>
        {newDs[1].map((dt, index) => (
          <ThongTinDeTai
            dt={dt}
            key={index + Math.ceil(danhSachDeTai.length / 3)}
          />
        ))}
      </Container>
      <Container>
        {newDs[2].map((dt, index) => (
          <ThongTinDeTai
            dt={dt}
            key={index + Math.ceil((danhSachDeTai.length / 3) * 2)}
          />
        ))}
      </Container>
    </ThreeContainer>
  );
}
function chiaDeTaiTheoCot(danhSach, soCot) {
  const ketQua = Array.from({ length: soCot }, () => []);
  danhSach.forEach((deTai, index) => {
    const cot = index % soCot;
    ketQua[cot].push(deTai);
  });
  return ketQua;
}
function ThongTinDeTai({ dt }) {
  const [dangKy, setDangKy] = useState(false);
  return (
    <>
      <CardContainer>
        <CardContainer.Image>
          <img src={dt.HinhAnh} alt={dt.tenDeTai} />
        </CardContainer.Image>
        <CardContent deTai={dt} />
        <CardContainer.Footer position="end">
          <Button
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            className="bold"
            onClick={() => setDangKy(true)}
          >
            Đăng ký
          </Button>
        </CardContainer.Footer>
      </CardContainer>
      {dangKy && <DangKyDeTai dt={dt} setActive={setDangKy} />}
    </>
  );
}
function CardContent({ deTai }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <CardContainer.CardContent
        active={active}
        onclick={() => {
          !active && setActive(true);
        }}
      >
        <ContentDiv>
          <BadgesDiv>
            {deTai.Tag.split(",").map((tag) => (
              <CardContainer.Badge
                bgcolor="var(--color--main_5)"
                color="var(--color--secondary_1)"
                label={tag}
                key={tag}
              />
            ))}
          </BadgesDiv>
        </ContentDiv>
        <ContentDiv className="flex flexCenter">
          <P2 className="bold " size="1.4">
            {deTai.tenDeTai}
          </P2>
        </ContentDiv>
        <ContentDiv className="flex flexCenter">
          <P2 size="1.4">
            <strong>GVHD:</strong>
          </P2>
          <P2 className="ml-1" size="1.4">
            {deTai.tenGiangVien}
          </P2>
        </ContentDiv>
        {active && (
          <>
            <ContentDiv>
              <P2 size="1.4">
                <strong>Mô tả:</strong>
              </P2>
              <div className="mt-1">
                <ReactQuill
                  value={deTai.moTa}
                  readonly={true}
                  modules={modules}
                />
              </div>
            </ContentDiv>
            <ContentDiv>
              <P2 size="1.4">
                <strong>Kỹ năng cần có:</strong>
              </P2>
              <div className="mt-1">
                <ReactQuill
                  value={deTai.kyNangCanCo}
                  readonly={true}
                  modules={modules}
                />
              </div>
            </ContentDiv>
            <ContentDiv>
              <P2 size="1.4">
                <strong>Kết quả cần đạt:</strong>
              </P2>
              <P2 className="mt-1">{deTai.ketQuaCanDat}</P2>
            </ContentDiv>
            <OutlineButton
              color="var(--color--main_7)"
              onClick={() => setActive(false)}
            >
              Show less
            </OutlineButton>
          </>
        )}
      </CardContainer.CardContent>
    </>
  );
}
function DangKyDeTai({ dt, setActive }) {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: dangKyMutate, isLoading } = useMutation({
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
    <Modal onclick={() => setActive(false)}>
      <Modal.Title>
        <H6 className="bold">Đăng ký đề tài</H6>
        <Modal.Close />
      </Modal.Title>
      <Modal.Content>
        <P2>
          Bạn có chắc chắn muốn đăng ký đề tài <strong>{dt.tenDeTai}</strong>{" "}
          không?
        </P2>
        <div className="flex g-16 flexEnd mt-3">
          <OutlineButton
            color="var(--color--main_7)"
            onClick={() => setActive(false)}
          >
            Hủy
          </OutlineButton>
          <Button
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            className="bold"
            onClick={() => dangKyHandler(dt.maDeTai, dt.maGiangVien)}
          >
            Đăng ký
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
