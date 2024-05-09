import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { H5, H6 } from "../../ui/Typography";
import { layDanhSachTaiKhoan } from "../../API/taiKhoan/TaiKhoan";
import XemDanhSachTaiKhoan from "../../components/admin/XemDanhSachTaiKhoan";

const XemTaiKhoanSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
function XemTaiKhoan() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["danhSachTaiKhoan"],
    queryFn: layDanhSachTaiKhoan,
  });
  const { sinhVien, giangVien } = !isLoading ? phanLoai(data) : [null, null];
  return (
    !isLoading && (
      <XemTaiKhoanSection>
        <H5>Xem danh sách tài khoản</H5>
        <div className="flex flexColumn g-8">
          {/* Display teacher list here */}
          <H6>Danh sách tài khoản giảng viên </H6>
          <Container>
            <XemDanhSachTaiKhoan vaiTro={1} data={giangVien} />
          </Container>
        </div>
        <div className="flex flexColumn g-8">
          {/* Display teacher list here */}
          <H6>Danh sách tài khoản sinh viên </H6>
          <Container>
            <XemDanhSachTaiKhoan vaiTro={0} data={sinhVien} />
          </Container>
        </div>
      </XemTaiKhoanSection>
    )
  );
}
function phanLoai(data) {
  const sinhVien = data.filter((item) => item.vaiTro === 0);
  const giangVien = data.filter((item) => item.vaiTro >= 1);
  return { sinhVien, giangVien };
}
export default XemTaiKhoan;
