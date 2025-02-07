import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  &:hover circle {
    fill: #0083b3;
  }
`;

const ReportMenuIcon = (props) => {
  return (
    <Svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 36 36"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 11h6c.553 0 1-.448 1-1V4c0-.552-.447-1-1-1H4C3.447 3 3 3.448 3 4v6C3 10.552 3.447 11 4 11zM5 5h4v4H5V5zM20 3h-6c-.553 0-1 .448-1 1v6c0 .552.447 1 1 1h6c.553 0 1-.448 1-1V4C21 3.448 20.553 3 20 3zM19 9h-4V5h4V9zM10 21c.553 0 1-.447 1-1v-6c0-.553-.447-1-1-1H4c-.553 0-1 .447-1 1v6c0 .553.447 1 1 1H10zM5 15h4v4H5V15zM18 14L16 14 16 16 14 16 14 18 16 18 16 20 18 20 18 18 20 18 20 16 18 16z"
        style={{ transform: `translate(18%, 20%)` }}
      ></path>
    </Svg>
  );
};

export default ReportMenuIcon;
