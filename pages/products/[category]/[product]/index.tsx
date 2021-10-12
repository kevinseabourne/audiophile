import React, { useContext } from "react";
import AppContext from "../../../../context/appContext";
import styled from "styled-components";
import ProductGallery from "../../../../components/productGallery";
import RelatedProducts from "../../../../components/relatedProducts";
import CategoryImageLinks from "../../../../components/categoryImageLinks";
import AboutUs from "../../../../components/aboutUs";
import ProductCard from "../../../../components/productCard";

interface Props {}

const ProductPage: React.FC<Props> = () => {
  const { links } = useContext(AppContext);
  return (
    <Container>
      <Return>Go Back</Return>

      <ProductCard />
      <MoreProductInfo>more product info</MoreProductInfo>
      <ProductGallery />
      <RelatedProducts />
      <CategoryImageLinks links={links} />
      <AboutUs />
    </Container>
  );
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
`;

const ItemContainer = styled.div``;

const MoreProductInfo = styled.div``;
