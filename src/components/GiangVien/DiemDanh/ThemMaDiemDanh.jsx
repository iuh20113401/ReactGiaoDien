import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import CanvaContainer from "../../../ui/Canvas";
import { InputContainer } from "../../../ui/Input";
import Form from "../../../ui/Form";
import { Danhsachdetai } from "../RightContent/Danhsachdetai";
import { AttendanceQRCode } from "../../../utils/AttendanceQRCode";
import { themMaDiemDanh } from "../../../API/giangVien/DeTai";
import { DanhSachDoAn } from "../RightContent/DanhSachDoAn";
import Loading from "../../../pages/Loading";

export function ThemMaDiemDanh({ setActive }) {
  const { register, setValue, handleSubmit } = useForm();
  const [formData, setFormData] = useState({ loai: "", hinhThuc: "" });
  const [content, setContent] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: themMaDiemDanh,
    onMutate: () => {
      setContent(<Loading size={8.4} color={"var(--color--main_7)"} />);
    },
    onSuccess: (data) => {
      setContent(
        <div className="flex flexCenter g-center h-100">
          <AttendanceQRCode
            data={{
              url: `http://localhost:5173/sinhvien/diemdanh`,
              content: { maDiemDanh: data },
            }}
          />
        </div>
      );
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra khi tạo mã điểm danh");
    },
  });
  useEffect(() => {
    if (formData.hinhThuc === "around500m") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("diadiem", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert(
            "Error getting location. Please ensure location services are enabled."
          );
        }
      );
    }
  }, [formData.hinhThuc, setValue]);

  useEffect(() => {
    switch (formData.loai) {
      case "dt":
        setContent(<Danhsachdetai register={register} />);
        break;
      case "da":
        setContent(<DanhSachDoAn register={register} />);
        break;
      default:
        setContent(null);
    }
  }, [formData.loai, register]);
  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = (data) => {
    if (formData.loai === "") {
      alert("Vui lòng chọn loại điểm danh");
      return;
    }
    if (!data.selectedTopics || data.selectedTopics.length === 0) {
      alert("Vui lòng chọn ít nhất một đề tài");
      return;
    }
    const newData = { ...data, ...formData };
    newData.selectedTopics = newData.selectedTopics.filter((item) =>
      item === "all" ? false : true
    );

    mutate(newData);
  };

  return (
    <CanvaContainer
      title="Tạo mã điểm danh"
      RightContent={content}
      onClick={() => setActive(false)}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Thời gian hiệu lực</P2>
          </InputContainer.Label>
          <InputContainer.Select register={{ ...register("thoiGian") }}>
            <option value="1">1 phút</option>
            <option value="5">5 phút</option>
            <option value="10">10 phút</option>
            <option value="20">20 phút</option>
            <option value="30">30 phút</option>
            <option value="60">1 giờ</option>
          </InputContainer.Select>
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Loại điểm danh</P2>
          </InputContainer.Label>
          <InputContainer.Select
            value={formData.loai}
            onChange={handleInputChange("loai")}
          >
            <option value="">Chọn loại điểm danh</option>
            <option value="dt">Theo đề tài</option>
            <option value="da">Theo đồ án</option>
            <option value="sv">Theo sinh viên</option>
          </InputContainer.Select>
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Hình thức điểm danh</P2>
          </InputContainer.Label>
          <InputContainer.Select
            value={formData.hinhThuc}
            onChange={handleInputChange("hinhThuc")}
          >
            <option value="normal">Bình thường</option>
            <option value="around500m">Xung quanh 500m</option>
            <option value="sameIP">Chung địa chỉ IP</option>
          </InputContainer.Select>
        </InputContainer>
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
        >
          Tạo mã điểm danh
        </Button>
      </Form>
    </CanvaContainer>
  );
}
