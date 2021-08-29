import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./reusable/imageLoader";
import Logo from "../public/icons/audiophile.svg";
import Cart from "./cart";

interface Props {
  cartItems: {
    id: string;
    date: string;
    images: {
      image: string;
      title: string;
    }[];
    inTheBox: {
      units: string;
      title: string;
    };
    longDescription: string;
    price: string;
    shortDescription: string;
    title: string;
    type: string;
    cartQuantity: number;
  }[];
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
  cartSubTotalPrice: string;
}

const Header: React.FC<Props> = ({
  cartItems,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
}) => {
  const [links] = useState([
    { title: "Home", route: "/" },
    {
      title: "Headphones",
      route: "/headphones",
    },
    {
      title: "Speakers",
      route: "/speakers",
    },
    {
      title: "Earphones",
      route: "/earphones",
    },
  ]);
  return (
    <Container>
      <ImageLoader
        src={Logo}
        alt="audiophile"
        maxWidth="143px"
        placeholderSize="52%"
        priority={true}
        centerImage={true}
      />
      <LinksContainer>
        {links.map((link) => (
          <Link href={link.route} key={link.title}>
            <LinkTitle>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>

      <Cart
        cartItems={cartItems}
        handleCartItemQuantityChange={handleCartItemQuantityChange}
        cartSubTotalPrice={cartSubTotalPrice}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1109.83px;
  width: 100%;
  height: 93px;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
  z-index: 20;
  border-bottom: 1px solid white;
`;

const LinkTitle = styled.h4``;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
