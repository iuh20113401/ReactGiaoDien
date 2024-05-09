import React, { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { themLichHopVaoDeTai } from "../../../API/giangVien/DeTai";
import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import CanvaContainer from "../../../ui/Canvas";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import { layDanhSachDeTaiDaDangKy } from "../../../API/giangVien/DeTai";
import { Spinner } from "../../../ui/Spinner";
import Table, { Col, Col3, Col5, Row, TieuDe } from "../../../ui/Table";

export function ThemLichHop({ setActive }) {
  const [hinhThuc, setHinhThuc] = useState("");
  let modal = false;

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { mutate, isPending } = useMutation({
    mutationFn: themLichHopVaoDeTai,
    onSuccess: () => {
      toast.success("Thêm lịch họp thành công");
      reset();
      setHinhThuc("");
    },
    onError: (error) => toast.error("Thêm lịch họp thất bại"),
  });

  const onSubmit = (data) => {
    if (!data?.selectedTopics.length) {
      toast.error("Vui lòng chọn ít nhất một đề tài hoặc đồ án");
      return;
    }
    mutate(data);
  };

  if (hinhThuc === "dt") {
    modal = <Danhsachdetai register={register} />;
  }
  return (
    <CanvaContainer
      title={"Thêm lịch họp"}
      onClick={() => {
        setActive(false);
      }}
      RightContent={modal}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Tên cuộc họp</P2>
          </InputContainer.Label>
          <InputContainer.Input
            type="text"
            placeHolder="Nhập tên cuộc họp"
            register={{ ...register("tieuDe"), required: true }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Thời gian</P2>
          </InputContainer.Label>
          <InputContainer.Input
            type="datetime-local"
            register={{
              ...register("thoiGian", {
                validate: (value) => {
                  const selectedTime = moment(value);
                  const currentTime = moment();
                  if (selectedTime.isBefore(currentTime)) {
                    toast.error("Thời gian không hợp lệ");
                    return "Thời gian không hợp lệ";
                  }
                  return true;
                },
              }),
              required: {
                value: true,
                message: "Vui lòng chọn thời gian hợp",
              },
              className: errors.thoiGian ? "error" : "",
            }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Địa điểm</P2>
          </InputContainer.Label>
          <InputContainer.Input
            type="text"
            placeHolder="Nhập thông tin địa điểm để họp"
            register={{ ...register("diaDiem"), required: true }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Ghi chú</P2>
          </InputContainer.Label>
          <InputContainer.Input
            type="text"
            placeHolder="Nhập ghi chú (nếu có)"
            register={{ ...register("ghiChu") }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>
            <P2 size="1.4">Hình thức họp</P2>
          </InputContainer.Label>
          <InputContainer.Select
            value={hinhThuc}
            onChange={(e) => setHinhThuc(e.target.value)}
          >
            <option value="">Hình thức họp</option>
            <option value="dt">Theo đề tài</option>
            <option value="da">Theo đồ án</option>
          </InputContainer.Select>
        </InputContainer>
        <Button type="submit" size="lg" color="var(--color--main_7)">
          Thêm lịch họp
        </Button>
      </Form>
    </CanvaContainer>
  );
}
function Danhsachdetai({ register }) {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const {
    data: danhSachDeTai,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["danhSachDeTai"],
    queryFn: () =>
      layDanhSachDeTaiDaDangKy({ maGiangVien: thongTinNguoiDung.maGiangVien }),
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxChange = (value, isChecked) => {
    setCheckedItems((prev) => {
      const newCheckedItems = isChecked
        ? [...prev, value]
        : prev.filter((item) => item !== value);
      return newCheckedItems;
    });
  };
  if (isLoading)
    return (
      <div className="flex h-100 flexCenter g-center">
        <Spinner color="var(--color--main_7)" />
      </div>
    );
  return (
    <Table>
      <TieuDe>
        <Col>
          <InputContainer.Checkbox />
        </Col>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Mã đề tài
          </P2>
        </Col3>
        <Col5 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Tên đề tài
          </P2>
        </Col5>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Số lượng đồ án
          </P2>
        </Col3>
      </TieuDe>
      {danhSachDeTai.map((deTai) => {
        return (
          <Row key={deTai.maDeTai}>
            <Col>
              <InputContainer.Checkbox
                checked={checkedItems.includes(`${deTai.maDeTai}`)}
                register={{
                  ...register("selectedTopics", {
                    onChange: (e) =>
                      handleCheckboxChange(e.target.value, e.target.checked),
                  }),
                }}
                value={deTai.maDeTai}
              />
            </Col>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.maDeTai}
              </P2>
            </Col3>
            <Col5>
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.tenDeTai}
              </P2>
            </Col5>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.soLuongDoAn}
              </P2>
            </Col3>
          </Row>
        );
      })}
    </Table>
  );
}
