import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  height: 55px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  ${(props) =>
    props.hover &&
    `&:hover {
    background: #edfaff;
  }`}
`;

const Text = styled.div`
  font-weight: ${(props) => (props.bold ? `bold` : `normal`)};
  color: ${(props) => (props.color ? props.color : `inherit`)};
  max-width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TextComponent = ({
  handleClick,
  text,
  bold = "",
  color = "",
  hover = true,
  children,
}) => {
  const handleClickEvent = () => (handleClick ? handleClick() : "");
  return (
    <TextContainer onClick={handleClickEvent} hover={hover}>
      <Text title={text} color={color} bold={bold}>
        {text}
      </Text>
      {children}
    </TextContainer>
  );
};

export default TextComponent;
