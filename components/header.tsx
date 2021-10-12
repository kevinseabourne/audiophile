import React from "react";
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
  links: {
    link: {
      title: string;
      route: string;
    };
    image: string;
  }[];
}

const Header: React.FC<Props> = ({
  cartItems,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
  links,
}) => {
  return (
    <Container>
      <Wrapper>
        <ResponsiveHeader
          links={links}
          cartItems={cartItems}
          handleCartItemQuantityChange={handleCartItemQuantityChange}
          cartSubTotalPrice={cartSubTotalPrice}
        />
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
              href={link.link.route === "/" ? "/" : `/products/[id]`}
              as={link.link.route === "/" ? "/" : `/products${link.link.route}`}
              key={link.link.title}
            >
              <LinkTitle>{link.link.title}</LinkTitle>
            </Link>
          ))}
        </LinksContainer>
        <Cart
          cartItems={cartItems}
          handleCartItemQuantityChange={handleCartItemQuantityChange}
          cartSubTotalPrice={cartSubTotalPrice}
        />
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
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
  z-index: 10;
  background-color: #191919;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1109.83px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10;
  justify-content: space-between;
  border-bottom: 1px solid RGBA(255, 255, 255, 0.2);
`;

const ImageContainer = styled.button`
  width: 100%;
  max-width: 143px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 1109.83px) {
    margin-left: 24px;
  }
  @media (max-width: 840px) {
    margin-left: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LinkTitle = styled.button`
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.orange};
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
