import React from "react";
import { createContext, useContext } from "react";
import styled, { css } from "styled-components";
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
const buttonState = {
  disabled: css`
    position: relative;

    &::after {
      content: "";
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.3);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `,
};
const buttonStyles = css`
  align-items: center;
  padding: 1rem 2rem;
  height: fit-content;
  border-radius: ${({ round }) => (round ? "50rem" : "0.6rem")};
  outline: none;
  border: ${({ color }) => (color ? `1px solid ${color}` : "none")};
  color: ${({ color }) => color || "var(--color--secondary_10)"};
  background-color: ${({ bgcolor }) => bgcolor || "var(--color--secondary_1)"};
  box-shadow: ${({ shadow }) =>
    shadow !== "none" ? "0rem 0.5rem 1rem rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
  &:disabled {
    cursor: not-allowed;
  }
  ${({ size }) => size !== "" && buttonSizes[size]}
  ${({ state }) => state && buttonState[state]}
`;

export const Button = styled.button`
  ${buttonStyles};
  border: none;
`;
export const OutlineButton = styled.button`
  ${buttonStyles};
`;
const IconDiv = styled.span`
  font-size: ${({ size = "2" }) => `${size}rem`};
  display: flex;
  & > svg:hover {
    cursor: pointer;
  }
`;
export const ButtonContext = createContext();
export function ButtonWithIcons(props) {
  const {
    size,
    icon,
    color,
    bgcolor,
    shadow,
    Badge,
    Spinner,
    children,
    ...others
  } = props;
  return (
    <ButtonContext.Provider
      value={{ size, icon, color, bgcolor, Badge, Spinner }}
    >
      <Button
        size={size}
        color={color}
        bgcolor={bgcolor}
        className="flex g-8 flex-center bold"
        state={"disabled"}
        shadow={shadow || "none"}
        {...others}
      >
        {children}
      </Button>
    </ButtonContext.Provider>
  );
}

export function OutlineButtonWithIcon(props) {
  const { size, icon, children, color, round, Badge } = props;
  return (
    <ButtonContext.Provider value={{ size, round, icon, color, Badge }}>
      <OutlineButton
        color={color}
        round={round}
        className="flex g-8 flex-center bold"
      >
        {children}
      </OutlineButton>
    </ButtonContext.Provider>
  );
}

function Icon() {
  const { size, icon } = useContext(ButtonContext);
  return <IconDiv size={size === undefined ? "2" : size}>{icon}</IconDiv>;
}
OutlineButton.Icon = Icon;
ButtonWithIcons.Icon = Icon;
