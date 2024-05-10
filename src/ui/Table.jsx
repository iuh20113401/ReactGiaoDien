import React from "react";
import styled, { css } from "styled-components";
const TableContainer = styled.div`
  grid-template-columns: repeat(12, minmax(calc(100% / 12), 1fr));
  width: 100%;
  border-collapse: collapse;
  display: grid;
  row-gap: ${({ gap }) => (gap ? `${gap}rem` : "0.8rem")};
  & > div {
    ${({ border }) => {
      return border === "false"
        ? ""
        : css`
            border: 0.3em solid black;
          `;
    }}
  }
`;
export const Row = styled.div`
  display: contents;
  width: 100%;
  height: auto;
  border-collapse: collapse;
  &:not(:last-child) > div {
    border-bottom: 1px solid var(--color--secondary_5);
  }
  &:hover {
    cursor: pointer;
    & > div {
      background-color: var(--color--secondary_3);
    }
  }
  & > div {
    border-collapse: collapse;

    padding: 0.8rem 0.8rem 0.8rem 1.6rem;
    background-color: ${({ bgColor }) =>
      bgColor === null ? "#fff" : `${bgColor}`};
    display: ${({ isFlex }) => (isFlex === "true" ? "block" : "flex")};
    align-items: center;
  }
  &:nth-child(odd) > div {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-top: 1px solid black;
            border-bottom: 1px solid black;
          `;
    }}
  }

  & > div {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-left: 1px solid black;
          `;
    }}
  }
  & > div:last-child {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-right: 1px solid black;
          `;
    }}
  }
`;
export const TieuDe = styled.div`
  display: contents;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  color: ${({ color }) => (color == null ? "" : `${color}`)};
  & > div {
    border-collapse: collapse;

    padding: 0.8rem 0.8rem 0.8rem 1.6rem;
    border-bottom: 1px solid var(--color--secondary_3);
    background-color: ${({ bgColor }) =>
      bgColor === null ? "#fff" : `${bgColor}`};
    display: flex;
    align-items: center;
  }
  &:nth-child(odd) > div {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-top: 1px solid black;
            border-bottom: 1px solid black;
          `;
    }}
  }

  & > div {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-left: 1px solid black;
          `;
    }}
  }
  & > div:last-child {
    ${({ border = "false" }) => {
      return border === "false"
        ? ""
        : css`
            border-right: 1px solid black;
          `;
    }}
  }
`;
export const Col = styled.div`
  grid-column: span 1;
  word-break: break-word;
`;
export const Col2 = styled.div`
  grid-column: span 2;
  overflow-wrap: break-word;
  word-break: break-word;
`;
export const Col3 = styled.div`
  grid-column: span 3;
  word-break: break-word;
`;
export const Col4 = styled.div`
  grid-column: span 4;
  word-break: break-word;
`;
export const Col5 = styled.div`
  grid-column: span 5;
  word-break: break-word;
`;
export const Col6 = styled.div`
  grid-column: span 6;
  word-break: break-word;
`;

function Table({ children, border = "false", gap }) {
  return (
    <TableContainer border={border} gap={gap}>
      {children}
    </TableContainer>
  );
}

export default Table;
