import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../context/appContext";
import styled from "styled-components";
import ProductGallery from "../../../../components/productGallery";
import RelatedProducts from "../../../../components/relatedProducts";
import CategoryImageLinks from "../../../../components/categoryImageLinks";
import AboutUs from "../../../../components/aboutUs";
import ProductCard from "../../../../components/productCard";
import { getSingleProduct, getAllProductTitles } from "../../../api/products";
import { isArrayEmpty } from "../../../../lib/utils/isEmpty";

interface Props {
  data: {
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
    lowerCaseTitle: string;
    type: string;
    cartQuantity: number;
  };
}

const ProductPage: React.FC<Props> = ({ data }) => {
  const { links } = useContext(AppContext);

  useEffect(() => {
    console.log(data[0]);
  }, []);

  return (
    <Container>
      <Return>Go Back</Return>
      <ProductCard showPricingAndAddCart={true} product={data[0]} />
      <MoreProductInfo>
        <FeaturesContainer>
          <SubTitle>Features</SubTitle>
          <LongDescription>{data[0].longDescription}</LongDescription>
        </FeaturesContainer>
        <InTheBoxContainer>
          <SubTitle>In The Box</SubTitle>
          <InTheBoxInnerContainer>
            {data[0].inTheBox.map((obj: { units: number; title: string }) => (
              <IntheBoxItem key={obj.title}>
                <Quantity>{`${obj.units}x`}</Quantity> <Item>{obj.title}</Item>
              </IntheBoxItem>
            ))}
          </InTheBoxInnerContainer>
        </InTheBoxContainer>
      </MoreProductInfo>
      <ProductGallery images={data[0].images} />
      <RelatedProducts />
      <CategoryImageLinks links={links} />
      <AboutUs />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const lowerCaseProductTitles = await getAllProductTitles();

  const paths = lowerCaseProductTitles.map((obj) => {
    return { params: obj };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { product } = params;
  let data = [];
  if (typeof product === "string") {
    const productTitle = product.replace(/[-]/g, " ");
    data = await getSingleProduct(productTitle);
  }

  if (!isArrayEmpty(data)) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      params,
    },
  };
};

export default ProductPage;

const Container = styled.div``;

const Return = styled.div`
  margin-top: 79px;
  margin-bottom: 56px;
  margin-right: auto;
  font-weight: 200;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkerBlack};
  @media (max-width: 980px) {
    margin-top: 33px;
    margin-bottom: 24px;
  }
  @media (max-width: 630px) {
    margin-top: 16px;
  }
`;

const ItemContainer = styled.div``;

const FeaturesContainer = styled.div`
  display: flex;
  max-width: 635px;
  flex-direction: column;
  text-align: left;
  margin-right: 125px;
  @media (max-width: 1190px) {
    max-width: 100%;
    margin-right: 0px;
    margin-bottom: 120px;
  }
  @media (max-width: 630px) {
    margin-bottom: 88px;
  }
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-bottom: 32px;
  @media (max-width: 630px) {
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.857143px;
    margin-bottom: 24px;
  }
`;

const LongDescription = styled.p`
  margin-top: 32px;
  font-weight: 200;
  margin-top: 0px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  @media (max-width: 1190px) {
    margin-bottom: 24px;
  }
`;

const MoreProductInfo = styled.div`
  margin-top: 160px;
  margin-bottom: 160px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  @media (max-width: 1190px) {
    flex-direction: column;
    margin-top: 88px;
    margin-bottom: 88px;
  }
`;

const InTheBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  @media (max-width: 1190px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

const InTheBoxInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-end: auto;
  grid-gap: 8px 0px;
  text-align: left;
`;

const IntheBoxItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1190px) {
    margin-right: 160px;
  }
  @media (max-width: 630px) {
    margin-right: 0px;
  }
`;

const Quantity = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  margin-right: 24px;
  font-weight: 700;
`;

const Item = styled.span`
  font-weight: 200;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  text-align: left;
`;
