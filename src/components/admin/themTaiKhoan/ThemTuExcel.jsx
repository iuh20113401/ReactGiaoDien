import React from "react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { read, utils } from "xlsx";
import toast from "react-hot-toast";

import { P2 } from "../../../ui/Typography";
import { OutlineButton } from "../../../ui/Button";
import {
  kiemTraMaTaiKhoanTonTai,
  themGiangVien,
  themSinhVien,
  themTaiKhoan,
} from "../../../API/taiKhoan/TaiKhoan";

function ThemTuExcel() {
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => {
      const vaiTro = data.vaiTro;
      if (+vaiTro === 0) {
        data.matKhau = "sinhvien123";
        themSinhVien(data);
      } else {
        data.matKhau = "giangvien123";
        themGiangVien(data);
      }
      themTaiKhoan(data);
    },
    onError: (error) => {
      alert("Thêm tài khoản thất bại");
    },
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
      const tieuDe = [
        "maTaiKhoan",
        "hoTen",
        "ngaySinh",
        "gioiTinh",
        "email",
        "soDienThoai",
        "vaiTro",
        "lop",
      ];
      setExcelData(
        jsonData.slice(1).map((row, index) => {
          const obj = {};

          for (let i = 0; i < row.length; i++) {
            if (tieuDe[i] === "hoTen" && !row[i]) {
              setError(`Họ tên hàng ${index + 1} không được để trống`);
              break;
            }

            if (tieuDe[i] === "vaiTro") {
              const vaiTroPhuHop =
                row[i].toLowerCase() === "sinh viên" ||
                row[i].toLowerCase() === "giảng viên";
              obj[tieuDe[i]] = row[i].toLowerCase() === "sinh viên" ? 0 : 1;
              !vaiTroPhuHop &&
                setError(`Vai trò hàng ${index + 1} không hợp lệ`);
              continue;
            }
            if (tieuDe[i] === "ngaySinh") {
              const date = new Date(row[i])?.toLocaleDateString("vi-VN");
              if (date === "Invalid Date") {
                setError(`Ngày sinh hàng ${index + 1} không hợp lệ`);
              }
              obj[tieuDe[i]] = date || null;
              continue;
            }
            if (tieuDe[i] === "gioiTinh") {
              obj[tieuDe[i]] = row[i] === "Nam" ? 0 : 1;
              continue;
            }
            obj[tieuDe[i]] = row[i] || null;
          }
          return obj;
        })
      );
    };
    reader.readAsArrayBuffer(file);
  }
  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the area is clicked
    fileInputRef.current.value = null;
    setError(false);
  };
  useEffect(() => {
    if (error || excelData === null || excelData.length === 0) {
      return;
    }
    const kiemTraMaTaiKhoan = async () => {
      try {
        const result = await kiemTraMaTaiKhoanTonTai({
          maTaiKhoan: excelData.map((item) => item.maTaiKhoan),
        });
        if (result.length === 0) {
          excelData.forEach((item) => {
            mutate(item);
          });
          if (isError) {
            setError("Thêm tài khoản thất bại");
          } else {
            toast.success("Thêm danh sách tài khoản thành công");
          }
        } else {
          setError(
            "Mã tài khoản " +
              result.map((item) => item.MaTaiKhoan) +
              " đã tồn tại"
          );
        }
      } catch (error) {
        setError("Lỗi khi kiểm tra mã tài khoản");
      }
    };

    kiemTraMaTaiKhoan();
  }, [error, excelData, isError, mutate]);
  return (
    <>
      <OutlineButton
        color="var(--color--main_7)"
        size="lg"
        onClick={handleClick}
      >
        Nhập từ file excel
      </OutlineButton>
      {error && (
        <P2 size="1.2" color="var(--color--red_7)" className="mt-2">
          {error}
        </P2>
      )}
      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </>
  );
}
export default ThemTuExcel;
