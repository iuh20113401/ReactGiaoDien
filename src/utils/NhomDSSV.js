const nhomTheoDoAn = (students) => {
  const groupedByThesis = students.reduce((acc, student) => {
    const { maDoAn } = student;
    if (!acc[maDoAn]) {
      acc[maDoAn] = [];
    }
    acc[maDoAn].push(student);
    return acc;
  }, {});
  return Object.values(groupedByThesis);
};
const nhomTheoDeTai = (danhSachSinhVien) => {
  const groupedByProject = danhSachSinhVien.reduce((acc, sinhVien) => {
    const { maDeTai } = sinhVien;
    if (!acc[maDeTai]) {
      acc[maDeTai] = [];
    }
    acc[maDeTai].push(sinhVien);
    return acc;
  }, {});
  return Object.values(groupedByProject);
};
export { nhomTheoDeTai, nhomTheoDoAn };
