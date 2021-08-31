import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Link from "next/link";

interface Props {
  links: {
    title: string;
    route: string;
  }[];
}

const ResponsiveHeader: React.FC<Props> = ({ links }) => {
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

  const handleClickOutside = (e) => {
    if (e.target === overlayRef.current) {
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
    toggleBurgerMenu();
    contentRef.current.scrollTop = 0;
  };

  const toggleBurgerMenu = () => {
    setBurgerOpen(!burgerOpen);
  };

  const closeBurgerMenu = () => {
    setBurgerOpen(false);
  };

  return (
    <Container>
      <Burger
        ref={burgerRef}
        onClick={onClick}
        id="burgerOpen"
        aria-label={burgerOpen ? "close Menu" : "menu"}
      >
        <BurgerInner burgerOpen={burgerOpen} />
      </Burger>
      <Overlay
        burgerOpen={burgerOpen}
        ref={overlayRef}
        role="dialog"
        aria-label="overlay"
      >
        <GlobalStyle burgerOpen={burgerOpen} />
        <Content
          ref={contentRef}
          burgerOpen={burgerOpen}
          aria-label="burger menu"
        >
          {links.map((link) => (
            <Link key={links.indexOf(link)} href={link.route} passHref>
              <BurgerLinkTitle onClick={onClick}>{link.title}</BurgerLinkTitle>
            </Link>
          ))}
        </Content>
      </Overlay>
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

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  margin-left: auto;
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
  width: 32px;
  height: 24px;
  padding: 25.5px;
  margin-left: auto;
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

interface BurgerInnerProps {
  burgerOpen: boolean;
}

const BurgerInner = styled.div<BurgerInnerProps>`
  position: absolute;
  width: 32px;
  height: 2.8px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};;
  transform: ${({ burgerOpen }) =>
    burgerOpen
      ? `translate3d(0, 10px, 0) rotate(45deg)`
      : `translate3d(0, 0px, 0) rotate(0deg)`}
  };
  &::before {
    display: block;
    content: "";
    top: 9.2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform, opacity;
    position: absolute;
    width: 32px;
    height: 2.8px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
        opacity: ${({ burgerOpen }) => (burgerOpen ? 0 : 1)}
  };
  &::after {
    top: 18px;
    display: block;
    content: "";
    position: absolute;
    width: 32px;
    height: 2.8px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
    bottom: -10px;
    transform: ${({ burgerOpen }) =>
      burgerOpen
        ? `translate3d(0,-18px, 0) rotate(-90deg)`
        : `translate3d(0, 0px, 0) rotate(0deg)`}

  };
`;

interface OverlayProps {
  burgerOpen: boolean;
}

const Overlay = styled.div<OverlayProps>`
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  visibility: ${({ burgerOpen }) => (burgerOpen ? "visible" : "hidden")};
  background-color: ${({ burgerOpen }) =>
    burgerOpen ? "rgba(0, 0, 0, 0.25)" : "transparent"};
`;

interface ContentProps {
  burgerOpen: boolean;
}

const Content = styled.nav<ContentProps>`
  top: 0;
  right: ${({ burgerOpen }) => (burgerOpen ? "0px" : "-40px")};
  box-sizing: border-box;
  padding-top: 108px;
  height: 100vh;
  display: flex;
  z-index: 12;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: fixed;
  overflow: scroll;
  visibility: ${({ burgerOpen }) => (burgerOpen ? "visible" : "hidden")};
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  width: ${({ burgerOpen }) => (burgerOpen ? "280px" : "0px")};
  @media (max-width: 350px) {
    width: ${({ burgerOpen }) => (burgerOpen ? "250px" : "0px")};
  }
`;

const BurgerLinkTitle = styled.button`
  white-space: nowrap;
  padding: 20px 20px;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  letter-spacing: 2px;
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  border-top: 1px solid ${({ theme }) => theme.colors.fontColor};
  transition: all 0.3s ease;
  width: 100%;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    opacity: 1;
    background-color: rgba(203, 195, 186, 0.3);
  }
  &:first-child {
    border-top: none;
  }
  &:nth-child(5) {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.fontColor}`};
  }
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.fontColor};
    margin-bottom: 70px;
  }
`;
