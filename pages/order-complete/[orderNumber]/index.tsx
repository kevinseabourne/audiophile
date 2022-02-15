import React, { useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import CheckoutSummary from "../../../components/checkoutSummary";
import { getOrder } from "../../../pages/api/orders";
import { isArrayEmpty } from "../../../lib/utils/isEmpty";
import ImageLoader from "../../../components/reusable/imageLoader";
import Button from "../../../components/reusable/button";
import { isObjEmpty } from "../../../lib/utils/isEmpty";
import { toast } from "react-toastify";
import AppContext from "../../../context/appContext";

interface order {
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

interface shippingData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
  shippingMethod: string;
  shippingMethodObj: { title: string; eta: string; cost: string };
}

interface paymentData {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  state?: string;
  orderNumber: string;
}

type Order = {
  orderNumber: string;
  orderDate: Date;
  orderSubTotal: string;
  orderGrandTotal: string;
  shippingData: shippingData;
  paymentData: paymentData;
  vatPrice: string;
  order: order[];
};

interface Props {
  order: Order;
}

interface ContextProps {
  emptyCart: () => void;
}

const OrderComplete: React.FC<Props> = ({ order }) => {
  const { emptyCart } = useContext<ContextProps>(AppContext);
  const { push } = useRouter();

  useEffect(() => {
    console.log(order);
    if (!isObjEmpty(order)) {
      // if defined delete cart Items and checkout details
      const lsFormDetailsLS = window.localStorage.getItem(
        "checkoutShippingDetails"
      );
      const cartItemsLS = window.localStorage.getItem("cartItems");
      const lsRenderPaymentCheckoutLS = window.localStorage.getItem(
        "lsRenderPaymentCheckout"
      );

      if (lsRenderPaymentCheckoutLS) {
        // remove permission to view payment checkout page
        window.localStorage.removeItem("lsRenderPaymentCheckout");
      }
      if (lsFormDetailsLS) {
        // remove checkout shipping form details in local storage
        window.localStorage.removeItem("checkoutShippingDetails");
      }

      if (cartItemsLS) {
        // remove the cart stored in local storage and in state.
        emptyCart();
        window.localStorage.removeItem("cartItems");
      }
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
  }, []);

  return (
    <Container>
      <BackgroundColor />
      <InnerContainer>
        <TickOrderContainer>
          <ImageLoader
            src="/icons/tick.svg"
            width="51px"
            alt="tick"
            marginBottom="30px"
          />
          <OrderThanksContainer>
            <OrderTitle>order {order.orderNumber}</OrderTitle>
            <Title>Thank You {order.shippingData.firstName} !</Title>
          </OrderThanksContainer>
        </TickOrderContainer>
        <SubTitle>Your order is confirmed</SubTitle>
        <CustomerInformation>
          <CustomerInfoInnerContainer>
            <RowContainer>
              <BoldSmallTitle>Contact Information</BoldSmallTitle>
              <Text>{order.shippingData.email}</Text>
            </RowContainer>
            <RowContainer>
              <BoldSmallTitle>Payment Method</BoldSmallTitle>
              <Text>
                {order.shippingData.paymentMethod === "eMoney"
                  ? "eMoney"
                  : "Cash on Delivery"}
              </Text>
            </RowContainer>
          </CustomerInfoInnerContainer>
          <CustomerInfoInnerContainer>
            <RowContainer>
              <BoldSmallTitle>Shipping Adress</BoldSmallTitle>
              <Text>
                {order.shippingData.firstName} {order.shippingData.lastName}
              </Text>
              <Text>{order.shippingData.address}</Text>
              <Text>
                {order.shippingData.city} {order.shippingData.state}{" "}
                {order.shippingData.zipCode}
              </Text>
              <Text>{order.shippingData.country}</Text>
              <Text>{order.shippingData.phone}</Text>
            </RowContainer>
            {order.shippingData.paymentMethod === "eMoney" && (
              <RowContainer>
                <BoldSmallTitle>Billing Address</BoldSmallTitle>
                <Text>
                  {order.paymentData.firstName} {order.paymentData.lastName}
                </Text>
                <Text>{order.paymentData.address}</Text>
                <Text>
                  {order.paymentData.city} {order.paymentData.state}{" "}
                  {order.paymentData.zipCode}
                </Text>
                <Text>{order.paymentData.country}</Text>
              </RowContainer>
            )}
          </CustomerInfoInnerContainer>
          <CustomerInfoInnerContainer>
            <RowContainer>
              <BoldSmallTitle>Shipping Method</BoldSmallTitle>
              <Text>{order.shippingData.shippingMethodObj.title}</Text>
            </RowContainer>
            <RowContainer>
              <BoldSmallTitle>Estimated Delivery Time</BoldSmallTitle>
              <Text>{order.shippingData.shippingMethodObj.eta}</Text>
            </RowContainer>
          </CustomerInfoInnerContainer>
        </CustomerInformation>
        <Button
          title="Continue Shopping"
          onClick={() => push("/")}
          color="#ffffff"
          backgroundColor="orange"
          hoverBackgroundColor="#FBAF85"
          width="210px"
          height="60px"
          mediaQuery="1200px"
          responsiveFullWidth={true}
        />
      </InnerContainer>

      <CheckoutSummary
        orderCompletePage={true}
        vatPrice={order.vatPrice}
        cartItems={order.order}
        selectedShippingOption={order.shippingData.shippingMethodObj}
        cartSubTotalPrice={order.orderSubTotal}
        cartGrandTotalPrice={order.orderGrandTotal}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { orderNumber } = query;
  let data = [];
  if (typeof orderNumber === "string") {
    data = await getOrder(orderNumber);
  }

  // if (!isArrayEmpty(data)) {
  //   return { notFound: true };
  // }

  const order = data[0];

  return {
    props: { order },
  };
};

export default OrderComplete;

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 142px;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  @media (max-width: 1000px) {
    margin-top: 32px;
  }
`;

const BackgroundColor = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: 1500px;
  background-color: ${({ theme }) => theme.colors.silver};
  z-index: -1;
  @media (max-width: 1200px) {
    min-height: 2000px;
  }
  @media (max-width: 455px) {
    min-height: 2500px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 41px 48px;
  width: 100%;
  height: 900px;
  max-width: 730px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  @media (max-width: 1200px) {
    order: 3;
    margin-bottom: 120px;
    height: 100%;
  }
`;

const TickOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderThanksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const OrderTitle = styled.h6`
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  margin-bottom: 5px;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const SubTitle = styled.h6`
  color: ${({ theme }) => theme.colors.darkerBlack};
  opacity: 0.5;
  margin-top: 30px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Title = styled.h3`
  letter-spacing: 1.4286px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.darkerBlack};
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const CustomerInformation = styled.div`
  margin-bottom: auto;
  @media (max-width: 1200px) {
    margin-bottom: 40px;
  }
`;

const CustomerInfoInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 50px;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0px;
  width: 240px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const BoldSmallTitle = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkerBlack};
  white-space: nowrap;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;
