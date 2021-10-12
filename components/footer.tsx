import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./reusable/imageLoader";
import FacebookIcon from "../public/icons/facebook.svg";
import TwitterIcon from "../public/icons/twitter.svg";
import InstagramIcon from "../public/icons/instagram.svg";

interface Props {
  links: {
    link: {
      title: string;
      route: string;
    };
    image: string;
  }[];
}

const Footer: React.FC<Props> = ({ links }) => {
  const [socials] = useState([
    {
      title: "facebook",
      route: "",
      image: FacebookIcon,
    },
    {
      title: "twitter",
      route: "",
      image: TwitterIcon,
    },
    {
      title: "instagram",
      route: "",
      image: InstagramIcon,
    },
  ]);

  return (
    <Container>
      <Wrapper>
        <OrangeTopLine />
        <TitleLinksContianer>
          <ImageLoader
            src="https://chpistel.sirv.com/audiophile/shared/desktop/logo.svg"
            alt="audiophile"
            maxWidth="143px"
            placeholderSize="25px"
            priority={true}
            centerImage={true}
            hover={true}
          />
          <LinksContainer>
            {links.map((link) => (
              <Link href={link.link.route} key={link.link.title}>
                <LinkTitle>{link.link.title}</LinkTitle>
              </Link>
            ))}
          </LinksContainer>
        </TitleLinksContianer>
        <Description>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </Description>
        <CopyRightSocialsContainer>
          <CopyRight>
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </CopyRight>

          <SocialsContainer>
            {socials.map((social) => (
              <ImageHoverFilter key={social.title}>
                <ImageLoader
                  marginLeft={social.title === "twitter" ? "16px" : "0px"}
                  marginRight={social.title === "twitter" ? "16px" : "0px"}
                  alt={social.title}
                  src={social.image}
                  width="24px"
                  hover={true}
                />
              </ImageHoverFilter>
            ))}
          </SocialsContainer>
        </CopyRightSocialsContainer>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.darkerBlack};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 48px;
  box-sizing: border-box;
  @media (max-width: 1109.83px) {
    padding-bottom: 46px;
  }
  @media (max-width: 500px) {
    min-height: 654px;
    padding-bottom: 38px;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  max-width: 1110px;
  width: 100%;
  display: flex;
  margin-top: 75px;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  @media (max-width: 1109.83px) {
    margin-top: 60px;
    padding-left: 39px;
    padding-right: 40px;
  }
  @media (max-width: 500px) {
    margin-top: 52px;
    padding: 0px 24px;
  }
`;

const OrangeTopLine = styled.div`
  position: absolute;
  top: -75px;
  left: 0px;
  width: 101px;
  border-top: ${({ theme }) => `4px solid ${theme.colors.orange}`};
  @media (max-width: 1109.83px) {
    top: -60px;
    left: 39px;
  }
  @media (max-width: 500px) {
    top: -52px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TitleLinksContianer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
  }
`;

const Description = styled.p`
  font-weight: 200;
  opacity: 0.5;
  margin-top: 36px;
  margin-bottom: 56px;
  max-width: 540px;
  padding-right: 20px;
  box-sizing: border-box;
  @media (max-width: 840px) {
    max-width: 100%;
  }
  @media (max-width: 500px) {
    margin-top: 48px;
    margin-bottom: 48px;
    padding: 0px;
  }
`;

const CopyRightSocialsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const CopyRight = styled.span`
  opacity: 0.5;
  font-weight: 700;
  @media (max-width: 500px) {
    margin-bottom: 48px;
  }
`;

const LinksContainer = styled.div`
  max-width: 427px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 840px) {
    margin-top: 32px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    height: 148px;
    margin-top: 48px;
  }
`;

const LinkTitle = styled.button`
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.orange};
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const SocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  bottom: 80.8px;
  @media (max-width: 840px) {
    position: relative;
    bottom: 0px;
  }
`;

const ImageHoverFilter = styled.div`
  filter: invert(100%) sepia(0%) saturate(12%) hue-rotate(347deg)
    brightness(105%) contrast(100%);
  transition: all 0.25s;
  &:hover {
    filter: invert(61%) sepia(24%) saturate(1146%) hue-rotate(336deg)
      brightness(89%) contrast(90%);
  }
`;
