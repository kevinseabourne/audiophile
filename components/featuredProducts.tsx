import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import Button from "./reusable/button";

interface Props {
  pageWidth: number;
}

const FeaturedProducts: React.FC<Props> = ({ pageWidth }) => {
  const { push } = useRouter();
  return (
    <Container>
      <ProductOne>
        <ImageLoader
          src="https://chpistel.sirv.com/audiophile/home/desktop/pattern-circles.svg"
          alt="circles"
          maxWidth={
            pageWidth <= 1190 ? (pageWidth <= 678 ? "558px" : "944px") : "944px"
          }
          marginLeft={pageWidth <= 1190 ? "0px" : "-149px"}
          marginTop={
            pageWidth <= 1190
              ? pageWidth <= 678
                ? "-285px"
                : "-345px"
              : "-36px"
          }
          placeholderSize={
            pageWidth <= 1190 ? (pageWidth <= 678 ? "558px" : "944px") : "944px"
          }
          objectFit="cover"
        />
        <ImageContainer>
          <ImageLoader
            src={
              pageWidth <= 678
                ? "https://chpistel.sirv.com/audiophile/home/mobile/image-speaker-zx9.png?w=420&h=500&q=100"
                : pageWidth <= 1190
                ? "https://chpistel.sirv.com/audiophile/home/tablet/image-speaker-zx9.png?w=420&h=500&q=100"
                : "https://chpistel.sirv.com/audiophile/home/desktop/image-speaker-zx9.png?w=420&h=500&q=100"
            }
            alt="speaker"
            maxWidth={
              pageWidth <= 1190
                ? pageWidth <= 678
                  ? "160px"
                  : "182px"
                : "410.23px"
            }
            placeholderSize="122%"
            objectFit="contain"
          />
        </ImageContainer>

        <ProductOneItemInfoContainer>
          <ProductOneTitle>ZX9 Speaker</ProductOneTitle>
          <ProductOneSmallDescription>
            Upgrade to premium speakers that are phenomenally buit to deliver
            truly remarkable sound.
          </ProductOneSmallDescription>
          <Button
            title="See Product"
            onClick={() => push("/products/speakers/zx9-speaker")}
            color="#ffffff"
            backgroundColor="#000000"
            hoverBackgroundColor="#4C4C4C"
            width="160px"
            height="48px"
          />
        </ProductOneItemInfoContainer>
      </ProductOne>
      <ProductTwo>
        <ImageLoader
          src={
            pageWidth <= 678
              ? "https://chpistel.sirv.com/audiophile/home/mobile/image-speaker-zx7.jpg"
              : pageWidth <= 900
              ? "https://chpistel.sirv.com/audiophile/home/tablet/image-speaker-zx7.jpg"
              : "https://chpistel.sirv.com/audiophile/home/desktop/image-speaker-zx7.jpg"
          }
          alt="speaker"
          objectFit="cover"
          objectPosition="right"
          maxWidth="1110px"
          placeholderSize="320px"
          borderRadius="8px"
        />
        <ProductTwoThreeItemInfoContainer>
          <ProductTwoThreeTitle>ZX7 Speaker</ProductTwoThreeTitle>
          <Button
            title="See Product"
            onClick={() => push("/products/speakers/zx7-speaker")}
            color="#000000"
            backgroundColor="transparent"
            hoverBackgroundColor="#000000"
            hoverColor="#ffffff"
            border="1px solid #000000"
            width="160px"
            height="48px"
          />
        </ProductTwoThreeItemInfoContainer>
      </ProductTwo>
      <ProductThree>
        <LeftContainer>
          <ImageLoader
            src={
              pageWidth <= 608
                ? "https://chpistel.sirv.com/audiophile/home/mobile/image-earphones-yx1.jpg"
                : pageWidth <= 1190
                ? "https://chpistel.sirv.com/audiophile/home/tablet/image-earphones-yx1.jpg"
                : "https://chpistel.sirv.com/audiophile/home/desktop/image-earphones-yx1.jpg"
            }
            alt="earphones"
            maxWidth="540px"
            placeholderSize={pageWidth <= 608 ? "200px" : "320px"}
            borderRadius="8px"
            objectFit="cover"
          />
        </LeftContainer>
        <RightContainer>
          <ProductTwoThreeItemInfoContainer>
            <ProductTwoThreeTitle>YX1 Earphones</ProductTwoThreeTitle>
            <Button
              title="See Product"
              onClick={() => push("/products/speakers/yx1-earphones")}
              color="#000000"
              backgroundColor="transparent"
              hoverBackgroundColor="#000000"
              hoverColor="#ffffff"
              border="1px solid #000000"
              width="160px"
              height="48px"
            />
          </ProductTwoThreeItemInfoContainer>
        </RightContainer>
      </ProductThree>
    </Container>
  );
};

