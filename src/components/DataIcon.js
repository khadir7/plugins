import React from "react";

import BGIcon from "../assets/icons/BGIcon";

const DataIcon = ({ icon }) => {
  let iconComponent;
  switch (icon) {
    case "BSG":
      iconComponent = <BGIcon />;
      break;

    default:
      iconComponent = null;
  }

  return iconComponent;
};

export default DataIcon;
