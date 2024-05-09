import styled from "styled-components";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

import { H5, P2 } from "../../ui/Typography";
import { InputContainer } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Table, { Col, Col2, Col3, TieuDe } from "../../ui/Table";
import { XemChiTiet } from "../../components/GiangVien/XemChiTiet";
import { layDanhSachDeTai } from "../../API/giangVien/DeTai";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import { DanhSachDeTaiContainer } from "../../components/GiangVien/QuanLyDeTaiComponent/DanhSachDeTaiContainer";
import Loading from "../Loading";

const QuanLyDeTaiSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
export const TagList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;
const ButtonThemContainer = styled.div`
  display: flex;
`;
export const TrangThai = [
  {
    ten: "Chờ duyệt",
    bgcolor: "var(--color--red_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Không duyệt",
    bgcolor: "var(--color--red_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã duyệt",
    bgcolor: "var(--color--main_7)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã đăng ký",
    bgcolor: "var(--color--yellow_5)",
    color: "var(--color--secondary_1)",
  },
  {
    ten: "Đã đầy",
    bgcolor: "var(--color--green_7)",
    color: "var(--color--secondary_1)",
  },
];

function GiangVienQuanLyDeTai() {
  const { data: thongTinNguoiDung } = UseThongTinTaiKhoan();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["deTai"],
    queryFn: () => layDanhSachDeTai(thongTinNguoiDung.maGiangVien),
  });
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const trangThai = searchParam.get("trangthai") || null;
  function TimKiem(field, value) {
    searchParam.set(field, value);
    setSearchParam(searchParam);
  }

  const DanhSachDeTai = useMemo(() => {
    if (!data || !data.length) return [];
    if (searchValue)
      return data.filter((dt) => {
        return dt.TenDeTai.includes(searchValue);
      });
    const status = searchParam.get("trangthai");
    const skills = searchParam.get("kynang")?.split("+").join(" ");
    return data.filter((dt) => {
      return (
        (!status ||
          +trangThai === 0 ||
          dt.TrangThai === TrangThai[status - 1]?.ten) &&
        (!skills ||
          skills === "" ||
          dt.Tag.split(",")
            .map((t) => t.trim())
            .includes(skills))
      );
    });
  }, [data, searchValue, trangThai, searchParam]);
  return (
    <>
      {isLoading && <Loading size={8.4} color="var(--color--main_7)" />}
      {!isLoading && DanhSachDeTai && (
        <QuanLyDeTaiSection>
          <H5>Quản lý đề tài </H5>
          <ButtonThemContainer>
            <Button
              bgcolor="var(--color--main_7)"
              color="var(--color--secondary_1)"
              size="lg"
              onClick={(e) => navigate("themdetai")}
            >
              Thêm đề tài
            </Button>
          </ButtonThemContainer>
          <Container>
            <P2>Tìm kiếm đề tài</P2>
            <InputContainer type="inputGroup">
              <span>
                <HiSearch />
              </span>
              <InputContainer.Input
                type="text"
                placeholder="Nhập tên đề tài cần tìm"
                id="tendetai"
                size="block"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </InputContainer>
            <InputContainer type="horizontal" gap="2.4">
              <InputContainer.Select
                size="block"
                onChange={(e) => TimKiem("trangthai", e.target.value)}
              >
                <option value="0">Theo trạng thái</option>
                {TrangThai.map((tt, index) => (
                  <option key={index} value={index + 1}>
                    {tt.ten}
                  </option>
                ))}
              </InputContainer.Select>
              <InputContainer.Select
                size="block"
                onChange={(e) => TimKiem("kynang", e.target.value)}
              >
                <option value="">Chọn theo kỹ năng yêu cầu</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Javascript">Javascript</option>
                <option value="Phân tích yêu cầu">Phân tích yêu cầu</option>
              </InputContainer.Select>
            </InputContainer>
          </Container>
          <div className="mt-2">
            <div className="flex g-spaceBetween">
              <P2>{DanhSachDeTai.length} Result</P2>
              <InputContainer.Select inputStyle="transparent">
                <option value="1">List</option>
                <option value="2">Grid</option>
              </InputContainer.Select>
            </div>
            {!DanhSachDeTai.length && (
              <Container className="flex flexCenter">
                <img
                  src="../public/hinhanh/Nothing_here_yet_1.webp"
                  alt="Nothing here yet"
                  width={"512rem"}
                  height={"512rem"}
                />
              </Container>
            )}
            {DanhSachDeTai.length > 0 && (
              <Container className="mt-1">
                <Table gap="1.6">
                  <TieuDe>
                    <Col3>
                      <P2 size="1.4">
                        <strong>Tên đề tài</strong>
                      </P2>
                    </Col3>
                    <Col2>
                      <P2 size="1.4">
                        <strong>Kết quả cần đạt</strong>
                      </P2>
                    </Col2>
                    <Col2>
                      <P2 size="1.4">
                        <strong>Kỹ năng cần có</strong>
                      </P2>
                    </Col2>
                    <Col2 className="g-center">
                      <P2 size="1.4">
                        <strong>Tag</strong>
                      </P2>
                    </Col2>
                    <Col2 className="g-center">
                      <P2 size="1.4" className="textCenter">
                        <strong>Trạng thái</strong>
                      </P2>
                    </Col2>
                    <Col>
                      <P2 size="1.4">
                        <strong>Hành động</strong>
                      </P2>
                    </Col>
                  </TieuDe>
                  <DanhSachDeTaiContainer
                    DanhSachDeTai={DanhSachDeTai}
                    setActive={setActive}
                    refetch={refetch}
                  />
                </Table>
              </Container>
            )}
          </div>
        </QuanLyDeTaiSection>
      )}
      {active && (
        <XemChiTiet
          active={active}
          setActive={setActive}
          dt={DanhSachDeTai.filter((dt) => dt.MaDeTai === active)[0]}
        />
      )}
    </>
  );
}
export default GiangVienQuanLyDeTai;
