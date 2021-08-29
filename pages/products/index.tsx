import React from "react";
import styled from "styled-components";
import ProductsGrid from "../../components/productsGrid";

interface Props {}

const ProductsPage: React.FC<Props> = () => {
  return (
    <Container>
      <ProductsGrid />
    </Container>
  );
};

export default ProductsPage;

const Container = styled.div``;
