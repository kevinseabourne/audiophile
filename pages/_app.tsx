import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { GlobalStyle } from "../globalStyle";
import Header from ".././components/header";
import AppContext from "../context/appContext";
import Footer from "../components/footer";
import { isArrayEmpty, isObjEmpty } from "../lib/utils/isEmpty";
import Dinero from "dinero.js";
import { useRouter } from "next/router";
// var accounting = require("accounting");
import accounting from "accounting";
import Big from "big.js";

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

function App({ Component, pageProps }: AppProps) {
  const { route } = useRouter();

  const [cartItems, setCartItems] = useState<Product[] | []>([]);
  const [cartSubTotalPrice, setCartSubTotalPrice] = useState("");
  const [shippingPrice] = useState("50");
  const [vat, setVat] = useState("");
  const [cartGrandTotalPrice, setCartGrandTotalPrice] = useState("");
  const [addToCartDisplayCart, setaAddToCartDisplayCart] = useState(false);

  useEffect(() => {}, []);

  const resetAddToCartDisplayCart = () => {
    setaAddToCartDisplayCart(!addToCartDisplayCart);
  };

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

  useEffect(() => {
    if (!isArrayEmpty(cartItems)) {
      const lsCartItemsString = window.localStorage.getItem("cartItems");

      if (lsCartItemsString) {
        const lsCartItems = JSON.parse(lsCartItemsString);
        setCartItems(lsCartItems);
      }
    }
  }, []);

  useEffect(() => {
    isArrayEmpty(cartItems) && handleCartSubTotal();
  }, [cartItems]);

  // ------------------------ Fix ------------------------ //
  // declare prop type of cartItems array

  const handleCartItemQuantityChange = (
    operation: "increase" | "decrease",
    id: string
  ): void => {
    if (isArrayEmpty(cartItems)) {
      const cartItemsClone = [...cartItems];

      const item = cartItemsClone.find((item) => item.id === id);

      if (item) {
        if (item.cartQuantity === 1 && operation === "decrease") {
          const index = cartItemsClone.indexOf(item);
          cartItemsClone.splice(index);
          setCartItems(cartItemsClone);
          window.localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItemsClone)
          );
        } else if (item.cartQuantity < 1000) {
          const itemClone = { ...item };
          itemClone.cartQuantity =
            operation === "increase"
              ? itemClone.cartQuantity + 1
              : itemClone.cartQuantity - 1;

          const itemPrice = new Big(itemClone.price).toNumber();
          const cartPriceNumber = itemPrice
            .times(itemClone.cartQuantity)
            .toNumber();
          const cartPrice = accounting.formatMoney(cartPriceNumber);

          itemClone.cartPrice = cartPrice;

          const index = cartItemsClone.indexOf(item);
          cartItemsClone[index] = itemClone;
          setCartItems(cartItemsClone);
          window.localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItemsClone)
          );
        }
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    const { id } = product;
    const productInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (productInCart) {
      // have the cart item's cartQuantity be set to whatever the quantity is from the product page
      const productInCartClone = { ...productInCart };
      productInCartClone.cartQuantity = product.cartQuantity;

      const itemPrice = new Big(productInCartClone.price).toNumber();
      const cartPriceNumber = itemPrice.times(product.cartQuantity).toNumber();
      const cartPrice = accounting.formatMoney(cartPriceNumber);

      productInCartClone.cartPrice = cartPrice;
      const cartItemsClone = [...cartItems];
      const index = cartItemsClone.indexOf(productInCart);
      cartItemsClone.splice(index);
      setCartItems([...cartItemsClone, productInCartClone]);
      const updatedCart: any = [...cartItemsClone, productInCartClone];
      window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const cartItemsClone: any = [...cartItems];

      const itemPrice = new Big(product.price).toNumber();
      const cartPriceNumber = itemPrice.times(product.cartQuantity).toNumber();
      const cartPrice = accounting.formatMoney(cartPriceNumber);

      product.cartPrice = cartPrice;

      setCartItems([...cartItemsClone, product]);
      const updatedCart: any = [...cartItemsClone, product];
      window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const emptyCart = () => {
    setCartItems([]);
    window.localStorage.removeItem("cartItems");
    // wait 1 second then close the cart
  };

  const handleCartSubTotal = () => {
    let subTotalString = "";
    cartItems.map((cartItem: Product) => {
      if (subTotalString) {
        const subTotal = new Big(subTotalString);
        const cartItemPrice = Big(cartItem.cartPrice);
        const subTotalNumber = subTotal.plus(cartItemPrice);
        subTotalString = accounting.formatMoney(subTotalNumber);
      } else {
        const cartItemPrice = Big(cartItem.cartPrice);
        const subTotalNumber = cartItemPrice.toNumber();
        subTotalString = accounting.formatMoney(subTotalNumber);
      }
    });

    setCartSubTotalPrice(subTotalString);

    route === "/checkout" && handleCartGrandTotal(subTotalString);
  };

  const handleCartGrandTotal = (subTotal: string) => {
    const subTotalNumber = accounting.unformat(subTotal);

    const x = new Big(subTotalNumber);
    const y = Big(shippingPrice).toNumber();
    const tax = x.times(0.1);

    const taxMoney = accounting.formatMoney(tax.toNumber());
    setVat(taxMoney);

    const grandTotal = x.plus(y).plus(tax).toNumber();
    const grandTotalMoney = accounting.formatMoney(grandTotal);

    setCartGrandTotalPrice(grandTotalMoney);
  };

  return (
    <AppContext.Provider
      value={{
        links,
        cartItems,
        handleCartItemQuantityChange,
        handleAddToCart,
        addToCartDisplayCart,
        resetAddToCartDisplayCart,
        cartSubTotalPrice,
        shippingPrice,
        vat,
        handleCartGrandTotal,
        cartGrandTotalPrice,
      }}
    >
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header
            links={links}
            cartItems={cartItems}
            emptyCart={emptyCart}
            handleCartItemQuantityChange={handleCartItemQuantityChange}
            cartSubTotalPrice={cartSubTotalPrice}
            addToCartDisplayCart={addToCartDisplayCart}
            resetAddToCartDisplayCart={resetAddToCartDisplayCart}
          />

          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
          <Footer links={links} />
        </ThemeProvider>
      </>
    </AppContext.Provider>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 93px;
  max-width: 1190px;
  padding: 0px 39px;
  box-sizing: border-box;
  @media (max-width: 678px) {
    padding: 0px 24px;
  }
  @media (max-width: 500px) {
    max-width: 1160px;
  }
`;
