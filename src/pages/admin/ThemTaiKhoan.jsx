import styled from "styled-components";
import { H5 } from "../../ui/Typography";
import FormThemTaiKhoan from "../../components/admin/themTaiKhoan/formThemTaiKhoan";
import ThemTuExcel from "../../components/admin/themTaiKhoan/ThemTuExcel";

const ThemTaiKhoanSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
function ThemTaiKhoan() {
  return (
    <ThemTaiKhoanSection>
      <H5>Thêm tài khoản</H5>
      <div>
        <ThemTuExcel />
      </div>
      <Container>
        <FormThemTaiKhoan />
      </Container>
    </ThemTaiKhoanSection>
  );
}

export default ThemTaiKhoan;
