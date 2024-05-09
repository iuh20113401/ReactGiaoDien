export async function layDanhSachLienLac(maSinhVien) {
  try {
    const response = await fetch(
      `http://3.26.182.86/server-main/api/chatApp/chatApp.php?action=layDanhSachLienLac&maSinhVien=${maSinhVien}`,
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
  console.log(nguoiGui, nguoiNhan);
  try {
    const response = await fetch(
      `http://localhost/server/api/chatApp/chatApp.php?action=getChat&nguoiGui=${nguoiGui}&nguoiNhan=${nguoiNhan}`,
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
      `http://localhost/server/api/chatApp/chatApp.php?action=sendChat`,
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
      `http://localhost/server/api/chatApp/chatApp.php?action=layDanhSachLienLacChoGiangVien&maGiangVien=${maGiangVien}`,
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
