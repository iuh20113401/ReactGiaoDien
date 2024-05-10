import React from "react";
import styled, { css } from "styled-components";
import { createContext, useContext } from "react";
import { HiXMark } from "react-icons/hi2";
import { ButtonWithIcons } from "./Button";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;
const ModalPosition = {
  default: css`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(0, -50%);
  `,
  topCenter: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 1.6rem 3.2rem;
  width: fit-content;
  height: fit-content;
  min-width: 50%;
  min-height: 20%;
  max-height: 70%;
  background-color: #fff;
  overflow-y: scroll;
  z-index: 101;
  ${ModalPosition["topCenter"]}
`;
const ModalTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalContent = styled.p``;
const ModalContext = createContext();
function Modal({ onclick, children }) {
  return (
    <ModalContext.Provider value={{ onclick }}>
      <ModalContainer onClick={onclick}></ModalContainer>
      <ModalContentContainer>{children}</ModalContentContainer>
    </ModalContext.Provider>
  );
}
function ModalCloseButton() {
  const { onclick } = useContext(ModalContext);
  return (
    <span>
      <ButtonWithIcons
        size="1.6"
        bgcolor="transparent"
        icon={<HiXMark />}
        onClick={onclick}
        shadow="none"
      >
        <ButtonWithIcons.Icon />
      </ButtonWithIcons>
    </span>
  );
}
function ModalTitleContainer({ children }) {
  return <ModalTitle>{children}</ModalTitle>;
}
function ModalContentList({ children }) {
  return <ModalContent>{children}</ModalContent>;
}
Modal.Close = ModalCloseButton;
Modal.Title = ModalTitleContainer;
Modal.Content = ModalContentList;
export default Modal;
