const BASE_URL = "https://3.26.182.86/server-main/api/comment/comment.php";

export async function layDanhSachComment(maDoAn) {
  try {
    const response = await fetch(
      `${BASE_URL}?action=layDanhSachComment&maDoAn=${maDoAn}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
export async function themComment(thongTinComment) {
  try {
    const response = await fetch(`${BASE_URL}?action=themComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thongTinComment),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
