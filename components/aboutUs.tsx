import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";

interface Props {
  pageWidth: number;
}

const AboutUs: React.FC<Props> = ({ pageWidth }) => {
  return (
    <Container>
      <TextContainer>
        <Title>
          Bringing you the <ColoredWord>Best</ColoredWord> Audio Gear
        </Title>
        <Description>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </Description>
      </TextContainer>
      <ImageLoader
        src={
          pageWidth <= 500
            ? "https://chpistel.sirv.com/audiophile/shared/mobile/image-best-gear.jpg"
            : pageWidth <= 1100
            ? "https://chpistel.sirv.com/audiophile/shared/tablet/image-best-gear.jpg"
            : "https://chpistel.sirv.com/audiophile/shared/desktop/image-best-gear.jpg"
        }
        maxWidth={
          pageWidth <= 500 ? "600px" : pageWidth <= 1100 ? "100%" : "544px"
        }
        placeholderSize={
          pageWidth <= 500 ? "100%" : pageWidth <= 1100 ? "320px" : "100%"
        }
        objectFit="cover"
        alt="person"
        borderRadius="8px"
      />
    </Container>
  );
};

export default AboutUs;

const Container = styled.div`
  max-width: 1110px;
  width: 100%;
  height: 588px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 150px;
  margin-top: 200px;
  @media (max-width: 1100px) {
    flex-direction: column;
    height: 100%;
    margin-bottom: 96px;
  }
  @media (max-width: 678px) {
    margin-top: 120px;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  max-width: 445px;
  @media (max-width: 1100px) {
    max-width: 573px;
    order: 2;
    text-align: center;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.darkerBlack};
  letter-spacing: 1.42857px;
  @media (max-width: 1100px) {
    text-align: center;
    margin-top: 63px;
  }
  @media (max-width: 500px) {
    margin-top: 40px;
    font-size: 28px;
    line-height: 38px;
    letter-spacing: 1px;
  }
`;

const ColoredWord = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 1.42857px;
`;

const Description = styled.p`
  margin-top: 32px;
  font-weight: 200;
  margin-bottom: 0px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
`;
