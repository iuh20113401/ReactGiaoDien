import styled from "styled-components";
import DoAnChart from "../Chart/DoAnChart";
import BangDoAn from "../Chart/BangDoAn";
import { P2, PageHeader } from "../../../ui/Typography";

const DoAnSectionContainer = styled.article`
  height: 500px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.4rem;
  & > * {
    height: 100%;
    background-color: var(--color--white);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
`;
function DoAnSection() {
  return (
    <>
      <PageHeader className="mt-3">Thông tin đồ án</PageHeader>
      <DoAnSectionContainer>
        <BangDoAn />
        <DoAnChart />
      </DoAnSectionContainer>
    </>
  );
}

export default DoAnSection;
