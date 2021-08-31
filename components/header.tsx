import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./reusable/imageLoader";
import Logo from "../public/icons/audiophile.svg";
import Cart from "./cart";
import ResponsiveHeader from "./responsiveHeader";

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
      <Link href="/">
        <ImageContainer>
          <ImageLoader
            src={Logo}
            alt="audiophile"
            maxWidth="143px"
            placeholderSize="52%"
            priority={true}
            centerImage={true}
            hover={true}
          />
        </ImageContainer>
      </Link>

      <LinksContainer>
        {links.map((link) => (
          <Link
            href={link.route === "/" ? "/" : `/products/[id]`}
            as={link.route === "/" ? "/" : `/products${link.route}`}
            key={link.title}
          >
            <LinkTitle>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>
      <Cart
        cartItems={cartItems}
        handleCartItemQuantityChange={handleCartItemQuantityChange}
        cartSubTotalPrice={cartSubTotalPrice}
      />
      <ResponsiveHeader links={links} />
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  border-bottom: 1px solid white;
`;

const ImageContainer = styled.button`
  width: 100%;
  max-width: 143px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const LinkTitle = styled.button`
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  letter-spacing: 2px;
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 429px;
  @media (max-width: 840px) {
    display: none;
  }
`;
