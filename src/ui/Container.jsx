import React from "react";
import styled from "styled-components";

export const DoubleContainer = styled.article`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > div {
    width: 49%;
  }
`;
export const ThreeContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem; // Adjust gap as needed
  width: 100%;
  margin-left: 0.8rem;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 3.2rem;
  top: 0;
  overflow: auto;
`;
export const DisplayContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  gap: 4.8rem;
`;
export const IconDiv = styled.span`
  font-size: ${({ size = "2" }) => `${size}rem`};
  display: flex;
  & > svg:hover {
    cursor: pointer;
  }
`;
