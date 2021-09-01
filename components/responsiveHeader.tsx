import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CategoryImageLinks from "./categoryImageLinks";

interface Props {
  links: {
    link: {
      title: string;
      route: string;
    };
    image: string;
  }[];
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

const ResponsiveHeader: React.FC<Props> = ({
  links,
  cartItems,
  handleCartItemQuantityChange,
  cartSubTotalPrice,
}) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const burgerRef = useRef(null);
  const [renderMenu, setRenderMenu] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    window.innerWidth <= 840 && setRenderMenu(true);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (burgerOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [burgerOpen]);

  const handleClickOutside = (e: any) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(e.target) &&
      !burgerRef.current.contains(e.target)
    ) {
      closeBurgerMenu();
    }
  };

  const handleWindowResize = () => {
    if (window.innerWidth <= 840) {
      setRenderMenu(true);
    } else {
      setRenderMenu(false);
    }
  };

  const onClick = () => {
    contentRef.current.scrollTop = 0;
    toggleBurgerMenu();
  };

  const toggleBurgerMenu = () => {
    setBurgerOpen(!burgerOpen);
  };

  const closeBurgerMenu = () => {
    setBurgerOpen(false);
  };

  const responsiveHeaderAnimation = {
    hidden: {
      height: "0px",
      opacity: 1,
      y: 0,
      transition: {
        bounce: 0,
      },
    },
    show: {
      height: "84vh",
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        bounce: 0,
      },
    },
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

  return (
    <Container>
      <Burger
        ref={burgerRef}
        onClick={onClick}
        id="burgerOpen"
        aria-label={burgerOpen ? "close Menu" : "menu"}
      >
        <BurgerInner />
      </Burger>

      <GlobalStyle burgerOpen={burgerOpen} />

      <AnimatePresence>
        <Content
          ref={contentRef}
          variants={responsiveHeaderAnimation}
          initial="hidden"
          animate={burgerOpen ? "show" : "hidden"}
          exit="hidden"
          aria-label="burger menu"
        >
          <PaddingContainer>
            <CategoryImageLinks links={links} />
          </PaddingContainer>
        </Content>
      </AnimatePresence>
      <Overlay
        variants={overlayAnimation}
        initial="hidden"
        animate={burgerOpen ? "show" : "hidden"}
        exit="hidden"
        ref={overlayRef}
        role="dialog"
        aria-label="overlay"
      />
    </Container>
  );
};

export default ResponsiveHeader;

interface GlobalStyleProps {
  burgerOpen: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
 body {
   overflow: ${({ burgerOpen }) =>
     burgerOpen ? "hidden !important" : "scroll"};
   overscroll-behavior: none;
  }
`;

const Container = styled(motion.div)`
  display: none;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  z-index: 100;
  @media (max-width: 840px) {
    display: flex;
  }
  @media (max-width: 350px) {
    width: 250px;
  }
`;

const Burger = styled.button`
  display: none;
  position: relative;
  width: 16px;
  height: 15px;
  padding: 24px;
  margin-right: auto;
  z-index: 200;
  background-color: transparent;
  box-sizing: inherit;
  border: none;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 840px) {
    display: flex;
  }
  @media (max-width: 330px) {
    padding-left: 21.4px;
    padding-right: 21.4px;
  }
`;

const BurgerInner = styled.div`
  position: absolute;
  width: 16px;
  height: 3px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  background-color: ${({ theme }) => theme.colors.white};;
  };
  &::before {
    display: block;
    content: "";
    top: 6px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform, opacity;
    position: absolute;
    width: 16px;
    height: 3px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    background-color: ${({ theme }) => theme.colors.white};
  };
  &::after {
    top: 12px;
    display: block;
    content: "";
    position: absolute;
    width: 16px;
    height: 3px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;

    background-color: ${({ theme }) => theme.colors.white};
    bottom: -10px;
  };
`;

const Overlay = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  opacity: 1;
  background-color: black;
`;

const Content = styled(motion.nav)`
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-top: 93px;
  margin-left: auto;
  margin-right: auto;
  max-height: 750px;
  display: flex;
  z-index: 12;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  overflow: scroll;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PaddingContainer = styled(motion.div)`
  width: 100%;
  box-sizing: border-box;
  padding: 32px 24px 35px 24px;
`;
