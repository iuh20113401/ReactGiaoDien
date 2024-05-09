import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  padding: 3.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? "normal" : "center")};
  gap: 2.4rem;
`;
export default Form;
