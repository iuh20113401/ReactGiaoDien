import fetchApi from "./FetchApi.js";
const BASE_URL = "https://3.26.182.86/server-main/api/lichHop.php";

export async function layDanhSachLichHop({ loai, ma }) {
  const url = `${BASE_URL}?action=layDanhSachLichHop&loai=${loai}&ma=${ma}`;
  return fetchApi(url, {
    method: "GET",
  });
}
