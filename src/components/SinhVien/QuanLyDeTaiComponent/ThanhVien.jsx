import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { RxAvatar } from "react-icons/rx";

import { H5, P2 } from "../../../ui/Typography";
import Table, { Col, Col2, Col5, Row } from "../../../ui/Table";
import { Button } from "../../../ui/Button";
import { layThongTinThanhVien } from "../../../API/sinhVien/DeTai";
import UseThongTinTaiKhoan from "../../../hooks/UseThongTinTaiKhoan";
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
  const { data: thongTinTaiKhoan } = UseThongTinTaiKhoan();
  const { data, isLoading } = useQuery({
    queryKey: ["thongtinthanhvien"],
    queryFn: () =>
      layThongTinThanhVien({ maSinhVien: thongTinTaiKhoan.maSinhVien }),
  });
  const DoAn = !isLoading && data;
  return isLoading ? (
    <Loading size={8.4} color={"var(--color--main_7)"} />
  ) : (
    <>
      <ThanhVienContainer>
        <ThanhVienTitle>
          <H5>Hướng dẫn</H5>
        </ThanhVienTitle>
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
                  <P2 size="1.4rem">{DoAn.giangVienHD}</P2>
                </Col5>
                <Col className="g-center">
                  <P2 size="1.4rem">{DoAn.ngaySinh || "Trống"}</P2>
                </Col>
                <Col2 className="g-center">
                  <P2 size="1.4rem">{DoAn.soDienThoaiGiangVien || "Trống"}</P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4rem">{DoAn.emailGiangVien}</P2>
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
          {DoAn.giangVienPhanBien1 && DoAn.giangVienPhanBien2 && (
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
                      <P2 size="1.4rem">{DoAn.tenGiangVienPhanBien1}</P2>
                    </Col5>
                    <Col className="g-center">
                      <P2 size="1.4rem">
                        {DoAn.ngaySinhGiangVienPhanBien1 || "Trống"}
                      </P2>
                    </Col>
                    <Col2 className="g-center">
                      <P2 size="1.4rem">
                        {DoAn.soDienThoaiGiangVienPhanBien1}
                      </P2>
                    </Col2>
                    <Col2 className="g-center">
                      <P2 size="1.4rem">{DoAn.emailGiangVienPhanBien1}</P2>
                    </Col2>
                    <Col2 className="g-center">
                      <Button bgcolor="var(--color--secondary_4)" shadow="none">
                        Xem profile
                      </Button>
                    </Col2>
                  </Row>
                  {DoAn.maSinhVien2 !== null && (
                    <Row>
                      <Col5>
                        <AvatarDiv>
                          <RxAvatar />
                        </AvatarDiv>
                        <P2 size="1.4rem">{DoAn.tenGiangVienPhanBien2}</P2>
                      </Col5>
                      <Col className="g-center">
                        <P2 size="1.4rem">
                          {DoAn.ngaySinhGiangVienPhanBien2 || "Trống"}
                        </P2>
                      </Col>
                      <Col2 className="g-center">
                        <P2 size="1.4rem">
                          {DoAn.soDienThoaiGiangVienPhanBien2 || "Trống"}
                        </P2>
                      </Col2>
                      <Col2 className="g-center">
                        <P2 size="1.4rem">
                          {DoAn.emailGiangVienPhanBien2 || "Trống"}
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
                  <P2 size="1.4rem">{DoAn.tenSinhVien1}</P2>
                </Col5>
                <Col className="g-center">
                  <P2 size="1.4rem">{DoAn.ngaySinhSinhVien1 || "Trống"}</P2>
                </Col>
                <Col2 className="g-center">
                  <P2 size="1.4rem">{DoAn.soDienThoaiSinhVien1 || "Trống"}</P2>
                </Col2>
                <Col2 className="g-center">
                  <P2 size="1.4rem">{DoAn.emailSinhVien1 || "Trống"} </P2>
                </Col2>
                <Col2 className="g-center">
                  <Button bgcolor="var(--color--secondary_4)" shadow="none">
                    Xem profile
                  </Button>
                </Col2>
              </Row>
              {/* note sinh vien 2 */}
              {DoAn.maSinhVien2 !== null && (
                <Row>
                  <Col5>
                    <AvatarDiv>
                      <RxAvatar />
                    </AvatarDiv>
                    <P2 size="1.4rem">{DoAn.tenSinhVien2}</P2>
                  </Col5>
                  <Col className="g-center">
                    <P2 size="1.4rem">{DoAn.ngaySinhSinhVien2 || "Trống"}</P2>
                  </Col>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">
                      {DoAn.soDienThoaiSinhVien2 || "Trống"}
                    </P2>
                  </Col2>
                  <Col2 className="g-center">
                    <P2 size="1.4rem">{DoAn.emailSinhVien2 || "Trống"}</P2>
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
      </ThanhVienContainer>
    </>
  );
}

export default ThanhVien;
