import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckoutForm from "../components/checkoutForm";

interface Props {}

const Checkout: React.FC<Props> = () => {
  useEffect(() => {
    // if localstorage cartItems is undefined then redirect
  }, []);
  return (
    <Container>
      <BackgroundColor />
      <GoBack>Go Back</GoBack>
      <InnerContainer>
        <CheckoutForm />
      </InnerContainer>
    </Container>
  );
};

export default Checkout;

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  height: 100%;
`;

const BackgroundColor = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: 1500px;
  background-color: ${({ theme }) => theme.colors.silver};
  z-index: -1;
`;

const GoBack = styled.div`
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-top: 79px;
  margin-bottom: 38px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
