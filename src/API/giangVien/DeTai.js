import fetchApi from "../FetchApi.js";

const BASE_URL = "giangVien/deTai.php";

export async function layDanhSachDeTai(maGiangVien) {
  const url = `${BASE_URL}?resource=deTai&maGiangVien=${maGiangVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export async function layDanhSachHuongDan(maGiangVien) {
  const url = `${BASE_URL}?resource=huongDan&maGiangVien=${maGiangVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export async function layDanhSachDanhMuc() {
  const url = `${BASE_URL}?resource=danhMuc`;
  return fetchApi(url, {
    method: "GET",
  });
}
export async function layDanhSachDeTaiDaDangKy(thongTinGiangVien) {
  const url = `${BASE_URL}?resource=danhSachDeTaiDaDangKy&maGiangVien=${thongTinGiangVien.maGiangVien}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export async function layDeTaiTheoMa(maDeTai) {
  const url = `${BASE_URL}?resource=deTaiTheoMa&maDeTai=${maDeTai}`;
  return fetchApi(url, {
    method: "GET",
  });
}
export async function capNhatAnhDaiDien(thongTin) {
  const url = `${BASE_URL}?resource=capNhatAnhDaiDien`;
  const body = thongTin;
  return fetchApi(url, {
    method: "POST",
    body,
  });
}
export async function themDeTai(formData) {
  const url = `${BASE_URL}?resource=deTai`;
  // const headers = { "Content-Type": "application/json" };
  const body = formData?.hinhanh ? formData : JSON.stringify(formData);
  return fetchApi(url, {
    method: "POST",
    body: formData,
  });
}
export async function themHuongDan(huongDan) {
  const url = `${BASE_URL}?resource=huongDan`;
  const body = JSON.stringify(huongDan);
  return fetchApi(url, {
    method: "POST",
    body,
  });
}

export async function themHuongDanVaoDoAn(huongDan) {
  let url = `${BASE_URL}?resource=huongDanDeTai`;
  if (huongDan.loai === "da") {
    url = `${BASE_URL}?resource=huongDanDoAn`;
  }
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify(huongDan);
  return fetchApi(url, {
    method: "POST",
    headers,
    body,
  });
}
export async function themLichHopVaoDeTai(lichHop) {
  const url = `${BASE_URL}?resource=lichHop`;
  const body = JSON.stringify(lichHop);
  return fetchApi(url, {
    method: "POST",
    body,
  });
}
export async function themLichHopVaoDoAn(lichHop) {
  const url = `${BASE_URL}?resource=lichHopDoAn`;
  const body = JSON.stringify(lichHop);
  return fetchApi(url, {
    method: "POST",
    body,
  });
}

export async function themMaDiemDanh(DiemDanh) {
  const url = `${BASE_URL}?resource=maDiemDanh`;
  const body = JSON.stringify(DiemDanh);
  return fetchApi(url, {
    method: "POST",
    body,
  });
}

//note danh muc

export async function themDanhMuc({ data }) {
  const url = `${BASE_URL}?resource=danhMuc`;
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function thongKeDeTai(data) {
  const url = `${BASE_URL}?resource=thongKeDeTai`;
  return fetchApi(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function suaDeTai(deTai) {
  const url = `${BASE_URL}?resource=deTai`;
  return fetchApi(url, {
    method: "PUT",
    body: JSON.stringify(deTai),
  });
}
export async function xoaDeTai(deTai) {
  const url = `${BASE_URL}?resource=deTai`;
  const body = JSON.stringify(deTai);
  return fetchApi(url, {
    method: "DELETE",
    body,
  });
}

export async function suaThongTinGiangVien(giangVien) {
  const url = `${BASE_URL}?resource=thongTinGiangVien`;
  return fetchApi(url, {
    method: "PUT",
    body: JSON.stringify(giangVien),
  });
}