export default FeaturedProducts;

const Container = styled.div``;

const ProductOne = styled.div`
  max-width: 1110px;
  width: 100%;
  height: 560px;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  margin-bottom: 48px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 1190px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 720px;
  }
  @media (max-width: 678px) {
    height: 600px;
    margin-bottom: 24px;
  }
  @media (max-width: 297px) {
    height: 650px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  top: 107px;
  left: 140px;
  max-width: 382px;
  width: 100%;
  @media (max-width: 1190px) {
    left: 0px;
    top: 61px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    max-width: 197.21px;
  }
`;

const ProductOneItemInfoContainer = styled.div`
  position: absolute;
  top: 133px;
  right: 95px;
  max-width: 349px;
  width: 100%;

  @media (max-width: 1190px) {
    text-align: center;
    right: 0px;
    left: 0px;
    margin-left: auto;
    margin-right: auto;
    top: 353px;
  }

  @media (max-width: 678px) {
    top: 294px;
  }
`;

const ProductOneTitle = styled.h1`
  margin-bottom: 24px;
  @media (max-width: 1190px) {
    line-height: 58px;
  }
  @media (max-width: 678px) {
    line-height: 40px;
    padding: 0px 20%;
    white-space: normal;
    font-size: 36px;
  }

  @media (max-width: 309px) {
    padding: 0px;
    padding-left: 23px;
    padding-right: 24px;
  }
`;

const ProductOneSmallDescription = styled.p`
  font-weight: 200;
  opacity: 0.75;
  margin-bottom: 40px;
  @media (max-width: 1190px) {
    margin-top: 24px;
  }
  @media (max-width: 678px) {
    padding-left: 23px;
    padding-right: 24px;
    margin-bottom: 24px;
  }
`;

const ProductTwo = styled.div`
  position: relative;
  max-width: 1110px;
  width: 100%;
  height: 320px;
  background-color: ${({ theme }) => theme.colors.silver};
  border-radius: 8px;
  margin-bottom: 48px;
  @media (max-width: 678px) {
    margin-bottom: 24px;
  }
`;

const ProductTwoThreeItemInfoContainer = styled.div`
  position: absolute;
  top: 101px;
  left: 95px;
  @media (max-width: 1190px) {
    left: 41px;
  }
  @media (max-width: 678px) {
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 24px;
    margin-top: auto;
    margin-bottom: auto;
    height: fit-content;
  }
`;

const ProductTwoThreeTitle = styled.h4`
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-bottom: 32px;
  padding-right: 20px;
`;

const ProductThree = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1110px;
  width: 100%;
  height: 320px;
  @media (max-width: 608px) {
    height: 100%;
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  max-width: 540px;
  width: 100%;
  height: 320px;
  background-color: ${({ theme }) => theme.colors.silver};
  border-radius: 8px;
  margin-right: 30px;
  @media (max-width: 1190px) {
    margin-right: 11px;
  }
  @media (max-width: 608px) {
    max-width: 100%;
    margin-bottom: 24px;
    margin-right: 0px;
    height: 100%;
  }
`;

const RightContainer = styled.div`
  max-width: 540px;
  width: 100%;
  height: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  border-radius: 8px;
  position: relative;
  @media (max-width: 608px) {
    height: 200px;
  }
`;
