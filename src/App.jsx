import React, { Suspense, useEffect } from "react";
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
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import TestHTML from "./pages/test";

const Loading = React.lazy(() => import("./pages/Loading.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));
const GlobalStyles = React.lazy(() => import("./global/GlobalStyles"));
const SinhVienTrangChu = React.lazy(() =>
  import("./pages/SinhVien/SinhVienTrangChu")
);
const SinhVienDangKyDeTai = React.lazy(() =>
  import("./pages/SinhVien/SinhVienDangKyDeTai")
);
const SinhVienQuanLyDeTai = React.lazy(() =>
  import("./pages/SinhVien/SinhVienQuanLyDeTai")
);
const SinhVienLayout = React.lazy(() =>
  import("./pages/SinhVien/SinhVienLayout")
);
const GiangVienLayout = React.lazy(() =>
  import("./pages/GiangVien/GiangVienLayout")
);
const GiangVienTrangChu = React.lazy(() =>
  import("./pages/GiangVien/GiangVienTrangChu")
);
const GiangVienQuanLyDeTai = React.lazy(() =>
  import("./pages/GiangVien/GiangVienQuanLyDeTai")
);
const GiangVienXemDanhSachSinhVien = React.lazy(() =>
  import("./pages/GiangVien/GiangVienXemDanhSachSinhVien")
);
const GiangVienXemChiTietDoAn = React.lazy(() =>
  import("./pages/GiangVien/GiangVienXemChiTietDoAn")
);
const GiangVienChamDiem = React.lazy(() =>
  import("./pages/GiangVien/GiangVienChamDiem")
);
const GiangVienDuyetDeTai = React.lazy(() =>
  import("./pages/GiangVien/GiangVienDuyetDeTai")
);
const GiangVienPhanGiangVienPhanBien = React.lazy(() =>
  import("./pages/GiangVien/GiangVienPhanGiangVienPhanBien")
);
const ChatApp = React.lazy(() => import("./pages/TroChuyen"));
const LichHop = React.lazy(() => import("./pages/LichHop"));
const GiangVienXemDanhSachDoAn = React.lazy(() =>
  import("./pages/GiangVien/GiangVienXemDanhSachDoAn")
);
const GiangVienHuongDanDoAn = React.lazy(() =>
  import("./pages/GiangVien/GiangVienHuongDanDoAn")
);
const GiangVienThemHuongDan = React.lazy(() =>
  import("./components/GiangVien/HuongDan/GiangVienThemHuongDan")
);
const GiangVienDiemDanh = React.lazy(() =>
  import("./pages/GiangVien/GiangVienDiemDanh")
);
const SinhVienDiemDanh = React.lazy(() =>
  import("./pages/SinhVien/SinhVienDiemDanh")
);
const GiangVienQuanLyDanhMuc = React.lazy(() =>
  import("./pages/GiangVien/GiangVienQuanLyDanhMuc")
);
const GiangVienThemDeTai = React.lazy(() =>
  import("./components/GiangVien/QuanLyDeTaiComponent/GiangVienThemDeTai")
);
const XemTaiKhoan = React.lazy(() => import("./pages/admin/XemTaiKhoan"));
const ThemTaiKhoan = React.lazy(() => import("./pages/admin/ThemTaiKhoan"));
const GiangVienThongTinGiangVien = React.lazy(() =>
  import("./pages/GiangVien/GiangVienThongTinGiangVien")
);
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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const date = new Date().getTime();
      console.log(
        user,
        user?.expire && user?.expire < date,
        user?.expire < date,
        user?.expire,
        date
      );

      if (user?.expire && user?.expire < date) {
        console.log(user, user?.expire && user?.expire < date);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (user && user?.user.vaiTro !== undefined) {
        const targetPath = determineTargetPath(user?.vaiTro);
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
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense
          fallback={<Loading size={8.4} color={"var(--color--main_7)"} />}
        >
          <Router>
            <Routes>
              <Route path="/" element={<AutoLoginRedirect />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="test" element={<TestHTML />} />
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
                  path="quanlydetai/SuaDeTai"
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
        </Suspense>

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
    </DarkModeProvider>
  );
}

export default App;
