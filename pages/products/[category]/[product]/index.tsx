import React, { useContext } from "react";
import AppContext from "../../../../context/appContext";
import styled from "styled-components";
import ProductGallery from "../../../../components/productGallery";
import RelatedProducts from "../../../../components/relatedProducts";
import CategoryImageLinks from "../../../../components/categoryImageLinks";
import AboutUs from "../../../../components/aboutUs";

interface Props {}

const ProductPage: React.FC<Props> = () => {
  const { links } = useContext(AppContext);
  return (
    <Container>
      <Return>Go Back</Return>
      <ItemContainer>image, price, little info</ItemContainer>
      <MoreProductInfo>more product info</MoreProductInfo>
      <ProductGallery />
      <RelatedProducts />
      <CategoryImageLinks links={links} />
      <AboutUs />
    </Container>
  );
};

export default ProductPage;

const Container = styled.div`
  background-color: red;
`;

const Return = styled.div``;

const ItemContainer = styled.div``;

const MoreProductInfo = styled.div``;
