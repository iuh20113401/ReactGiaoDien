import fetchApi from "../FetchApi.js";

const BASE_URL = "TaiKhoan/taiKhoan.php";

// Function to get all taiKhoan
export function layDanhSachTaiKhoan() {
  return fetchApi(`${BASE_URL}?action=taiKhoan`, {
    method: "GET",
  });
}

// Function to add a new taiKhoan
export function themTaiKhoan(data) {
  return fetchApi(`${BASE_URL}?action=taiKhoan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Function to update a taiKhoan
export function capNhatLaiMatKhau(data) {
  return fetchApi(`${BASE_URL}?action=taiKhoan`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export function capNhatNhieuMatKhau(data) {
  return fetchApi(`${BASE_URL}?action=nhieuTaiKhoan`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
// Function to delete a taiKhoan
export function xoaTaiKhoan(data) {
  return fetchApi(`${BASE_URL}?action=taiKhoan`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

// Function to delete multiple taiKhoan
export function xoaNhieuTaiKhoan(data) {
  return fetchApi(`${BASE_URL}?action=nhieuTaiKhoan`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

// Function to add a new sinhVien
export function themSinhVien(data) {
  return fetchApi(`${BASE_URL}?action=sinhVien`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Function to update a sinhVien
export function suaSinhVien(data) {
  return fetchApi(`${BASE_URL}?action=sinhVien`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Function to delete a sinhVien
export function xoaSinhVien(data) {
  return fetchApi(`${BASE_URL}?action=sinhVien`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

// Function to add multiple sinhVien
export function themNhieuSinhVien(data) {
  return fetchApi(`${BASE_URL}?action=nhieuSinhVien`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Function to add a new giangVien
export function themGiangVien(data) {
  return fetchApi(`${BASE_URL}?action=giangVien`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Function to update a giangVien
export function suaGiangVien(data) {
  return fetchApi(`${BASE_URL}?action=giangVien`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Function to delete a giangVien
export function xoaGiangVien(data) {
  return fetchApi(`${BASE_URL}?action=giangVien`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

// function to check if array of taiKhoan is valid
export function kiemTraMaTaiKhoanTonTai(data) {
  return fetchApi(`${BASE_URL}?action=kiemTraMaTaiKhoanTonTai`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
