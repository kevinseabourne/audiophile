import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { GlobalStyle } from "../globalStyle";
import Header from ".././components/header";
import AppContext from "../context/appContext";

export type MyTheme = {
  colors: {
    orange: string;
    black: string;
    silver: string;
    cream: string;
    liteOrange: string;
    white: string;
    darkerBlack: string;
  };
};

const theme: MyTheme = {
  colors: {
    orange: "#D87D4A",
    black: "#101010",
    silver: "#F1F1F1",
    cream: "#FAFAFA",
    liteOrange: "#FBAF85",
    white: "#FFFFFF",
    darkerBlack: "#000000",
  },
};

function App({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotalPrice, setCartSubTotalPrice] = useState("");

  const [links] = useState([
    {
      link: {
        title: "Home",
        route: "/",
      },
      image: "",
    },
    {
      link: {
        title: "Headphones",
        route: "/headphones",
      },

      image:
        "https://chpistel.sirv.com/audiophile/shared/desktop/image-category-thumbnail-headphones.png?w=230&q=100",
    },
    {
      link: {
        title: "Speakers",
        route: "/speakers",
      },
      image:
        "https://chpistel.sirv.com/audiophile/shared/desktop/image-category-thumbnail-speakers.png?w=230&q=100",
    },
    {
      link: {
        title: "Earphones",
        route: "/earphones",
      },
      image:
        "https://chpistel.sirv.com/audiophile/shared/desktop/image-category-thumbnail-earphones.png?w=230&q=100",
    },
  ]);

  const handleCartItemQuantityChange = (
    operation: "increase" | "decrease",
    id: string
  ): void => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        cartItem.cartQuantity =
          operation === "increase"
            ? cartItem.cartQuantity + 1
            : cartItem.cartQuantity - 1;
        return cartItem;
      }
      return cartItem;
    });

    handleCartSubTotal(updatedCart);

    setCartItems(updatedCart);
  };

  const handleCartSubTotal = (updatedCart) => {};

  return (
    <AppContext.Provider
      value={{
        links,
      }}
    >
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header
            links={links}
            cartItems={cartItems}
            handleCartItemQuantityChange={handleCartItemQuantityChange}
            cartSubTotalPrice={cartSubTotalPrice}
          />
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ThemeProvider>
      </>
    </AppContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 93px;
  max-width: 1109.83px;
  background-color: red;
`;
