import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/appContext";
import styled from "styled-components";
import CategoryImageLinks from "../../../components/categoryImageLinks";
import AboutUs from "../../../components/aboutUs";
import ProductCard from "../../../components/productCard";
import { getCategoryProducts } from "../../api/products";
import { isArrayEmpty } from "../../../lib/utils/isEmpty";
import { toast } from "react-toastify";

interface Props {
  data: {
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
    if (isArrayEmpty(data)) {
      setProducts(data);
    } else {
      toast.error("An unexpected error has occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
  @media (max-width: 550px) {
    height: 230px;
  }
  @media (max-width: 430px) {
    height: 190px;
  }
`;

const ProductCategory = styled.h2`
  @media (max-width: 550px) {
    font-size: 28px;
  }
  @media (max-width: 430px) {
    font-size: 23px;
  }
`;

const ProductsContainer = styled.div`
  margin-top: 399px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-end: auto;
  grid-gap: 160px 0px;
  margin-bottom: 160px;
  @media (max-width: 630px) {
    margin-top: 266px;
    grid-gap: 90px 0px;
  }
  @media (max-width: 550px) {
    margin-top: 160px;
  }
  @media (max-width: 480px) {
    grid-gap: 60px 0px;
  }
  @media (max-width: 430px) {
    margin-top: 120px;
  }
`;
