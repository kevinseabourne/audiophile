import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  title: string;
  onClick: () => void;
  height: string;
  width: string;
  backgroundColor: string;
  color?: string;
  hoverColor?: string;
  border?: string;
  hoverBackgroundColor?: string;
  hoverOpacity?: string;
  zIndex?: number;
  responsiveFullWidth?: boolean;
  mediaQuery?: string;
}

const CategoryImageLinks: React.FC<Props> = ({
  title,
  onClick,
  height,
  width,
  backgroundColor,
  color,
  hoverColor,
  border,
  hoverBackgroundColor,
  hoverOpacity,
  zIndex,
  responsiveFullWidth,
  mediaQuery,
}) => {
  const buttonAnimation = {
    hidden: {},
    show: {},
    hover: {
      backgroundColor: hoverBackgroundColor
        ? hoverBackgroundColor
        : backgroundColor,
      opacity: hoverOpacity ? hoverOpacity : 1,
      color: hoverColor ? hoverColor : color,
    },
  };
  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      variants={buttonAnimation}
      zIndex={zIndex}
      whileHover="hover"
      responsiveFullWidth={responsiveFullWidth}
      mediaQuery={mediaQuery}
    >
      {title}
    </Button>
  );
};

export default CategoryImageLinks;

interface ButtonProps {
  height: string;
  width: string;
  backgroundColor: string;
  color: string;
  border: string;
  zIndex: number;
  responsiveFullWidth: boolean;
  mediaQuery: string;
}

const Button = styled(motion.button)<ButtonProps>`
  height: ${({ height }) => (height ? height : "0px")};
  width: ${({ width }) => (width ? width : "0px")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "white"};
  color: ${({ color }) => (color ? color : "black")};
  border: ${({ border }) => (border ? border : "none")};
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 390px) {
    padding: 6px 27.5px 6px 26.5px;
  }

  @media ${({ mediaQuery }) => `(max-width: ${mediaQuery})`} {
    width: ${({ responsiveFullWidth, width }) =>
      responsiveFullWidth ? "100%" : width};
  }
`;
