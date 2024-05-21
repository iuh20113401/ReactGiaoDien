import React from "react";
import styled from "styled-components";

import { MemberContainer } from "./MemberContainer";
import { SkillContainer } from "./SkillContainer";
import { DuyetDoAn } from "./DuyetDoAn";
const OverviewRight = styled.aside`
  width: 24%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
export const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--color--white);
  padding: 1.6rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
export const TagList = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
`;
export const MemberAvatar = styled.figure`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 50%;
`;
function OverviewRightContainer() {
  return (
    <OverviewRight>
      <DuyetDoAn />
      <SkillContainer />
      <MemberContainer />
    </OverviewRight>
  );
}
export default OverviewRightContainer;
