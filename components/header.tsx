import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./reusable/imageLoader";
import Logo from "../public/icons/audiophile.svg";

interface Props {}

const Header: React.FC<Props> = () => {
  const [links] = useState([
    { title: "Home", route: "/" },
    {
      title: "Headphones",
      route: "/headphones",
    },
    {
      title: "Speakers",
      route: "/speakers",
    },
    {
      title: "Earphones",
      route: "/earphones",
    },
  ]);
  return (
    <Container>
      <ImageLoader
        src={Logo}
        alt="audiophile"
        maxWidth="143px"
        placeholderSize="52%"
        priority={true}
        centerImage={true}
      />
      <LinksContainer>
        {links.map((link) => (
          <Link href={link.route}>
            <LinkTitle key={link.title}>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 93px;
  position: fixed;
  top: 0px;
  left: 0px;
`;

const LinkTitle = styled.span``;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
