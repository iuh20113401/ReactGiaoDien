import React from "react";
import styled, { css } from "styled-components";
import { OverviewCommentContainer } from "./OverviewCommentContainer";
import { OverviewSummaryContainer } from "./OverviewSummaryContainer";
const OverviewLeft = styled.aside`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const RuleStyle = {
  dash: css`
    width: 98%;

    border: 1px dashed var(--color--secondary_4);
  `,
  solid: css`
    width: 100%;

    border: 1px solid var(--color--secondary_4);
  `,
};
export const Rule = styled.div`
  margin: auto;
  height: 1px;
  ${({ rulestyle }) => (rulestyle ? RuleStyle[rulestyle] : RuleStyle["dash"])}
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
`;
export function OverviewLeftContainer() {
  return (
    <OverviewLeft>
      <OverviewSummaryContainer />
      <OverviewCommentContainer />
    </OverviewLeft>
  );
}
