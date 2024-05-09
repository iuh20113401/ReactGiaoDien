import styled from "styled-components";
import { ButtonContext, ButtonWithIcons } from "./Button";
import { useContext } from "react";
import CardContainer from "./Card";

const Badge = styled.p`
  width: fit-content;
  background-color: ${({ bgcolor }) =>
    bgcolor ? `${bgcolor}` : "var(--color--secondary_1)"};
  color: ${({ color }) => (color ? `${color}` : "var(--color--secondary_6)")};
  padding: 0.3rem 1.2rem;
  font-size: 1.2rem;
  border-radius: ${({ round }) => (round ? `50rem` : "0.3rem")};
  display: flex;
  align-items: center;
  box-shadow: ${({ shadow, bgcolor }) =>
    shadow ? `0rem 0rem .5rem  ${bgcolor};` : ""};
`;
export function Badges({ bgcolor, color, label, round, shadow }) {
  return (
    <Badge color={color} bgcolor={bgcolor} round={round} shadow={shadow}>
      {label}
    </Badge>
  );
}
function ButtonBadges() {
  const { Badge } = useContext(ButtonContext);
  return Badge && Badge;
}
ButtonWithIcons.Badge = ButtonBadges;
CardContainer.Badge = Badges;
export default Badges;
