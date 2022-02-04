import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "./reusable/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreditCardInput } from "./reusable/creditCardInput";
import CheckoutSummary from "./checkoutSummary";
import { usePrevious } from "../lib/utils/usePreviousHook";
import ShortUniqueId from "short-unique-id";
import { addOrder } from "../pages/api/orders";
import { toast } from "react-toastify";

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
  selectedShippingOption: { title: string; eta: string; cost: string };
  vatPrice: string;
  cartGrandTotalPrice: string;
  emptyCart: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  state?: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const checkoutPaymentForm: React.FC<Props> = ({
  cartItems,
  cartSubTotalPrice,
  selectedShippingOption,
  vatPrice,
  cartGrandTotalPrice,
  emptyCart,
}) => {
  const { push } = useRouter();
  const [cardType, setCardType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const expiryValue = watch("expiry");
  const prevExpiryValue = usePrevious(expiryValue);

  const cardNumberValue = watch("cardNumber");
  const prevNumberValue = usePrevious(cardNumberValue);

  useEffect(() => {
    handleCardFormatting();
  }, [cardNumberValue]);

  useEffect(() => {
    // card expiry formatting
    if (expiryValue && prevExpiryValue) {
      if (expiryValue.length < prevExpiryValue.length) {
      } else {
        expiryValue.length === 2 && setValue("expiry", `${expiryValue} / `);
      }
    }
  }, [expiryValue]);

  // form validation requirements
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
      pattern: {
        value: /^\d+\s[A-z]+\s[A-z]+/g,
        message: "A valid address is required",
      },
    },
    zipCode: {
      required: "A zip code is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than one character !",
      },
      pattern: {
        value: /\d{4}/,
        message: "A valid zip code is required",
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
    state: {
      required: "A state is required !",
      minLength: {
        value: 1,
        message: "should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    cardNumber: {
      required: "A card number is required !",
      pattern: {
        value: /\d/,
        message: "Enter a valid card number!",
      },
    },
    expiry: {
      required: "A expiry date is required !",
      pattern: {
        value: /^\d{2}\s\/\s\d{2}$/g,
        message: "Enter a valid expiry date",
      },
    },
    cvc: {
      required: "A security code is required !",
      pattern: {
        value: /\d/,
        message: "Numbers only !",
      },
    },
  };

  const handleCardFormatting = () => {
    // card number formatting
    if (cardNumberValue && prevNumberValue) {
      if (cardNumberValue.length < prevNumberValue.length) {
      } else {
        const cardNumberUnformatted = cardNumberValue.replace(/ /g, "");

        if (
          cardNumberUnformatted.startsWith("4") &&
          cardNumberUnformatted.length <= 19
        ) {
          // Visa
          cardNumberValue.length === 4 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          cardNumberValue.length === 10 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          cardNumberValue.length === 16 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          setCardType("visa");
        } else if (
          cardNumberUnformatted.startsWith("51") ||
          cardNumberUnformatted.startsWith("52") ||
          cardNumberUnformatted.startsWith("53") ||
          cardNumberUnformatted.startsWith("54") ||
          cardNumberUnformatted.startsWith("55")
        ) {
          // Mastercard
          if (cardNumberUnformatted.length <= 16) {
            cardNumberValue.length === 4 &&
              setValue("cardNumber", `${cardNumberValue}  `);
            cardNumberValue.length === 10 &&
              setValue("cardNumber", `${cardNumberValue}  `);
            cardNumberValue.length === 16 &&
              setValue("cardNumber", `${cardNumberValue}  `);
            setCardType("mastercard");
          }
        } else if (
          cardNumberUnformatted.startsWith("34") ||
          cardNumberUnformatted.startsWith("37")
        ) {
          // American Express
          if (cardNumberUnformatted.length <= 15) {
            cardNumberValue.length === 4 &&
              setValue("cardNumber", `${cardNumberValue}  `);
            cardNumberValue.length === 12 &&
              setValue("cardNumber", `${cardNumberValue}  `);
            setCardType("amax");
          }
        } else {
          cardNumberValue.length === 4 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          cardNumberValue.length === 10 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          cardNumberValue.length === 16 &&
            setValue("cardNumber", `${cardNumberValue}  `);
          setCardType("");
        }
      }
    } else {
      setCardType("");
    }
  };

  type shippingFormData = {
    name: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    state?: string;
    paymentMethod: string;
    shippingMethod: { title: string; eta: string; cost: string };
  };

  type orderDataObj = {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    state?: string;
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    orderNumber: string;
    orderDate: Date;
    order: Product[];
    vatPrice: string;
    orderSubTotal: string;
    orderGrandTotal: string;
    shippingData: shippingFormData;
  };

  const onSubmit: SubmitHandler<FormData> = async (data: orderDataObj) => {
    const uid = new ShortUniqueId({ length: 10 });
    data.orderNumber = uid();
    data.orderDate = new Date();
    data.order = cartItems;
    data.vatPrice = vatPrice;
    data.orderSubTotal = cartSubTotalPrice;
    data.orderGrandTotal = cartGrandTotalPrice;

    // delete credit card details once payment has been made.
    delete data.cardName;
    delete data.cardNumber;
    delete data.expiry;
    delete data.cvc;

    const lsFormDetailsJSON = window.localStorage.getItem(
      "checkoutShippingDetails"
    );

    if (lsFormDetailsJSON) {
      // add the shipping details to the completed order
      const lsFormDetails = JSON.parse(lsFormDetailsJSON);
      data.shippingData = lsFormDetails;
      data.shippingData.shippingMethod = selectedShippingOption;
    }

    // add cart to orders database
    const response = await addOrder(data);

    if (response) {
      // remove the cart stored in local storage and in state.
      emptyCart();
      window.localStorage.removeItem("cartItems");
      // remove checkout shipping form details in local storage
      window.localStorage.removeItem("checkoutShippingDetails");

      push(`/order-complete/${data.orderNumber}`);
    } else {
      toast.error("An unexpected error has occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerContainer>
          <Title>Checkout</Title>
          <SmallTitle>Billing Info</SmallTitle>
          <InputRowContainer>
            <Input
              {...register("firstName", schema.name)}
              label="First Name"
              error={errors?.firstName}
              marginRight="16px"
              mediaQuery="600px"
              responsive={true}
            />
            <Input
              {...register("lastName", schema.name)}
              label="Last Name"
              error={errors?.lastName}
              mediaQuery="600px"
              responsive={true}
            />
          </InputRowContainer>
          <Input
            {...register("address", schema.address)}
            label="Address"
            error={errors?.address}
            marginTop="24px"
            marginBottom="24px"
            mediaQuery="600px"
            responsive={true}
          />

          <InputRowContainer>
            <Input
              {...register("zipCode", schema.zipCode)}
              label="Zip Code"
              error={errors?.zipCode}
              marginRight="16px"
              mediaQuery="600px"
              responsive={true}
            />
            <Input
              {...register("city", schema.city)}
              label="City"
              error={errors?.city}
              mediaQuery="600px"
              responsive={true}
            />
          </InputRowContainer>
          <InputRowContainer>
            <Input
              {...register("country", schema.country)}
              label="Country"
              error={errors?.country}
              marginTop="24px"
              marginBottom="61px"
              marginRight="16px"
              mediaQuery="600px"
              responsive={true}
            />

            <Input
              {...register("state", schema.state)}
              label="State"
              error={errors?.state}
              marginTop="24px"
              marginBottom="61px"
              mediaQuery="600px"
              responsive={true}
            />
          </InputRowContainer>
          <SmallTitle>Billing Details</SmallTitle>
          <InputRowContainer>
            <Input
              {...register("cardName", schema.name)}
              label="Card Name"
              error={errors?.cardName}
              marginRight="16px"
              marginBottom="24px"
              mediaQuery="600px"
              responsive={true}
            />
            <CreditCardInput
              {...register("cardNumber", schema.cardNumber)}
              label="Card Number"
              error={errors?.cardNumber}
              marginBottom="24px"
              cardType={cardType}
            />
          </InputRowContainer>
          <InputRowContainer>
            <Input
              {...register("expiry", schema.expiry)}
              label="Expiry Date (MM / YY)"
              error={errors?.expiry}
              maxLength={7}
              marginRight="16px"
              marginBottom="61px"
              mediaQuery="600px"
              responsive={true}
            />
            <Input
              {...register("cvc", schema.cvc)}
              label="CVC"
              type="password"
              error={errors?.cvc}
              marginBottom="61px"
              mediaQuery="600px"
              responsive={true}
            />
          </InputRowContainer>
        </InnerContainer>
        <CheckoutSummary
          formSubmitButtonTitle="Complete Payment"
          cartItems={cartItems}
          vatPrice={vatPrice}
          cartSubTotalPrice={cartSubTotalPrice}
          selectedShippingOption={selectedShippingOption}
          cartGrandTotalPrice={cartGrandTotalPrice}
        />
      </Form>
    </Container>
  );
};

export default checkoutPaymentForm;

const Container = styled.div``;

const InnerContainer = styled.div`
  padding: 0px 48px;
  width: 100%;
  max-width: 730px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  @media (max-width: 1200px) {
    order: 3;
    padding: 0 23px;
    padding-bottom: 15px;
  }
`;

const Title = styled.h3`
  margin-top: 54px;
  margin-bottom: 41px;
  letter-spacing: 1.4286px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 250px) {
    font-size: 20px;
  }
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
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  @media (max-width: 1000px) {
    margin-top: 0px;
  }
`;

const InputRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
