import React from "react";
import styled, { css } from "styled-components";
const variations = {
  giangVien: css`
    height: 100%;
    flex-direction: column;
    justify-content: center;
  `,
  sinhVien: css`
    justify-content: space-between;
  `,
};
const NavContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${(props) => props?.variation && variations[props.variation]}
`;
export default NavContent;
