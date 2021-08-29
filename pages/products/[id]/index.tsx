import React from "react";
import styled from "styled-components";
import ProductGallery from "../../../components/productGallery";
import RelatedProducts from "../../../components/relatedProducts";
import CategoryImageLinks from "../../../components/CategoryImageLinks";
import AboutUs from "../../../components/aboutUs";

interface Props {}

const ProductPage: React.FC<Props> = () => {
  return (
    <Container>
      <ItemContainer>image, price, little info</ItemContainer>
      <MoreProductInfo>more product info</MoreProductInfo>
      <ProductGallery />
      <RelatedProducts />
      <CategoryImageLinks />
      <AboutUs />
    </Container>
  );
};

export default ProductPage;

const Container = styled.div``;

const ItemContainer = styled.div``;

const MoreProductInfo = styled.div``;
