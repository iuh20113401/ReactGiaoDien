import React from "react";
import styled from "styled-components";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { P2 } from "../../../ui/Typography";
import { BarChart } from "../Chart/BarChart";
import CreateProgressBar from "../../../ui/ProgressBar";

const DoAnContainer = styled.section`
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
`;

const Container = styled.article`
  width: ${(props) => props.width || "100%"};
  height: 30rem;
  padding: 1.6rem;
  background-color: var(--color--white);
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);

  border-radius: 0.6rem;
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
function DoAnSection() {
  return (
    <DoAnContainer className="mt-3">
      <P2>Thống kê dồ án</P2>
      <div className="flex g-spaceBetween">
        <Container width="73%">
          <BarChart />
        </Container>
        <Container width="25%">
          <div>
            <P2 size="1.6" color="var(--color--secondary_5)">
              Tổng số đồ án
            </P2>
            <P2 size="2" className="semibold mt-2">
              200
            </P2>
          </div>
          <CompareContainer className="mt-3 flex g-spaceBetween">
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
            className="mt-3"
            size={1.4}
            color={"var(--color--green_7)"}
            percent={"62.2"}
            label={"true"}
          />
        </Container>
      </div>
    </DoAnContainer>
  );
}

export default DoAnSection;
