import React from "react";
import styled from "styled-components";

import TextComponent from "components/TextComponent";

const Content = styled.div`
  border: 1px solid #ccc;
  max-height: 180px;
  background: white;
`;

const Suggestions = ({
  show,
  onMouseOverHandler,
  onMouseLeaveHandler,
  setSearchValue,
  options
}) => {
  if (!show) return null;
  return (
    <Content
      className="position-absolute col oescroll overflow-auto p-0"
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {options.length > 0 ? options.map(option => (
          <TextComponent text={option.name} handleClick={() => setSearchValue(option)} />
      )) : ''}
      {/* <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      />
      <TextComponent
        handleClick={() => setSearchValue("any text")}
        text="any text"
      /> */}
    </Content>
  );
};

export default Suggestions;
