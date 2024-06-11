import fetchApi from "../FetchApi.js";

const BASE_URL = "giangVien/doAn.php";

const callApi = async (
  action,
  method,
  data = null,
  maGiangVien = null,
  maDoAn = null
) => {
  let url = `${BASE_URL}?resource=${action}`;
  if (maGiangVien) url += `&maGiangVien=${maGiangVien}`;
  if (maDoAn) url += `&maDoAn=${maDoAn}`;

  const body = data ? JSON.stringify(data) : null;

  return fetchApi(url, { method, body });
};

export const layDanhSachDiemQuaTrinh = (maGiangVien) =>
  callApi("diemQuaTrinh", "GET", null, maGiangVien);
export const layDanhSachSinhVien = (maGiangVien) =>
  callApi("sinhVien", "GET", null, maGiangVien);
export const layDanhSachDoAn = (maGiangVien) =>
  callApi("doAn", "GET", null, maGiangVien);
export const layThongTinDoAn = (maDoAn) =>
  callApi("thongTinDoAn", "GET", null, null, maDoAn);
export const layThongTinThanhVien = (maDoAn) =>
  callApi("thongTinThanhVien", "GET", null, null, maDoAn);
export const layDanhSachPhanBien = (maGiangVien) =>
  callApi("phanBien", "GET", null, maGiangVien);
export const layDanhSachHuongDanChoDoAn = (maDoAn) =>
  callApi("huongDanDoAn", "GET", null, null, maDoAn);
export const duyetPhanBien = (data) =>
  callApi("duyetPhanBien", "POST", data, null, null);
export const chamDiemGiuaKy = (thongTinSinhVien) =>
  callApi("chamDiemGiuaKy", "POST", thongTinSinhVien);
export const chamDiemCuoiKy = (thongTinSinhVien) =>
  callApi("chamDiemCuoiKy", "POST", thongTinSinhVien);
export const chamDiemPhanBien1 = (thongTinSinhVien) =>
  callApi("chamDiemPhanBien1", "POST", thongTinSinhVien);
export const chamDiemPhanBien2 = (thongTinSinhVien) =>
  callApi("chamDiemPhanBien2", "POST", thongTinSinhVien);
