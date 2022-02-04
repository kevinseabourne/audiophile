import React from "react";
import styled from "styled-components";
import { FieldError } from "react-hook-form/dist/types";
import { formatPrice } from "../../lib/utils/formatPrice";

interface Props {
  label: string;
  height?: string;
  value: string;
  message?: string;
  name: string;
  price?: string;
  register?: (name: string) => void;
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
  mediaQuery?: string;
  responsive?: boolean;
}

export const RadioButton = ({
  height,
  label,
  name,
  error,
  maxLength,
  onChange,
  onClick,
  type,
  doSubmit,
  value,
  message,
  price,
  maxWidth,
  marginLeft,
  autoFocus,
  marginRight,
  marginTop,
  marginBottom,
  defaultValue,
  y,
  x,
  register,
  scale,
  opacity,
  checked,
  defaultChecked,
  mediaQuery,
  responsive,
  ...rest
}: Props) => {
  return (
    <Container
      height={height}
      maxWidth={maxWidth}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      mediaQuery={mediaQuery}
      responsive={responsive}
    >
      <RadioContainer>
        <Radio
          type="radio"
          {...rest}
          {...register(name)}
          defaultChecked={defaultChecked}
          value={value}
        />
      </RadioContainer>
      <TitleMessageContainer>
        <Label>{label}</Label>
        {message && <Message>{message}</Message>}
      </TitleMessageContainer>
      {price && <Price>{formatPrice(price)}</Price>}
    </Container>
  );
};

interface ContainerProps {
  height: string;
  maxWidth: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  mediaQuery: string;
  responsive: boolean;
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
  @media ${({ mediaQuery }) => `(max-width: ${mediaQuery})`} {
    max-width: ${({ responsive, maxWidth }) =>
      responsive ? "100%" : maxWidth};
    height: 100%;
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

const TitleMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.darkerBlack};
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.25px;
  margin-left: 16px;
  @media (max-width: 380px) {
    font-size: 12px;
  }
  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.darkerBlack};
  font-weight: 400;
  opacity: 0.5;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0.25px;
  margin: 0px;
  margin-left: 16px;
  @media (max-width: 380px) {
    font-size: 10px;
  }
  @media (max-width: 280px) {
    font-size: 9px;
  }
`;

const Price = styled.label`
  color: ${({ theme }) => theme.colors.darkerBlack};
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.25px;
  margin-left: auto;
  @media (max-width: 380px) {
    font-size: 12px;
  }
  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
