import styled from "styled-components";
import { Navigate, Outlet } from "react-router-dom";

import SinhVienNavigation from "../../components/SinhVien/SinhVienNavigation";
import SinhVienFooter from "../../components/SinhVien/SinhVienFooter";
import { Spinner } from "../../ui/Spinner";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";

const SinhVienLayoutSection = styled.section`
  display: flex;
  flex-direction: column;
`;
const Main = styled.article`
  min-height: 80vh;
  width: 98%;
  margin: auto;
`;
function SinhVienLayout() {
  const { isLoading, isError } = UseThongTinTaiKhoan();
  if (isError) {
    return <Navigate to={"/login"} />;
  }
  return (
    <SinhVienLayoutSection>
      {isLoading && (
        <div className="h-100 flex flexCenter g-center">
          <Spinner color="var(--color--main_7)" />
        </div>
      )}
      {!isLoading && (
        <>
          <SinhVienNavigation />
          <Main>
            <Outlet />
          </Main>
          <SinhVienFooter />
        </>
      )}
    </SinhVienLayoutSection>
  );
}

export default SinhVienLayout;
