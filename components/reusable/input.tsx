import React from "react";
import styled from "styled-components";
import ImageLoader from "./imageLoader";
import { motion, AnimatePresence } from "framer-motion";

type Ref = HTMLInputElement;

interface Props {
  label: string;
  error: { message: string };
  maxLength: number;
  onChange: React.FormEventHandler<HTMLInputElement>;
  onClick: () => void;
  name: string;
  type: string;
  doSubmit: () => void;
  value: string;
  marginLeft: string;
  autoFocus: boolean;
  marginRight: string;
  marginTop: string;
  marginBottom: string;
  tabIndex: number;
  defaultValue: string;
  y: number;
  x: number;
  scale: number;
  opacity: number;
}

export const Input = React.forwardRef<Ref, Props>(
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
        y: -20,
        scale: 0.4,
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
    };

    return (
      <Container
        layout
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        tabIndex={tabIndex}
        variants={animation}
      >
        <Label>{label}</Label>
        <InputContainer>
          <TextInput
            {...rest}
            ref={ref}
            type={type ? type : "text"}
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            autoFocus={autoFocus}
            defaultValue=""
            maxLength={maxLength}
            aria-label={`${name}-input`}
          />
        </InputContainer>

        <AnimatePresence>
          {error && (
            <ErrorContainer
              aria-label={`${name}-error-message`}
              variants={errorAnimation}
              animate={error ? "show" : "hidden"}
              initial="hidden"
            >
              <ImageLoader
                opacity={0}
                scale={0}
                alt="error icon"
                maxWidth="15px"
                placeholderSize="100%"
                src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
              />
              <ErrorMessage>{error.message}</ErrorMessage>
            </ErrorContainer>
          )}
        </AnimatePresence>
      </Container>
    );
  }
);

interface ContainerProps {
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
}

const Container = styled(motion.div)<ContainerProps>`
  width: 100%;
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

const Label = styled.label`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3px;
  border-radius: 8px;
`;

const TextInput = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 8px;
  margin: 0px;
  font-size: 14px;
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
  color: ${({ theme }) => theme.colors.darkerBlack};
  border: none;
  outline: none;
  &:placeholder {
    letter-spacing: -0.25px;
    line-height: 19px;
    mix-blend-mode: normal;
    opacity: 0.4;
  }
`;

const ErrorContainer = styled(motion.div)`
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.colors.orange}`};
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  background-color: white;
`;

const ErrorMessage = styled.label`
  margin-top: 1.9px;
  margin-left: 8px;
  font-size: 14px;
  color: red;
`;
