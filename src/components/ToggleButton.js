import React from "react";
import styled from "styled-components";

const Toggle = styled.div`
  zoom: 1.5;
`;

const ToggleButton = ({ checked = false, onchange }) => {
  return (
    <Toggle
      className="custom-control custom-switch d-inline-block"
      onChange={onchange}
    >
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitchesChecked"
        checked={checked}
        onChange={() => {}}
      />
      <label
        className="custom-control-label form-label"
        htmlFor="customSwitchesChecked"
      ></label>
    </Toggle>
  );
};

export default ToggleButton;
