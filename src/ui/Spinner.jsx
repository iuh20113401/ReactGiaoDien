import styled, { css, keyframes } from "styled-components";
import { ButtonContext, ButtonWithIcons } from "./Button";
import { useContext } from "react";
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }

  100%{
    transform: rotateY(360deg);
  }
`;
const glowingAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.3;
  }
   70% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;
const SpinStyle = css`
  border-top-color: transparent;
  border-left-color: transparent;
  animation: ${spinAnimation} 0.8s linear infinite;
`;
const Animations = {
  spin: css`
    border: ${(props) => props.borderwidth}px solid ${(props) => props.color};
    ${SpinStyle}
  `,
  dotSpin: css`
    border: ${(props) => props.borderwidth}px dotted ${(props) => props.color};
    ${SpinStyle}
  `,
  flip: css`
    border-radius: 0;
    background-color: ${({ color }) => color};
    animation: ${flipAnimation} 1s linear infinite;
  `,
  glowing: css`
    background-color: ${({ color }) => color};
    animation: ${glowingAnimation} 0.8s linear infinite;
  `,
};

const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: 50%;
  ${({ animation }) => Animations[animation]}
`;
export const Spinner = ({
  size = "2",
  borderwidth = "4",
  color = "var(--color--secondary_1)",
  animation = "spin",
}) => {
  return (
    <SpinnerContainer
      size={size}
      borderwidth={borderwidth}
      color={color}
      animation={animation}
    />
  );
};

function ButtonSpinner() {
  const { Spinner } = useContext(ButtonContext);
  return Spinner && Spinner;
}
ButtonWithIcons.Spinner = ButtonSpinner;
