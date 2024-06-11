const BASE_URL = "http://54.206.33.181/server/api/dangNhap.php";
export async function dangNhap({ taiKhoan, matKhau, thoiGian }) {
  try {
    const response = await fetch(BASE_URL + "?action=dangNhap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taiKhoan, matKhau, thoiGian }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Thông tin tài khoản hoặc mật khẩu không đúng");
    }
    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
export async function layThongTin(thongTin) {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(BASE_URL + "?action=layThongTin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(thongTin),
  });
  if (response.status === 401) {
    throw new Error("Access is denied");
  }
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data) {
    throw new Error("Tài khoản không tồn tại");
  }
  return data;
}
