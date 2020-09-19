import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`;

const Loader = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  border-radius: 12px;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  position: absolute;
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 48%;
    top: 40%;
    width: 40px;
    height: 40px;
    border-style: solid;
    border-color: black;
    border-top-color: transparent;
    border-width: 4px;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

const LoaderComponent = () => {
  return <Loader></Loader>;
};

export default LoaderComponent;
