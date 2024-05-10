import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { H4, P2 } from "../../ui/Typography";
import Badges from "../../ui/Badge";
import { TabContentContents, TabHeaderContents } from "../../ui/Tab";
import Overview from "../../components/SinhVien/QuanLyDeTaiComponent/Overview/Overview";
import HuongDan from "../../components/SinhVien/QuanLyDeTaiComponent/HuongDan";
import TaiLieu from "../../components/SinhVien/QuanLyDeTaiComponent/TaiLieu";
import ThanhVien from "../../components/SinhVien/QuanLyDeTaiComponent/ThanhVien";
import useThongTinDoAn from "../../hooks/sinhVien/useThongTinDoAn";
import Logo from "../../../public/hinhanh/iuh_logo_2.png";
import Loading from "../Loading";
const QuanLyDeTaiSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 1.6rem 0;
`;
const QuanLyTitle = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.6rem 2.4rem 0rem 2.4rem;
  background-color: var(--color--main_3);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const TitleMain = styled.div``;
const TitleSubtitle = styled.div`
  display: flex;
  gap: 2.4rem;
`;
const TitleOverview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Figure = styled.figure`
  width: 8.6rem;
  height: 6.4rem;
  flex-shrink: 0;
  margin-right: 0.8rem;
  shape-outside: circle(50% at 50% 50%);
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
`;
const TitleRight = styled.aside`
  width: 90%;
`;
const TitileTab = styled.div`
  width: 100%;
`;
const TabArr = [
  {
    header: "Tổng quan đồ án",
    content: <Overview />,
  },
  {
    header: "Hướng dẫn",
    content: <HuongDan />,
  },
  {
    header: "Tài liệu ",
    content: <TaiLieu />,
  },
  {
    header: "Thành viên liên quan",
    content: <ThanhVien />,
  },
];
function SinhVienQuanLyDeTai() {
  const [isActive, setIsActive] = useState(0);
  const { data, isLoading } = useThongTinDoAn();
  const DoAn = !isLoading && data.thongTinDoAn;
  if (isLoading) return <Loading size={8.4} color={"var(--color--main_7)"} />;
  return (
    <QuanLyDeTaiSection>
      <>
        <QuanLyTitle>
          <TitleOverview>
            <Figure>
              <img
                src={Logo}
                width={"100%"}
                height={"100%"}
                alt="logo of iuh"
              />
            </Figure>
            <TitleRight>
              <TitleMain>
                <H4 color="var(--color--secondary_8)" className="semibold">
                  {DoAn.tenDeTai}
                </H4>
              </TitleMain>
              <TitleSubtitle>
                <P2 color="var(--color--secondary_8)">
                  Mã đồ án: <strong>{DoAn.maDoAn}</strong>
                </P2>
                <P2 color="var(--color--secondary_8)">
                  Giảng viên hướng dẫn: <strong>{DoAn.giangVienHD}</strong>
                </P2>
                <P2 color="var(--color--secondary_8)">
                  Ngày đăng ký:{" "}
                  <strong>
                    {new Date(DoAn.ngayThamGia).toLocaleDateString()}
                  </strong>
                </P2>

                <Badges
                  shadow={true}
                  color={"var(--color--secondary_1)"}
                  bgcolor={
                    DoAn.trangThai === 0
                      ? "var(--color--red_7)"
                      : "var(--color--green_7)"
                  }
                  label={
                    DoAn.trangThai === 0 ? "Đang tiến hành" : "Chờ phản biện"
                  }
                />
              </TitleSubtitle>
            </TitleRight>
          </TitleOverview>
          <TitileTab>
            <TabHeaderContents
              TabArr={TabArr}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          </TitileTab>
        </QuanLyTitle>
        <TabContentContents TabArr={TabArr} isActive={isActive} />
      </>
    </QuanLyDeTaiSection>
  );
}

export default SinhVienQuanLyDeTai;
