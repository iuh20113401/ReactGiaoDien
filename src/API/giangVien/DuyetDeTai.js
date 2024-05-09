import fetchApi from "../FetchApi";

const BASE_URL = "http://localhost/server/api/giangVien";

export function layDanhSachDeTaiChoDuyet() {
  const url = `${BASE_URL}/duyetDeTai.php?action=layDanhSachDeTaiChoDuyet`;
  return fetchApi(url, { method: "GET" });
}

export function duyetDeTai(deTai) {
  const url = `${BASE_URL}/duyetDeTai.php?action=duyetDeTai`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return fetchApi(url, options);
}

export function khongDuyetDeTai(deTai) {
  const url = `${BASE_URL}/duyetDeTai.php?action=khongDuyetDeTai`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return fetchApi(url, options);
}

export function yeuCauChinhSuaDeTai(deTai) {
  const url = `${BASE_URL}/deTai.php?action=suaDeTai`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deTai),
  };
  return fetchApi(url, options);
}
