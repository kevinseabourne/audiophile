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
  border?: string;
  hoverBackgroundColor?: string;
  hoverOpacity?: string;
}

const CategoryImageLinks: React.FC<Props> = ({
  title,
  onClick,
  height,
  width,
  backgroundColor,
  color,
  border,
  hoverBackgroundColor,
  hoverOpacity,
}) => {
  const buttonAnimation = {
    hidden: {},
    show: {},
    hover: {
      backgroundColor: hoverBackgroundColor
        ? hoverBackgroundColor
        : backgroundColor,
      opacity: hoverOpacity ? hoverOpacity : 1,
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
      whileHover="hover"
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

  @media (max-width: 840px) {
    width: 100%;
  }
`;
