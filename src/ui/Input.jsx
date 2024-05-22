import React from "react";
import styled, { css } from "styled-components";
const ContainerType = {
  inputGroup: css`
    position: relative;
    display: inline-block;
    & > input {
      padding-left: 3.5rem;
    }
    & > span {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      margin: auto 0;
      height: 3.2rem;
      display: flex;
      align-items: center;
    }
  `,
  checkbox: css`
    flex-direction: row;
    gap: 0.8rem;
    align-items: center;
    opacity: 1;
    ${({ disabled }) =>
      disabled
        ? css`
            opacity: 0.8;
          `
        : ""}
  `,
  float: css`
    position: relative;
    & > input::placeholder {
      color: var(--color--secondary_8);
      opacity: 1;
    }
    & > label {
      position: absolute;
      bottom: calc(100% - 0.8rem);
      transition: all 0.3s ease;
    }
    & > input:placeholder-shown + label {
      visibility: hidden;
      opacity: 0;
    }
    & > input:not(:placeholder-shown) {
      margin-top: 0.8rem;
    }
    & > input:not(:placeholder-shown) + label {
      opacity: 1;
      visibility: visible;
      bottom: calc(100% - 0.4rem);
    }
  `,
  horizontal: css`
    flex-direction: row;
    align-items: center;
  `,
};
const InputContainerDiv = styled.div`
  width: ${({ full }) => (full === "true" ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? `${gap}rem` : " 0.4rem")};
  ${({ type }) => (type !== "normal" ? ContainerType[type] : "")}
`;

const InputSizes = {
  xs: css`
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  `,
  sm: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  `,
  lg: css`
    font-size: 1.8rem;
    padding: 1.2rem 1.6rem;
  `,
  xl: css`
    font-size: 2rem;
    padding: 1.4rem 1.6rem;
  `,
  block: css`
    width: 100%;
    height: fit-content;
  `,
};
const InputStyle = {
  transparent: css`
    background-color: transparent;
    border: none;
    &:focus {
      border: none;
    }
  `,
};
const InputStyled = css`
  height: fit-content;
  font-size: 1.4rem;
  padding: 1rem 1.6rem;
  border: 1px solid var(--color--secondary_4);
  outline: none;
  border-radius: 0.6rem;
  color: var(--color--input-text);
  &:focus {
    border: 1px solid var(--color--main_7);
  }
  ${({ size }) => (size ? InputSizes[size] : "")}
  ${({ inputStyle }) => (inputStyle ? InputStyle[inputStyle] : "")}
  &::placeholder {
    color: var(--color--secondary_5);
    opacity: 0.8;
  }
`;
const Input = styled.input`
  ${InputStyled}
  &:invalid,
  &.invalid {
    border: 1px solid var(--color--red_7);
  }
`;
const Select = styled.select`
  ${InputStyled}
`;
const Textarea = styled.textarea`
  ${InputStyled}
`;
const Label = styled.label`
  font-size: ${({ size }) => (size ? `${size}rem` : "1.2rem")};
  color: var(--color--secondary_8);
`;
const Error = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color--red_6);
`;
const CheckboxContainer = styled.div`
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  position: relative;
  display: block;
  user-select: none;
  cursor: pointer;
  margin-left: 0.8rem;
  &:hover > div {
    background-color: var(--color--secondary_4);
  }
  & > input:checked + div::after {
    display: block;
  }
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
  ${({ disabled }) =>
    disabled
      ? css`
          &:hover {
            cursor: not-allowed;
          }
        `
      : ""}
`;
const CheckMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  background-color: #eee;
  &::after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
    height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
    border: 0.4rem solid var(--color--secondary_4);
    background-color: ${({ color }) =>
      color ? color : "var(--color--main_8)"};
  }
`;
const RadioContainer = styled.div`
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  position: relative;
  display: block;
  user-select: none;
  cursor: pointer;
  margin-left: 0.8rem;
  &:hover > div {
    background-color: var(--color--secondary_4);
  }
  & > input:checked + div::after {
    display: block;
  }
`;
const Radio = styled.input.attrs({ type: "radio" })`
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
  ${({ disabled }) =>
    disabled
      ? css`
          &:hover {
            cursor: not-allowed;
          }
        `
      : ""}
`;
const RadioMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  width: ${({ size }) => (size ? `${size}rem` : "2.4rem")};
  background-color: #eee;
  border-radius: 50%;
  &::after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 0.6rem solid
      ${({ color }) => (color ? color : "var(--color--main_8)")};
  }
`;
function InputField({ size, register = null, ...props }) {
  return <Input size={size} {...props} {...register} />;
}
function SelectField({ children, size, inputStyle, register, ...props }) {
  return (
    <Select size={size} inputStyle={inputStyle} {...register} {...props}>
      {children}
    </Select>
  );
}
function TextareaField({ register, children, ...props }) {
  return (
    <Textarea {...props} {...register}>
      {children}
    </Textarea>
  );
}
function LabelField({ children, htmlFor, size, className }) {
  return (
    <Label htmlFor={htmlFor} size={size} className={className}>
      {children}
    </Label>
  );
}
function ErrorField({ children }) {
  return <Error>{children}</Error>;
}
function CheckBoxField(props) {
  const { size, color, register, ...others } = props;
  return (
    <CheckboxContainer>
      <Checkbox size={size} {...register} {...others} />
      <CheckMask color={color} size={size} />
    </CheckboxContainer>
  );
}
function RadionField({
  name,
  children,
  size,
  checked,
  disabled = false,
  color,
  ...props
}) {
  return (
    <RadioContainer>
      <Radio
        checked={checked}
        disabled={disabled}
        size={size}
        name={`${name}`}
        {...props}
      />
      <RadioMask color={color} size={size} />
    </RadioContainer>
  );
}
export function InputContainer({
  type = "normal",
  full = "true",
  children,
  ...props
}) {
  return (
    <InputContainerDiv type={type} full={full} {...props}>
      {children}
    </InputContainerDiv>
  );
}

InputContainer.Input = InputField;
InputContainer.Label = LabelField;
InputContainer.Select = SelectField;
InputContainer.Textarea = TextareaField;
InputContainer.Checkbox = CheckBoxField;
InputContainer.Radio = RadionField;
InputContainer.Error = ErrorField;
