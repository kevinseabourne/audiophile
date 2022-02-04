import React from "react";
import styled from "styled-components";
import ImageLoader from "./imageLoader";
import { motion, AnimatePresence } from "framer-motion";
import { FieldError } from "react-hook-form/dist/types";

interface Props {
  label: string;
  error?: { message: string } | FieldError;
  maxLength?: number;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onClick?: () => void;
  name: string;
  type?: string;
  doSubmit?: () => void;
  value?: string;
  maxWidth?: string;
  marginLeft?: string;
  autoFocus?: boolean;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  tabIndex?: number;
  defaultValue?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  cardType: string;
}

export const CreditCardInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      maxLength,
      onChange,
      onClick,
      name,
      type,
      doSubmit,
      value,
      maxWidth,
      marginLeft,
      autoFocus,
      marginRight,
      marginTop,
      marginBottom,
      tabIndex,
      defaultValue,
      y,
      x,
      scale,
      opacity,
      cardType,
      ...rest
    },
    ref
  ) => {
    const animation = {
      hidden: {
        scale: scale == undefined ? 1 : scale,
        opacity: opacity == undefined ? 1 : opacity,
        y: y ? y : 0,
        x: x ? x : 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
      },
    };

    const errorAnimation = {
      hidden: {
        opacity: 0,
        y: -0,
        x: 140,
        scale: 1,
      },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      },
    };

    return (
      <Container
        layout
        maxWidth={maxWidth}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        tabIndex={tabIndex}
        variants={animation}
      >
        <LabelErrorMessageContainer>
          <Label error={error}>{label}</Label>
          <AnimatePresence>
            {error && (
              <ErrorMessage
                variants={errorAnimation}
                animate={error ? "show" : "hidden"}
                initial="hidden"
                exit="hidden"
                aria-label={`${name}-error-message`}
              >
                {error.message}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </LabelErrorMessageContainer>

        <InputContainer error={error}>
          <TextInput
            {...rest}
            ref={ref}
            type={type ? type : "text"}
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            autoFocus={autoFocus}
            maxLength={
              cardType === "visa"
                ? 22
                : cardType === "mastercard"
                ? 22
                : cardType === "amax"
                ? 19
                : 40
            }
            aria-label={`${name}-input`}
          />
          <CardImageContainer>
            {cardType && (
              <ImageLoader
                src={
                  cardType === "visa"
                    ? "https://cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
                    : cardType === "mastercard"
                    ? "https://cdn.shopify.com/s/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
                    : cardType === "amax"
                    ? "https://cdn.shopify.com/s/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
                    : ""
                }
                alt="credit card"
                opacity={0}
                scale={0}
                width="40px"
              />
            )}
          </CardImageContainer>
        </InputContainer>
      </Container>
    );
  }
);

interface ContainerProps {
  maxWidth: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
}

const Container = styled(motion.div)<ContainerProps>`
  width: 100%;
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

interface LabelProps {
  error: { message: string } | FieldError;
}

const Label = styled.label<LabelProps>`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  transition: all 0.2s;
  color: ${({ theme, error }) =>
    error ? "#CD2C2C" : theme.colors.darkerBlack};
`;

interface InputContainerProps {
  error: { message: string } | FieldError;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 9px;
  border-radius: 8px;
  border: ${({ error }) => (error ? "2px solid #CD2C2C" : "1px solid #cfcfcf")};
  &: focus-within {
    border: ${({ error }) =>
      error ? "2px solid #CD2C2C" : "1px solid  #d87d4a"};
  }
`;

const CardImageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  max-height: 56px;
`;

const TextInput = styled.input`
  padding: 18px 24px 19px 18px;
  max-height: 56px;
  font-size: 14px;
  border-radius: 8px;
  margin: 0px;
  font-weight: 700;
  line-height: 19px;
  box-sizing: border-box;
  font-family: inherit;
  width: 80%;
  outline: none;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.darkerBlack};
  border: none;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:placeholder {
    letter-spacing: -0.25px;
    line-height: 19px;
    mix-blend-mode: normal;
    opacity: 0.4;
  }
`;

const LabelErrorMessageContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ErrorMessage = styled(motion.span)`
  line-height: 16px;
  margin-left: auto;
  letter-spacing: -0.214286px;
  font-weight: 500;
  font-size: 12px;
  color: #cd2c2c;
`;
