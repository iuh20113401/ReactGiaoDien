import React from "react";
import Badges from "../../../ui/Badge";
import { H6 } from "../../../ui/Typography";
import useThongTinDoAn from "../../../hooks/useThongTinDoAn";
import useSearchParamGet from "../../../hooks/useSearchParamGet";
import { Container, TagList } from "./OverviewRight";

export function SkillContainer() {
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: DoAn } = useThongTinDoAn({ maDoAn });
  return (
    <Container type="skill">
      <H6 className="bold" color="var(--color--secondary_8)">
        Tag
      </H6>
      <TagList>
        {DoAn.Tag?.split(",").map((tag) => (
          <Badges
            label={tag}
            bgcolor={"var(--color--main_3)"}
            color={"var(--color--main_6)"}
          />
        ))}
      </TagList>
    </Container>
  );
}
