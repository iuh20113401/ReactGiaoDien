import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { InputContainer } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Table, { Col, Col2, Col3, TieuDe } from "../../ui/Table";
import { H5, P2 } from "../../ui/Typography";
import { layDanhSachDeTaiChoDuyet } from "../../API/giangVien/DuyetDeTai";
import {
  DanhSachDeTaiContainer,
  ChiTietDeTai,
} from "../../components/GiangVien/DanhSachDeTaiContainer";

const DuyetDeTaiContainer = styled.section`
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
export const IconDiv = styled.span`
  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function GiangVienDuyetDeTai() {
  const [active, setActive] = useState(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["danhSachDeTaiChoDuyet"],
    queryFn: layDanhSachDeTaiChoDuyet,
  });
  const [searchTen, setSearchTen] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const SetParam = useCallback(
    (field, value) => {
      searchParam.set(field, value);
      setSearchParam(searchParam);
    },
    [searchParam, setSearchParam]
  );
  const DanhSachDeTai = useMemo(() => {
    return data?.filter((dt) => {
      const isSearchTen = searchTen ? dt.tenDeTai.includes(searchTen) : true;
      const giangvien = searchParam.get("giangvien")
        ? dt.maGiangVien === +searchParam.get("giangvien")
        : true;
      return isSearchTen && giangvien;
    });
  }, [data, searchParam, searchTen]);
  const danhSachGiangVien = data?.reduce((acc, curr) => {
    if (acc.find((a) => a.maGiangVien === curr.maGiangVien)) return acc;
    acc.push({
      maGiangVien: curr.maGiangVien,
      giangVienHuongDan: curr.giangVienHuongDan,
    });
    return acc;
  }, []);
  const danhMucDeTai = DanhSachDeTai?.reduce((acc, curr) => {
    if (acc.find((a) => a.danhMuc === curr.danhMuc)) return acc;
    acc.push({ danhMuc: curr.danhMuc, tenDanhMuc: curr.tenDanhMuc });
    return acc;
  }, []);
  return (
    !isLoading && (
      <>
        <DuyetDeTaiContainer>
          <H5>Duyệt đề tài</H5>
          <Container>
            <InputContainer type="inputGroup">
              <span>
                <HiSearch />
              </span>
              <InputContainer.Input
                type="text"
                placeholder="Nhập tên đề tài cần tìm"
                id="tendetai"
                size="block"
                value={searchTen}
                onChange={(e) => setSearchTen(e.target.value)}
              />
            </InputContainer>
            <InputContainer type="horizontal" gap="2.4">
              <InputContainer.Select
                size="block"
                onChange={(e) => SetParam("giangvien", e.target.value)}
              >
                <option value="">Theo giảng viên</option>
                {danhSachGiangVien?.map((gv) => (
                  <option key={gv.maGiangVien} value={`${gv.maGiangVien}`}>
                    {gv.giangVienHuongDan}
                  </option>
                ))}
              </InputContainer.Select>
              <InputContainer.Select size="block">
                <option value="0">Theo danh mục</option>
                {danhMucDeTai?.map((dt) => (
                  <option key={dt.maDanhMuc} value={`${dt.danhMuc}`}>
                    {dt.tenDanhMuc}
                  </option>
                ))}
              </InputContainer.Select>
              <InputContainer.Select size="block">
                <option value="">Theo trạng thái</option>
                <option value="0">Chờ duyệt</option>
                <option value="1">Đã duyệt</option>
                <option value="2">Yêu cầu chỉnh sửa</option>
                <option value="3">Không duyệt</option>
              </InputContainer.Select>
            </InputContainer>
            <div>
              <Button
                bgcolor="var(--color--main_7)"
                color="var(--color--secondary_1)"
                size="lg"
              >
                Tìm kiếm
              </Button>
            </div>
          </Container>
          <div className="flex flexColumn g-8">
            <div className="flex flexCenter g-spaceBetween">
              <P2>{DanhSachDeTai.length} Đề tài</P2>
              <InputContainer.Select>
                <option value="">Sắp xếp theo </option>
                <option value="0">Tên đề tài tăng dẫn </option>
                <option value="1">Tên đề tài giảm dẫn </option>
              </InputContainer.Select>
            </div>
            <Container>
              <Table>
                <TieuDe>
                  <Col>
                    <P2 size="1.4">
                      <strong>STT</strong>
                    </P2>
                  </Col>
                  <Col3 className="g-center">
                    <P2 size="1.4">
                      <strong>Tên đề tài</strong>
                    </P2>
                  </Col3>
                  <Col2 className="g-center">
                    <P2 size="1.4">
                      <strong>Giảng viên </strong>
                    </P2>
                  </Col2>
                  <Col3 className="g-center">
                    <P2 size="1.4">
                      <strong>Kỹ năng cần có</strong>
                    </P2>
                  </Col3>
                  <Col2 className="g-center">
                    <P2 size="1.4">
                      <strong>Danh mục đề tài</strong>
                    </P2>
                  </Col2>
                  <Col></Col>
                </TieuDe>
                <DanhSachDeTaiContainer
                  DanhSachDeTai={DanhSachDeTai}
                  setActive={setActive}
                  refetch={refetch}
                />
              </Table>
            </Container>
          </div>
        </DuyetDeTaiContainer>
        {active && (
          <ChiTietDeTai
            setActive={setActive}
            dt={DanhSachDeTai.find((dt) => dt.maDeTai === active)}
          />
        )}
      </>
    )
  );
}
export default GiangVienDuyetDeTai;
