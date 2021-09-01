import styled from "styled-components";
import ImageLoader from "./reusable/imageLoader";
import QuantityButton from "./reusable/quantityButton";

interface Props {
  cartItem: {
    id: string;
    date: string;
    images: {
      image: string;
      title: string;
    }[];
    inTheBox: {
      units: string;
      title: string;
    };
    longDescription: string;
    price: string;
    shortDescription: string;
    title: string;
    type: string;
    cartQuantity: number;
  };
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
  cartSubTotalPrice: string;
}

const CartItem: React.FC<Props> = ({
  cartItem,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
}) => {
  return (
    <Container>
      <ImageAndTitleContainer>
        <ImageLoader
          src="https://chpistel.sirv.com/audiophile/product-yx1-earphones/desktop/image-product.jpg?w=1080"
          alt="test"
          maxWidth="64px"
          width="64px"
          borderRadius="8px"
          placeholderColor="#F1F1F1"
        />
        <TitlePriceContainer>
          <Title>XX99 MK ||</Title>
          <Price>{`$2,999`}</Price>
        </TitlePriceContainer>
      </ImageAndTitleContainer>
      <QuantityButton
        total={1}
        id={"323fsf"}
        handleCartItemQuantityChange={handleCartItemQuantityChange}
      />
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 390px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ImageAndTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 390px) {
    margin-bottom: 24px;
  }
`;

const TitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 120px;
  margin-left: 16px;
  margin-right: auto;
  @media (max-width: 840px) {
    max-width: 90px;
  }
`;

const Title = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  white-space: nowrap;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  white-space: nowrap;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;
