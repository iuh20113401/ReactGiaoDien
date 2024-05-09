import styled, { css } from "styled-components";

const sizes = {
  small: css`
    height: 4.8rem;
  `,
  medium: css`
    height: 4.8rem;
    width: 4.8rem;
  `,
  large: css`
    height: 6.4rem;
    width: 6.4rem;
  `,
  full: css`
    width: 100%;
  `,
};
const NavLogo = styled.img`
  ${(props) => sizes[props.type]};
`;
NavLogo.defaultProps = {
  type: "small",
};
export default NavLogo;
