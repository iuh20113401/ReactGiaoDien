export async function layDanhSachLienLac(maSinhVien) {
  try {
    const response = await fetch(
      `https://54.206.45.242/server-main/api/chatApp/chatApp.php?action=layDanhSachLienLac&maSinhVien=${maSinhVien}`,
      {
        method: "GET",
      }
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
export async function layNoiDungTinNhan(nguoiGui, nguoiNhan) {
  try {
    const response = await fetch(
      `https://54.206.45.242/server-main/api/chatApp/chatApp.php?action=getChat&nguoiGui=${nguoiGui}&nguoiNhan=${nguoiNhan}`,
      {
        method: "GET",
      }
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

export async function guiTinNhan({ nguoiGui, nguoiNhan, noiDung }) {
  try {
    const response = await fetch(
      `https://54.206.45.242/server-main/api/chatApp/chatApp.php?action=sendChat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nguoiGui: nguoiGui,
          nguoiNhan: nguoiNhan,
          noiDung: noiDung,
        }),
      }
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
export async function layDanhSachLienLacChoGiangVien(maGiangVien) {
  try {
    const response = await fetch(
      `https://54.206.45.242/server-main/api/chatApp/chatApp.php?action=layDanhSachLienLacChoGiangVien&maGiangVien=${maGiangVien}`,
      {
        method: "GET",
      }
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
