import { useRouter } from "next/router";
import { motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/appContext";
import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import Button from "./reusable/button";
import QuantityButton from "./reusable/quantityButton";
import { romanNumeralConvertor } from "../lib/utils/romanNumeralConvertor";
import { formatPrice } from "../lib/utils/formatPrice";

interface Props {
  product: {
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
  index?: number;
  showPricingAndAddCart?: boolean;
}

const ProductCard: React.FC<Props> = ({
  product,
  index,
  showPricingAndAddCart,
}) => {
  const { handleAddToCart, resetAddToCartDisplayCart } = useContext(AppContext);
  const { query, push } = useRouter();
  const { category } = query;

  const [displayImage, setDisplayImage] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [productTitleWithNumber, setProductTitleWithNumber] = useState("");
  const [price, setPrice] = useState("");
  const [pageWidth, setpageWidth] = useState(null);
  const [productLifeInDays, setProductLifeInDays] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    handleDisplayImage();
    handleProductLink();
    if (!product && showPricingAndAddCart) {
      handleProductUrlQuery();
    }
    handlePriceFormat();

    setpageWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleNewProductTitle();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    // used to render different images for different screen sizes
    setpageWidth(window.innerWidth);
  };

  const handleNewProductTitle = () => {
    // Any product that is less than 1 year old (365 days) displays 'New Product'
    // comparing the currect date with the product date resulting with the difference in days
    const { dateAdded } = product;
    const productDate = new Date(dateAdded);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - productDate.getTime();

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    setProductLifeInDays(daysDifference);
  };

  const handlePriceFormat = () => {
    const { price } = product;

    const formattedPrice = formatPrice(price);

    setPrice(formattedPrice);
  };

  const handleDisplayImage = () => {
    const displayImage = product.images.find(
      (imageObj) => imageObj.title === "displayImage"
    );
    displayImage && setDisplayImage(displayImage.image);
  };

  const handleCartItemQuantityChange = (operation: "decrease" | "increase") => {
    if (operation === "decrease" && productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    } else if (operation === "increase" && productQuantity < 1000) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const handleProductLink = () => {
    // ------------------------ Comment ------------------------ //
    // product titles are using a roman numerals these don't work in url as a slug
    // in order to convert the roman numeral to a number. I convert any charater with the '|' symbol to a number.
    // I then extract the roman numeral from the string and pass it to the romanNumeralConvertor function which return it as a number
    // if a product title has a roman numeral, the number will be shown when you have over the title
    const { title } = { ...product };

    const characterReplaced = title.replace(/[|]/g, "I");

    const regex = /(?<=\s)(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)(?=\s)/g;

    if (characterReplaced.match(regex)) {
      // if the product title has roman numerals.
      // convert the roman numerals to a number then display it as a tool tip above the product title.
      const romanNumeral = characterReplaced.match(regex);

      const result = romanNumeralConvertor(romanNumeral[0]);

      const productTitleWithNum = characterReplaced.replace(
        regex,
        result.toString()
      );

      setProductTitleWithNumber(productTitleWithNum);

      const productQueryWithDash = characterReplaced
        .replace(/\s/g, "-")
        .toLowerCase();

      setProductQuery(productQueryWithDash);
    } else {
      const productQueryWithDash = title.replace(/\s/g, "-").toLowerCase();
      setProductQuery(productQueryWithDash);
    }
  };

  const handleProductUrlQuery = () => {};

  const addQuantityToProduct = () => {
    const productClone: any = { ...product };
    productClone.cartQuantity = productQuantity;
    handleAddToCart(productClone);

    // open the cart when adding a product to the cart from the product page
    resetAddToCartDisplayCart();
  };

  const productTitleAnimation = {
    hidden: {
      opacity: 1,
    },
    hover: {
      opacity: 1,
      cursor: "default",
    },
  };

  const toolTipAnimation = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.5,
    },
    hover: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        bounce: 0,
      },
    },
  };

  return (
    <Product index={index}>
      <ImageContainer index={index}>
        <ImageLoader
          src={displayImage}
          maxWidth="760px"
          alt="headphones"
          objectFit="cover"
          priority={true}
          objectPosition="center"
          placeholderSize={pageWidth <= 880 ? "445px" : "100%"}
          placeholderColor="#F1F1F1"
          onClick={() => push(`/products/${category}/${productQuery}`)}
          hover={true}
          borderRadius="8px"
        />
      </ImageContainer>
      <InfoContainer index={index} productLifeInDays={productLifeInDays}>
        {productLifeInDays <= 365 && (
          <NewProductTitle>New Product</NewProductTitle>
        )}
        <ProductTitleContainer
          variants={productTitleAnimation}
          initial="hidden"
          whileHover="hover"
          productLifeInDays={productLifeInDays}
        >
          <ProductTitle>{product.title}</ProductTitle>
          {productTitleWithNumber && (
            <ToolTip
              variants={toolTipAnimation}
              tabIndex={0}
              whileFocus={{ opacity: 1, y: 0, scale: 1 }}
            >
              {productTitleWithNumber}
            </ToolTip>
          )}
        </ProductTitleContainer>
        <LongDescription showPricingAndAddCart={showPricingAndAddCart}>
          {product.shortDescription}
        </LongDescription>
        {!showPricingAndAddCart && (
          <Button
            title="See Product"
            onClick={() => push(`/products/${category}/${productQuery}`)}
            color="#ffffff"
            backgroundColor="orange"
            hoverBackgroundColor="#FBAF85"
            width="160px"
            height="48px"
            mediaQuery="350px"
            responsiveFullWidth={true}
          />
        )}
        {showPricingAndAddCart && <Price>{`${price}`}</Price>}
        {showPricingAndAddCart && (
          <CartControlsContainer>
            <QuantityButton
              total={productQuantity}
              id={"323fsf"}
              width="120px"
              height="48px"
              marginRight={pageWidth <= 350 ? "0px" : "16px"}
              mediaQuery="350px"
              responsiveFullWidth={true}
              handleCartItemQuantityChange={handleCartItemQuantityChange}
            />
            <Button
              onClick={addQuantityToProduct}
              title="Add to Cart"
              color="#ffffff"
              backgroundColor="orange"
              hoverBackgroundColor="#FBAF85"
              width="160px"
              height="48px"
              mediaQuery="350px"
              responsiveFullWidth={true}
            />
          </CartControlsContainer>
        )}
      </InfoContainer>
    </Product>
  );
};

