import FetchApi from "../FetchApi.js";

const BASE_URL = "api/giangVien";

export function layDanhSachDeTaiChoDuyet() {
  const url = `${BASE_URL}/duyetDeTai.php?resource=deTaiChoDuyet`;
  return FetchApi(url, { method: "GET" });
}

export function duyetDeTai(deTai) {
  const url = `${BASE_URL}/duyetDeTai.php?resource=duyetDeTai`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return FetchApi(url, options);
}

export function khongDuyetDeTai(deTai) {
  const url = `${BASE_URL}/duyetDeTai.php?resource=khongDuyetDeTai`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return FetchApi(url, options);
}

export function yeuCauChinhSuaDeTai(deTai) {
  const url = `${BASE_URL}/deTai.php?resource=yeuCauChinhSuaDeTai`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return FetchApi(url, options);
}
