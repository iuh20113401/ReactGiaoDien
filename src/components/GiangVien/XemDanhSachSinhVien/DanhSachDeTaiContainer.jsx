import { P2 } from "../../../ui/Typography";
import { Col, Col2, Row } from "../../../ui/Table";

export function DanhSachDeTaiContainer({ DanhSachSinhVien }) {
  return DanhSachSinhVien.sort((a, b) => a.MaDoAn - b.MaDoAn).map(
    (sv, index) => {
      return (
        <Row key={sv.maSinhVien} isFlex="true">
          <Col>
            <P2 size="1.4">{index + 1}</P2>
          </Col>
          <Col2>
            <P2 size="1.4">{sv.hoTen}</P2>
          </Col2>
          <Col className="g-center">
            <P2 size="1.4">{sv.lop}</P2>
          </Col>
          <Col className="textCenter">
            <P2 size="1.4">{sv.maDoAn}</P2>
          </Col>
          <Col2 className="textCenter">
            <P2 size="1.4">{sv.tienDoHoanThanh}</P2>
          </Col2>

          <Col2>
            <P2 size="1.4">{sv.tenDeTai}</P2>
          </Col2>

          <Col2>
            <P2 size="1.4">{sv.email || "Trống"}</P2>
          </Col2>
          <Col>
            <P2 size="1.4">{sv.soDienThoai || "Trống"}</P2>
          </Col>
        </Row>
      );
    }
  );
}
