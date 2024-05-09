import { Fragment, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import GlobalStyles from "./global/GlobalStyles";
import SinhVienTrangChu from "./pages/SinhVien/SinhVienTrangChu";
import SinhVienDangKyDeTai from "./pages/SinhVien/SinhVienDangKyDeTai";
import SinhVienQuanLyDeTai from "./pages/SinhVien/SinhVienQuanLyDeTai";
import SinhVienLayout from "./pages/SinhVien/SinhVienLayout";
import GiangVienLayout from "./pages/GiangVien/GiangVienLayout";
import GiangVienTrangChu from "./pages/GiangVien/GiangVienTrangChu";
import GiangVienQuanLyDeTai from "./pages/GiangVien/GiangVienQuanLyDeTai";
import GiangVienXemDanhSachSinhVien from "./pages/GiangVien/GiangVienXemDanhSachSinhVien";
import GiangVienXemChiTietDoAn from "./pages/GiangVien/GiangVienXemChiTietDoAn";
import GiangVienChamDiem from "./pages/GiangVien/GiangVienChamDiem";
import GiangVienDuyetDeTai from "./pages/GiangVien/GiangVienDuyetDeTai";
import GiangVienPhanGiangVienPhanBien from "./pages/GiangVien/GiangVienPhanGiangVienPhanBien";
import ChatApp from "./pages/TroChuyen";
import LichHop from "./pages/LichHop";
import Cookies from "universal-cookie";
import GiangVienXemDanhSachDoAn from "./pages/GiangVien/GiangVienXemDanhSachDoAn";
import GiangVienHuongDanDoAn from "./pages/GiangVien/GiangVienHuongDanDoAn";
import GiangVienThemHuongDan from "./components/GiangVien/HuongDan/GiangVienThemHuongDan";
import GiangVienDiemDanh from "./pages/GiangVien/GiangVienDiemDanh";
import SinhVienDiemDanh from "./pages/SinhVien/SinhVienDiemDanh";
import GiangVienQuanLyDanhMuc from "./pages/GiangVien/GiangVienQuanLyDanhMuc";
import GiangVienThemDeTai from "./components/GiangVien/QuanLyDeTaiComponent/GiangVienThemDeTai";
import XemTaiKhoan from "./pages/admin/XemTaiKhoan";
import ThemTaiKhoan from "./pages/admin/ThemTaiKhoan";
import GiangVienThongTinGiangVien from "./pages/GiangVien/GiangVienThongTinGiangVien";

const queryClient = new QueryClient({
  defaultOption: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

function AutoLoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation(); // This hook provides access to the location object
  useEffect(() => {
    const cookies = new Cookies();
    const userCookie = cookies.get("user");
    if (userCookie) {
      if (userCookie && userCookie?.vaiTro !== undefined) {
        const targetPath = determineTargetPath(userCookie?.vaiTro);
        if (location.pathname !== targetPath) {
          navigate(targetPath);
        }
      }
    } else {
      navigate("/login");
    }
  }, [navigate, location]);

  function determineTargetPath(vaiTro) {
    switch (vaiTro) {
      case 0:
        return "/sinhvien/trangchu";
      case 1:
      case 2:
      case 3:
        return "/giangvien/trangchu";
      default:
        return "/login"; // Redirect to login if role is undefined or unexpected
    }
  }

  return null; // This component does not render anything
}
function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route path="/" element={<AutoLoginRedirect />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sinhvien" element={<SinhVienLayout />}>
              <Route
                path="*"
                index
                element={<Navigate to="/sinhvien/trangchu" replace />}
              />
              <Route path="trangchu" element={<SinhVienTrangChu />} />
              <Route path="dangkydetai" element={<SinhVienDangKyDeTai />} />
              <Route path="quanlydetai" element={<SinhVienQuanLyDeTai />} />
              <Route path="trochuyen" element={<ChatApp />} />
              <Route path="lichhop" element={<LichHop />} />
              <Route path="diemdanh" element={<SinhVienDiemDanh />} />
            </Route>
            <Route path="giangvien" element={<GiangVienLayout />}>
              <Route
                path="*"
                index
                element={<Navigate to="/giangvien/trangchu" replace />}
              />
              <Route
                path="thongtincanhan"
                element={<GiangVienThongTinGiangVien />}
              />
              <Route path="trangchu" element={<GiangVienTrangChu />} />
              <Route path="quanlydetai" element={<GiangVienQuanLyDeTai />} />
              <Route
                path="quanlydetai/ThemDeTai"
                element={<GiangVienThemDeTai />}
              />
              <Route
                path="xemdanhsachsinhvien"
                element={<GiangVienXemDanhSachSinhVien />}
              />
              <Route
                path="xemdanhsachdoan"
                element={<GiangVienXemDanhSachDoAn />}
              />
              <Route
                path="xemdanhsachdoan/chitietdoan"
                element={<GiangVienXemChiTietDoAn />}
              />
              <Route path="chamdiem" element={<GiangVienChamDiem />} />
              <Route path="duyetdetai" element={<GiangVienDuyetDeTai />} />
              <Route
                path="phangiangvienphanbien"
                element={<GiangVienPhanGiangVienPhanBien />}
              />
              <Route path="HuongDan" element={<GiangVienHuongDanDoAn />} />
              <Route
                path="huongDan/themhuongdan"
                element={<GiangVienThemHuongDan />}
              />
              <Route
                path="quanLyDanhMuc"
                element={<GiangVienQuanLyDanhMuc />}
              />
              <Route path="lichhop" element={<LichHop />} />
              <Route path="troChuyen" element={<ChatApp />} />
              <Route path="diemdanh" element={<GiangVienDiemDanh />} />
              {/* for admin */}

              <Route path="xemtaikhoan" element={<XemTaiKhoan />} />
              <Route path="themTaiKhoan" element={<ThemTaiKhoan />} />
            </Route>
          </Routes>
        </Router>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px ",
                backgroundColor: "var(--color--main_6)",
                color: "var(--color--secondary_1)",
              },
            },
            error: {
              duration: 5000,
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color--red_6)",
                color: "var(--color--secondary_1)",
              },
            },
          }}
        />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
