import FetchApi from "../FetchApi.js";
const API_BASE_URL = "giangVien/phanCongGiangVienPhanBien.php";

// Function to fetch the list of assigned reviews
export async function layDanhSachPhanCongPhanBien() {
  return FetchApi(`${API_BASE_URL}?resource=layDanhSachPhanCongPhanBien`, {
    method: "GET",
  });
}

// Function to fetch the list of instructors
export async function layDanhSachGiangVien() {
  return FetchApi(`${API_BASE_URL}?resource=layDanhSachGiangVien`, {
    method: "GET",
  });
}

// Function to assign an instructor for review
export async function phanGiangVienPhanBien(thongTinPhanCong) {
  return FetchApi(`${API_BASE_URL}?resource=phanGiangVienPhanBien`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thongTinPhanCong),
  });
}
