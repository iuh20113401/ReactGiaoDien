import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { P2 } from "../../../ui/Typography";
import { InputContainer } from "../../../ui/Input";
import Table, { Col, Col2, Col3, Col5, Row, TieuDe } from "../../../ui/Table";
import { Spinner } from "../../../ui/Spinner";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
import { layDanhSachDoAn } from "../../../API/giangVien/DoAn";

export function DanhSachDoAn({ register }) {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const {
    data: danhSachDoAn,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["danhSachDoAn"],
    queryFn: () => layDanhSachDoAn(thongTinNguoiDung.maGiangVien),
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxAllChange = (e) => {
    e.target.checked
      ? setCheckedItems(danhSachDoAn.map((dt) => `${dt.maDoAn}`))
      : setCheckedItems([]);
  };
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
          <InputContainer.Checkbox
            checked={checkedItems.length === danhSachDoAn.length}
            register={{
              ...register("selectedTopics"),
            }}
            onChange={handleCheckboxAllChange}
            value="all"
          />
        </Col>
        <Col2 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Mã đồ án
          </P2>
        </Col2>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Tên sinh viên 1
          </P2>
        </Col3>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Tên sinh viên 2
          </P2>
        </Col3>
        <Col3 className="g-center">
          <P2 size="1.4" className="semibold" color="var(--color--secondary_8)">
            Số lượng thành viên
          </P2>
        </Col3>
      </TieuDe>
      {danhSachDoAn.map((doAn) => {
        return (
          <Row key={doAn.maDoAn}>
            <Col>
              <InputContainer.Checkbox
                checked={checkedItems.includes(`${doAn.maDoAn}`)}
                register={{
                  ...register("selectedTopics", {
                    onChange: (e) =>
                      handleCheckboxChange(e.target.value, e.target.checked),
                  }),
                }}
                value={doAn.maDoAn}
              />
            </Col>
            <Col2 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {doAn.maDoAn}
              </P2>
            </Col2>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {doAn.tenSinhVien1}
              </P2>
            </Col3>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {doAn.tenSinhVien2}
              </P2>
            </Col3>
            <Col3 className="g-center">
              <P2 size="1.4" color="var(--color--secondary_8)">
                {doAn.maSinhVien2 ? 2 : 1}
              </P2>
            </Col3>
          </Row>
        );
      })}
    </Table>
  );
}
