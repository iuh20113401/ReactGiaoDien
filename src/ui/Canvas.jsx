import styled, { keyframes } from "styled-components";
import { HiX } from "react-icons/hi";
import { P2 } from "./Typography";

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
  z-index: 999;
`;
const CanvaAnimation = keyframes`
  0%{
    width: 0;
    opacity: 0;
  }
  100%{
    width: 33%;
    opacity: 1;

  }
`;
const Canva = styled.div`
  position: fixed;
  width: 33%;
  max-width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  overflow: scroll;
  animation: ${CanvaAnimation} 0.2s linear;
  &::-webkit-scrollbar {
    display: none;
  }
  &::scroll-behavior {
    scroll-behavior: smooth;
  }
`;
const RightCanvaContainer = styled.div`
  position: fixed;
  width: 60%;
  max-width: 100%;
  height: 95%;
  left: 3.5%;
  top: 2.5%;
  border-radius: 0.6rem;
  background-color: #fff;
  z-index: 999;
  overflow: scroll;
  animation: ${CanvaAnimation} 0.2s linear;
  &::-webkit-scrollbar {
    display: none;
  }
  &::scroll-behavior {
    scroll-behavior: smooth;
  }
`;
const CanvaTitle = styled.div`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color--secondary_4);
`;
const IconDiv = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  & > svg {
    width: 100%;
    height: 100%;
    color: var(--color--secondary_6);
  }
  &:hover {
    cursor: pointer;
  }
`;
function LeftCanva({ children }) {
  return <Canva>{children}</Canva>;
}
export default function CanvaContainer({
  onClick,
  title,
  children,
  RightContent,
}) {
  return (
    <>
      <Overlay onClick={onClick}></Overlay>
      <LeftCanva>
        <CanvaTitle>
          <P2 color="var(--color--secondary_8)" size="1.8">
            {title}
          </P2>
          <IconDiv onClick={onClick}>
            <HiX />
          </IconDiv>
        </CanvaTitle>
        {children}
      </LeftCanva>
      {RightContent && (
        <RightCanvaContainer>{RightContent}</RightCanvaContainer>
      )}
    </>
  );
}
