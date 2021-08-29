import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  onClick: () => void;
}

const CategoryImageLinks: React.FC<Props> = ({ title, onClick }) => {
  return <Button onClick={onClick}>{title}</Button>;
};

export default CategoryImageLinks;

const Button = styled.button`
  text-transform: uppercase;
`;
