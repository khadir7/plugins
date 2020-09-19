import React from "react";
import styled from "styled-components";

const UserImg = styled.img.attrs((props) => ({
  src: `${JSON.parse(localStorage.getItem("domainUrl"))}ovaledgeimages/user/${
    props.userId
  }`,
}))`
  height: ${(props) => (props.height ? props.height : "45px")};
  width: ${(props) => (props.width ? props.width : "45px")};
  border-radius: 100%;
  border: 3px solid rgb(0, 153, 204);
`;

const UserImage = (props) => {
  return <UserImg className="p-1" {...props} />;
};

export default UserImage;
