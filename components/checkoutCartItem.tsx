import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import { formatPrice } from "../lib/utils/formatPrice";

interface Props {
  cartItem: {
    dateAdded: string;
    id: string;
    images: {
      title: string;
      image: string;
    }[];
    inTheBox: {
      title: string;
      units: number;
    }[];
    longDescription: string;
    price: string;
    shortDescription: string;
    title: string;
    type: string;
    cartQuantity: number;
    cartPrice: string;
  };
}

const CheckoutCartItem: React.FC<Props> = ({ cartItem }) => {
  const [cartItemPrice, setCartItemPrice] = useState("");

  useEffect(() => {
    handlePriceFormat();
  }, []);

  const handlePriceFormat = () => {
    const cartItemClone = { ...cartItem };
    const price = formatPrice(cartItemClone.price);
    setCartItemPrice(price);
  };

  return (
    <Container>
      <ImageAndTitleContainer>
        <ImageLoader
          src={cartItem.images[0].image}
          alt="test"
          maxWidth="64px"
          width="64px"
          borderRadius="8px"
          placeholderColor="#F1F1F1"
        />
        <TitlePriceContainer>
          <Title>{cartItem.title}</Title>
          <Price>{cartItemPrice}</Price>
        </TitlePriceContainer>
      </ImageAndTitleContainer>
      <Quantity>x{cartItem.cartQuantity}</Quantity>
      <ResponsiveContainer>
        <TitlePriceContainer responsive={true}>
          <Title>{cartItem.title}</Title>
          <Price>{cartItemPrice}</Price>
        </TitlePriceContainer>
        <Quantity responsive={true}>x{cartItem.cartQuantity}</Quantity>
      </ResponsiveContainer>
    </Container>
  );
};

export default CheckoutCartItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 390px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const ImageAndTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 390px) {
    margin-bottom: 24px;
  }
`;

interface TitlePriceContainerProps {
  responsive?: boolean;
}

const TitlePriceContainer = styled.div<TitlePriceContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 120px;
  margin-left: ${({ responsive }) => (responsive ? "0px" : "16px")};
  margin-right: auto;
  @media (max-width: 1200px) {
    max-width: 100%;
  }
  @media (max-width: 447px) {
    max-width: 120px;
  }

  @media (max-width: 394px) {
    display: ${({ responsive }) => (responsive ? "flex" : "none")};
  }
`;

const Title = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  white-space: nowrap;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  white-space: nowrap;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface QuantityProps {
  responsive?: boolean;
}

const Quantity = styled.span<QuantityProps>`
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  align-self: flex-start;
  font-size: 14px;
  font-weight: 700;
  @media (max-width: 394px) {
    margin-top: -70px;
    display: ${({ responsive }) => (responsive ? "flex" : "none")};
  }
  @media (max-width: 230px) {
    margin-top: 0px;
    display: ${({ responsive }) => (responsive ? "flex" : "none")};
  }
`;

const ResponsiveContainer = styled.div`
  display: none;
  width: 100%;
  @media (max-width: 394px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 230px) {
    display: flex;
    flex-direction: column;
  }
`;
