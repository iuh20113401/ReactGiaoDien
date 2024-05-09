import styled, { css } from "styled-components";

export const H1 = styled.h1`
  font-size: 3.8rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
export const H2 = styled.h2`
  font-size: 3.2rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
export const H3 = styled.h3`
  font-size: 2.6rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
export const H4 = styled.h4`
  font-size: 2.2rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
export const H5 = styled.h5`
  font-size: 1.8rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
export const H6 = styled.h6`
  font-size: 1.5rem;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

export const Title = styled.p`
  min-width: 20%;
  font-size: 1.3rem;
`;
export const PageHeader = styled.h4`
  font-size: 2.2rem;
  ${({ color }) =>
    color
      ? css`
          color: var(--color--secondary_10);
        `
      : css`
          color: ${color};
        `};

  font-weight: 600;
`;

export const P2 = styled.p`
  font-size: ${({ size }) => (size ? `${size}rem` : "1.6rem")};
  word-wrap: break-word;
  ${({ color }) =>
    color
      ? css`
          color: ${color};
        `
      : css`
          color: var(--color--secondary_7);
        `}
`;
