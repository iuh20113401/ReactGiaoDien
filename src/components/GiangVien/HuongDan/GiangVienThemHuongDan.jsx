import React, { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { H5, P2 } from "../../../ui/Typography";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import "react-quill/dist/quill.snow.css";
import { DoubleContainer } from "../../../ui/Container";
import { Button, OutlineButton } from "../../../ui/Button";
import { themHuongDan } from "../../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";

const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: var(--color--white);
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
`;
const ChiTietContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color--secondary_3);
`;
function GiangVienThemHuongDan() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate: themMutate, isLoading } = useMutation({
    mutationFn: themHuongDan,
    onSuccess: () => {
      toast.success("Tạo hướng dẫn thành công");
      reset();
    },
    onError: () => {
      toast.error("Tạo hướng dẫn thất bại");
    },
  });
  const [chiTietHuongDanCount, setChiTietHuongDanCount] = useState([0]);
  const addChiTietHuongDan = () => {
    setChiTietHuongDanCount([
      ...chiTietHuongDanCount,
      chiTietHuongDanCount.length,
    ]);
  };
  function onSubmit(data) {
    const maHuongDan = Math.round(Math.random() * 10000000);
    const newFormat = {
      maGiangVien: thongTinNguoiDung.maGiangVien,
      maHuongDan,
      tenHuongDan: data.tenHuongDan,
      chitiethuongdan: [],
    };
    Object.keys(data).forEach((key) => {
      const match = key.match(
        /(ngayBatDau|ngayKetThuc|noiDung|thoiGian|tieuChiHoanThanh)(\d+)/
      );
      if (match) {
        const [, field, index] = match;
        console.log(index);
        if (!newFormat.chitiethuongdan[index - 1]) {
          newFormat.chitiethuongdan[index - 1] = {
            maChiTietHuongDan: parseInt(maHuongDan + `${index}`),
          };
        }
        console.log(
          maHuongDan,
          index,
          parseInt(maHuongDan + `${index}`),
          newFormat.chitiethuongdan[index - 1].maChiTietHuongDan
        );
        const newFieldName = field === "thoiGian" ? "thoiGian" : field;
        newFormat.chitiethuongdan[index - 1][newFieldName] = data[key].trim();
      }
    });
    themMutate(newFormat);
  }
  function catchError() {
    if (Object.values(errors).length) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError?.message);
    }
  }
  return (
    <>
      <H5>
        Hướng dẫn / <strong>Thêm hướng dẫn</strong>
      </H5>

      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <P2>Nội dung hướng dẫn</P2>
          <InputContainer>
            <InputContainer.Label>
              <P2 size="1.4">Tên hướng dẫn</P2>
            </InputContainer.Label>
            <InputContainer.Input
              type="text"
              placeholder="Nhập tên cho hướng dẫn"
              register={{
                ...register("tenHuongDan", {
                  required: "Tên hướng dẫn khong được bỏ trống",
                }),
              }}
            />
            <P2 size="1.4" className="mt-3">
              Chi tiết hướng dẫn
            </P2>

            {chiTietHuongDanCount.map((index) => (
              <ChiTietHuongDan
                key={index}
                index={index}
                register={register}
                getValues={getValues}
                errors={errors}
              />
            ))}
            <div className="mt-2 mb-3">
              <OutlineButton
                color="var(--color--main_7)"
                type="button"
                onClick={addChiTietHuongDan}
              >
                Thêm hướng dẫn
              </OutlineButton>
            </div>
            <Button
              color="var(--color--secondary_1)"
              bgcolor="var(--color--main_7)"
              onClick={catchError}
            >
              Thêm nội dung hướng dẫn
            </Button>
          </InputContainer>
        </Form>
      </Container>
    </>
  );
}

function ChiTietHuongDan({ index = 0, register, getValues, errors }) {
  return (
    <ChiTietContainer>
      <P2 size="1.4">
        <strong>Bước {index + 1}</strong>
      </P2>
      <InputContainer>
        <InputContainer.Label>Nội dung hướng dẫn</InputContainer.Label>
        <InputContainer.Input
          bordervariation="nhap"
          type="text"
          placeholder="Nhập nội dung hướng dẫn"
          register={{
            ...register(`noiDung${index + 1}`, {
              required: `Nội dung bước ${index + 1} không được bỏ trống`,
            }),
          }}
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>Tiêu chí hoàn thành </InputContainer.Label>
        <InputContainer.Input
          bordervariation="nhap"
          type="text"
          className={
            errors[`tieuChiHoanThanh${index + 1}`]?.message ? "invalid" : ""
          }
          placeholder="Nhập tiêu chí để đánh giá mưc độ hoàn thành"
          register={{
            ...register(`tieuChiHoanThanh${index + 1}`, {
              required: "Tiêu chí hoàn thành không được để trướng",
            }),
          }}
        />
      </InputContainer>

      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label className="label_large">
            Ngày bắt đầu
          </InputContainer.Label>
          <InputContainer.Input
            size="tiny"
            bordervariation="nhap"
            className={
              errors[`ngayBatDau${index + 1}`]?.message ? "invalid" : ""
            }
            type="date"
            register={{
              ...register(`ngayBatDau${index + 1}`, {
                required: "Ngày bắt đầu không được để trống",
                validate: (value) =>
                  new Date(value) > new Date() ||
                  "Ngày bắt đầu phải lớn hơn ngày hiện tại",
              }),
            }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label className="label_large">
            Ngày kết thúc
          </InputContainer.Label>
          <InputContainer.Input
            size="tiny"
            bordervariation="nhap"
            type="date"
            className={
              errors[`ngayKetThuc${index + 1}`]?.message ? "invalid" : ""
            }
            register={{
              ...register(`ngayKetThuc${index + 1}`, {
                required: "Ngày kết thúc không được để trống",
                validate: (value) =>
                  value >= getValues()[`ngayBatDau${index + 1}`] ||
                  "Ngày kết thúc nên lớn hơn ngày bắt đầu",
              }),
            }}
          />
        </InputContainer>
      </DoubleContainer>
    </ChiTietContainer>
  );
}
export default GiangVienThemHuongDan;
