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
  #root {
    overflow-x: auto;
    height: 100vh;
    padding: 20px;
  }
`;

export default GlobalStyle;
