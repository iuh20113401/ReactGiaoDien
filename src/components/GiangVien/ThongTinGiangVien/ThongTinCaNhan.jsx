import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { suaThongTinGiangVien } from "../../../API/giangVien/DeTai";
import { P2 } from "../../../ui/Typography";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import { DoubleContainer } from "../../../ui/Container";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { Button, OutlineButton } from "../../../ui/Button";

export default function ThongTinCaNhan() {
  const { data: thongTinNguoiDung, isLoading } = UseThongTinTaiKhoan();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      hoGiangVien: thongTinNguoiDung.tenGiangVien
        .split(" ")
        .slice(0, -1)
        .join(" "),
      tenGiangVien: thongTinNguoiDung.tenGiangVien
        .split(" ")
        .slice(-1)
        .join(" "),
      soDienThoai: thongTinNguoiDung.soDienThoai,
      email: thongTinNguoiDung.email,
      moTa: thongTinNguoiDung.moTa || "Chua có mô tả",
    },
  });
  const { mutate, isLoading: editLoading } = useMutation({
    mutationFn: suaThongTinGiangVien,
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công");
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Cập nhật thông tin thất bại");
    },
  });
  function onSubmit(data) {
    data.maGiangVien = thongTinNguoiDung.maGiangVien;
    data.hoTen = `${data.hoGiangVien} ${data.tenGiangVien}`;
    mutate(data);
  }
  if (isLoading) return <P2>Loading...</P2>;
  return (
    <Form center="none" onSubmit={handleSubmit(onSubmit)}>
      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ho"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Họ và tên đệm
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            register={{ ...register("hoGiangVien") }}
            readOnly={!isEditing}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ten"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Tên
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            register={{ ...register("tenGiangVien") }}
            readOnly={!isEditing}
          />
        </InputContainer>
      </DoubleContainer>
      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ho"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Số điện thọai
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            register={{ ...register("soDienThoai") }}
            type="number"
            readOnly={!isEditing}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ten"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Email
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            register={{ ...register("email") }}
            readOnly={!isEditing}
          />
        </InputContainer>
      </DoubleContainer>
      <InputContainer>
        <InputContainer.Label htmlFor={"mota"}>
          <P2 size="1.4" color="var(--color--secondary_8)">
            Mô tả
          </P2>
        </InputContainer.Label>
        <InputContainer.Textarea
          rows={5}
          register={{ ...register("moTa") }}
          id="mota"
          readOnly={!isEditing}
        />
      </InputContainer>
      <P2>Thông tin giảng viên </P2>
      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"mota"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Khoa
            </P2>
          </InputContainer.Label>
          <InputContainer.Input defaultValue="Công nghệ thông tin " />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"mota"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Ngành
            </P2>
          </InputContainer.Label>
          <InputContainer.Input defaultValue="Hệ thống thông tin " />
        </InputContainer>
      </DoubleContainer>
      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"mota"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Mã giảng viên
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            defaultValue={`${thongTinNguoiDung.maGiangVien}`}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"mota"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Lớp
            </P2>
          </InputContainer.Label>
          <InputContainer.Input defaultValue={`${thongTinNguoiDung.lop}`} />
        </InputContainer>
      </DoubleContainer>
      {!isEditing ? (
        <Button
          color="var(--color--secondary_1)"
          bgcolor="var(--color--main_7)"
          onClick={() => setIsEditing(true)}
        >
          Cập nhật thông tin cá nhân
        </Button>
      ) : (
        <div className="flex mt-2 g-24  g-center">
          <Button
            color="var(--color--secondary_1)"
            bgcolor="var(--color--main_7)"
            type="submit"
            disabled={editLoading}
          >
            {editLoading ? "Đang cập nhật..." : "Lưu thông tin cá nhân"}
          </Button>
          <OutlineButton
            color="var(--color--main_7)"
            onClick={() => setIsEditing(false)}
            disabled={editLoading}
          >
            Hủy
          </OutlineButton>
        </div>
      )}
    </Form>
  );
}
