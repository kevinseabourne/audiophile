import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ArrowIcon from ".././public/icons/arrow.svg";
import ImageLoader from "./reusable/imageLoader";

type LinkObj = {
  link: {
    title: string;
    route: string;
  };
  image: string;
};

interface Props {
  links: LinkObj[];
  closeBurgerMenu?: () => void;
}

const CategoryImageLinks: React.FC<Props> = ({ links, closeBurgerMenu }) => {
  const { push } = useRouter();
  const [productLinks, setProductLinks] = useState([]);

  useEffect(() => {
    const filteredLinks = links.filter((link) => link.link.title !== "Home");
    setProductLinks(filteredLinks);
  }, [links]);

  const handleClick = (link: LinkObj) => {
    closeBurgerMenu && closeBurgerMenu();
    push(`/products/[id]`, `/products${link.link.route}`);
  };

  return (
    <Container>
      {productLinks.map((link) => (
        <ItemContainer
          key={link.link.title}
          onClick={() => handleClick(link)}
          closeBurgerMenu={closeBurgerMenu}
        >
          <ImageContainer closeBurgerMenu={closeBurgerMenu}>
            <ImageLoader
              src={link.image}
              alt="product"
              placeholderSize="100%"
              maxWidth="100%"
              centerImage={true}
              hover={true}
              objectFit="contain"
            />
          </ImageContainer>
          <InnerContainer>
            <LinkTitle>{link.link.title}</LinkTitle>
            <ShopButton>
              <ShopButtonTitle>Shop</ShopButtonTitle>
              <ImageLoader src={ArrowIcon} alt="arrow" width="10px" />
            </ShopButton>
          </InnerContainer>
        </ItemContainer>
      ))}
    </Container>
  );
};

export default CategoryImageLinks;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 350px));
  grid-column-end: auto;
  grid-gap: 0px 30px;
  justify-content: center;
  @media (max-width: 678px) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px 0px;
    width: 100%;
  }
`;

const ShopButtonTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-right: 13.32px;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

interface ItemContainerProps {
  closeBurgerMenu: () => void;
}

const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: ${({ closeBurgerMenu }) => (closeBurgerMenu ? "217px" : "276.5px")};
  &:hover {
    cursor: pointer;
    ${ShopButtonTitle} {
      color: ${({ theme }) => theme.colors.orange};
    }
  }
  @media (max-width: 750px) {
    height: 217px;
  }
`;

interface ImageContainerProps {
  closeBurgerMenu: () => void;
}

const ImageContainer = styled.div<ImageContainerProps>`
  position: absolute;
  width: 100%;
  max-width: 207px;
  top: -7px;
  @media (max-width: 1040px) {
    top: ${({ closeBurgerMenu }) => (closeBurgerMenu ? "-7px" : "55px")};
    max-width: ${({ closeBurgerMenu }) =>
      closeBurgerMenu ? "154px" : "150px"}; 150px;
  }
  @media (max-width: 750px) {
    top: -7px;
    max-width: 154px;
    padding: 0 0px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.silver};
  margin-top: auto;
  width: 100%;
  height: 204px;
  border-radius: 8px;
  @media (max-width: 1040px) {
    height: 165px;
  }
`;

const LinkTitle = styled.h6`
  line-height: 25px;
  letter-spacing: 1.28571px;
  text-transform: uppercase;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1040px) {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 1.07143px;
    margin-bottom: 17px;
  }
`;

const ShopButton = styled.button`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 1040px) {
    margin-bottom: 22px;
  }
`;
