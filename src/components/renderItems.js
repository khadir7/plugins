import React, { useEffect } from "react";
import styled from "styled-components";
import TextComponent from "components/TextComponent";
import DataIcon from "./DataIcon";

const Results = styled.div`
  height: 250px;
  overflow-y: overlay;
  overflow-x: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  height: 28px;
`;

const EmptyMessage = ({ msg }) => {
  return <div className="m-auto">{msg ? msg : `No data found`}</div>;
};

const RenderItemsComponent = ({
  resizeWidget,
  searchResults,
  onSelectedValue,
  handleOnScroll,
  msg = "",
}) => {
  useEffect(() => {
    resizeWidget();
  });

  const renderItems = searchResults.map((eachOption) => (
    <TextComponent
      handleClick={() => onSelectedValue(eachOption)}
      text={eachOption.displayName || eachOption.name}
    >
      <IconContainer>
        <DataIcon icon={eachOption.type} />
      </IconContainer>
    </TextComponent>
  ));

  const onScrollHandler = (e) => {
    e.persist();
    handleOnScroll && handleOnScroll(e);
  };

  return (
    <Results className="oescroll" onScroll={(e) => onScrollHandler(e)}>
      {renderItems.length ? renderItems : <EmptyMessage msg={msg} />}
    </Results>
  );
};

export default RenderItemsComponent;
