import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  &:hover rect {
    fill: #9e9e9e;
  }
`;

const Close = (props) => {
  return (
    <Svg
      width="48"
      height="48"
      viewBox="-10 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="2.45121"
        height="31.3102"
        transform="matrix(0.703325 0.710869 -0.703325 0.710869 34.0212 12)"
        fill="#BDBDBD"
      />
      <rect
        width="2.45121"
        height="31.3102"
        transform="matrix(-0.703325 0.710869 -0.703325 -0.710869 36 34.2573)"
        fill="#BDBDBD"
      />
    </Svg>
  );
};

export default Close;
