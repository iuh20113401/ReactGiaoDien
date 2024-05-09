import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import Form from "../../../ui/Form";
import { InputContainer } from "../../../ui/Input";
import { ButtonGroup } from "../../../pages/SinhVien/SinhVienTrangChu";

export function DoiMatKhauConainer() {
  return (
    <Form>
      <InputContainer>
        <InputContainer.Label htmlFor={"matkhaucu"}>
          <P2 size="1.4" color="var(--color--secondary_8)">
            Mật khẩu cũ
          </P2>
        </InputContainer.Label>
        <InputContainer.Input
          type="password"
          id="matkhaucu"
          placeholder="Nhập mật khẩu cũ"
        />
      </InputContainer>

      <InputContainer>
        <InputContainer.Label htmlFor={"matkhaumoi"}>
          <P2 size="1.4" color="var(--color--secondary_8)">
            Mật khẩu mới
          </P2>{" "}
        </InputContainer.Label>
        <InputContainer.Input
          type="password"
          placeholder="Nhập mật khẩu mới"
          id="matkhaumới"
        />
      </InputContainer>
      <InputContainer>
        <InputContainer.Label htmlFor={"nhapLai"}>
          <P2 size="1.4" color="var(--color--secondary_8)">
            Nhập lại mật khẩu mới
          </P2>
        </InputContainer.Label>
        <InputContainer.Input
          type="password"
          id="nhapLai"
          placeholder="Nhập lại mật khẩu mới"
        />
      </InputContainer>
      <ButtonGroup>
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
        >
          Xác nhận
        </Button>
      </ButtonGroup>
    </Form>
  );
}
