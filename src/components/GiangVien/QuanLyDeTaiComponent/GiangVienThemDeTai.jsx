import styled from "styled-components";
import ReactQuill from "react-quill";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import "react-quill/dist/quill.snow.css";

import { H5, H6, P2 } from "../../../ui/Typography";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import { DoubleContainer } from "../../../ui/Container";
import { Controller, useForm } from "react-hook-form";
import { Button, OutlineButton } from "../../../ui/Button";
import { layDanhSachDanhMuc, themDeTai } from "../../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import Loading from "../../../pages/Loading";
const ThemDeTaiContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
`;
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
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
function GiangVienThemDeTai() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      kyNangCanCo: "",
      moTa: "",
    },
  });
  const { mutate: themMutate, isPending } = useMutation({
    mutationFn: themDeTai,
    onSuccess: (data) => {
      toast.success("Thêm thành công");
      reset();
    },
    onError: (error) => {
      toast.error("Thêm thất bại: " + error.message);
    },
  });
  const { data: danhSachDanhMuc, isLoading: danhMucLoading } = useQuery({
    queryKey: ["danhSachDanhMuc"],
    queryFn: layDanhSachDanhMuc,
  });
  function themDeTaiHandler(data) {
    const maGiangVien = thongTinNguoiDung.maGiangVien + "";
    const maDeTai =
      Math.floor(Math.random() * (9999 - 0) + 0).toString() +
      maGiangVien.slice(-4);

    const formData = new FormData();
    formData.append("maGiangVien", maGiangVien);
    formData.append("maDeTai", maDeTai);
    formData.append("tenDeTai", data.tenDeTai);
    formData.append("moTa", data.moTa);
    formData.append("kyNangCanCo", data.kyNangCanCo);
    formData.append("ketQuaCanDat", data.ketQuaCanDat);
    formData.append("loai", data.loai);
    formData.append("danhMuc", data.danhMuc);
    formData.append("tag", data.tag);

    if (data["hinhanh"]) {
      formData.append("hinhanh", data["hinhanh"][0]); // Assumes 'file' is the File object from input type=file
    }
    themMutate(formData);
  }
  const isLoading = isPending || danhMucLoading;
  return (
    <ThemDeTaiContainer>
      <H5 color="var(--color--secondary_7)">
        Quản lý đề tài \ <strong>Thêm đề tài</strong>
      </H5>
      {isLoading ? (
        <Loading size={"8.4"} color={"var(--color--main_7)"} />
      ) : (
        <Container>
          <H5>Thông tin đề tài</H5>
          <Form onSubmit={handleSubmit(themDeTaiHandler)}>
            <InputContainer>
              <InputContainer.Label>
                <P2
                  size="1.4"
                  htmlFor="tendetai"
                  color="var(--color--secondary_6)"
                >
                  Tên đề tài
                </P2>
              </InputContainer.Label>
              <InputContainer.Input
                type="text"
                id="tendetai"
                placeholder="Nhập tên đề tài"
                register={{
                  ...register("tenDeTai", { require: true }),
                }}
              />
            </InputContainer>
            <InputContainer>
              <InputContainer.Label>
                <P2
                  size="1.4"
                  htmlFor="ketquacandat"
                  color="var(--color--secondary_6)"
                >
                  Kết quả cần đạt
                </P2>
              </InputContainer.Label>

              <InputContainer.Input
                type="text"
                id="ketquacandat"
                placeholder="Nhập kết quả cần đạt sau khi hoàn thành đề tài"
                register={{ ...register("ketQuaCanDat") }}
              />
            </InputContainer>
            <DoubleContainer>
              <InputContainer>
                <InputContainer.Select register={{ ...register("loai") }}>
                  <option value="">Loại đề tài</option>
                  <option value="0">Cao đẳng</option>
                  <option value="1">Đại học</option>
                </InputContainer.Select>
              </InputContainer>
              <InputContainer>
                <InputContainer.Select
                  register={{ ...register("danhMuc", { require: "True" }) }}
                >
                  <option value="">Danh mục đề tài</option>
                  {danhSachDanhMuc?.map((dm) => (
                    <option value={dm.maDanhMuc}>{dm.tenDanhMuc}</option>
                  ))}
                </InputContainer.Select>
              </InputContainer>
            </DoubleContainer>
            <InputContainer>
              <InputContainer.Label>
                <P2 size="1.4" htmlFor="mota" color="var(--color--secondary_6)">
                  Mô tả
                </P2>
              </InputContainer.Label>
              <Controller
                name="moTa"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    placeholder="Nhập mô tả cho đề tài"
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                  />
                )}
              />
            </InputContainer>
            <InputContainer>
              <InputContainer.Label>
                <P2
                  size="1.4"
                  htmlFor="kynangcanco"
                  color="var(--color--secondary_6)"
                >
                  Kỹ năng cần có
                </P2>
              </InputContainer.Label>
              <Controller
                name="kyNangCanCo"
                control={control}
                id="kynangcanco"
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    placeholder="Nhập Kỹ năng cần có cho đề tài"
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                  />
                )}
              />
            </InputContainer>
            <InputContainer>
              <InputContainer.Label>
                <P2 size="1.4" htmlFor="nhan" color="var(--color--secondary_6)">
                  Nhãn
                </P2>
              </InputContainer.Label>
              <InputContainer.Input
                type="text"
                id="nhan"
                placeholder="Nhãn của đề tài"
                register={{ ...register("tag") }}
              />
            </InputContainer>
            <InputContainer>
              <InputContainer.Label>
                <P2 size="1.4" htmlFor="nhan" color="var(--color--secondary_6)">
                  Hình ảnh đề tài
                </P2>
              </InputContainer.Label>
              <InputContainer.Input
                type="file"
                id="hinanh"
                register={{ ...register("hinhanh") }}
              />
            </InputContainer>
            <div className="flex g-16">
              <OutlineButton color="var(--color--main_7)">
                Quay lại
              </OutlineButton>

              <Button
                bgcolor="var(--color--main_7)"
                color="var(--color--secondary_1)"
              >
                Thêm đề tài
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </ThemDeTaiContainer>
  );
}

export default GiangVienThemDeTai;
