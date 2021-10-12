import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import Button from "./reusable/button";

interface Props {}

const ProductCard: React.FC<Props> = () => {
  const { query, push } = useRouter();
  const { category } = query;

  return (
    <Product>
      <ImageLoader
        src="https://chpistel.sirv.com/audiophile/product-xx99-mark-two-headphones/desktop/image-product.jpg?w=1080"
        maxWidth="540px"
        alt="headphones"
        onClick={() => push(`/products/${category}/xx99-mark-||-headphones`)}
        hover={true}
        borderRadius="8px"
      />
      <InfoContainer>
        <NewProductTitle>New Product</NewProductTitle>
        <ProductTitle>XX99 Mark || Headphones</ProductTitle>
        <LongDescription>fsgrwe fsfwef</LongDescription>
        <Button
          title="See Product"
          onClick={() => push(`/products/${category}/xx99-mark-||-headphones`)}
          color="#ffffff"
          backgroundColor="orange"
          hoverBackgroundColor="#FBAF85"
          width="160px"
          height="48px"
        />
      </InfoContainer>
    </Product>
  );
};

export default ProductCard;

const Product = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  margin-left: 125px;
`;

const NewProductTitle = styled.span`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.orange};
  @media (max-width: 375px) {
    margin-bottom: 24px;
  }
  @media (max-width: 230px) {
    white-space: normal;
  }
`;

const ProductTitle = styled.h1`
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-top: 16px;
  margin-bottom: 32px;
  @media (max-width: 375px) {
    font-size: 28px;
    margin-bottom: 24px;
    line-height: 38px;
  }
`;

const LongDescription = styled.p`
  margin-top: 32px;
  font-weight: 200;
  margin-top: 0px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CategoryImageLinksContainer = styled.div`
  margin-top: 752px;
  margin-bottom: 168px;
  @media (max-width: 1040px) {
    margin-top: 705px;
    margin-bottom: 96px;
  }
  @media (max-width: 750px) {
    margin-top: 679px;
    margin-bottom: 120px;
  }
  @media (max-width: 375px) {
    margin-top: 550px;
  }
`;
