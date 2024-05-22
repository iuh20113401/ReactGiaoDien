import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { H5, P2 } from "../../ui/Typography";
import Badges from "../../ui/Badge";
import { TabContentContents, TabHeaderContents } from "../../ui/Tab";
import Overview from "../../components/GiangVien/QuanLyDeTaiComponent/Overview";
import HuongDan from "../../components/GiangVien/QuanLyDeTaiComponent/HuongDan";
import TaiLieu from "../../components/GiangVien/QuanLyDeTaiComponent/TaiLieu";
import ThanhVien from "../../components/GiangVien/QuanLyDeTaiComponent/ThanhVien";
import Logo from "../../../public/hinhanh/iuh_logo_2.png";
import useThongTinDoAn from "../../hooks/useThongTinDoAn";
import useSearchParamGet from "../../hooks/useSearchParamGet";

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
  background-color: var(--color--main_4);
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
`;

const Figure = styled.figure`
  width: 7.2rem;
  height: 7.2rem;
  /* -webkit-shape-outside: circle(50% at 50% 50%); */
  shape-outside: circle(50% at 50% 50%);
  margin-right: 0.8rem;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  flex-shrink: 0;
`;
const TitleRight = styled.aside``;
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
function GiangVienXemChiTietDoAn() {
  const [isActive, setIsActive] = useState(0);
  const navigate = useNavigate();
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: DoAn, isLoading, isError, error } = useThongTinDoAn({ maDoAn });
  useEffect(() => {
    if (maDoAn === null) {
      navigate("/giangvien/xemdanhsachdoan");
      return;
    }
  }, [maDoAn, navigate]);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <QuanLyDeTaiSection>
      {maDoAn && !isLoading && (
        <>
          <QuanLyTitle>
            <TitleOverview>
              <Figure>
                <img
                  src={DoAn.hinhAnhDeTai || Logo}
                  alt="avatar"
                  width="100%"
                />
              </Figure>
              <TitleRight>
                <TitleMain>
                  <H5
                    size="1.4"
                    color="var(--color--white)"
                    className="semibold"
                  >
                    {DoAn.tenDeTai}
                  </H5>
                </TitleMain>
                <TitleSubtitle>
                  <P2 size="1.4" color="var(--color--white)">
                    Mã đồ án: <strong>{DoAn.maDoAn}</strong>
                  </P2>
                  <P2 size="1.4" color="var(--color--white)">
                    Giảng viên hướng dẫn: <strong>{DoAn.giangVienHD}</strong>
                  </P2>
                  <P2 size="1.4" color="var(--color--white)">
                    Ngày đăng ký:
                    <strong>{new Date().toLocaleDateString()}</strong>
                  </P2>

                  <Badges
                    shadow={true}
                    color="var(--color--whilte)"
                    bgcolor={"var(--color--red_7)"}
                    label={"Đang thực hiện"}
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
      )}
    </QuanLyDeTaiSection>
  );
}

export default GiangVienXemChiTietDoAn;
