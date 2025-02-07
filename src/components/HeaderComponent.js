import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

import UserImage from "components/UserImage";
import Close from "assets/icons/Close";
import SettingsIcon from "assets/icons/SettingsIcon";
import OvalEdgeIcon from "../assets/icons/OvalEdgeIcon";
import image from "../assets/images/widget.png";

const Header = styled.div`
  height: 80px;
  width: inherit;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 15px;
  position: relative;
`;

const FlexIcon = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
`;

const IconWrapper = styled.span`
  cursor: pointer;
`;

const Image = styled.img.attrs({
  src: image,
})`
  width: 100%;
`;

const UserImgComp = ({ pathname, userId }) => {
  const history = useHistory();
  // if (pathname === "/") return null;
  return null;

  return pathname === "/user" ? (
    <IconWrapper onClick={() => history.goBack()}>
      <SettingsIcon />
    </IconWrapper>
  ) : (
    <Link to="/user">
      <UserImage userId={userId} />
    </Link>
  );
};

const HeaderComponent = ({ userId }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  if (pathname === "/logout") return null;

  const handleClick = () => {
    history.replace("/");
    window.parent.postMessage({ name: "closeIframe" }, "*");
  };

  return (
    <Header>
      <UserImgComp pathname={pathname} userId={userId} />
      <FlexIcon>
        <Link to="/">
          {/* <OvalEdgeIcon /> */}
          <Image />
        </Link>
      </FlexIcon>
      <IconWrapper onClick={handleClick}>
        <Close />
      </IconWrapper>
    </Header>
  );
};

export default HeaderComponent;
