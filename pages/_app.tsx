import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { GlobalStyle } from "../globalStyle";
import Header from ".././components/header";
import AppContext from "../context/appContext";
import Footer from "../components/footer";
import { isArrayEmpty } from "../lib/utils/isEmpty";
import { useRouter } from "next/router";
import accounting from "accounting";
import Big from "big.js";
import logger from "./api/logger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getIpLocation } from "./api/iplocation";
// import { getCurrencyCode } from "./api/currencyCode";
// import { getCurrencyRate } from "./api/currencyRate";
// import { getTaxRate } from "./api/taxRate";

logger.init();

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
  const { route, push } = useRouter();

  const [cartItems, setCartItems] = useState<Product[] | []>([]);
  const [cartSubTotalPrice, setCartSubTotalPrice] = useState("");
  const [selectedShippingOption, setSelectedShippingOption] = useState({
    title: "Express Shipping",
    eta: "1 - 2 business days",
    cost: "30",
  });
  const [shippingOptions] = useState([
    { title: "Express Shipping", eta: "1 - 2 business days", cost: "30" },
    { title: "Regular Shipping", eta: "2 - 7 business days", cost: "15" },
  ]);
  const [vatRate] = useState(0.1);
  const [vatPrice, setVatPrice] = useState(null);
  const [currencyCode] = useState("AUD");
  const [cartGrandTotalPrice, setCartGrandTotalPrice] = useState("");
  const [addToCartDisplayCart, setaAddToCartDisplayCart] = useState(false);
  const [checkoutSection, setCheckoutSection] = useState(false);

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
    // Check if cart Items are in localStorage
    if (!isArrayEmpty(cartItems)) {
      const lsCartItemsString = window.localStorage.getItem("cartItems");

      if (lsCartItemsString) {
        const lsCartItems = JSON.parse(lsCartItemsString);

        setCartItems(lsCartItems);
      } else {
        // prevent users from visiting the checkout pages is the cart is empty
        if (route === "/checkout" || route === "/checkout/payment") {
          push("/");
        }
      }
    }

    // ------------------------ Future functionality - Automatic Currency Conversion ------------------------ //

    // * Get the user's ip location
    // * Based on the user's country location. Get the local currency
    // *  Convert all prices, cart and checkout to new currency pricing.

    // const fetchData = async () => {
    //   const { data } = await getIpLocation();
    //
    //   const { code: newCurrencyCode } = data.currency;
    //   const { country_code2 } = data;
    //
    //   // I have stored the currencyCode in localStorage to keep track of what currency the cart is, as the cart is in localStorage too
    //   const lsCurrencyCodejson = window.localStorage.getItem("currencyCode");
    //   const lsCurrencyCode = JSON.parse(lsCurrencyCodejson);
    //   if (!isArrayEmpty(cartItems)) {
    //     if (
    //       newCurrencyCode !== currencyCode ||
    //       newCurrencyCode !== lsCurrencyCode
    //     ) {
    //       const { data: currencyRateData } = await getCurrencyRate(
    //         currencyCode,
    //         newCurrencyCode
    //       );
    //       const { quotes } = currencyRateData;
    //       const currencyCodePair = `${newCurrencyCode}${currencyCode}`;
    //
    //       const currencyRate = quotes[currencyCodePair];
    //
    //       const currencyRateBig = new Big(currencyRate);
    //
    //       // ------------------------ things to complete ------------------------ //
    //       // if the currency is not AUD then change the price of the items in the cart
    //       // when you are on the product page
    //       // save the currency to localStorage to know what currency the cart is.
    //       // and get the Tax rate for that country for checkout
    //
    //       const price = new Big(50);
    //
    //       const newPrice = currencyRateBig.times(price).toNumber();
    //
    //       // get the tax rate for the currency
    //       const vatRateData = await getTaxRate(country_code2);
    //
    //       // get the new rate from the api
    //       const newVatRate = 0.1;
    // window.localStorage.setItem(
    //   "vatRate",
    //   JSON.stringify(newVatRate)
    // );
    // setVatRate(newVatRate)
    // not need to get the localStorage values as this will run every time

    // cart sub total
    // const newCartSubTotal = new Big(4343);

    // tax cost
    // const tax = newCartSubTotal.plus(shippingCost).times(newVatRate);
    // setVatPrice(tax)

    // cart grand total
    // const newGrandTotal = newCartSubTotal.plus(shippingCost).plus(tax);
    // const grandTotalMoney = accounting.formatMoney(newGrandTotal, {
    //   symbol: newCurrencyCode,
    // });

    // setCartGrandTotalPrice(grandTotalMoney);

    // after updating the price of the items in the cart or on the product page, update the currencyCode to the new currencyCode
    // window.localStorage.setItem(
    //   "currencyCode",
    //   JSON.stringify(newCurrencyCode)
    // );
    // setCurrencyCode(newCurrencyCode)
    //     }
    //   }
    // };

    // fetchData();
  }, []);

  useEffect(() => {
    // when the shipping option is changed in the checkout, update the grand total
    if (route === "/checkout" && isArrayEmpty(cartItems)) {
      handleCartGrandTotal();
    }
  }, [selectedShippingOption]);

  useEffect(() => {
    // whenever there is a change to the cart update the sub total
    isArrayEmpty(cartItems) && handleCartSubTotal();
  }, [cartItems]);

  useEffect(() => {
    // used to remove the wrapper max width for the checkout and order complete page
    if (
      route === "/checkout" ||
      route === "/checkout/payment" ||
      route === "/order-complete"
    ) {
      setCheckoutSection(true);
    } else {
      setCheckoutSection(false);
    }
  }, [route]);

  useEffect(() => {
    // calculate tax and grand total on checkout pages
    if (route === "/checkout" || route === "/checkout/payment") {
      isArrayEmpty(cartItems) && handleCartGrandTotal();
    }
  }, [route]);

  useEffect(() => {
    // calculate tax and grand total when on the checkout page increasing or decreasing
    // the quantity of items in the cart
    if (
      route === "/checkout" ||
      route === "/checkout/payment" ||
      (route === "/order-complete" && isArrayEmpty(cartItems))
    ) {
      handleCartGrandTotal();
    }
  }, [cartSubTotalPrice]);

  const resetAddToCartDisplayCart = () => {
    setaAddToCartDisplayCart(!addToCartDisplayCart);
  };

  // ------------------------ Cart Functions ------------------------ //

  const handleCartItemQuantityChange = (
    operation: "increase" | "decrease",
    id: string
  ): void => {
    if (isArrayEmpty(cartItems)) {
      const cartItemsClone = [...cartItems];

      const item = cartItemsClone.find((item) => item.id === id);

      if (item) {
        if (item.cartQuantity === 1 && operation === "decrease") {
          // remove the cart item
          const index = cartItemsClone.indexOf(item);
          cartItemsClone.splice(index);
          setCartItems(cartItemsClone);
          window.localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItemsClone)
          );
        } else if (item.cartQuantity < 1000) {
          // max cart item quantity is 999
          const itemClone = { ...item };
          itemClone.cartQuantity =
            operation === "increase"
              ? itemClone.cartQuantity + 1
              : itemClone.cartQuantity - 1;

          const itemPrice = new Big(itemClone.price);
          const cartPriceNumber = itemPrice
            .times(itemClone.cartQuantity)
            .toNumber();

          itemClone.cartPrice = cartPriceNumber;

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
      // If the product is already in the cart, just update it's quantity
      const productInCartClone = { ...productInCart };
      productInCartClone.cartQuantity = product.cartQuantity;

      const itemPrice = new Big(productInCartClone.price);
      const cartPriceNumber = itemPrice.times(product.cartQuantity).toNumber();

      productInCartClone.cartPrice = cartPriceNumber;
      const cartItemsClone = [...cartItems];
      const index = cartItemsClone.indexOf(productInCart);
      cartItemsClone.splice(index);
      setCartItems([...cartItemsClone, productInCartClone]);
      const updatedCart = [...cartItemsClone, productInCartClone];
      window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      // add product to cart
      const cartItemsClone = [...cartItems];

      const itemPrice = new Big(product.price);
      const cartPriceNumber = itemPrice.times(product.cartQuantity).toNumber();

      product.cartPrice = cartPriceNumber;

      setCartItems([...cartItemsClone, product]);
      const updatedCart = [...cartItemsClone, product];
      window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const emptyCart = () => {
    setCartItems([]);
    window.localStorage.removeItem("cartItems");
  };

  const handleCartSubTotal = () => {
    let subTotalString = "";
    cartItems.map((cartItem: Product) => {
      if (subTotalString) {
        const subTotalNumber = accounting.unformat(subTotalString);

        const subTotal = new Big(subTotalNumber);
        const cartItemPrice = new Big(cartItem.cartPrice);
        const updateSubTotal = subTotal.plus(cartItemPrice);
        subTotalString = accounting.formatMoney(updateSubTotal);
      } else {
        const cartItemPrice = new Big(cartItem.cartPrice).toNumber();
        const subTotalNumber = cartItemPrice;
        subTotalString = accounting.formatMoney(subTotalNumber);
      }
    });

    setCartSubTotalPrice(subTotalString);
  };

  const handleCartGrandTotal = () => {
    const subTotalNumber = accounting.unformat(cartSubTotalPrice);

    const x = new Big(subTotalNumber);
    const y = new Big(selectedShippingOption.cost).toNumber();
    const tax = x.plus(y).times(vatRate);

    const taxMoney = accounting.formatMoney(tax.toNumber());
    setVatPrice(taxMoney);

    const grandTotal = x.plus(y).plus(tax).toNumber();
    const grandTotalMoney = accounting.formatMoney(grandTotal);

    setCartGrandTotalPrice(grandTotalMoney);
  };

  // ------------------------ Checkout Shipping ------------------------ //

  const updateSelectedShippingOption = (shippingOptionTitle: string) => {
    // When a user selectes a different shipping option on the checkout page. The selected shipping option is updated
    // in state. And with useEffect on line 213 it will catch any updates to the shipping option
    // and recalculate the tax & grand total with the new shipping price.
    const newSelectedShippingOption = shippingOptions.find(
      (shipOp) => shipOp.title === shippingOptionTitle
    );

    if (
      newSelectedShippingOption &&
      newSelectedShippingOption.title !== selectedShippingOption.title
    ) {
      setSelectedShippingOption(newSelectedShippingOption);
    }
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
        shippingOptions,
        selectedShippingOption,
        updateSelectedShippingOption,
        vatPrice,
        handleCartGrandTotal,
        cartGrandTotalPrice,
        currencyCode,
        emptyCart,
      }}
    >
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Header
            links={links}
            cartItems={cartItems}
            emptyCart={emptyCart}
            handleCartItemQuantityChange={handleCartItemQuantityChange}
            cartSubTotalPrice={cartSubTotalPrice}
            addToCartDisplayCart={addToCartDisplayCart}
            resetAddToCartDisplayCart={resetAddToCartDisplayCart}
          />

          <Wrapper checkoutSection={checkoutSection} id="main">
            <Component {...pageProps} />
          </Wrapper>
          <Footer links={links} />
        </ThemeProvider>
      </>
    </AppContext.Provider>
  );
}

export default App;

interface WrapperProps {
  checkoutSection: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 93px;
  max-width: ${({ checkoutSection }) => (checkoutSection ? "100%" : "1190px")};
  padding: ${({ checkoutSection }) => (checkoutSection ? "0px" : "0px 39px")};
  box-sizing: border-box;
  @media (max-width: 678px) {
    padding: ${({ checkoutSection }) => (checkoutSection ? "0px" : "0px 24px")};
  }
  @media (max-width: 500px) {
    max-width: ${({ checkoutSection }) =>
      checkoutSection ? "100%" : "1160px"};
  }
`;
