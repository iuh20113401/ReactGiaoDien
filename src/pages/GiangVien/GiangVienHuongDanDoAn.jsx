import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  HiChevronDown,
  HiChevronUp,
  HiPencil,
  HiShare,
  HiStar,
} from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";

import { H5, P2 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { Tooltip } from "../../ui/Tooltip";
import { AccordionItem } from "../../ui/Accordion";
import { layDanhSachHuongDan } from "../../API/giangVien/DeTai";
import { Spinner } from "../../ui/Spinner";
import { formatDate } from "../../utils/formatDate";
import { ChiaSeHuongDan } from "../../components/GiangVien/HuongDan/ChiaSeHuongDan";

const HuongDanContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: var(--color--white);
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
const HiddentElement = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${({ maxheight }) => maxheight};
`;
const ThongTinHuongDan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color--secondary_3);
`;
const nhomTheoHuongDan = (danhSachHuongDan) => {
  const groupedByThesis = danhSachHuongDan.reduce((acc, huongDan) => {
    const { maHuongDan } = huongDan;
    if (!acc[maHuongDan]) {
      acc[maHuongDan] = [];
    }
    acc[maHuongDan].push(huongDan);
    return acc;
  }, {});
  return Object.values(groupedByThesis);
};
function GiangVienHuongDanDoAn() {
  const navigate = useNavigate();
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data: danhSachHuongDan, isLoading } = useQuery({
    queryKey: ["danhSachHuongDan"],
    queryFn: () => layDanhSachHuongDan(thongTinNguoiDung.maGiangVien),
  });
  const newDanhSachHuongDan = !isLoading && nhomTheoHuongDan(danhSachHuongDan);
  const [active, setActive] = useState(null);
  return (
    <HuongDanContainer>
      <H5>Hướng dẫn</H5>
      <Button
        bgcolor="var(--color--main_7)"
        color="var(--color--secondary_1)"
        onClick={() => navigate("themhuongdan")}
      >
        Thêm hướng dẫn mới
      </Button>
      <Container>
        <P2 size="1.4">Danh sách hướng dẫn</P2>
        {isLoading && <Spinner color="var(--color--main_7)" />}
        {!isLoading &&
          newDanhSachHuongDan &&
          newDanhSachHuongDan.map((huongDan) => (
            <ChiTietHuongDan
              huongDan={huongDan}
              setActive={setActive}
              key={huongDan.maHuongDan}
            />
          ))}
      </Container>
      {active && (
        <ChiaSeHuongDan
          setActive={setActive}
          huongDan={newDanhSachHuongDan.find(
            (hd) => +hd[0].maHuongDan === +active
          )}
        />
      )}
    </HuongDanContainer>
  );
}

function ChiTietHuongDan({ huongDan, setActive }) {
  const [isActive, setISActive] = useState(false);
  const detailsRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  useEffect(() => {
    setMaxHeight(isActive ? `${detailsRef.current.scrollHeight}px` : "0px");
  }, [isActive]);

  return (
    <AccordionItem>
      <AccordionItem.Header
        isActive={isActive}
        onClick={(e) => {
          if (e.target.localName === "button") return;
          setISActive((active) => !active);
        }}
        arrow={isActive ? <HiChevronDown /> : <HiChevronUp />}
      >
        <P2 className="flex g-24 g-center flexCenter">
          <HiStar /> {huongDan[0].tenHuongDan}
        </P2>
        <div className="flex g-16">
          <Tooltip
            shadow="none"
            direction="bottom"
            content="Chia sẽ hướng dẫn"
            tcolor="true"
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            size="sm"
            onClick={() => {
              setActive(huongDan[0].maHuongDan);
            }}
          >
            <HiShare />
          </Tooltip>
          <Tooltip
            shadow="none"
            direction="bottom"
            content="Chỉnh sửa hướng dẫn"
            tcolor="true"
            bgcolor="var(--color--green_7)"
            color="var(--color--secondary_1)"
            size="sm"
          >
            <HiPencil />
          </Tooltip>
          <Tooltip
            shadow="none"
            direction="bottom"
            content="Xóa hướng dẫn"
            tcolor="true"
            bgcolor="var(--color--red_6)"
            color="var(--color--secondary_1)"
            size="sm"
          >
            <HiTrash />
          </Tooltip>
        </div>
      </AccordionItem.Header>
      <HiddentElement
        ref={detailsRef}
        onClick={() => setISActive((active) => !active)}
        maxheight={maxHeight}
      >
        {huongDan.map((hd, index) => {
          return (
            <ThongTinHuongDan key={hd.maChiTietHuongDan}>
              <P2>
                <strong>Bước 1:</strong> {hd.noiDung}
              </P2>
              <P2>
                <strong>Kết quả cần đạt:</strong> {hd.tieuChiHoanThanh}
              </P2>
              <div className="flex g-24">
                <P2>
                  <strong>Ngày bắt đầu dự kiến:</strong>{" "}
                  {formatDate(hd.ngayBatDau)}
                </P2>
                <P2>
                  <strong>Ngày kết thúc dự kiến:</strong>{" "}
                  {formatDate(hd.ngayHoanThanh)}
                </P2>
              </div>
            </ThongTinHuongDan>
          );
        })}
      </HiddentElement>
    </AccordionItem>
  );
}
export default GiangVienHuongDanDoAn;
