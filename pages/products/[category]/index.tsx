import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/appContext";
import styled from "styled-components";
import CategoryImageLinks from "../../../components/categoryImageLinks";
import AboutUs from "../../../components/aboutUs";
import ImageLoader from "../../../components/reusable/imageLoader";
import Button from "../../../components/reusable/button";
import ProductCard from "../../../components/productCard";
import { getCategoryProducts } from "../../api/products";
import { isArrayEmpty } from "../../../lib/utils/isEmpty";

interface Props {
  data: {
    productAdded: string;
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
    lowerCaseTitle: string;
    type: string;
  }[];
}

const ProductsPage: React.FC<Props> = ({ data }) => {
  const { links } = useContext(AppContext);
  const { query } = useRouter();
  const { category } = query;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    data && setProducts(data);
  }, []);

  return (
    <Container>
      <Banner>
        <ProductCategory>{category}</ProductCategory>
      </Banner>

      <ProductsContainer>
        {products.map((product, index) => (
          <ProductCard key={product.id} index={index + 1} product={product} />
        ))}
      </ProductsContainer>
      <CategoryImageLinks links={links} />
      <AboutUs />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: "headphones" } },
      { params: { category: "speakers" } },
      { params: { category: "earphones" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params;
  let data = [];
  if (typeof category === "string") {
    data = await getCategoryProducts(category);
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

export default ProductsPage;

const Container = styled.div``;

const Banner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 336px;
  width: 100%;
  background-color: #191919;
  padding-top: 93px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductCategory = styled.h2``;

const ProductsContainer = styled.div`
  margin-top: 399px;
  display: grid;
  grid-template-columns: repeat(1, 1110px);
  grid-column-end: auto;
  grid-gap: 160px 0px;
  max-width: 560px;
  margin-bottom: 160px;
`;
