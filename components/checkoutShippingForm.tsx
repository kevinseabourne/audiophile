import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "./reusable/input";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageLoader from "./reusable/imageLoader";
import CheckoutSummary from "./checkoutSummary";
import { RadioButton } from "./reusable/radioButton";
import { addOrder } from "../pages/api/orders";
import { toast } from "react-toastify";
import ShortUniqueId from "short-unique-id";

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
  shippingOptions: [{ title: string; eta: string; cost: string }];
  updateSelectedShippingOption: (shipOptionTitle: string) => void;
  vatPrice: string;
  cartGrandTotalPrice: string;
  handlePaymentCheckoutRender: () => void;
  emptyCart: () => void;
}

type FormData = {
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
  shippingMethod: string;
  shippingMethodObj: { title: string; eta: string; cost: string }; // added after form is submitted
};

const CheckoutShippingForm: React.FC<Props> = ({
  cartItems,
  cartSubTotalPrice,
  selectedShippingOption,
  shippingOptions,
  updateSelectedShippingOption,
  vatPrice,
  cartGrandTotalPrice,
  handlePaymentCheckoutRender,
}) => {
  const [status, setStatus] = useState("idle");
  const { push } = useRouter();

  const defaultValues = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "eMoney",
    shippingMethod: selectedShippingOption.title,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ defaultValues });

  useEffect(() => {
    setValue("shippingMethod", selectedShippingOption.title);

    const lsFormDetailsJSON = window.localStorage.getItem(
      "checkoutShippingDetails"
    );

    if (lsFormDetailsJSON) {
      // if the shipping form has been completed already then pre fill the inputs with the same details
      const lsFormDetails = JSON.parse(lsFormDetailsJSON);
      const {
        email,
        phone,
        firstName,
        lastName,
        address,
        zipCode,
        city,
        country,
        state,
        paymentMethod,
        shippingMethod,
      } = lsFormDetails;

      setValue("email", email);
      setValue("phone", phone);
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("address", address);
      setValue("zipCode", zipCode);
      setValue("city", city);
      setValue("country", country);
      setValue("state", state);
      setValue("paymentMethod", paymentMethod);
      setValue("shippingMethod", shippingMethod);
      setValue("shippingMethod", shippingMethod);
    }
  }, []);

  const shipMethod = watch("shippingMethod");
  const payMethod = watch("paymentMethod");

  useEffect(() => {
    // update state in the app component to re calculate tax and the grand total
    updateSelectedShippingOption(shipMethod);
  }, [shipMethod]);

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
  };

  type orderDataObj = {
    orderNumber: string;
    orderDate: Date;
    order: Product[];
    vatPrice: string;
    orderSubTotal: string;
    orderGrandTotal: string;
    shippingData: FormData;
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { paymentMethod } = data;

    if (paymentMethod === "eMoney") {
      // proceed to the checkout payment page
      window.localStorage.setItem(
        "checkoutShippingDetails",
        JSON.stringify(data)
      );
      handlePaymentCheckoutRender();

      push("/checkout/payment");
    } else {
      setStatus("pending");

      data.shippingMethodObj = selectedShippingOption;
      const uid = new ShortUniqueId({ length: 10 });

      let orderObj: orderDataObj = {
        orderNumber: uid(),
        orderDate: new Date(),
        order: cartItems,
        vatPrice: vatPrice,
        orderSubTotal: cartSubTotalPrice,
        orderGrandTotal: cartGrandTotalPrice,
        shippingData: data,
      };
      // Cash delivery submit order

      const response = addOrder(orderObj);

      if (response) {
        setStatus("resolved");
        // navigate to the order complete page
        push(`/order-complete/${orderObj.orderNumber}`);
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
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerContainer>
          <Title>Checkout</Title>
          <SmallTitle>Contact Details</SmallTitle>
          <InputRowContainer>
            <Input
              {...register("email", schema.email)}
              label="Email Address"
              error={errors?.email}
              marginRight="16px"
              marginBottom="24px"
              mediaQuery="600px"
              responsive={true}
            />
            <Input
              {...register("phone", schema.phone)}
              label="Phone Number"
              error={errors?.phone}
              marginBottom="24px"
              mediaQuery="600px"
              responsive={true}
            />
          </InputRowContainer>

          <SmallTitle>Shipping Info</SmallTitle>
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

          <SmallTitle>Shipping Options</SmallTitle>
          <PaymentContainer>
            <PaymentLabel>Australia Post</PaymentLabel>
            <RadioButtonsContainer>
              {shippingOptions.map((option) => (
                <RadioButton
                  key={option.title}
                  register={register}
                  name="shippingMethod"
                  label={option.title}
                  maxWidth="309px"
                  height="56px"
                  message={option.eta}
                  price={option.cost}
                  marginBottom="16px"
                  defaultChecked={true}
                  value={option.title}
                  mediaQuery="600px"
                  responsive={true}
                />
              ))}
            </RadioButtonsContainer>
          </PaymentContainer>

          <SmallTitle>Payment Options</SmallTitle>
          <PaymentContainer>
            <PaymentLabel>Payment Method</PaymentLabel>
            <RadioButtonsContainer>
              <RadioButton
                name="paymentMethod"
                register={register}
                label="e-Money"
                maxWidth="309px"
                height="56px"
                marginBottom="16px"
                defaultChecked={true}
                value="eMoney"
                mediaQuery="600px"
                responsive={true}
              />
              <RadioButton
                name="paymentMethod"
                register={register}
                label="Cash on Delivery"
                maxWidth="309px"
                height="56px"
                value="cashDelivery"
                mediaQuery="600px"
                responsive={true}
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

        <CheckoutSummary
          formSubmitButtonTitle={
            payMethod === "cashDelivery" ? "Complete Order" : "Continue"
          }
          cartItems={cartItems}
          vatPrice={vatPrice}
          cartSubTotalPrice={cartSubTotalPrice}
          selectedShippingOption={selectedShippingOption}
          cartGrandTotalPrice={cartGrandTotalPrice}
          status={status}
        />
      </Form>
    </Container>
  );
};

export default CheckoutShippingForm;

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

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PaymentLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const RadioButtonsContainer = styled.div`
  max-width: 309px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const PaymentInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  @media (max-width: 333px) {
    flex-direction: column;
  }
`;

const PaymentInfo = styled.p`
  font-weight: 500;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  margin: 0px;
  @media (max-width: 333px) {
    margin-top: 25px;
  }
`;
