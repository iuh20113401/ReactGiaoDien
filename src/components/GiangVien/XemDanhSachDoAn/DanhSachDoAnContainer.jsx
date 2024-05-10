import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import Badges from "../../../ui/Badge";
import {
  DoAnContainer,
  DoAnLeft,
  DoAnRight,
  TagList,
  ButtonDangKy,
} from "../../../pages/GiangVien/GiangVienXemDanhSachDoAn";
import Logo from "../../../../public/hinhanh/iuh_logo_2.png";
export function DanhSachDoAnContainer({ DanhSachDoAn }) {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const navigate = useNavigate();
  function xemChiTiet(maDoAn) {
    navigate(`chitietdoan?maDoAn=${maDoAn}`);
  }
  return DanhSachDoAn.map((da, index) => {
    return (
      <DoAnContainer>
        <DoAnLeft>
          <img src={da.HinhAnh || { Logo }} alt="Hình ảnh đề tài" />
        </DoAnLeft>
        <DoAnRight>
          <P2 size="1.6" className="bold">
            {da.tenDeTai}
          </P2>
          <div className="flex g-4">
            <TagList>
              {da.Tag?.split(",").map((tag) => (
                <Badges
                  bgcolor={"var(--color--main_2)"}
                  color={"var(--color--main_7)"}
                  label={tag}
                  key={tag}
                />
              ))}
            </TagList>
          </div>
          <P2 size="1.4rem">
            Mã đồ án: <strong> {da.maDoAn}</strong>
          </P2>
          <div className="flex g-8">
            <P2 size="1.4rem">
              Mã sinh viên 1: <strong>{da.maSinhVien1}</strong>
            </P2>
            <P2 size="1.4rem">
              Tên sinh viên 1: <strong>{da.tenSinhVien1}</strong>
            </P2>
          </div>
          {da.maSinhVien2 ? (
            <div className="flex g-8">
              <P2 size="1.4rem">
                Mã sinh viên 2: <strong>{da.maSinhVien2}</strong>
              </P2>
              <P2 size="1.4rem">
                Tên sinh viên 2: <strong>{da.tenSinhVien2}</strong>
              </P2>
            </div>
          ) : (
            ""
          )}
        </DoAnRight>
        <ButtonDangKy className="flex flexCenter g-center">
          <Button
            color="var(--color--secondary_1)"
            bgcolor="var(--color--main_7)"
            onClick={() => xemChiTiet(da.maDoAn)}
          >
            Xem chi tiết
          </Button>
        </ButtonDangKy>
      </DoAnContainer>
    );
  });
}
