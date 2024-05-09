import styled, { css, keyframes } from "styled-components";
const beforeAnimation = keyframes`
    0%{
        width: 0%;
        height: 100%;
    }
    100%{
        width: 100%;
        height: 100%;
    }

`;
const buttonSizes = {
  xs: css`
    padding: 0.2rem 1rem;
    font-size: 1rem;
  `,
  sm: css`
    padding: 0.5rem 1.6rem;
    font-size: 1.2rem;
  `,
  lg: css`
    padding: 1.2rem 3.2rem;
    font-size: 1.2rem;
  `,
  xl: css`
    padding: 2rem 4.8rem;
    font-size: 2rem;
  `,
  block: css`
    padding: 1.6rem;
    font-size: 1.6rem;
    height: fit-content;
    width: 100%;
    margin: auto;
  `,
};
const TooltipDirections = {
  right: css`
    left: 100%;
    top: 50%;
    transform: translate(0, -50%);
    clip-path: polygon(12% 0, 100% 0%, 100% 100%, 10% 100%, 0% 50%);
    padding: 0.8rem 1.6rem;
  `,
  left: css`
    right: 100%;
    top: 50%;
    transform: translate(0, -50%);
    clip-path: polygon(0% 0%, 88% 1%, 100% 50%, 88% 100%, 0% 100%);
    padding: 0.8rem 1.6rem;
  `,
  top: css`
    bottom: 100%;
    right: 50%;
    transform: translate(50%, 0%);
    clip-path: polygon(0 0, 100% 0%, 100% 80%, 53% 100%, 0 80%);

    padding: 0.8rem 1.6rem 1.2rem 1.6rem;
  `,
  bottom: css`
    top: 100%;
    right: 50%;
    clip-path: polygon(
      33% 9%,
      48% 0,
      61% 9%,
      100% 9%,
      100% 100%,
      0 100%,
      0 11%
    );

    transform: translate(50%, 0%);

    padding: 1.2rem 1.6rem 0.8rem 1.6rem;
  `,
};
export const Tooltip = styled.button`
  align-items: center;
  padding: 1rem 2rem;
  height: fit-content;
  border-radius: 0.6rem;
  font-weight: 700;
  outline: none;
  border: none;
  color: ${({ color }) => color || "var(--color--secondary_10)"};
  background-color: ${({ bgcolor }) => bgcolor || "var(--color--secondary_1)"};
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  ${({ size }) => size !== "" && buttonSizes[size]}

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
    &::after {
      content: ${({ content }) => `"${content}"`};
      z-index: 10;
      background-color: ${({ tcolor, bgcolor }) =>
        tcolor === "true" ? bgcolor : " var(--color--secondary_8)"};
      position: absolute;
      ${({ direction }) => TooltipDirections[direction]}
      border-radius: 0.6rem;
      height: fit-content;
      width: max-content;
    }
  }
  &:active {
    &::before {
      content: "";
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.3);
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      animation: ${beforeAnimation} 0.31s ease;
    }
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
