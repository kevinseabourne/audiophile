import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import ImageLoader from "./reusable/imageLoader";
import CartIcon from "../public/icons/Combined Shape.svg";
import CartItem from "./cartItem";
import { isArrayEmpty } from "../lib/utils/isEmpty";
import Button from "./reusable/button";

interface Props {
  cartItems: {
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
  }[];
  handleCartItemQuantityChange: (
    operation: "decrease" | "increase",
    id: string
  ) => void;
  emptyCart: () => void;
  cartSubTotalPrice: string;
  addToCartDisplayCart: boolean;
  resetAddToCartDisplayCart: () => void;
}

const Cart: React.FC<Props> = ({
  cartItems,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
  emptyCart,
  addToCartDisplayCart,
  resetAddToCartDisplayCart,
}) => {
  const { push } = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cartRef.current && cartRef.current.focus();
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    cartOpen && cartRef.current.focus();
  }, [cartOpen]);

  useEffect(() => {
    if (addToCartDisplayCart) {
      // when an item is added to cart, display the cart
      setCartOpen(true);
      resetAddToCartDisplayCart();
    }
  }, [addToCartDisplayCart]);

  const handleClickOutside = (e: any) => {
    // close the cart when you click outside the cart
    if (
      cartRef.current &&
      !cartRef.current.contains(e.target) &&
      !cartButtonRef.current.contains(e.target)
    ) {
      setCartOpen(false);
    }
  };

  const overlayAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        delay: 0.1,
        bounce: 0,
      },
    },
    show: {
      opacity: 0.4,
      transition: {
        bounce: 0,
      },
    },
  };

  const cartDropdownAnimation = {
    hidden: {
      height: "0px",
      opacity: 0,
      y: 0,
      transition: {
        bounce: 0,
      },
    },
    show: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,

        bounce: 0,
      },
    },
  };

  const orangeHoverAnimation = {
    hover: {
      opacity: 1,
      color: "#D87D4A",
    },
  };
  return (
    <Container>
      <GlobalStyle cartOpen={cartOpen} />
      <ImageContainer
        ref={cartButtonRef}
        onClick={() => setCartOpen(!cartOpen)}
        aria-label="cart"
      >
        <ImageLoader
          src={CartIcon}
          alt="cart"
          maxWidth="28px"
          zIndex={120}
          hover={true}
        />
      </ImageContainer>
      <AnimateSharedLayout>
        <AnimatePresence>
          {cartOpen && (
            <CartDropdownContainer>
              <CartDropdown
                ref={cartRef}
                tabIndex={0}
                variants={cartDropdownAnimation}
                initial="hidden"
                animate={cartOpen ? "show" : "hidden"}
                exit="hidden"
                layout
              >
                {isArrayEmpty(cartItems) && (
                  <InnerContainer layout>
                    <TopInfo layout>
                      <CartTotal>{`CART ${cartItems.length}`}</CartTotal>
                      <RemoveAllItems
                        variants={orangeHoverAnimation}
                        whileHover="hover"
                        onClick={emptyCart}
                      >
                        Remove All
                      </RemoveAllItems>
                    </TopInfo>

                    <CartItemsContainer>
                      {cartItems.map((cartItem) => (
                        <CartItem
                          key={cartItem.id}
                          cartItem={cartItem}
                          handleCartItemQuantityChange={
                            handleCartItemQuantityChange
                          }
                          cartSubTotalPrice={cartSubTotalPrice}
                        />
                      ))}
                    </CartItemsContainer>

                    <CartSubTotalContainer>
                      <TotalTitle>Total</TotalTitle>
                      <CartSubTotalPrice>{cartSubTotalPrice}</CartSubTotalPrice>
                    </CartSubTotalContainer>
                    <Button
                      title="checkout"
                      backgroundColor="orange"
                      hoverBackgroundColor="#FBAF85"
                      color="#ffffff"
                      width="313px"
                      height="48px"
                      mediaQuery="840px"
                      onClick={() => {
                        setCartOpen(false);
                        push("/checkout");
                      }}
                      responsiveFullWidth={true}
                    />
                  </InnerContainer>
                )}
                <InnerContainer layout>
                  {!isArrayEmpty(cartItems) && (
                    <CartEmpty layout>Cart is Empty</CartEmpty>
                  )}
                </InnerContainer>
              </CartDropdown>
            </CartDropdownContainer>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {cartOpen && (
            <Overlay
              variants={overlayAnimation}
              initial="hidden"
              animate={cartOpen ? "show" : "hidden"}
              exit="hidden"
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Container>
  );
};

export default Cart;

interface GlobalStyleProps {
  cartOpen: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
 body {
   overflow: ${({ cartOpen }) => (cartOpen ? "hidden" : "scroll")};
  }
`;

const Container = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
  padding-right: 39px;
  @media (max-width: 678px) {
    padding-right: 24px;
  }
`;

const Overlay = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: ${({ theme }) => theme.colors.darkerBlack};
`;

const CartDropdownContainer = styled.div`
  position: absolute;
  height: 100vh;
  overflow: scroll;
  right: 0px;
  top: 93px;
  bottom: 0px;
  z-index: 2;
  padding-top: 24px;
  padding-bottom: 114px;
  width: 377px;
  box-sizing: border-box;
  @media (max-width: 840px) {
    position: fixed;
    width: auto;
    left: 0px;
  }
`;

const CartDropdown = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 377px;
  top: 93px;
  margin: auto;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  @media (max-width: 840px) {
    width: calc(100vw - 48px);
  }
`;

const InnerContainer = styled(motion.div)`
  padding: 33px 31px;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled(motion.button)`
  position: relative;
  top: 0px;
  right: 0px;
  width: 28px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const TopInfo = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 31px;
`;

const CartTotal = styled(motion.h6)`
  color: ${({ theme }) => theme.colors.darkerBlack};
  line-height: 25px;
  letter-spacing: 1.28571px;
`;

const RemoveAllItems = styled(motion.button)`
  opacity: 0.5;
  font-weight: 200;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.darkerBlack};
`;

const CartItemsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, 313px);
  grid-column-end: auto;
  grid-gap: 24px 0px;
  max-width: 313px;
  margin-bottom: 32px;
  @media (max-width: 840px) {
    grid-template-columns: repeat(1, 100%);
    max-width: 100%;
  }
`;

const CartSubTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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

const CartEmpty = styled(motion.h6)`
  color: ${({ theme }) => theme.colors.darkerBlack};
  line-height: 25px;
  letter-spacing: 1.28571px;
  margin: auto;
`;
