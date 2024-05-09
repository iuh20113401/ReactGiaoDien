import styled, { css } from "styled-components";
const variations = {
  giangVien: css`
    grid-template-rows: 2fr 10fr 2fr;
    width: 21%;
    height: 100vh;
    background-color: var(--color--main_light);
    overflow: scroll;
    padding-left: 1.6rem;
    padding-top: 1.6rem;
    flex-direction: column;
    gap: 4.8rem;
  `,
  sinhVien: css`
    grid-template-columns: 2fr 8fr 2fr;
    background-color: #fff;
    border-bottom: 2px solid var(--color--secondary_4);
    box-shadow: 0 0rem 0.5rem rgba(0, 0, 0, 0.1);
  `,
};
const Navigation = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  ${(props) => props?.variation && variations[props.variation]}
  z-index: 1;
`;
export default Navigation;
