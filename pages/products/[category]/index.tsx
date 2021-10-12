import { useRouter } from "next/router";
import React, { useContext } from "react";
import AppContext from "../../../context/appContext";
import styled from "styled-components";
import CategoryImageLinks from "../../../components/categoryImageLinks";
import AboutUs from "../../../components/aboutUs";
import ImageLoader from "../../../components/reusable/imageLoader";
import Button from "../../../components/reusable/button";
import ProductCard from "../../../components/productCard";

interface Props {}

const ProductsPage: React.FC<Props> = () => {
  const { links } = useContext(AppContext);
  const { query } = useRouter();
  const { category } = query;

  return (
    <Container>
      <Banner>
        <ProductCategory>{category}</ProductCategory>
      </Banner>

      <ProductsContainer>
        <ProductCard />
      </ProductsContainer>
      <CategoryImageLinks links={links} />
      <AboutUs />
    </Container>
  );
};

export default ProductsPage;

const Container = styled.div`
  ${"" /* background-color: red; */}
`;

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
  grid-gap: 24px 0px;
  max-width: 560px;
  margin-bottom: 160px;
`;
