import styled, { css } from "styled-components";
import { HiOutlineHome } from "react-icons/hi2";

const PillContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  ${({ vertical }) => {
    return vertical
      ? css`
          flex-direction: row;
          gap: 0.8rem;
          width: 100%;
          & > div:first-child {
            display: flex;
            flex-direction: column;
            width: 20%;
          }
          & > div:last-child {
            width: 80%;
          }
        `
      : "";
  }}
`;
const PillHeaderContainer = styled.div`
  display: flex;
  border-collapse: collapse;
`;
const PillHeader = styled.h5`
  padding: 0.8rem 3rem;
  color: var(--color--secondary_6);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  ${({ vertical }) => {
    return vertical
      ? css`
          height: fit-content;
          padding: 1.2rem 2.4rem;

          &:hover {
            color: var(--color--main_8);
            cursor: pointer;
          }
          &.active {
            color: var(--color--secondary_1);
            border-radius: 0.6rem;
            background-color: var(--color--main_8);
          }
        `
      : css`
          &:hover {
            color: var(--color--main_8);
            cursor: pointer;
          }
          &.active {
            color: var(--color--secondary_1);
            border-radius: 0.6rem;
            background-color: var(--color--main_8);
          }
        `;
  }}
`;
const PillContentContainer = styled.div`
  background-color: #fff;
  box-shadow: 0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.1);
  padding-bottom: 0;
  ${({ vertical }) => {
    return Boolean(vertical)
      ? css`
          padding: 1.6rem 2.4rem;
        `
      : css`
          padding: 1.6rem 2rem;
        `;
  }}
`;
const PillContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const IconDiv = styled.span`
  font-size: ${({ size = "2" }) => `${size}rem`};
  display: flex;
  & > svg:hover {
    cursor: pointer;
  }
`;

function Pill(props) {
  const { header, children, isActive, setIsActive, index, vertical } = props;
  return (
    <PillContainer vertical={vertical}>
      <PillHeaderContainer vertical={vertical}>
        <PillHeaderContent
          isActive={isActive}
          setIsActive={setIsActive}
          index={index + 1}
          vertical={vertical}
        >
          {header}
        </PillHeaderContent>
      </PillHeaderContainer>
      <PillContentContainer vertical={vertical}>
        <PillContentContent
          content={children}
          isActive={isActive}
          index={index + 1}
          vertical={vertical}
        />
      </PillContentContainer>
    </PillContainer>
  );
}
export function PillWithIcon(props) {
  const { header, icon, children, isActive, setIsActive, index } = props;
  return (
    <PillContainer>
      <PillHeaderContainer>
        <PillHeaderContent
          isActive={isActive}
          setIsActive={setIsActive}
          index={index + 1}
        >
          <IconDiv>{icon}</IconDiv>
          {header}
        </PillHeaderContent>
      </PillHeaderContainer>
      <PillContentContainer>
        <PillContentContent
          content={children}
          isActive={isActive}
          index={index + 1}
        />
      </PillContentContainer>
    </PillContainer>
  );
}
function PillHeaderContent({
  isActive,
  setIsActive,
  children,
  index,
  vertical,
}) {
  return (
    <PillHeader
      className={isActive === index ? "active" : ""}
      onClick={() => setIsActive(index)}
      vertical={vertical}
    >
      {children}
    </PillHeader>
  );
}
function PillContentContent({ content, isActive, index, vertical }) {
  if (isActive !== index) return;
  return <PillContent vertical={vertical}>{content}</PillContent>;
}
export default Pill;
