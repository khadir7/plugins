import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  &:hover circle{
    fill: #0083b3;
  }
`;

const ReportMenuIcon = (props) => {
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
          d="M48.2889 20H31.7111L20 31.7111V48.2889L31.7111 60H48.2889L60 48.2889V31.7111L48.2889 20ZM55.5556 46.4444L46.4444 55.5556H33.5556L24.4444 46.4444V33.5556L33.5556 24.4444H46.4444L55.5556 33.5556V46.4444Z"
          fill="white"
          stroke="#0099CC"
        />
        <path
          d="M40 50C41.1046 50 42 49.1046 42 48C42 46.8954 41.1046 46 40 46C38.8954 46 38 46.8954 38 48C38 49.1046 38.8954 50 40 50Z"
          fill="white"
        />
        <path d="M38 29H42V43H38V29Z" fill="white" />
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

export default ReportMenuIcon;
