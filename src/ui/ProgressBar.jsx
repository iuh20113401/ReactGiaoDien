import styled, { css, keyframes } from "styled-components";

const StripAnimation = keyframes`
  0%, 100% {
    background-image: ${({ color }) => `repeating-linear-gradient(
      45deg,    
      ${color} 0px,
      ${color} 5px,
      transparent 5px,
      transparent 10px
    )`};
  }
  50% {
    background-image: ${({ color }) => `repeating-linear-gradient(
      90deg,    
      ${color} 0px,
      ${color} 5px,
      transparent 5px,
      transparent 10px
    )`};
    mask-image: repeating-linear-gradient(
    45deg,
     white 0px,
    white 5px,
    rgba(255, 255, 255, 0.6) 5px,
    rgba(255, 255, 255, 0.6) 10px
   
  );
  }
`;
const stripStyle = css`
  background-image: ${({ color }) => `repeating-linear-gradient(
    45deg,    
    ${color} 0px,
    ${color} 5px
    );
  `};
  mask-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.6) 0px,
    rgba(255, 255, 255, 0.6) 5px,
    white 5px,
    white 10px
  );
  animation: ${StripAnimation} 0.5s ease-in-out infinite;
`;
const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.percent}%;
  background-color: ${({ color }) => color};
  position: relative;
  ${({ label }) => label && LabelOption["true"]}
  ${({ strip }) => strip && stripStyle}
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  height: ${(props) => props.size}rem;
  background-color: var(--color--secondary_3);
  border-radius: 50rem;
  overflow: hidden;
  position: relative;
`;
const LabelOption = {
  true: css`
    &::after {
      content: ${({ label }) => `"${label}%"`};
      position: absolute;
      left: 50%;
      z-index: 10;
      color: #fff;
      font-size: 1.2rem;
    }
  `,
};
function CreateProgressBar({
  size,
  color,
  percent,
  label = false,
  strip,
  ...props
}) {
  return (
    <ProgressBarContainer size={size} color={color} {...props}>
      <ProgressBar
        color={color}
        percent={percent}
        label={label && percent}
        strip={strip}
      />
    </ProgressBarContainer>
  );
}

export default CreateProgressBar;
