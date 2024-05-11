import React from "react";
import styled, { css } from "styled-components";
const variations = {
  giangVien: css`
    width: 100%;
    flex-direction: column;
    gap: 2rem;
  `,
  sinhVien: css`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 400px) {
      width: 90%;
    }
  `,
};
const MenuItems = styled.ul`
  display: flex;
  height: 100%;
  list-style: none;
  ${(props) => props?.variation && variations[props.variation]}
  &>li {
  }
`;
export default MenuItems;
