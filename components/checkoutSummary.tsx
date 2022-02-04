import styled from "styled-components";
import CheckoutCartItem from "./checkoutCartItem";
import { formatPrice } from "../lib/utils/formatPrice";
import Button from "./reusable/button";

interface Product {
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
  price: string;
  shortDescription: string;
  title: string;
  type: string;
  cartQuantity: number;
  cartPrice: string;
  watch: {};
}

interface Props {
  cartItems: Product[];
  cartSubTotalPrice: string;
  vatPrice: string;
  cartGrandTotalPrice: string;
  selectedShippingOption: { title: string; eta: string; cost: string };
  formSubmitButtonTitle?: string;
  orderCompletePage?: boolean;
}

const CheckoutSummary: React.FC<Props> = ({
  cartItems,
  cartSubTotalPrice,
  vatPrice,
  cartGrandTotalPrice,
  selectedShippingOption,
  formSubmitButtonTitle,
  orderCompletePage,
}) => {
  return (
    <CartSummary>
      <SummaryTitle>Summary</SummaryTitle>
      <CartItemsContainer>
        {cartItems.map((cartItem: Product) => (
          <CheckoutCartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartItemsContainer>

      <PricingSummary>
        <CartSubTotalContainer>
          <TotalTitle>Total</TotalTitle>
          <CartSubTotalPrice>{cartSubTotalPrice}</CartSubTotalPrice>
        </CartSubTotalContainer>

        <CartSubTotalContainer>
          <TotalTitle>Shipping</TotalTitle>
          <CartSubTotalPrice>
            {formatPrice(selectedShippingOption.cost)}
          </CartSubTotalPrice>
        </CartSubTotalContainer>
        <CartSubTotalContainer>
          <TotalTitle>Vat (Included)</TotalTitle>
          <CartSubTotalPrice>{vatPrice}</CartSubTotalPrice>
        </CartSubTotalContainer>

        <CartSubTotalContainer>
          <TotalTitle>Grand Total</TotalTitle>
          <CartSubTotalPrice>{cartGrandTotalPrice}</CartSubTotalPrice>
        </CartSubTotalContainer>
      </PricingSummary>

      {!orderCompletePage && (
        <Button
          title={formSubmitButtonTitle}
          color="#ffffff"
          backgroundColor="orange"
          hoverBackgroundColor="#FBAF85"
          width="100%"
          height="48px"
        />
      )}
    </CartSummary>
  );
};

export default CheckoutSummary;

const CartSummary = styled.div`
  max-width: 350px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 32px 33px;
  box-sizing: border-box;
  height: 100%;

  @media (max-width: 1200px) {
    margin-top: 0px;
    max-width: 730px;
    margin-bottom: 32px;
    order: 1;
    @media (max-width: 1200px) {
      order: 2;
      padding: 32px 23px;
    }
  }
`;

const SummaryTitle = styled.h6`
  color: ${({ theme }) => theme.colors.darkerBlack};
  line-height: 25px;
  letter-spacing: 1.28571px;
  margin-bottom: 31px;
}
`;

const PricingSummary = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
`;

const CartSubTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  &:last-child {
    margin-top: 24px;
    margin-bottom: 0px;
  }
  @media (max-width: 387px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CartItemsContainer = styled.div`
  display: grid;
  grid-column: auto;
  grid-gap: 24px;
`;

const TotalTitle = styled.span`
  opacity: 0.5;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const CartSubTotalPrice = styled.h6`
  text-align: center;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
