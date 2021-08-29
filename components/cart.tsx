import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ImageLoader from "./reusable/imageLoader";
import CartIcon from "../public/icons/Combined Shape.svg";
import CartItem from "./cartItem";

interface Props {
  cartItems: {
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
  }[];
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
  cartSubTotalPrice: string;
}

const Cart: React.FC<Props> = ({
  cartItems,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
}) => {
  const [cartOpen, setCartOpen] = useState(false);

  const cartDropdownAnimation = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        bounce: 0,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        bounce: 0,
      },
    },
  };
  return (
    <Container>
      <ImageLoader
        src={CartIcon}
        onClick={() => setCartOpen(!cartOpen)}
        alt="cart"
        maxWidth="28px"
      />
      <AnimatePresence>
        {cartOpen && (
          <CartDropdown
            variants={cartDropdownAnimation}
            animate={cartOpen ? "show" : "hidden"}
            initial="hidden"
            exit="hidden"
          >
            <TopInfo>
              <CartTotal>{`CART ${cartItems.length}`}</CartTotal>
              <RemoveAllItems>Remove All</RemoveAllItems>
            </TopInfo>

            {cartItems.map((cartItem) => (
              <CartItem
                cartItem={cartItem}
                handleCartItemQuantityChange={handleCartItemQuantityChange}
                cartSubTotalPrice={cartSubTotalPrice}
              />
            ))}
          </CartDropdown>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  width: 377px;
  height: 100%;
`;

const CartDropdown = styled(motion.div)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TopInfo = styled.div``;

const CartTotal = styled.span``;

const RemoveAllItems = styled.span``;
