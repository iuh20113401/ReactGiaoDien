import React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import { themHuongDanVaoDoAn } from "../../../API/giangVien/DeTai";
import { formatDate } from "../../../utils/formatDate";
import CanvaContainer from "../../../ui/Canvas";
import { InputContainer } from "../../../ui/Input";
import { Danhsachdetai } from "../RightContent/Danhsachdetai";
import { DanhSachDoAn } from "../RightContent/DanhSachDoAn";

export function ChiaSeHuongDan({ huongDan, setActive }) {
  const [loai, setLoai] = useState("");
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      themHuongDanVaoDoAn({
        loai: loai,
        maHuongDan: huongDan[0]?.maHuongDan,
        selectedTopics: data.selectedTopics,
      }),
    onSuccess: () => {
      toast.success("Thêm hướng dẫn vào đề tài thành công");
      setActive(null);
    },
    onError: () => {
      toast.error("Thêm hướng dẫn vào đề tài không thành công");
    },
  });
  function chiaSeHandler(data) {
    if (data.selectedTopics.length === 0 || !data.selectedTopics) {
      alert("Vui lòng chọn ít nhất 1 đề tài hoặc đồ án để chia sẻ hướng dẫn");
      return;
    }
    data.selectedTopics = data.selectedTopics.filter((item) => {
      return item === "all" ? false : true;
    });
    mutate(data);
  }
  return (
    <CanvaContainer
      RightContent={
        loai === "dt" ? (
          <Danhsachdetai register={register} />
        ) : loai === "da" ? (
          <DanhSachDoAn register={register} />
        ) : null
      }
      onClick={() => setActive(null)}
      title={"Chia sẻ hướng dẫn"}
    >
      <form
        className="m-3 flex flexColumn g-8"
        onSubmit={handleSubmit(chiaSeHandler)}
      >
        <P2 size="1.4">
          Tên hướng dẫn: <strong>{huongDan[0]?.tenHuongDan}</strong>
        </P2>
        <P2 size="1.4">
          Số bước cần thực hiện: <strong>{huongDan?.length}</strong>
        </P2>
        <P2 size="1.4">
          Ngày bắt đầu: <strong>{formatDate(huongDan[0].ngayBatDau)}</strong>
        </P2>
        <P2 size="1.4">
          Ngày kết thúc:{" "}
          <strong>
            {formatDate(huongDan[huongDan.length - 1]?.ngayHoanThanh)}
          </strong>
        </P2>
        <InputContainer className="mt-2">
          <InputContainer.Select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
          >
            <option value="">Hình thức chia sẻ</option>
            <option value="dt">Theo đề tài</option>
            <option value="da">Theo đồ án</option>
          </InputContainer.Select>
        </InputContainer>
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
        >
          Xác nhận
        </Button>
      </form>
    </CanvaContainer>
  );
}
