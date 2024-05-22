// Base configuration for fetch requests
import fetchApi from "../FetchApi.js";
const BASE_URL = "https://54.206.45.242/server-main/api/sinhVien/deTai.php";

// Exported functions using the fetchData utility
export function layDanhSachDeTai() {
  const url = `${BASE_URL}?resource=deTai`;

  return fetchApi(url, {
    method: "GET",
  });
}

export function ghiNhanDiemDanh({ maDiemDanh, maSinhVien }) {
  const url = `${BASE_URL}?resource=ghiNhanDiemDanh`;
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify({ maDiemDanh, maSinhVien }),
  });
}
export function layDanhSachLoiMoi(maSinhVien) {
  const url = `${BASE_URL}?resource=danhSachLoiMoi&maSinhVien=${maSinhVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export function layDanhSachTaiLieu(maDoAn) {
  const url = `${BASE_URL}?resource=danhSachTaiLieu&maDoAn=${maDoAn}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export function layThongTinDiemDanh({ maDiemDanh, maSinhVien }) {
  const url = `${BASE_URL}?resource=thongTinDiemDanh&maDiemDanh=${maDiemDanh}&maSinhVien=${maSinhVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}

export function layHuongDanTheoSinhVien(thongtinsinhvien) {
  const url = `${BASE_URL}?resource=huongDanTheoSinhVien&maSinhVien=${thongtinsinhvien.maSinhVien}`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "GET",
  });
}
export function dangKyDeTai(thongTinDangKy) {
  const url = `${BASE_URL}?resource=dangKyDeTai`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(thongTinDangKy),
  });
}

export function huyDangKyDeTai(thongTinDangKy) {
  const url = `${BASE_URL}?resource=huyDangKyDoAn`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(thongTinDangKy),
  });
}

export function guiLoiMoiThamGia(noiDungLoiMoi) {
  const url = `${BASE_URL}?resource=guiLoiMoiThamGiaNhom`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(noiDungLoiMoi),
  });
}
export function thamGiaDoAn(thongTin) {
  const url = `${BASE_URL}?resource=thamGiaDoAn`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(thongTin),
  });
}

export function layThongTinDoAn(thongTinSinhVien) {
  const url = `${BASE_URL}?resource=thongTinDoAn&maSinhVien=${thongTinSinhVien.maSinhVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export function layThongTinThanhVien(thongTinSinhVien) {
  const url = `${BASE_URL}?resource=thongTinThanhVien&maSinhVien=${thongTinSinhVien.maSinhVien}`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "GET",
  });
}

export function hoanThanhHuongDan(thongTinHuongDan) {
  const url = `${BASE_URL}?resource=huongDanTheoSinhVien`;
  // const headers = { "Content-Type": "application/json" };
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(thongTinHuongDan),
  });
}

export function themTaiLieu(thongTinTaiLieu) {
  const url = `${BASE_URL}?resource=taiLieu`;
  return fetchApi(url, {
    method: "POST",
    body: thongTinTaiLieu,
  });
}

export function capNhatAnhDaiDien(thongTinAnh) {
  const url = `${BASE_URL}?resource=capNhatAnhDaiDien`;
  return fetchApi(url, {
    method: "POST",
    body: thongTinAnh,
  });
}

//
export function suaThongTinSinhVien(thongTinSinhVien) {
  const url = `${BASE_URL}?resource=thongTinSinhVien`;
  return fetchApi(url, {
    method: "PUT",
    body: JSON.stringify(thongTinSinhVien),
  });
}
