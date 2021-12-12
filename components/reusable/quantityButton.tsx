import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  total: number;
  id?: string;
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id?: string
  ) => void;
  width: string;
  height: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  mediaQuery?: string;
  responsiveFullWidth?: boolean;
}

const QuantityButton: React.FC<Props> = ({
  total,
  id,
  handleCartItemQuantityChange,
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  mediaQuery,
  responsiveFullWidth,
}) => {
  const orangeHoverAnimation = {
    hover: {
      color: "#D87D4A",
      buttonHoverOpacity: 1,
    },
  };

  return (
    <Container
      width={width}
      height={height}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      mediaQuery={mediaQuery}
      responsiveFullWidth={responsiveFullWidth}
    >
      <DecreaseButton
        variants={orangeHoverAnimation}
        whileHover="hover"
        mediaQuery={mediaQuery}
        responsiveFullWidth={responsiveFullWidth}
        onClick={() => handleCartItemQuantityChange("decrease", id)}
      >
        -
      </DecreaseButton>
      <Total>{total}</Total>
      <IncreaseButton
        variants={orangeHoverAnimation}
        whileHover="hover"
        mediaQuery={mediaQuery}
        responsiveFullWidth={responsiveFullWidth}
        onClick={() => handleCartItemQuantityChange("increase", id)}
      >
        +
      </IncreaseButton>
    </Container>
  );
};

export default QuantityButton;

interface ContainerProps {
  width: string;
  height: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marginBottom: string;
  mediaQuery: string;
  responsiveFullWidth: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "0px")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "0px")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  background-color: ${({ theme }) => theme.colors.silver};
  position: relative;

  @media ${({ mediaQuery }) => `(max-width: ${mediaQuery})`} {
    width: ${({ responsiveFullWidth, width }) =>
      responsiveFullWidth ? "100%" : width};
  }
`;

interface DecreaseButtonProps {
  mediaQuery: string;
  responsiveFullWidth: boolean;
}

const DecreaseButton = styled(motion.button)<DecreaseButtonProps>`
  width: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.25;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 1px;
  box-sizing: content-box;
  padding: 6px 6.5px 6px 11.5px;
  &:focus:not(:focus-visible) {
    outline: none;
  }

  @media ${({ mediaQuery }) => `(max-width: ${mediaQuery})`} {
    padding: ${({ responsiveFullWidth }) =>
      responsiveFullWidth ? "6px 26.5px 6px 27.5px" : "6px 6.5px 6px 11.5px"};
  }
`;

interface IncreaseButtonProps {
  mediaQuery: string;
  responsiveFullWidth: boolean;
}

const IncreaseButton = styled(motion.button)<IncreaseButtonProps>`
  width: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.25;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 1px;
  box-sizing: content-box;
  padding: 6px 11.5px 6px 6.5px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media ${({ mediaQuery }) => `(max-width: ${mediaQuery})`} {
    padding: ${({ responsiveFullWidth }) =>
      responsiveFullWidth ? "6px 26.5px 6px 27.5px" : "6px 6.5px 6px 11.5px"};
  }
`;

const Total = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 18px;
  text-align: center;
  position: absolute;
  color: ${({ theme }) => theme.colors.darkerBlack};
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
