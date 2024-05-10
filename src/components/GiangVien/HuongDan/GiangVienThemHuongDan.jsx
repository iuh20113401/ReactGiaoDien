import React from "react";
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

const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
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
  const { register, handleSubmit, reset, getValues } = useForm();
  const { mutate: themMutate, isPending } = useMutation({
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
    const maHuongDan = Math.random() * 10000000;
    const newFormat = {
      maGiangVien: "2011340341",
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
        if (!newFormat.chitiethuongdan[index - 1]) {
          newFormat.chitiethuongdan[index - 1] = {
            maChiTietHuongDan: parseInt(maHuongDan + `${index}`),
          };
        }
        const newFieldName = field === "thoiGian" ? "thoiGian" : field;
        newFormat.chitiethuongdan[index - 1][newFieldName] = data[key].trim();
      }
    });
    themMutate(newFormat);
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
              register={{ ...register("tenHuongDan", { required: true }) }}
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
            >
              Thêm nội dung hướng dẫn
            </Button>
          </InputContainer>
        </Form>
      </Container>
    </>
  );
}

function ChiTietHuongDan({ index = 0, register, getValues }) {
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
          register={{ ...register(`noiDung${index + 1}`, { required: true }) }}
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>Tiêu chí hoàn thành </InputContainer.Label>
        <InputContainer.Input
          bordervariation="nhap"
          type="text"
          placeholder="Nhập tiêu chí để đánh giá mưc độ hoàn thành"
          register={{
            ...register(`tieuChiHoanThanh${index + 1}`, { required: true }),
          }}
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label>Thời gian </InputContainer.Label>
        <InputContainer.Input
          bordervariation="nhap"
          type="text"
          placeholder="Nhập số ngày cần thiết để hoàn thành nội dung"
          register={{
            ...register(`thoiGian${index + 1}`, { required: false }),
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
            type="date"
            register={{
              ...register(`ngayBatDau${index + 1}`, { required: true }),
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
            register={{
              ...register(`ngayKetThuc${index + 1}`, {
                required: "This is required filed",
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
