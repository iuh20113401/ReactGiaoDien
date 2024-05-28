import styled from "styled-components";
import DeTaiChart from "../Chart/DeTaiChart";
import DanhMucChart from "../Chart/DanhMucChart";
import BangDeTai from "../Chart/BangDeTai";
import { PageHeader } from "../../../ui/Typography";
const DeTaiContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px 1fr;
  gap: 1.6rem;
  & > * {
    background-color: white;
    padding: 1.6rem;
    box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
`;
function DeTaiSection() {
  return (
    <>
      <PageHeader className="mt-3">Thông tin đề tài</PageHeader>
      <DeTaiContainer>
        <DeTaiChart />
        <DanhMucChart />
        <BangDeTai />
      </DeTaiContainer>
    </>
  );
}

export default DeTaiSection;
