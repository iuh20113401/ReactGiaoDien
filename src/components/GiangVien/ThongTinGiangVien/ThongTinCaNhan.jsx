import React from "react";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { DoubleContainer } from "../../../ui/Container";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import { P2 } from "../../../ui/Typography";

function ThongTinCaNhanGiangVien() {
  const { data } = UseThongTinTaiKhoan();

  return (
    <Form center="none">
      <DoubleContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ho"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Họ và tên đệm
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            defaultValue={`${data.tenGiangVien
              .split(" ")
              .slice(0, -1)
              .join(" ")}`}
            readOnly={true}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ten"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Tên
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            defaultValue={`${data.tenGiangVien.split(" ").slice(-1).join(" ")}`}
            readOnly={true}
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
            defaultValue={`${data.soDienThoai || "Chưa cập nhật"}`}
            type="text"
            readOnly={true}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label htmlFor={"ten"}>
            <P2 size="1.4" color="var(--color--secondary_8)">
              Email
            </P2>
          </InputContainer.Label>
          <InputContainer.Input
            defaultValue={`${data.email}`}
            readOnly={true}
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
          defaultValue={`${data.moTa || "Chưa cập nhật"} `}
          id="mota"
          readOnly={true}
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
              Mã số giảng viên
            </P2>
          </InputContainer.Label>
          <InputContainer.Input defaultValue={`${data.maGiangVien}`} />
        </InputContainer>
      </DoubleContainer>
    </Form>
  );
}

export default ThongTinCaNhanGiangVien;
