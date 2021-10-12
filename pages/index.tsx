import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import styled from "styled-components";
import ImageLoader from "../components/reusable/imageLoader";
import Button from "../components/reusable/button";
import CategoryImageLinks from "../components/categoryImageLinks";
import FeaturedProducts from "../components/featuredProducts";
import AboutUs from "../components/aboutUs";

export default function Home() {
  const { links } = useContext(AppContext);
  const { push } = useRouter();

  const [pageWidth, setpageWidth] = useState(null);

  useEffect(() => {
    setpageWidth(window.innerWidth);
    window.addEventListener("resize", handleResize); // <-- I am only interested in window.innerWidth !
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setpageWidth(window.innerWidth);
  };
  return (
    <Container>
      <BannerContainer>
        <ImageContainer>
          <Wrapper>
            <InnerWrapper>
              <InfoContainer>
                <NewProductTitle>New Product</NewProductTitle>
                <ProductTitle>XX99 Mark || Headphones</ProductTitle>
                <ShortDescription>
                  Experience natural, lifelike audio and exceptional build
                  quality made for the passionate music enthusiast.
                </ShortDescription>
                <Button
                  title="See Product"
                  onClick={() =>
                    push("/products/headphones/xx99-mark-||-headphones")
                  }
                  height="48px"
                  width="160px"
                  backgroundColor="orange"
                  hoverBackgroundColor="#FBAF85"
                  color="#ffffff"
                />
              </InfoContainer>
            </InnerWrapper>
          </Wrapper>
          <ImageLoader
            src={
              pageWidth <= 1190
                ? "https://chpistel.sirv.com/audiophile/home/tablet/image-header.jpg"
                : pageWidth <= 608
                ? "https://chpistel.sirv.com/audiophile/home/mobile/image-hero.jpg?&q=100"
                : "https://chpistel.sirv.com/audiophile/home/desktop/image-hero.jpg?&q=100"
            }
            alt="banner"
            width="100%"
            objectFit="cover"
            maxWidth={
              pageWidth <= 1190 ? (pageWidth <= 375 ? "100%" : "729px") : "100%"
            }
            placeholderSize={
              pageWidth <= 1190
                ? pageWidth <= 375
                  ? "580.6px"
                  : "729px"
                : "730px"
            }
            priority={true}
          />
        </ImageContainer>
      </BannerContainer>

      <CategoryImageLinksContainer>
        <CategoryImageLinks links={links} pageWidth={pageWidth} />
      </CategoryImageLinksContainer>

      <FeaturedProducts pageWidth={pageWidth} />

      <AboutUs pageWidth={pageWidth} />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 40px;
  @media (max-width: 500px) {
    padding: 0 24px;
  }
`;

const BannerContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 0px;
  left: 0px;
  height: 729px;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 375px) {
    height: 600px;
  }
`;

const ImageContainer = styled.div`
  max-width: 1400px;
  height: 100%;
  width: 100%;
  position: relative;
  @media (max-width: 1190px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  max-width: 1110px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  height: calc(100% - 93px);
  margin-top: auto;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const InnerWrapper = styled.div`
  max-width: 1110px;
  width: 100%;
  margin: auto;
  position: relative;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width: 1190px) {
    justify-content: center;
  }
`;

const InfoContainer = styled.div`
  margin-top: 128px;
  left: 0px;
  z-index: 1;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1190px) {
    text-align: center;
    align-items: center;
    max-width: 346px;
    margin-top: 126px;
  }
  @media (max-width: 375px) {
    margin-top: 108px;
    max-width: 290px;
  }
`;

const NewProductTitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 10px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 24px;
  white-space: nowrap;
  @media (max-width: 375px) {
    margin-bottom: 16px;
  }
  @media (max-width: 230px) {
    white-space: normal;
  }
`;

const ProductTitle = styled.h1`
  margin-bottom: 24px;
  @media (max-width: 578px) {
    font-size: 36px;
    line-height: 40px;
  }
`;

const ShortDescription = styled.p`
  font-weight: 200;
  opacity: 0.75;
  margin-top: 0px;
  margin-bottom: 40px;
  @media (max-width: 375px) {
    margin-bottom: 28px;
  }
`;

const CategoryImageLinksContainer = styled.div`
  margin-top: 752px;
  margin-bottom: 168px;
  @media (max-width: 1040px) {
    margin-top: 705px;
    margin-bottom: 96px;
  }
  @media (max-width: 750px) {
    margin-top: 679px;
    margin-bottom: 120px;
  }
  @media (max-width: 375px) {
    margin-top: 550px;
  }
`;
