import React from "react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styled, { css } from "styled-components";
import { Button } from "./Buttons";

const CarouselContainer = styled.div`
  width: 100%;
  height: 30rem;
  margin: auto;
  user-select: none;
  position: relative;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.6s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  margin-right: -100%;
  backface-visibility: hidden;
  transition: all 1s ease-in-out;
  visibility: hidden;
  &.active {
    visibility: visible;
    margin-right: 0%;
  }
`;

const IconStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3.2rem;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
`;

const IconLeft = styled.div`
  ${IconStyle}
  left: 10px;
  color: ${({ color }) => color};
`;

const IconRight = styled.div`
  ${IconStyle}
  right: 10px;
  color: ${({ color }) => color};
`;
const CarouselDescribe = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  width: 100%;
  height: auto;
  text-align: center;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
const CarouselDescribeTitle = styled.h5`
  color: ${({ color }) => color};
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 1.2;
  margin-bottom: 0.8rem;
`;
const CarouselDescribeContent = styled.p`
  color: ${({ color }) => color};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 1.6rem;
`;
const CarouselIndicator = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  color: red;
`;

function Carousel({ color = "var(--color--secondary_10)", ImageList }) {
  const [active, setActive] = useState(0);

  const handleRightClick = () => {
    setActive((current) => (current === 2 ? 0 : (current += 1)));
  };

  const handleLeftClick = () => {
    setActive((current) => (current === 0 ? 2 : (current -= 1)));
  };
  const handleButtonClick = (id) => {
    setActive(id - 1);
  };
  return (
    <CarouselContainer>
      <ImageContainer active={active}>
        {ImageList.map((img) => (
          <Image
            src={img.src}
            key={img.id}
            className={`${active === img.id - 1 ? "active" : ""}`}
          />
        ))}
      </ImageContainer>
      <IconLeft onClick={handleLeftClick} color={color}>
        <HiChevronLeft />
      </IconLeft>
      <IconRight onClick={handleRightClick} color={color}>
        <HiChevronRight />
      </IconRight>
      <CarouselDescribe>
        <CarouselDescribeTitle color={color}>
          Something like that
        </CarouselDescribeTitle>
        <CarouselDescribeContent color={color}>
          fdsafdsafdsafdsaf
        </CarouselDescribeContent>
        <CarouselIndicator>
          {ImageList.map((img) => (
            <Button
              className="bold"
              bgcolor={
                active + 1 === img.id ? color : "var(--color--secondary_6)"
              }
              size="sm"
              onClick={() => handleButtonClick(img.id)}
            />
          ))}
        </CarouselIndicator>
      </CarouselDescribe>
    </CarouselContainer>
  );
}

export default Carousel;
