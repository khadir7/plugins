import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  &:hover circle {
    fill: #0083b3;
  }
`;

const SearchIcon = (props) => {
  return (
    <Svg
      width="70"
      height="70"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="40" fill="#0099CC" />
      <g clipPath="url(#clip0)">
        <path
          d="M37.105 54.21C40.9001 54.2092 44.5859 52.9387 47.5754 50.6008L56.9746 60L59.9979 56.9767L50.5987 47.5775C52.9378 44.5877 54.2091 40.9011 54.21 37.105C54.21 27.6737 46.5362 20 37.105 20C27.6737 20 20 27.6737 20 37.105C20 46.5362 27.6737 54.21 37.105 54.21ZM37.105 24.2762C44.18 24.2762 49.9337 30.0299 49.9337 37.105C49.9337 44.18 44.18 49.9337 37.105 49.9337C30.0299 49.9337 24.2762 44.18 24.2762 37.105C24.2762 30.0299 30.0299 24.2762 37.105 24.2762Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(20 20)"
          />
        </clipPath>
      </defs>
    </Svg>
  );
};

export default SearchIcon;
