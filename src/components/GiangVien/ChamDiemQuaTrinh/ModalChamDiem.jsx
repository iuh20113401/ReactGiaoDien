import React, { useState } from "react";
import Table, { Col, Col2, Col3, Col5, Row, TieuDe } from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import Form from "../../../ui/Form";
import { H6, P2 } from "../../../ui/Typography";
import { useForm } from "react-hook-form";
import { Button } from "../../../ui/Button";
import { InputContainer } from "../../../ui/Input";
const loContent = [
  "Xác định được yêu cầu của khóa luận cần thực hiện",
  "Phân tích yêu cầu (hiện trạng, nghiệp vụ) và mô hình hóa được yêu cầu của đề tài.",
  "Thiết kế một hệ thống thông tin/đưa ra giải pháp đáp ứng được yêu cầu của đề tài",
  "Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa ra/Hiện thực giải pháp đã đưa ra",
  "Viết được báo cáo khóa luận tốt nghiệp.",
  "Trình bày được các kiến thưc nền tảng liên quan đến đề tài khóa luận",
  "Đánh giá việc hiện thực khóa luận đáp ứng yêu cầu đề tài khóa luận",
  "Bảo vệ (defend) kết quả khóa luận trước giảng viên phản biện",
];
function ModalChamDiem({ sv }) {
  const { register, handleSubmit, reset } = useForm();
  function onSubmit(data) {
    console.log(data);
  }
  const [active, setActive] = useState(false);
  return (
    <Modal>
      <Modal.Title>
        <H6 className="bold">Nhập điểm sinh viên </H6>
        <Modal.Close />
      </Modal.Title>
      <Modal.Content>
        <P2>Họ tên sinh viên: {sv.tenSinhVien}</P2>
        <P2>Mã số sinh viên: {sv.maSinhVien}</P2>
        <br />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Table border="true" gap={"0"} customwidth={100}>
            <TieuDe border={"true"}>
              <Col>
                <P2 size="1.4">
                  <strong>STT</strong>
                </P2>
              </Col>
              <Col5 className="g-center">
                <P2 size="1.4">
                  <strong>LO</strong>
                </P2>
              </Col5>
              <Col3 className="g-center">
                <P2 size="1.4">
                  <strong>Kết quả</strong>
                </P2>
              </Col3>
              <Col3 className="g-center">
                <P2 size="1.4">
                  <strong>Ghi chú</strong>
                </P2>
              </Col3>
            </TieuDe>
            {loContent.map((lo, stt) => (
              <AddTableRow register={register} stt={stt + 1} lo={lo} />
            ))}
          </Table>
          <Button bgcolor="var(--color--main_7)">Xác nhận</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
function AddTableRow({ register, stt, lo }) {
  return (
    <Row border={"true"}>
      <Col>
        <P2 size="1.4">{stt}</P2>
      </Col>
      <Col5>
        <P2 size="1.4">{lo}</P2>
      </Col5>
      <Col3 className="g-center">
        <InputContainer>
          <InputContainer.Input
            type="number"
            register={{
              ...register("lo" + stt, {
                required: "Chưa nhập LO " + stt,
              }),
            }}
          />
        </InputContainer>
      </Col3>
      <Col3 className="g-center">
        <InputContainer.Input
          type="text"
          register={{
            ...register("ghiChu" + stt),
          }}
        />
      </Col3>
    </Row>
  );
}
export default ModalChamDiem;
