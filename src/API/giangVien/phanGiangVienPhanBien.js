const API_BASE_URL =
  "http://localhost/server/api/giangVien/phanCongGiangVienPhanBien.php";

// Utility function to handle the fetch operations
async function fetchApi(url, options) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${
          data.message || "An error occurred"
        }`
      );
    }
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw new Error(`Fetch operation failed: ${error.message}`);
  }
}

// Function to fetch the list of assigned reviews
export async function layDanhSachPhanCongPhanBien() {
  return fetchApi(`${API_BASE_URL}?action=layDanhSachPhanCongPhanBien`, {
    method: "GET",
  });
}

// Function to fetch the list of instructors
export async function layDanhSachGiangVien() {
  return fetchApi(`${API_BASE_URL}?action=layDanhSachGiangVien`, {
    method: "GET",
  });
}

// Function to assign an instructor for review
export async function phanGiangVienPhanBien(thongTinPhanCong) {
  console.log(thongTinPhanCong);
  return fetchApi(`${API_BASE_URL}?action=phanGiangVienPhanBien`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thongTinPhanCong),
  });
}
