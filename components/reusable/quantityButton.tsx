import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  total: number;
  id: string;
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
}

const QuantityButton: React.FC<Props> = ({
  total,
  id,
  handleCartItemQuantityChange,
}) => {
  const orangeHoverAnimation = {
    hover: {
      color: "#D87D4A",
      buttonHoverOpacity: 1,
    },
  };

  return (
    <Container>
      <DecreaseButton
        variants={orangeHoverAnimation}
        whileHover="hover"
        padding="6px 6.5px 6px 11.5px"
        onClick={() => handleCartItemQuantityChange("decrease", id)}
      >
        -
      </DecreaseButton>
      <Total>{total}</Total>
      <IncreaseButton
        variants={orangeHoverAnimation}
        whileHover="hover"
        onClick={() => handleCartItemQuantityChange("increase", id)}
      >
        +
      </IncreaseButton>
    </Container>
  );
};

export default QuantityButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 96px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.silver};
  position: relative;
  @media (max-width: 390px) {
    width: 100%;
  }
`;

const DecreaseButton = styled(motion.button)`
  width: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.25;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 1px;
  box-sizing: content-box;
  padding: 6px 6.5px 6px 11.5px;
  @media (max-width: 390px) {
    padding: 6px 26.5px 6px 27.5px;
  }
`;

const IncreaseButton = styled(motion.button)`
  width: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.25;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 1px;
  box-sizing: content-box;
  padding: 6px 11.5px 6px 6.5px;
  @media (max-width: 390px) {
    padding: 6px 27.5px 6px 26.5px;
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
