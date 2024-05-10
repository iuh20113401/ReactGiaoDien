import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { RxAvatar } from "react-icons/rx";

import { H5, P2 } from "../../../ui/Typography";
import Table, { Col, Col2, Col5, Row } from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { layThongTinThanhVien } from "../../../API/giangVien/DoAn";
import { formatDate } from "../../../utils/formatDate";
import useSearchParamGet from "../../../hooks/useSearchParamGet";
import Loading from "../../../pages/Loading";

const ThanhVienContainer = styled.article`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const ThanhVienTitle = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1.6rem;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
`;
const ThongTinDiv = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1.6rem;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
`;
const AvatarDiv = styled.figure`
  width: 4.2rem;
  height: 4.2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.6rem;
  & > svg {
    width: 4rem;
    height: 4rem;
  }
`;
function ThanhVien() {
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: ThanhVien, isLoading } = useQuery({
    queryKey: ["thongtinthanhvien"],
    queryFn: () => layThongTinThanhVien(maDoAn),
  });
  return (
    <ThanhVienContainer>
      <ThanhVienTitle>
        <H5>Thành viên</H5>
      </ThanhVienTitle>
      {isLoading ? (
        <Loading size={8.4} color="var(--color--main_7)" className="flex " />
      ) : (
        <>
          <div>
            <P2 size="1.4rem" className="mb-2">
              Giảng viên hướng dẫn
            </P2>
            <ThongTinDiv>
              <Table>
                <Row>
                  <Col5>
                    <AvatarDiv>
                      <RxAvatar />
                    </AvatarDiv>
                    <P2 size="1.4rem">{ThanhVien.giangVienHD}</P2>
                  </Col5>
                  <Col className="g-center">
                    <P2 size="1.4rem">{ThanhVien.ngaySinh || "Trống"}</P2>
                  </Col>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">
                      {ThanhVien.soDienThoaiGiangVien || "Trống"}
                    </P2>
                  </Col2>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">{ThanhVien.emailGiangVien}</P2>
                  </Col2>
                  <Col2 className="g-center">
                    <Button bgcolor="var(--color--secondary_4)" shadow="none">
                      Xem profile
                    </Button>
                  </Col2>
                </Row>
              </Table>
            </ThongTinDiv>
          </div>
          <div>
            {ThanhVien.giangVienPhanBien1 && ThanhVien.giangVienPhanBien2 && (
              <>
                <P2 size="1.4rem" className="mb-2">
                  Giảng viên phản biện
                </P2>
                <ThongTinDiv>
                  <Table>
                    <Row>
                      <Col5>
                        <AvatarDiv>
                          <RxAvatar />
                        </AvatarDiv>
                        <P2 size="1.4">{ThanhVien.tenGiangVienPhanBien1}</P2>
                      </Col5>
                      <Col className="g-center">
                        <P2 size="1.4">
                          {ThanhVien.ngaySinhGiangVienPhanBien1 || "Trống"}
                        </P2>
                      </Col>
                      <Col2 className="g-center">
                        <P2 size="1.4">
                          {ThanhVien.soDienThoaiGiangVienPhanBien1}
                        </P2>
                      </Col2>
                      <Col2 className="g-center">
                        <P2 size="1.4">{ThanhVien.emailGiangVienPhanBien1}</P2>
                      </Col2>
                      <Col2 className="g-center">
                        <Button
                          bgcolor="var(--color--secondary_4)"
                          shadow="none"
                        >
                          Xem profile
                        </Button>
                      </Col2>
                    </Row>
                    {ThanhVien.maSinhVien2 !== null && (
                      <Row>
                        <Col5>
                          <AvatarDiv>
                            <RxAvatar />
                          </AvatarDiv>
                          <P2 size="1.4rem">
                            {ThanhVien.tenGiangVienPhanBien2}
                          </P2>
                        </Col5>
                        <Col className="g-center">
                          <P2 size="1.4rem">
                            {ThanhVien.ngaySinhGiangVienPhanBien2 || "Trống"}
                          </P2>
                        </Col>
                        <Col2 className="g-center">
                          <P2 size="1.4rem">
                            {ThanhVien.soDienThoaiGiangVienPhanBien2 || "Trống"}
                          </P2>
                        </Col2>
                        <Col2 className="g-center">
                          <P2 size="1.4rem">
                            {ThanhVien.emailGiangVienPhanBien2 || "Trống"}
                          </P2>
                        </Col2>
                        <Col2 className="g-center">
                          <Button
                            bgcolor="var(--color--secondary_4)"
                            shadow="none"
                          >
                            Xem profile
                          </Button>
                        </Col2>
                      </Row>
                    )}
                  </Table>
                </ThongTinDiv>
              </>
            )}
          </div>
          <div>
            <P2 size="1.4rem" className="mb-2">
              Sinh viên
            </P2>
            <ThongTinDiv>
              <Table>
                <Row>
                  <Col5>
                    <AvatarDiv>
                      <RxAvatar />
                    </AvatarDiv>
                    <P2 size="1.4rem">{ThanhVien.tenSinhVien1}</P2>
                  </Col5>
                  <Col className="g-center">
                    <P2 size="1.4rem">
                      {formatDate(ThanhVien.ngaySinhSinhVien1) || "Trống"}
                    </P2>
                  </Col>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">
                      {ThanhVien.soDienThoaiSinhVien1 || "Trống"}
                    </P2>
                  </Col2>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">
                      {ThanhVien.emailSinhVien1 || "Trống"}{" "}
                    </P2>
                  </Col2>
                  <Col2 className="g-center">
                    <Button bgcolor="var(--color--secondary_4)" shadow="none">
                      Xem profile
                    </Button>
                  </Col2>
                </Row>
                {/* note sinh vien 2 */}
                {ThanhVien.maSinhVien2 !== null && (
                  <Row>
                    <Col5>
                      <AvatarDiv>
                        <RxAvatar />
                      </AvatarDiv>
                      <P2 size="1.4rem">{ThanhVien.tenSinhVien2}</P2>
                    </Col5>
                    <Col className="g-center">
                      <P2 size="1.4rem">
                        {ThanhVien.ngaySinhSinhVien2 || "Trống"}
                      </P2>
                    </Col>
                    <Col2 className="g-center">
                      <P2 size="1.4rem">
                        {ThanhVien.soDienThoaiSinhVien2 || "Trống"}
                      </P2>
                    </Col2>
                    <Col2 className="g-center">
                      <P2 size="1.4rem">
                        {ThanhVien.emailSinhVien2 || "Trống"}
                      </P2>
                    </Col2>
                    <Col2 className="g-center">
                      <Button bgcolor="var(--color--secondary_4)" shadow="none">
                        Xem profile
                      </Button>
                    </Col2>
                  </Row>
                )}
              </Table>
            </ThongTinDiv>
          </div>
        </>
      )}
    </ThanhVienContainer>
  );
}

export default ThanhVien;
