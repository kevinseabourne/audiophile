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
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
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

        <InputContainer>
          <TextInput
            {...rest}
            ref={ref}
            type={type ? type : "text"}
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            error={error}
            autoFocus={autoFocus}
            maxLength={maxLength}
            aria-label={`${name}-input`}
          />
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
  overflow: hidden;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 9px;
  border-radius: 8px;
`;

interface TextInputProps {
  error: { message: string } | FieldError;
}

const TextInput = styled.input<TextInputProps>`
  padding: 18px 24px 19px 18px;
  max-height: 56px;
  font-size: 14px;
  border-radius: 8px;
  margin: 0px;
  font-weight: 700;
  line-height: 19px;
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
  outline: none;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.darkerBlack};
  border: ${({ error }) => (error ? "2px solid #CD2C2C" : "1px solid #cfcfcf")};
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:placeholder {
    letter-spacing: -0.25px;
    line-height: 19px;
    mix-blend-mode: normal;
    opacity: 0.4;
  }
  &: focus {
    border: ${({ error }) =>
      error ? "2px solid #CD2C2C" : "1px solid  #d87d4a"};
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
