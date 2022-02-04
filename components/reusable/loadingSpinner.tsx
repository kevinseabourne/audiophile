import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  size?: string;
  stroke?: string;
  zIndex?: string;
}

export const LoadingSpinner = React.forwardRef<SVGSVGElement, Props>(
  (props, ref): JSX.Element => {
    const { size, stroke, zIndex } = props;
    return (
      <Spinner
        ref={ref}
        viewBox="0 0 66 66"
        size={size}
        zIndex={zIndex}
        stroke={stroke}
      >
        <circle
          className="circle"
          strokeWidth="3"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </Spinner>
    );
  }
);

const rotation = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
}
`;

const turn = keyframes`
0% {
  stroke-dashoffset: 180;
}
50% {
  stroke-dashoffset: 45;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
100% {
  stroke-dashoffset: 180;
  -webkit-transform: rotate(450deg);
  transform: rotate(450deg);
}
`;

interface SpinnerProps {
  stroke: string | undefined;
  size: string | undefined;
  zIndex: string | undefined;
}

const Spinner = styled.svg<SpinnerProps>`
  stroke: ${({ stroke }) => (stroke ? stroke : "white")};
  fill: transparent;
  position: absolute;
  width: ${({ size }) => (size ? size : "100%")};
  height: ${({ size }) => (size ? size : "100%")};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};
  animation: ${rotation} 1.35s linear infinite;
  & .circle {
    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${turn} 1.35s ease-in-out infinite;
  }
  @keyframes turn {
    0% {
      stroke-dashoffset: 180;
    }
    50% {
      stroke-dashoffset: 45;
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 180;
      -webkit-transform: rotate(450deg);
      transform: rotate(450deg);
    }
  }
`;