export default ProductCard;

interface ProductProps {
  index: number;
}

const Product = styled.div<ProductProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

interface ImageContainerProps {
  index: number;
}

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 540px;
  width: 100%;
  order: ${({ index }) => (index % 2 === 0 ? 2 : 1)};

  @media (max-width: 630px) {
    max-width: 100%;
    margin-left: 0px;
  }
`;

interface InfoContainerProps {
  index: number;
  productLifeInDays: number;
}

const InfoContainer = styled.div<InfoContainerProps>`
  margin-left: ${({ index }) => (index % 2 === 0 ? "0px" : "125px")};
  margin-right: ${({ index }) => (index % 2 === 0 ? "125px" : "0px")};
  max-width: 445px;
  order: ${({ index }) => (index % 2 === 0 ? 1 : 2)};

  @media (max-width: 1190px) {
    margin-left: ${({ index }) => (index % 2 === 0 ? "0px" : "69.5px")};
    margin-right: ${({ index }) => (index % 2 === 0 ? "69.5px" : "0px")};
  }
  @media (max-width: 1000px) {
    margin-left: ${({ index }) => (index % 2 === 0 ? "0px" : "45px")};
    margin-right: ${({ index }) => (index % 2 === 0 ? "45px" : "0px")};
    max-width: 300px;
  }
  @media (max-width: 680px) {
    margin-left: ${({ index }) => (index % 2 === 0 ? "0px" : "30px")};
    margin-right: ${({ index }) => (index % 2 === 0 ? "30px" : "0px")};
  }
  @media (max-width: 630px) {
    max-width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    order: ${({ index }) => (index % 2 === 0 ? 2 : 1)};
    margin-top: ${({ productLifeInDays }) =>
      productLifeInDays <= 365 ? "32px" : "40px"};
  }
`;

const NewProductTitle = styled.span`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.orange};
  @media (max-width: 230px) {
    white-space: normal;
  }
`;

const ToolTip = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.silver};
  color: ${({ theme }) => theme.colors.darkerBlack};
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  padding: 1px 8px;
  border-radius: 6px;
  bottom: -32px;
  left: 50px;
  &:focus {
    outline: 1px solid green;
  }
  &::after {
    content: "";
    position: absolute;
    top: -32%;
    left: 80%;
    transform: rotate(180deg);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) =>
      `${theme.colors.silver} transparent transparent transparent`};
  }
  @media (max-width: 320px) {
    font-size: 10px;
    left: 25px;
    padding: 0px 8px;
  }
`;

interface ProductTitleContainerProps {
  productLifeInDays: number;
}

const ProductTitleContainer = styled(motion.div)<ProductTitleContainerProps>`
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-top: ${({ productLifeInDays }) =>
    productLifeInDays <= 365 ? "16px" : "0px"};
  margin-bottom: 32px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 980px) {
    margin-top: ${({ productLifeInDays }) =>
      productLifeInDays <= 365 ? "17px" : "0px"};
  }
  @media (max-width: 630px) {
    margin-top: ${({ productLifeInDays }) =>
      productLifeInDays <= 365 ? "24px" : "0px"};
  }
  @media (max-width: 375px) {
    font-size: 28px;
    margin-bottom: 24px;
    line-height: 38px;
  }
`;

const ProductTitle = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.darkerBlack};
  letter-spacing: 1.42857px;
  position: relative;
  @media (max-width: 450px) {
    font-size: 28px;
    line-height: 38px;
    letter-spacing: 1px;
  }
`;

interface LongDescriptionProps {
  showPricingAndAddCart: boolean;
}

const LongDescription = styled.p<LongDescriptionProps>`
  margin-top: 32px;
  font-weight: 200;
  margin-top: 0px;
  margin-bottom: ${({ showPricingAndAddCart }) =>
    showPricingAndAddCart ? "32px" : "40px"};
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Price = styled.h6`
  line-height: 25px;
  letter-spacing: 1.28571px;
  margin-bottom: 47px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const CartControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 350px) {
    flex-direction: column;
    justify-content: space-between;
    height: 109px;
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
