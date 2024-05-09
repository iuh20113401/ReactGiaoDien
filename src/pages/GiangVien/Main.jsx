import styled from "styled-components";

const MainContainer = styled.div`
  width: 95%;
  margin: auto;
  padding: 3.2rem 0;
  min-height: 100vh;
`;
function Main({ children }) {
  return <MainContainer>{children}</MainContainer>;
}

export default Main;
