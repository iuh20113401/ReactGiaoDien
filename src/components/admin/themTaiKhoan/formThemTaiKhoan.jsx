import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { H5, P2 } from "../../../ui/Typography";
import { InputContainer } from "../../../ui/Input";
import Form from "../../../ui/Form";
import { Button, OutlineButton } from "../../../ui/Button";
import {
  themGiangVien,
  themSinhVien,
  themTaiKhoan,
} from "../../../API/taiKhoan/TaiKhoan";

function FormThemTaiKhoan() {
  const [vaiTro, setVaiTro] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      data.vaiTro = vaiTro;
      if (+vaiTro === 0) {
        data.matKhau = "sinhvien123";
        themSinhVien(data);
      } else {
        data.matKhau = "giangvien123";
        themGiangVien(data);
      }
      themTaiKhoan(data);
    },
    onSuccess: () => {
      alert("Thêm tài khoản thành công");
    },
    onError: (error) => {
      alert("Thêm tài khoản thất bại");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <H5>Thông tin tài khoản</H5>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Mã tài khoản</P2>
        </InputContainer.Label>
        <InputContainer.Input
          placeholder="Nhập mã tài khoản"
          register={{ ...register("maTaiKhoan", { required: true }) }}
          required
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Họ và tên</P2>
        </InputContainer.Label>
        <InputContainer.Input
          placeholder="Nhập họ tên người dùng"
          register={{ ...register("hoTen", { required: true }) }}
          required
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Email</P2>
        </InputContainer.Label>
        <InputContainer.Input
          type="email"
          placeholder="abc2024@gmail.com"
          register={{ ...register("email", { require: false }) }}
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Số điện thoại</P2>
        </InputContainer.Label>
        <InputContainer.Input
          type="text"
          placeholder="03211323221"
          register={{ ...register("soDienThoai", { required: false }) }}
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Ngày sinh</P2>
        </InputContainer.Label>
        <InputContainer.Input
          type="date"
          register={{ ...register("ngaySinh", { required: true }) }}
          required
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Giới tính</P2>
        </InputContainer.Label>
        <InputContainer.Select
          register={{ ...register("gioiTinh", { required: true }) }}
          required
        >
          <option value="">Chọn giới tính</option>
          <option value="0">Nam</option>
          <option value="1">Nữ</option>
        </InputContainer.Select>
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>
          <P2 size="1.4">Vai trò</P2>
        </InputContainer.Label>
        <InputContainer.Select
          value={vaiTro}
          onChange={(e) => setVaiTro(e.target.value)}
        >
          <option value="">Chọn vai trò </option>
          <option value="0">Sinh viên</option>
          <option value="1">Giảng viên</option>
          <option value="2">Trưởng bộ môn</option>
          <option value="3">Admin</option>
        </InputContainer.Select>
      </InputContainer>
      {+vaiTro === 0 && (
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Lớp</P2>
          </InputContainer.Label>
          <InputContainer.Input
            type="text"
            placeholder="DHHTTT"
            register={{ ...register("lop", { required: true }) }}
            required
          />
        </InputContainer>
      )}
      <div className="flex g-8">
        <OutlineButton color="var(--color--main_7)">
          Xóa toàn bộ ô nhập
        </OutlineButton>
        <Button
          type="submit"
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
        >
          Thêm tài khoản
        </Button>
      </div>
    </Form>
  );
}

export default FormThemTaiKhoan;
