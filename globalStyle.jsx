import { createGlobalStyle } from "styled-components";
import Manrope from "./fonts/Manrope[wght].ttf";

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "manrope";
  font-display: optional;
  src: url(${Manrope}) format('truetype'),
  font-weight: 1 999;
}


body {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  background-color: white;
  font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
  line-height: 25px;
  scroll-snap-type: y mandatory;
}

html {
  scroll-behavior: smooth;
}



button {
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
}

code {
  font-family: "Source Sans Pro", source-code-pro, Menlo, Monaco, Consolas,
    "Courier New", monospace;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

h1 {
    font-size: 56px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 58px;
    letter-spacing: 2px;
}

h2 {
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 44px;
    letter-spacing: 1.5px;
}

h3 {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 36px;
    letter-spacing: 1.15px;
}

h4 {
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 38px;
    letter-spacing: 2px;
}

h5 {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 33px;
    letter-spacing: 1.7px;
}

h6 {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 24px;
    letter-spacing: 1.3px;
}

`;
