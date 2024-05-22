import React from "react";
import styled, { css } from "styled-components";

const Card = styled.div`
  width: 100%;
  max-height: max-content;
  background-color: #fff;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 0.6rem;
  position: relative;
`;
const Title = styled.h3`
  width: 100%;
  word-wrap: break-word;
  height: fit-content;
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
  background-color: var(--color--main_8);
  color: var(--color--secondary_1);
  font-weight: 700;
  padding: 0.8rem 1.6rem;
`;
const SubTitle = styled.h5`
  font-size: 1.2rem;
  margin-top: 0.4rem;
  color: var(--color--secondary_1);
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ position }) => (position ? `${position}` : "center")};
  align-items: center;
  padding: 0.8rem 1.6rem 1.6rem 1.6rem;
`;
const CardContent = styled.div`
  width: 100%;
  ${({ active }) => (active ? "min-height: 10rem;" : "height: 22rem;")}
  overflow: hidden;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  ${({ active }) =>
    active
      ? ""
      : css`
          &:hover {
            cursor: pointer;
          }
        `}
`;
const Image = styled.div`
  width: 100%;
  height: 15rem;
  margin-bottom: 1rem;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
function TitleContainer({ children }) {
  return <Title>{children}</Title>;
}
function SubTitleContainer({ children }) {
  return <SubTitle>{children}</SubTitle>;
}
function CardContentContainer({ children, active = false, onclick }) {
  return (
    <CardContent active={active} onClick={onclick}>
      {children}
    </CardContent>
  );
}
function FooterContainer({ children, position = null }) {
  return <Footer position={position}>{children}</Footer>;
}
function CardContainer({ children }) {
  return <Card>{children}</Card>;
}
function ImageContainer({ children }) {
  return <Image>{children}</Image>;
}
CardContainer.Title = TitleContainer;
CardContainer.SubTitle = SubTitleContainer;
CardContainer.Footer = FooterContainer;
CardContainer.CardContent = CardContentContainer;
CardContainer.Image = ImageContainer;

export default CardContainer;
