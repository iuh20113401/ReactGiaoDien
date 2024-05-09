import styled, { css } from "styled-components";

const variations = {
  giangVien: css`
    color: var(--color--secondary_10);
    &:hover {
      color: var(--color--secondary_10);
    }
  `,
  sinhVien: css`
    color: var(--color--secondary_10);
    &:hover {
      color: var(--color--main);
    }
  `,
};
const NavFooter = styled.div`
  position: relative;
  display: flex;
  gap: 1.6rem;
  align-items: center;

  height: auto;
  width: 100%;
  ${(props) => props?.variation && variations[props.variation]}
  &:hover {
    cursor: pointer;
  }
  & > a {
    text-decoration: none;
    color: var(--color--secondary_10);
  }
  &:hover > div:last-child {
    display: block;
  }
`;

export const FooterMenu = styled.div`
  position: absolute;
  display: none;
  top: 101%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  & > div:not(:last-child) {
    border-bottom: 1px solid var(--color--secondary_3);
  }
  & > div {
    padding: 0 1.6rem;
  }
  & > div:hover {
    cursor: pointer;
    background-color: var(--color--secondary_3);
  }
`;
export default NavFooter;
