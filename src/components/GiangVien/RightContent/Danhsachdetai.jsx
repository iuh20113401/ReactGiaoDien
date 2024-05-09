import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { P2 } from "../../../ui/Typography";
import { InputContainer } from "../../../ui/Input";
import Table, { Col, Col3, Col5, Row, TieuDe } from "../../../ui/Table";
import { Spinner } from "../../../ui/Spinner";
import { layDanhSachDeTaiDaDangKy } from "../../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";

export function Danhsachdetai({ register }) {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const {
    data: danhSachDeTai,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["danhSachDeTai"],
    queryFn: () =>
      layDanhSachDeTaiDaDangKy({ maGiangVien: thongTinNguoiDung.maGiangVien }),
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxChange = (value, isChecked) => {
    setCheckedItems((prev) => {
      const newCheckedItems = isChecked
        ? [...prev, value]
        : prev.filter((item) => item !== value);
      return newCheckedItems;
    });
  };
  if (isLoading)
    return (
      <div className="flex h-100 flexCenter g-center">
        <Spinner color="var(--color--main_7)" />
      </div>
    );
  return (
    <Table>
      <TieuDe>
        <Col>
          <InputContainer.Checkbox />
        </Col>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Mã đề tài
          </P2>
        </Col3>
        <Col5 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Tên đề tài
          </P2>
        </Col5>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Số lượng đồ án
          </P2>
        </Col3>
      </TieuDe>
      {danhSachDeTai.map((deTai) => {
        return (
          <Row key={deTai.maDeTai}>
            <Col>
              <InputContainer.Checkbox
                checked={checkedItems.includes(`${deTai.maDeTai}`)}
                register={{
                  ...register("selectedTopics", {
                    onChange: (e) =>
                      handleCheckboxChange(e.target.value, e.target.checked),
                  }),
                }}
                value={deTai.maDeTai}
              />
            </Col>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.maDeTai}
              </P2>
            </Col3>
            <Col5>
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.tenDeTai}
              </P2>
            </Col5>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {deTai.soLuongDoAn}
              </P2>
            </Col3>
          </Row>
        );
      })}
    </Table>
  );
}
