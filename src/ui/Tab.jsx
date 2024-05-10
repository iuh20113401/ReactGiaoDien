import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
export const TabContainer = styled.div`
  background-color: #fff;
  ${({ vertical }) => {
    return vertical === "true"
      ? css`
          display: flex;
          & > div:first-child {
            display: flex;
            flex-direction: column;
            width: 17%;
          }
          & > div:last-child {
            width: 83%;
          }
        `
      : "";
  }}
`;
export const TabHeaderContainer = styled.div`
  display: flex;
  ${({ vertical }) => {
    return vertical === "true"
      ? css`
          border-right: 1px solid var(--color--secondary_3);
        `
      : css`
          border-bottom: 1px solid var(--color--secondary_3);
        `;
  }}
  border-collapse: collapse;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "transparent")};
`;
const TabHeader = styled.h5`
  padding: 1rem 2rem;
  color: ${({ color }) => (color ? color : "var(--color--main_10)")};
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--color--main_8);
    transition: width 0.5s ease, left 0.5s ease;
  }

  ${({ vertical }) => {
    return vertical === "true"
      ? css`
          height: fit-content;
          padding: 1.6rem;
          &:hover {
            color: var(--color--main_8);
            cursor: pointer;
            border-right: 1px solid var(--color--main_6);
          }
          &.active {
            border-right: 1px solid var(--color--main_6);
            color: var(--color--main_8);
          }
        `
      : css`
          &:hover {
            color: var(--color--main_8);
            cursor: pointer;
            border-bottom: 1px solid var(--color--main_6);
            &::after {
              width: 100%;
              left: 0;
            }
          }
          &.active {
            color: var(--color--main_8);
            &::after {
              width: 100%;
              left: 0;
            }
          }
        `;
  }}
`;
export const TabContentContainer = styled.div`
  padding-bottom: 0;
  ${({ vertical }) => {
    return Boolean(vertical)
      ? css`
          padding: 1.6rem;
        `
      : css`
          padding: 0;
        `;
  }}
`;
const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function Tab({ vertical = null, TabArr }) {
  const [isActive, setIsActive] = useState(1);
  return (
    <TabContainer vertical={vertical}>
      <TabHeaderContainer vertical={vertical}>
        {TabArr.map((t, index) => (
          <TabHeaderContent
            key={t.header}
            isActive={isActive}
            setIsActive={setIsActive}
            index={index + 1}
            vertical={vertical}
          >
            {t.header}
          </TabHeaderContent>
        ))}
      </TabHeaderContainer>
      <TabContentContainer vertical={vertical}>
        {TabArr.map((t, index) => (
          <TabContentContent
            content={t.content}
            key={t.header}
            isActive={isActive}
            index={index + 1}
            vertical={vertical}
          />
        ))}
      </TabContentContainer>
    </TabContainer>
  );
}
export function TabHeaderContents({
  TabArr,
  isActive,
  setIsActive,
  vertical = "false",
  bgcolor,
  color,
}) {
  return (
    <TabHeaderContainer vertical={vertical} bgcolor={bgcolor}>
      {TabArr.map((t, index) => (
        <TabHeader
          className={`bold  ${isActive === index ? "active" : ""}`}
          onClick={() => setIsActive(index)}
          vertical={vertical}
          color={color}
          key={index}
        >
          {t.header}
        </TabHeader>
      ))}
    </TabHeaderContainer>
  );
}
function TabHeaderContent({
  isActive,
  setIsActive,
  children,
  index,
  vertical,
}) {
  return (
    <TabHeader
      className={`bold  ${isActive === index ? "active" : ""}`}
      onClick={() => setIsActive(index)}
      vertical={vertical}
    >
      {children}
    </TabHeader>
  );
}
export function TabContentContents({ TabArr, vertical, isActive }) {
  return (
    <TabContentContainer vertical={vertical}>
      {TabArr.map((t, index) => (
        <TabContentContent
          content={t.content}
          key={index}
          isActive={isActive}
          index={index}
          vertical={vertical}
        />
      ))}
    </TabContentContainer>
  );
}
function TabContentContent({ content, isActive, index, vertical }) {
  if (isActive !== index) return;
  return <TabContent vertical={vertical}>{content}</TabContent>;
}
export default Tab;
