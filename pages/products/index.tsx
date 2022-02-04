import AppContext from "../../context/appContext";
import { GetStaticProps } from "next";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ProductCard from "../../components/productCard";
import { getAllProducts } from "../api/products";
import { isArrayEmpty } from "../../lib/utils/isEmpty";
import CategoryImageLinks from "../../components/categoryImageLinks";
import AboutUs from "../../components/aboutUs";
import { toast } from "react-toastify";

type Product = {
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
  lowerCaseTitle: string;
  price: string;
  shortDescription: string;
  title: string;
  type: string;
};

interface Props {
  data: Product[];
}

const AllProductsPage: React.FC<Props> = ({ data }) => {
  const { links } = useContext(AppContext);
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
        <AllProducts>All Products</AllProducts>
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts();

  if (!isArrayEmpty(data)) {
    return { notFound: true };
  }

  return {
    props: {
      data,
    },
  };
};

export default AllProductsPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  @media (max-width: 550px) {
    height: 230px;
  }
  @media (max-width: 430px) {
    height: 190px;
  }
`;

const AllProducts = styled.h2`
  text-align: center;
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
