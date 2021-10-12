import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductsGrid from "../../components/productsGrid";

interface Props {}

const AllProductsPage: React.FC<Props> = () => {
  return (
    <Container>
      <Title>All Products</Title>
      <ProductsGrid />
    </Container>
  );
};

export default AllProductsPage;

const Title = styled.h1``;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;
