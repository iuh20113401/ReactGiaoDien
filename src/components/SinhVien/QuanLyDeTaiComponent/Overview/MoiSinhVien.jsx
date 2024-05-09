import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiShare } from "react-icons/hi";

import { Button, ButtonWithIcons, OutlineButton } from "../../../../ui/Button";
import Modal from "../../../../ui/Modal";
import { H6, P2 } from "../../../../ui/Typography";
import { InputContainer } from "../../../../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { guiLoiMoiThamGia } from "../../../../API/sinhVien/DeTai";
import UseThongTinTaiKhoan from "../../../../hooks/UseThongTinTaiKhoan";
import useThongTinDoAn from "../../../../hooks/sinhVien/useThongTinDoAn";

function MoiSinhVien() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { data } = useThongTinDoAn();
  const DoAn = data.thongTinDoAn;
  const [guiLoiMoi, setGuiLoiMoi] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: guiLoiMoiThamGia,
    onSuccess: () => {
      toast.success("Gửi lời mời thành công");
      setGuiLoiMoi(false);
    },
    onError: (e) => {
      toast.error("Gửi lời mời thất bại:  " + e.message);
    },
  });
  function onSubmit(data) {
    const newData = {
      maSinhVien: thongTinNguoiDung.maSinhVien,
      nguoiNhan: data.maSinhVien,
      ghiChu: data.ghiChu || "",
    };
    mutate(newData);
  }
  return (
    <div className="flex g-spaceBetween flexCenter">
      {guiLoiMoi && (
        <Modal onclick={() => setGuiLoiMoi(false)}>
          <Modal.Title>
            <P2 className="bold">Mời thành viên tham gia </P2>
            <Modal.Close />
          </Modal.Title>
          <Modal.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputContainer>
                <InputContainer.Label>
                  <P2 size="1.4">Mã số sinh viên</P2>
                </InputContainer.Label>
                <InputContainer.Input
                  type="number"
                  placeholder="Nhập mã số sinh viên càn mời"
                  register={{ ...register("maSinhVien", { required: true }) }}
                />
              </InputContainer>
              <InputContainer className="mt-3">
                <InputContainer.Label>
                  <P2 size="1.4">Ghi chú</P2>
                </InputContainer.Label>
                <InputContainer.Textarea
                  rows={5}
                  placeholder="Nhập ghi chú nếu có "
                  register={{ ...register("ghiChu", { required: false }) }}
                />
              </InputContainer>
              <div className="mt-4 flex flexEnd g-8">
                <OutlineButton
                  color="var(--color--main_7)"
                  onClick={() => setGuiLoiMoi(false)}
                >
                  Hủy
                </OutlineButton>
                <Button
                  bgcolor="var(--color--main_7)"
                  color="var(--color--secondary_1)"
                >
                  Gửi lời mời
                </Button>
              </div>
            </form>
          </Modal.Content>
        </Modal>
      )}
      <H6 className="bold">Member</H6>
      {!DoAn.maSinhVien2 && (
        <ButtonWithIcons
          shadow="none"
          bgcolor="var(--color--red_2)"
          color="var(--color--red_6)"
          icon={<HiShare />}
          size="1.6"
          onClick={() => setGuiLoiMoi(true)}
        >
          <ButtonWithIcons.Icon />
          Mời sinh viên khác
        </ButtonWithIcons>
      )}
    </div>
  );
}

export default MoiSinhVien;
