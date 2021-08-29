import { FC, useState } from "react";
import Link from "next/link";
import ImageLoader from "./imageLoader";
import styled from "styled-components";

interface Props {
  titleRoute: string;
  title: string;
  links: {
    title: string;
    route: string;
  }[];
  padding?: string;
  margin?: string;
}

const ReusableLink: FC<Props> = ({
  title,
  titleRoute,
  links,
  padding,
  margin,
}): JSX.Element => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropDown = () => setDropDownOpen(!dropDownOpen);
  const openDropDown = () => setDropDownOpen(true);
  const closeDropDown = () => setDropDownOpen(false);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (e.key === "13" || e.keyCode === 13) {
      setDropDownOpen(false);
    }
  };

  return (
    <Link href={titleRoute} passHref>
      <Container
        tabIndex={0}
        role="button"
        onMouseEnter={openDropDown}
        onMouseLeave={closeDropDown}
        onClick={toggleDropDown}
        onFocus={openDropDown}
        onBlur={closeDropDown}
        padding={padding}
        margin={margin}
      >
        <LinkTitle>{title}</LinkTitle>
        <IconContainer>
          <ImageLoader
            src="/icons/down-arrow.svg"
            width="10px"
            alt="arrow down"
            priority={true}
          />
        </IconContainer>
        <DropDownContainer dropDownOpen={dropDownOpen}>
          {links.map((link, index) => (
            <Link key={index} href={link.route} passHref>
              <DropDownLinkTitle
                onClick={closeDropDown}
                onKeyUp={handleKeyUp}
                role="button"
                tabIndex={0}
              >
                {link.title}
              </DropDownLinkTitle>
            </Link>
          ))}
        </DropDownContainer>
      </Container>
    </Link>
  );
};

export default ReusableLink;

interface DropDownContainerProps {
  dropDownOpen: boolean;
}

const DropDownContainer = styled.div<DropDownContainerProps>`
  position: absolute;
  top: 40px;
  transform: scale(0.98);
  left: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 0px;
  opacity: 0;
  visibility: hidden;
  border-radius: 4px;
  transition: all 0.25s;
  justify-content: center;
  background-color: #1f2937;
  box-shadow: 0px 13px 27px -5px rgba(50, 50, 93, 0.25),
    0px 8px 16px -8px rgba(0, 0, 0, 0.3),
    0px -6px 16px -6px rgba(0, 0, 0, 0.025);
  ${({ dropDownOpen }) =>
    dropDownOpen &&
    `
      opacity: 1;
      visibility: visible;
      top: 48px;
      transform: scale(1);
      `}
  &:before {
    content: "";
    position: absolute;
    right: 18px;
    top: -6px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6.5px solid #1f2937;
    border-radius: 2px;
  }
`;

const LinkTitle = styled.span`
  position: relative;
  font-family: ${({ theme }) => theme.semibold};
  margin-right: 7px;
  color: ${({ theme }) => theme.white};
  font-size: 1.17rem;
  transition: all 0.3s;
  position: relative;
`;

const IconContainer = styled.div`
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ContainerProps {
  padding: string | undefined;
  margin: string | undefined;
}

const Container = styled.a<ContainerProps>`
  display: flex;
  flex-direction: row;
  transition: all 0.1s;
  padding: ${({ padding }) => (padding ? padding : "0px")};
  margin: ${({ margin }) => (margin ? margin : "0px")};
  &:hover {
    cursor: pointer;
    ${IconContainer} {
      opacity: 0.7;
    }
    ${LinkTitle} {
      opacity: 0.7;
    }
  }
`;

const DropDownLinkTitle = styled.span`
  font-size: 1.03rem;
  padding: 10px 25px;
  box-sizing: border-box;
  opacity: 0.8;
  width: 100%;
  text-align: center;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.semibold};
  &:hover {
    opacity: 1;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
