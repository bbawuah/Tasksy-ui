import { animated } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";

const Container = styled(animated.div)`
  position: relative;
  min-height: 4rem;
  border-radius: 5px;
  cursor: pointer;
  will-change: width;
`;

export { Container };
