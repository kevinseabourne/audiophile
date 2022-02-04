import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/appContext";
import styled from "styled-components";
import CheckoutShippingForm from "./checkoutShippingForm";
import CheckoutPaymentForm from "./checkoutPaymentForm";
import { isArrayEmpty } from ".././lib/utils/isEmpty";

interface Props {}

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

interface ContextProps {
  cartItems: Product[];
  cartSubTotalPrice: string;
  selectedShippingOption: { title: string; eta: string; cost: string };
  shippingOptions: [{ title: string; eta: string; cost: string }];
  updateSelectedShippingOption: (shipOptionTitle: string) => void;
  vatPrice: string;
  cartGrandTotalPrice: string;
  currencyCode: string;
  userLocation: string;
  emptyCart: () => void;
}

const CheckoutForm: React.FC<Props> = () => {
  const { route, push } = useRouter();

  const {
    cartItems,
    cartSubTotalPrice,
    selectedShippingOption,
    shippingOptions,
    updateSelectedShippingOption,
    vatPrice,
    cartGrandTotalPrice,
    emptyCart,
  } = useContext<ContextProps>(AppContext);

  const [renderPaymentCheckout, setRenderPaymentCheckout] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // if renderPaymentCheckout is true render the checkout payment component
    const lsRenderPaymentCheckoutJSON = window.localStorage.getItem(
      "lsRenderPaymentCheckout"
    );
    if (lsRenderPaymentCheckoutJSON) {
      const lsRenderPaymentCheckout = JSON.parse(lsRenderPaymentCheckoutJSON);
      setRenderPaymentCheckout(lsRenderPaymentCheckout);
    }
  }, []);

  const handlePaymentCheckoutRender = () => {
    window.localStorage.setItem(
      "lsRenderPaymentCheckout",
      JSON.stringify(true)
    );
    setRenderPaymentCheckout(true);
  };

  useEffect(() => {
    // first render cartItems is empty ignore it and wait for the cartItems to be updated
    // if then there are no items in the cart route to the homepage
    if (isMounted && !isArrayEmpty(cartItems)) {
      push("/");
    }
  }, [cartItems]);

  return (
    <Container>
      {route === "/checkout" && (
        <CheckoutShippingForm
          cartItems={cartItems}
          cartSubTotalPrice={cartSubTotalPrice}
          selectedShippingOption={selectedShippingOption}
          shippingOptions={shippingOptions}
          updateSelectedShippingOption={updateSelectedShippingOption}
          vatPrice={vatPrice}
          cartGrandTotalPrice={cartGrandTotalPrice}
          handlePaymentCheckoutRender={handlePaymentCheckoutRender}
          emptyCart={emptyCart}
        />
      )}
      {renderPaymentCheckout && route === "/checkout/payment" && (
        <CheckoutPaymentForm
          cartItems={cartItems}
          cartSubTotalPrice={cartSubTotalPrice}
          selectedShippingOption={selectedShippingOption}
          vatPrice={vatPrice}
          cartGrandTotalPrice={cartGrandTotalPrice}
          emptyCart={emptyCart}
        />
      )}
    </Container>
  );
};

export default CheckoutForm;

const Container = styled.div`
  width: 100%;
  margin-bottom: 141px;
`;
