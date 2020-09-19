import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const BackButton = ({
  classes = "",
  onclick,
  isBlock = true,
  text = "Back",
}) => {
  const history = useHistory();
  const handleClick = () => (onclick ? onclick() : history.goBack());
  return (
    <Button
      className={classes}
      variant="outline-oe"
      block={isBlock}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default BackButton;
