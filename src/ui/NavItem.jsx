import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
const variations = {
  sinhVien: css`
    color: var(--color--secondary_10);
    border-bottom: 3px solid transparent;

    &.active {
      color: var(--color--main_7);
      width: fit-content;
      padding-right: 1.6rem;
      padding-left: 1.6rem;
      border-bottom: 3px solid var(--color--main_7);
      & > h6 {
        color: var(--color--main_7);
      }
    }
    &:link {
      color: var(--color--secondary_10);
    }
    &:hover {
      color: var(--color--main_7);
      & > h6 {
        color: var(--color--main_7);
      }
      cursor: pointer;
    }
  `,
  giangVien: css`
    font-size: 2.4rem;
    color: var(--color--secondary_10);
    &:link {
      color: var(--color--secondary_10);
    }
    &:hover {
      color: #000266;
      cursor: pointer;
    }
    &.active {
      color: #000266;
    }
  `,
};
const MenuItem = styled(NavLink)`
  display: flex;
  height: 100%;
  padding: 1.6rem 0;
  gap: 0.8rem;
  align-items: center;
  transition: all 0.2s ease-out;
  text-decoration: none;
  ${(props) => props?.variation && variations[props.variation]}
`;
export default MenuItem;
