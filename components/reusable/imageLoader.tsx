import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  src: string;
  width?: string;
  maxWidth?: string;
  placeholderSize?: string;
  placeholderColor?: string;
  alt: string;
  onClick?: () => void;
  borderRadius?: string;
  hover?: boolean;
  objectFit?: string;
  objectPosition?: string;
  duration?: string;
  boxShadow?: string;
  loadingSpinner?: boolean;
  priority?: boolean; // true or false to show a loading spinner when the image is still loading
  centerImage?: boolean;
  contentLoaded?: boolean;
  handleOnLoadOutside?: Function;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  y?: number;
  x?: number;
  zIndex?: number;
  blur?: string;
  scale?: number;
  opacity?: number;
  delay?: number;
}

const ImageLoader: FC<Props> = ({
  src,
  width,
  maxWidth,
  placeholderSize,
  placeholderColor,
  alt,
  onClick,
  borderRadius,
  hover,
  objectFit,
  objectPosition,
  duration,
  boxShadow,
  loadingSpinner,
  priority,
  centerImage,
  contentLoaded,
  handleOnLoadOutside,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  y,
  x,
  zIndex,
  blur,
  scale,
  opacity,
  delay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingSpinnerRef = useRef(null);
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLoadComplete = () => {
    if (isMounted.current) {
      setIsLoaded(true);
      if (handleOnLoadOutside) {
        handleOnLoadOutside();
      }
    }
  };

  const animation = {
    hidden: {
      opacity: opacity == undefined ? 1 : opacity,
      y: y ? y : 0,
      x: x ? x : 0,
      scale: scale == undefined ? 1 : scale,
      filter: blur ? `blur(${blur}px)` : `blur(0px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: `blur(0px)`,
      transition: {
        type: "spring",
        duration: duration ? duration : undefined,
        delay: delay ? delay : 0,
      },
    },
  };

  return (
    <Container
      maxWidth={maxWidth}
      width={width}
      boxShadow={boxShadow}
      borderRadius={borderRadius}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      zIndex={zIndex}
    >
      <ImageContainer
        maxWidth={maxWidth}
        width={width}
        centerImage={centerImage}
        borderRadius={borderRadius}
        src={src}
        hover={hover}
        variants={animation}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
      >
        <Placeholder
          layout
          borderRadius={borderRadius}
          onClick={onClick}
          contentLoaded={contentLoaded}
          zIndex={zIndex}
          placeholderSize={placeholderSize}
          placeholderColor={placeholderColor}
        />
        {src && (
          <Image
            src={src}
            alt={alt}
            onLoadingComplete={handleLoadComplete}
            objectFit={
              objectFit === "cover"
                ? "cover"
                : objectFit === "contain"
                ? "contain"
                : "fill"
            }
            objectPosition={objectPosition}
            layout="fill"
            priority={priority ? true : false}
            className="image"
            // variants={animation}
            // initial="hidden"
            // animate={isLoaded ? "show" : "hidden"}
          />
        )}
      </ImageContainer>
      {/* {loadingSpinner && !isLoaded && (
        <LoadingSpinner ref={loadingSpinnerRef} />
      )} */}
    </Container>
  );
};

export default ImageLoader;

interface ContainerProps {
  maxWidth: string;
  width: string;
  boxShadow: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  borderRadius: string;
  zIndex: number;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  box-shadow: ${({ boxShadow }) => (boxShadow ? boxShadow : "none")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "none")};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "none"};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "none")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "none")};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};

  .image {
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : "0px"};
  }
`;

interface ImageContainerProps {
  maxWidth: string;
  width: string;
  centerImage: boolean;
  borderRadius: string;
  src: string;
  hover: boolean;
}

const ImageContainer = styled(motion.div)<ImageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  position: relative;
  background: transparent;
  margin: ${({ centerImage }) => (centerImage ? "auto" : "none")};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  overflow: ${({ src }) => (src ? "default" : "hidden")};
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
  }
`;

interface PlaceholderProps {
  borderRadius: string;
  contentLoaded: boolean;
  zIndex: number;
  placeholderSize: string;
  placeholderColor: string;
}

const Placeholder = styled(motion.div)<PlaceholderProps>`
  width: 100%;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: ${({ placeholderColor }) =>
    placeholderColor ? placeholderColor : "transparent"};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  box-sizing: border-box;
`;

const ImageAnimation = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 143px;
  height: 40px;
`;
