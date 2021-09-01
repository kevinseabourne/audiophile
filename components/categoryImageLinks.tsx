import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ArrowIcon from ".././public/icons/arrow.svg";
import ImageLoader from "./reusable/imageLoader";

interface Props {
  links: {
    link: {
      title: string;
      route: string;
    };
    image: string;
  }[];
}

const CategoryImageLinks: React.FC<Props> = ({ links }) => {
  const { push } = useRouter();
  const [productLinks, setProductLinks] = useState([]);

  useEffect(() => {
    const filteredLinks = links.filter((link) => link.link.title !== "Home");
    setProductLinks(filteredLinks);
  }, [links]);

  return (
    <Container>
      {productLinks.map((link) => (
        <ItemContainer key={link.link.title}>
          <ImageContainer>
            <ImageLoader
              src={link.image}
              alt="product"
              maxWidth="100%"
              centerImage={true}
            />
          </ImageContainer>
          <InnerContainer>
            <LinkTitle>{link.link.title}</LinkTitle>
            <ShopButton onClick={() => push(`/products/${link.link.route}`)}>
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
  grid-template-columns: repeat(3, 1fr);
  grid-column-end: auto;
  grid-gap: 0px 30px;
  @media (max-width: 840px) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px 0px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 276.5px;
  @media (max-width: 840px) {
    height: 217px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 200px;
  top: 0px;
  @media (max-width: 840px) {
    max-width: 130px;
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
  @media (max-width: 840px) {
    height: 165px;
  }
`;

const LinkTitle = styled.h6`
  line-height: 25px;
  letter-spacing: 1.28571px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const ShopButtonTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-right: 13.32px;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const ShopButton = styled.button`
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    ${ShopButtonTitle} {
      color: ${({ theme }) => theme.colors.orange};
    }
  }
`;
