import * as styled from "styled-components";
import reset from "styled-reset";
import background from "../image/bg.jpg";

const GlobalStyle = styled.createGlobalStyle`
  ${reset}
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-image: url(${background});
  }
`;

export default GlobalStyle;
