import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";

interface Props {
  images: { image: string; title: string }[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [pageWidth, setpageWidth] = useState(null);

  useEffect(() => {
    setpageWidth(window.innerWidth);
    window.addEventListener("resize", handleResize); // <-- I am only interested in window.innerWidth !
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (images) {
      const filteredImages = images.filter(
        (image) => image.title === "galleryImage"
      );
      setGalleryImages(filteredImages);
    }
  }, [images]);

  const handleResize = () => {
    setpageWidth(window.innerWidth);
  };

  return (
    <Container>
      <PhotosContainer>
        {galleryImages.map((image, index) => (
          // with the ImageContainer I can tell the big image to take up 2 rows.
          <ImageContainer index={index} key={index}>
            <ImageLoader
              src={image.image}
              alt={image.title}
              placeholderSize={
                index !== 1
                  ? "62.923%"
                  : pageWidth <= 768
                  ? "calc(88.19% + 20px)"
                  : "calc(88.19% + 32px)"
              }
              maxWidth={index !== 1 ? "445px" : "635px"}
              borderRadius="8px"
              centerImage={true}
              objectFit="center"
            />
          </ImageContainer>
        ))}
      </PhotosContainer>
    </Container>
  );
};

export default ProductGallery;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ImageContainerProps {
  index: number;
}

const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  max-width: ${({ index }) => (index !== 1 ? "445px" : "635px")};
`;

const PhotosContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.426fr;
  grid-gap: 30px;
  justify-content: center;
  margin-bottom: 150px;

  ${ImageContainer} {
    &:nth-child(1) {
      max-height: 280px;
    }
    &:nth-child(2) {
      grid-column: 2;
      grid-row: 1 / span 2;
    }
    &:nth-child(3) {
      max-height: 280px;
    }
  }

  @media (max-width: 868px) {
    grid-template-columns: 1fr 1.43fr;
    grid-gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
    ${ImageContainer} {
      &:nth-child(2) {
        grid-column: 1;
        grid-row: 3 / span 4;
      }
    }
  }
`;
