import React from "react";
import styled from "styled-components";
import { FieldError } from "react-hook-form/dist/types";

interface Props {
  label: string;
  height?: string;
  value: string;
  error?: { message: string } | FieldError;
  maxLength?: number;
  onChange?: (e: Event) => void;
  onClick?: () => void;
  type?: string;
  doSubmit?: () => void;
  maxWidth?: string;
  marginLeft?: string;
  autoFocus?: boolean;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  defaultValue?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  checked?: boolean;
  defaultChecked?: boolean;
}

export const RadioButton = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      height,
      label,
      error,
      maxLength,
      onChange,
      onClick,
      type,
      doSubmit,
      value,
      maxWidth,
      marginLeft,
      autoFocus,
      marginRight,
      marginTop,
      marginBottom,
      defaultValue,
      y,
      x,
      scale,
      opacity,
      checked,
      defaultChecked,
      ...rest
    },
    ref
  ) => {
    return (
      <Container
        height={height}
        maxWidth={maxWidth}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
      >
        <RadioContainer>
          <Radio
            type="radio"
            {...rest}
            ref={ref}
            value={value}
            defaultChecked={defaultChecked}
          />
        </RadioContainer>
        <Label>{label}</Label>
      </Container>
    );
  }
);

interface ContainerProps {
  height: string;
  maxWidth: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 18px 16px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  height: ${({ height }) => (height ? height : "auto")};
  border: 1px solid #d87d4a;
  border-radius: 8px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  margin-bottom: 22px;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "0px")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "0px")};
  @media (max-width: 609px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const RadioContainer = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Radio = styled.input`
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: none;
  margin: 0px;
  appearance: none;
  visibility: visible !important;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:checked {
    &::after {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    z-index: 400;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    border: 1px solid #cfcfcf;
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    transition: all 0.25s;
    transform: translate(-50%, -50%) scale(0);
    background-color: #d87d4a;
    width: 10px;
    border-radius: 50%;
    height: 10px;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.darkerBlack};
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.25px;
  margin-left: 16px;
`;
