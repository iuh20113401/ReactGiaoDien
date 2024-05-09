import fetchApi from "../FetchApi";

const BASE_URL = "http://localhost/server/api/giangVien/doAn.php";

const callApi = async (
  action,
  method,
  data = null,
  maGiangVien = null,
  maDoAn = null
) => {
  let url = `${BASE_URL}?action=${action}`;
  if (maGiangVien) url += `&maGiangVien=${maGiangVien}`;
  if (maDoAn) url += `&maDoAn=${maDoAn}`;

  const body = data ? JSON.stringify(data) : null;

  return fetchApi(url, { method, body });
};

export const layDanhSachDiemQuaTrinh = (maGiangVien) =>
  callApi("layDanhSachDiemQuaTrinh", "GET", null, maGiangVien);
export const layDanhSachSinhVien = (maGiangVien) =>
  callApi("layDanhSachSinhVien", "GET", null, maGiangVien);
export const layDanhSachDoAn = (maGiangVien) =>
  callApi("layDanhSachDoAn", "GET", null, maGiangVien);
export const layThongTinDoAn = (maDoAn) =>
  callApi("layThongTinDoAn", "GET", null, null, maDoAn);
export const layThongTinThanhVien = (maDoAn) =>
  callApi("layThongTinThanhVien", "GET", null, null, maDoAn);
export const chamDiemGiuaKy = (thongTinSinhVien) =>
  callApi("chamDiemGiuaKy", "POST", thongTinSinhVien);
export const chamDiemCuoiKy = (thongTinSinhVien) =>
  callApi("chamDiemCuoiKy", "POST", thongTinSinhVien);
export const layDanhSachPhanBien = (maGiangVien) =>
  callApi("layDanhSachPhanBien", "GET", null, maGiangVien);
export const chamDiemPhanBien1 = (thongTinSinhVien) =>
  callApi("chamDiemPhanBien1", "POST", thongTinSinhVien);
export const chamDiemPhanBien2 = (thongTinSinhVien) =>
  callApi("chamDiemPhanBien2", "POST", thongTinSinhVien);
export const layDanhSachHuongDanChoDoAn = (maDoAn) =>
  callApi("layDanhSachHuongDanChoDoAn", "GET", null, null, maDoAn);
export const duyetPhanBien = (data) =>
  callApi("duyetPhanBien", "POST", data, null, null);
