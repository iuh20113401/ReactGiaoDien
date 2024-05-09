import styled from "styled-components";
import { P2 } from "../../../ui/Typography";
import { PieChart } from "../Chart/PieChart";
import Histogram from "../Chart/Histogram";
import DoAnSection from "./DoAnSection";

const DeTaiContainer = styled.section`
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
`;
const ThongKeDeTaiContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ThongKeDeTaiLeft = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const ThongKeDeTaiRight = styled.div`
  width: 68%;
`;
const Container = styled.article`
  width: 100%;
  height: 30rem;
  padding: 1.6rem;
  background-color: #fff;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
function DeTaiSection() {
  return (
    <DeTaiContainer className="mt-3">
      <P2>Thống kê đề tài</P2>
      <ThongKeDeTaiContainer>
        <ThongKeDeTaiLeft width="30%">
          <Container>
            <PieChart />
          </Container>
        </ThongKeDeTaiLeft>
        <ThongKeDeTaiRight width="68%">
          <Container>
            <Histogram />
          </Container>
        </ThongKeDeTaiRight>
      </ThongKeDeTaiContainer>
      <DoAnSection />
    </DeTaiContainer>
  );
}

export default DeTaiSection;
