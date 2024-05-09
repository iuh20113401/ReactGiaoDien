import styled from "styled-components";
import { OverviewLeftContainer } from "./OverviewLeft";
import OverviewRightContainer from "./OverviewRight";

const OverviewContainer = styled.div`
  width: 100%;
  max-height: auto;
  display: flex;
  gap: 2.4rem;
  padding: 2.4rem 0rem;
`;

function Overview() {
  return (
    <OverviewContainer>
      <OverviewLeftContainer />
      <OverviewRightContainer />
    </OverviewContainer>
  );
}

export default Overview;
