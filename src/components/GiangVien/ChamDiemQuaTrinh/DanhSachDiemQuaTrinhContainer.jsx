import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { P2 } from "../../../ui/Typography";
import { Col, Col2, Row } from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { HiPencil } from "react-icons/hi";
import { chamDiemCuoiKy, chamDiemGiuaKy } from "../../../API/giangVien/DoAn";
import { InputContainer } from "../../../ui/Input";

export function DanhSachDiemQuaTrinhContainer({ DanhSachSinhVien, refetch }) {
  return DanhSachSinhVien.sort((a, b) => a.MaDoAn - b.MaDoAn).map(
    (sv, index) => {
      return (
        <ChiTietSinhVien sv={sv} key={sv.maSinhVien} {...{ refetch, index }} />
      );
    }
  );
}
function ChiTietSinhVien({ sv, refetch, index }) {
  const [isDiemGiuaKy, setIsDiemGiuaKy] = useState(null);
  const [isDiemCuoiKy, setIsDiemCuoiKy] = useState(null);
  const { mutate: diemGiuaKyMutate, isLoading: diemGiuaKyLoading } =
    useMutation({
      mutationFn: chamDiemGiuaKy,
      onSuccess: () => {
        toast.success("Chấm điểm giũa kỳ thành công");
        refetch();
      },
      onError: () => {
        toast.error("Chấm điểm không thành công");
      },
    });
  const { mutate: diemCuoiKyMutate, isLoading: diemCuoiKyLoading } =
    useMutation({
      mutationFn: chamDiemCuoiKy,
      onSuccess: () => {
        toast.success("Chấm điểm cuối kỳ thành công");
        refetch();
      },
      onError: () => {
        toast.error("Chấm điểm không thành công");
      },
    });
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsDiemGiuaKy(null);
        setIsDiemCuoiKy(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  function setDiemGiuaKyHandler(e, maSinhVien) {
    e.preventDefault();
    diemGiuaKyMutate({ maSinhVien, diem: isDiemGiuaKy });
  }
  function setDiemCuoiKyHandler(e, maSinhVien) {
    e.preventDefault();
    diemCuoiKyMutate({ maSinhVien, diem: isDiemCuoiKy });
  }
  return (
    <Row key={sv.MaSinhVien}>
      <Col>
        <P2 size="1.4" className="g-center">
          {index + 1}
        </P2>
      </Col>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{sv.maSinhVien}</P2>
      </Col2>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{sv.tenSinhVien}</P2>
      </Col2>

      <Col className="textCenter">
        <P2 size="1.4">{sv.maDoAn}</P2>
      </Col>
      <Col2 className="flexCenter g-center">
        <P2 size="1.4">{sv.tienDoHoanThanh}</P2>
      </Col2>
      <Col2 className="flexCenter g-center">
        {sv.diemGiuaKy ? (
          <P2 size="1.4" className="textCenter">
            {sv.diemGiuaKy}
          </P2>
        ) : isDiemGiuaKy !== null ? (
          <form
            className="flex w-100"
            onSubmit={(e) => setDiemGiuaKyHandler(e, sv.maSinhVien)}
          >
            <InputContainer>
              <InputContainer.Input
                value={isDiemGiuaKy}
                onChange={(e) => setIsDiemGiuaKy(e.target.value)}
              />
            </InputContainer>
          </form>
        ) : (
          <Button size="sm" onClick={() => setIsDiemGiuaKy("")}>
            <HiPencil />
          </Button>
        )}
      </Col2>
      <Col2 className="flexCenter g-center">
        {sv.diemCuoiKy !== null ? (
          <P2 size="1.4" className="textCenter">
            {sv.diemCuoiKy}
          </P2>
        ) : isDiemCuoiKy !== null ? (
          <form
            className="flex w-100"
            onSubmit={(e) => setDiemCuoiKyHandler(e, sv.maSinhVien)}
          >
            <InputContainer>
              <InputContainer.Input
                value={isDiemCuoiKy}
                onChange={(e) => setIsDiemCuoiKy(e.target.value)}
              />
            </InputContainer>
          </form>
        ) : (
          <Button size="sm" onClick={() => setIsDiemCuoiKy("")}>
            <HiPencil />
          </Button>
        )}
      </Col2>
    </Row>
  );
}
