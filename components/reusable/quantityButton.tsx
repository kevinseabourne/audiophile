import React from "react";
import styled from "styled-components";

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
  return (
    <Container>
      <Button
        padding="0px 12px 0px 12px"
        onClick={() => handleCartItemQuantityChange("decrease", id)}
      >
        -
      </Button>
      <Total>{total}</Total>
      <Button
        padding="12px 12px 0px 0x"
        onClick={() => handleCartItemQuantityChange("increase", id)}
      >
        +
      </Button>
    </Container>
  );
};

export default QuantityButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button<{ padding: string }>`
  opacity: 0.25;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 1px;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;

const Total = styled.span`
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 18px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
