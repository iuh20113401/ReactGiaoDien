import FetchApi from "./FetchApi.js";
const BASE_URL = "lichHop.php";

export async function layDanhSachLichHop({ loai, ma }) {
  const url = `${BASE_URL}?action=layDanhSachLichHop&loai=${loai}&ma=${ma}`;
  return FetchApi(url, {
    method: "GET",
  });
}
