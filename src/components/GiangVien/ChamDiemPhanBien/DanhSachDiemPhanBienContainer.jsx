import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiPencil } from "react-icons/hi";
import { P2 } from "../../../ui/Typography";
import { Col, Col2, Row } from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { InputContainer } from "../../../ui/Input";
import {
  chamDiemPhanBien1,
  chamDiemPhanBien2,
} from "../../../API/giangVien/DoAn";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";

export function DanhSachDiemPhanBienContainer({
  DanhSachSinhVien,
  handleRowClick,
}) {
  return DanhSachSinhVien.sort((a, b) => a.MaDoAn - b.MaDoAn).map(
    (sv, index) => {
      return (
        <ChiTietDoAn
          key={sv.maSinhVien}
          index={index}
          sv={sv}
          handleRowClick={handleRowClick}
        />
      );
    }
  );
}
function ChiTietDoAn({ index, sv, handleRowClick }) {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ loai, thongTin }) => {
      return (loai = 1
        ? chamDiemPhanBien1(thongTin)
        : chamDiemPhanBien2(thongTin));
    },
    onSuccess: () => {
      toast.success("Cập nhật điểm phản biện thành công");
      sv.diemPhanBien1 = isDiemPhanBien1 || sv.diemPhanBien1;
      sv.diemPhanBien2 = isDiemPhanBien2 || sv.diemPhanBien2;
    },
    onError: () => {
      toast.error("Cập nhật điểm phản biện thất bại");
    },
  });
  const [isDiemPhanBien1, setIsDiemPhanBien1] = useState(null);
  const [isDiemPhanBien2, setIsDiemPhanBien2] = useState(null);
  const setDiemPhanBien2Hanlder = (e, maSinhVien) => {
    e.preventDefault();
    mutate({ loai: 2, thongTin: { maSinhVien, diem: isDiemPhanBien2 } });
  };
  const setDiemPhanBien1Hanlder = (e, maSinhVien) => {
    e.preventDefault();
    mutate({ loai: 1, thongTin: { maSinhVien, diem: isDiemPhanBien1 } });
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsDiemPhanBien1(null);
        setIsDiemPhanBien2(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleClick = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "path" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "INPUT"
    ) {
      return;
    }
    handleRowClick(sv.maDoAn);
  };
  return (
    <Row key={sv.maSinhVien} onClick={(e) => handleClick(e)}>
      <Col>
        <P2 size="1.4" className="g-center">
          {index + 1}
        </P2>
      </Col>
      <Col2 className="g-center ">
        <P2 size="1.4">{sv.maSinhVien}</P2>
      </Col2>
      <Col2 className="g-center ">
        <P2 size="1.4">{sv.tenSinhVien}</P2>
      </Col2>
      <Col className="g-center ">
        <P2 size="1.4">{sv.maDoAn}</P2>
      </Col>
      <Col2 className="g-center ">
        <P2 size="1.4">{sv.giangVienHuongDan}</P2>
      </Col2>
      <Col2 className=" flex flexCenter g-center">
        {sv.diemPhanBien1 !== null ? (
          <P2 size="1.4" className="textCenter">
            {sv.diemPhanBien1}
          </P2>
        ) : isDiemPhanBien1 !== null ? (
          <form
            className="flex w-100"
            onSubmit={(e) => setDiemPhanBien1Hanlder(e, sv.maSinhVien)}
          >
            <InputContainer>
              <InputContainer.Input
                value={isDiemPhanBien1}
                onChange={(e) => setIsDiemPhanBien1(e.target.value)}
              />
            </InputContainer>
          </form>
        ) : (
          <Button
            size="sm"
            onClick={() => setIsDiemPhanBien1("")}
            disabled={thongTinNguoiDung.maGiangVien !== sv.giangVienPhanBien1}
          >
            <HiPencil />
          </Button>
        )}
      </Col2>
      <Col2 className=" flex flexCenter g-center">
        {sv.diemPhanBien2 !== null ? (
          <P2 size="1.4" className="textCenter">
            {sv.diemPhanBien2}
          </P2>
        ) : isDiemPhanBien2 !== null ? (
          <form
            className="flex w-100"
            onSubmit={(e) => setDiemPhanBien2Hanlder(e, sv.maSinhVien)}
          >
            <InputContainer>
              <InputContainer.Input
                value={isDiemPhanBien2}
                onChange={(e) => setIsDiemPhanBien2(e.target.value)}
              />
            </InputContainer>
          </form>
        ) : (
          <Button
            size="sm"
            onClick={() => setIsDiemPhanBien2("")}
            disabled={thongTinNguoiDung.maGiangVien !== sv.giangVienPhanBien2}
          >
            <HiPencil />
          </Button>
        )}
      </Col2>
    </Row>
  );
}
