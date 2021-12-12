import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import QuantityButton from "./reusable/quantityButton";
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
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
  cartSubTotalPrice: string;
}

const CartItem: React.FC<Props> = ({
  cartItem,
  handleCartItemQuantityChange,
}) => {
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
      <QuantityButton
        total={cartItem.cartQuantity}
        id={cartItem.id}
        width="96px"
        height="32px"
        mediaQuery="390px"
        responsiveFullWidth={true}
        handleCartItemQuantityChange={handleCartItemQuantityChange}
      />
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 390px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ImageAndTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 390px) {
    margin-bottom: 24px;
  }
`;

const TitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 120px;
  margin-left: 16px;
  margin-right: auto;
  @media (max-width: 840px) {
    max-width: 90px;
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
