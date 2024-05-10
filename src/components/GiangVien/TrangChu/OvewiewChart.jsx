import React from "react";
import styled from "styled-components";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

import { P2 } from "../../../ui/Typography";
import CreateProgressBar from "../../../ui/ProgressBar";
import Logo from "../../../../public/hinhanh/iuh_logo_2.png";
const OverviewContainer = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.6rem;
  border-radius: 0.6rem;
  & > div {
    height: auto;
    padding: 1.6rem;
    box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    border-radius: 0.6rem;
    background-color: #fff;
  }
`;
const LargeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color--main_4) !important;

  & > img {
    position: absolute;
    top: 0%;
    right: 0%;
  }
`;
const LargeContainerRight = styled.div`
  width: 70%;
  padding: 0 0.8rem;
`;
const TongQuanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  row-gap: 1.2rem;
  & > p {
    width: calc(100% / 2 - 0.8rem);
  }
  & span {
    padding: 0.4rem 0.8rem;
    border-radius: 0.6rem;
    margin-right: 0.8rem;
    background-color: var(--color--main_8);
  }
`;
const CompareContainer = styled.div`
  height: 50%;
`;
const CompareDiv = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    align-self: ${(props) => props.align || "flex-start"};
  }
`;
const CompareRule = styled.div`
  width: 3px;
  height: 100%;
  background-color: var(--color--secondary_4);
  display: block;
  position: relative;
  &::before {
    content: "VS";
    width: fit-content;
    height: auto;
    padding: 0.8rem 0.8rem;
    border-radius: 50%;
    background-color: var(--color--secondary_5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
function OvewiewChart() {
  return (
    <OverviewContainer className="w-100">
      <LargeContainer>
        <LargeContainerRight>
          <P2 size="2" className="bold" color="var(--color--secondary_1)">
            Thống kê báo cáo
          </P2>
          <P2
            size="1.6"
            className="bold mt-5"
            color="var(--color--secondary_1)"
          >
            Tổng quan
          </P2>
          <TongQuanContainer className="mt-3">
            <P2 size="1.4" color="var(--color--secondary_1)">
              <span>200</span>
              Đề tài
            </P2>
            <P2 size="1.4" color="var(--color--secondary_1)">
              <span>200</span>
              Đồ án
            </P2>
            <P2 size="1.4" color="var(--color--secondary_1)">
              <span>200</span>
              Giảng viên
            </P2>
            <P2 size="1.4" color="var(--color--secondary_1)">
              <span>200</span>
              Sinh viên
            </P2>
          </TongQuanContainer>
        </LargeContainerRight>
        <img src={Logo} width={"200px"} alt="logo of iuh" />
      </LargeContainer>

      <div>
        <div>
          <P2 size="1.6" color="var(--color--secondary_5)">
            Tổng số đồ án
          </P2>
          <P2 size="2" className="semibold">
            200
          </P2>
        </div>
        <CompareContainer className="flex g-spaceBetween">
          <CompareDiv>
            <P2 className="flex flexCenter" color="var(--color--green_7)">
              <HiCheckCircle size={"2.4rem"} />
              Đã duyệt
            </P2>
            <P2 size="1.8" className="mt-2 bold">
              62.2%{" "}
            </P2>
            <P2 size="1.6">1600</P2>
          </CompareDiv>
          <CompareRule></CompareRule>
          <CompareDiv align="flex-end">
            <P2 className="flex flexCenter" color="var(--color--red_7)">
              <HiXCircle size={"2.4rem"} />
              Chưa duyệt
            </P2>
            <P2 size="1.8" className="mt-2 bold">
              62.2%{" "}
            </P2>
            <P2 size="1.6">1600</P2>
          </CompareDiv>
        </CompareContainer>
        <CreateProgressBar
          className="mt-1"
          size={1.6}
          color={"var(--color--green_7)"}
          percent={"62.2"}
          label={"true"}
        />
      </div>
      <div>
        <P2>Điểm số trung bình</P2>
        <P2>Điểm cao nhất </P2>
        <P2>Điểm thấp nhất </P2>
      </div>
    </OverviewContainer>
  );
}

export default OvewiewChart;
