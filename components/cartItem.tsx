import styled from "styled-components";
import { useRouter } from "next/router";
import ImageLoader from "./reusable/imageLoader";
import QuantityButton from "./reusable/quantityButton";
import Button from "./reusable/button";

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
  const { push } = useRouter();
  return (
    <Container>
      <ImageLoader
        src={cartItem.images[0].image}
        alt={cartItem.title}
        maxWidth="64px"
        borderRadius="8px"
      />
      <TitlePriceContainer>
        <Title>{cartItem.title}</Title>
        <Price>{`$${cartItem.price}`}</Price>
      </TitlePriceContainer>
      <QuantityButton
        total={cartItem.cartQuantity}
        id={cartItem.id}
        handleCartItemQuantityChange={handleCartItemQuantityChange}
      />
      <CartSubTotalContainer>
        <TotalTitle>Total</TotalTitle>
        <CartSubTotalPrice>{cartSubTotalPrice}</CartSubTotalPrice>
      </CartSubTotalContainer>
      <Button title="checkout" onClick={() => push("/checkout")} />
    </Container>
  );
};

export default CartItem;

const Container = styled.div``;

const TitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.span``;

const Price = styled.span`
  opacity: 0.5
  font-size: 14px;
`;

const CartSubTotalContainer = styled.div``;

const TotalTitle = styled.span`
  opacity: 0.5;
`;

const CartSubTotalPrice = styled.h6`
  line-height: 25px;
  text-align: center;
`;
