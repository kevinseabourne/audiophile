import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/appContext";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./reusable/input";
import { RadioButton } from "./reusable/radioButton";
import Button from "./reusable/button";
import ImageLoader from "./reusable/imageLoader";
import CheckoutCartItem from "./checkoutCartItem";
import { formatPrice } from "../lib/utils/formatPrice";

interface Props {}

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: string;
};

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
}

const CheckoutForm: React.FC<Props> = () => {
  const {
    cartItems,
    cartSubTotalPrice,
    shippingPrice,
    vat,
    cartGrandTotalPrice,
  } = useContext(AppContext);

  const defaultValues = {
    paymentMethod: "eMoney",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  // useEffect(() => {
  // if localstorage cartItems is undefined then redirect
  // }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const schema = {
    name: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    email: {
      required: "An Email is required !",
      pattern: {
        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        message: "A valid email is required !",
      },
    },
    phone: {
      required: "A phone number is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than one character !",
      },
    },
    address: {
      required: "An address is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than one character !",
      },
    },
    zipCode: {
      required: "A zip code is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than one character !",
      },
    },
    city: {
      required: "A city is required !",
      minLength: {
        value: 1,
        message: "should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    country: {
      required: "A country is required !",
      minLength: {
        value: 1,
        message: "should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerContainer>
          <Title>Checkout</Title>
          <SmallTitle>Billing Details</SmallTitle>
          <InputRowContainer>
            <Input
              {...register("name", schema.name)}
              label="Name"
              error={errors?.name}
              maxWidth="309px"
              marginRight="16px"
            />
            <Input
              {...register("email", schema.email)}
              label="Email Address"
              error={errors?.email}
              maxWidth="309px"
            />
          </InputRowContainer>
          <Input
            {...register("phone", schema.phone)}
            label="Phone Number"
            error={errors?.phone}
            maxWidth="309px"
            marginTop="24px"
            marginBottom="53px"
          />

          <SmallTitle>Shipping Info</SmallTitle>
          <Input
            {...register("address", schema.address)}
            label="Address"
            error={errors?.address}
            marginBottom="24px"
          />

          <InputRowContainer>
            <Input
              {...register("zipCode", schema.zipCode)}
              label="Zip Code"
              error={errors?.zipCode}
              maxWidth="309px"
              marginRight="16px"
            />
            <Input
              {...register("city", schema.city)}
              label="City"
              error={errors?.city}
              maxWidth="309px"
            />
          </InputRowContainer>
          <Input
            {...register("country", schema.country)}
            label="Country"
            error={errors?.country}
            maxWidth="309px"
            marginTop="24px"
            marginBottom="61px"
          />
          <SmallTitle>Payment Details</SmallTitle>
          <PaymentContainer>
            <PaymentLabel>Payment Method</PaymentLabel>
            <RadioButtonsContainer>
              <RadioButton
                {...register("paymentMethod")}
                label="e-Money"
                maxWidth="309px"
                height="56px"
                marginBottom="16px"
                defaultChecked={true}
                value="eMoney"
              />
              <RadioButton
                {...register("paymentMethod")}
                label="Cash on Delivery"
                maxWidth="309px"
                height="56px"
                value="cashDelivery"
              />
            </RadioButtonsContainer>
          </PaymentContainer>
          <PaymentInfoContainer>
            <ImageLoader
              src="https://chpistel.sirv.com/audiophile/cart/Shape.svg"
              alt="cash delivery"
              maxWidth="48px"
              marginRight="32px"
            />
            <PaymentInfo>
              The 'Cash on Delivery' option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </PaymentInfo>
          </PaymentInfoContainer>
        </InnerContainer>

        <CartSummary>
          <SummaryTitle>Summary</SummaryTitle>
          {cartItems.map((cartItem: Product) => (
            <CheckoutCartItem key={cartItem.id} cartItem={cartItem} />
          ))}

          <PricingSummary>
            <CartSubTotalContainer>
              <TotalTitle>Total</TotalTitle>
              <CartSubTotalPrice>{cartSubTotalPrice}</CartSubTotalPrice>
            </CartSubTotalContainer>

            <CartSubTotalContainer>
              <TotalTitle>Shipping</TotalTitle>
              <CartSubTotalPrice>
                {formatPrice(shippingPrice)}
              </CartSubTotalPrice>
            </CartSubTotalContainer>
            <CartSubTotalContainer>
              <TotalTitle>Vat (Included)</TotalTitle>
              <CartSubTotalPrice>{vat}</CartSubTotalPrice>
            </CartSubTotalContainer>

            <CartSubTotalContainer>
              <TotalTitle>Grand Total</TotalTitle>
              <CartSubTotalPrice>{cartGrandTotalPrice}</CartSubTotalPrice>
            </CartSubTotalContainer>
          </PricingSummary>

          <Button
            onClick={() => null}
            title="Continue"
            color="#ffffff"
            backgroundColor="orange"
            hoverBackgroundColor="#FBAF85"
            width="100%"
            height="48px"
          />
        </CartSummary>
      </Form>
    </Container>
  );
};

export default CheckoutForm;

const Container = styled.div`
  width: 100%;
  margin-bottom: 141px;
`;

const InnerContainer = styled.div`
  padding: 0px 48px;
  width: 100%;
  max-width: 730px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 54px;
  margin-bottom: 41px;
  letter-spacing: 1.4286px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const SmallTitle = styled.h6`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 13px;
  letter-spacing: 0.928571px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const PaymentLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const RadioButtonsContainer = styled.div`
  max-width: 309px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartSummary = styled.div`
  max-width: 350px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 32px 33px;
  box-sizing: border-box;
`;

const SummaryTitle = styled.h6`
  color: ${({ theme }) => theme.colors.darkerBlack};
  line-height: 25px;
  letter-spacing: 1.28571px;
  margin-bottom: 31px;
`;

const PaymentInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const PricingSummary = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
`;

const PaymentInfo = styled.p`
  font-weight: 500;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  margin: 0px;
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
`;

const TotalTitle = styled.span`
  opacity: 0.5;
  font-weight: 200;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const CartSubTotalPrice = styled.h6`
  text-align: center;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;
