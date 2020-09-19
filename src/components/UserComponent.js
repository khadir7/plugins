import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import UserImage from "components/UserImage";
import BackButton from "components/BackButton";
import ToggleButton from "components/ToggleButton";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  text-align: center;
`;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const Desc = styled.div`
  font-weight: bold;
  text-align: center;
`;

const DescContainer = styled.div`
  padding: 10px 0px;
`;

const Flex = styled.div`
  display: flex;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomLabel = styled.label`
  color: #495057;
  font-size: 1rem;
`;

const UserComponent = ({ userData, resizeWidget }) => {
  const [toggleState, setToggleState] = useState(false);
  /* global chrome */
  if (chrome.storage) {
    chrome.storage.sync.get(["enableSelection"], (result) => {
      setToggleState(result.enableSelection || false);
    });
  }

  const updateToggleState = () => {
    if (chrome.storage) {
      chrome.storage.sync.set({ enableSelection: !toggleState }, () => {
        setToggleState(!toggleState);
      });
    }
  };

  useEffect(() => resizeWidget());

  return (
    <InnerContent>
      <Wrapper>
        <UserImage height="125px" width="125px" userId={userData?.userId} />
      </Wrapper>
      <DescContainer>
        <Desc>{userData?.fName}</Desc>
        <Desc> {userData?.lName}</Desc>
      </DescContainer>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          disabled
          type="input"
          placeholder="Enter URL"
          value={JSON.parse(localStorage.getItem("domainUrl"))}
        ></Form.Control>
      </Form.Group>
      <ToggleContainer className="mb-3">
        <ToggleButton checked={toggleState} onchange={updateToggleState} />
        <CustomLabel className="form-label">
          Open extension on selection
        </CustomLabel>
      </ToggleContainer>

      <Flex>
        <BackButton classes="mr-1 col-6" isBlock={false} />
        <Link to="/logout" className="col-6 p-0">
          <Button variant="oeBlack" className="col">
            Log Out
          </Button>
        </Link>
      </Flex>
    </InnerContent>
  );
};

const mapStateToProps = (state) => {
  const { ovalEdgeUser } = state;
  return {
    userData: ovalEdgeUser.userData,
  };
};

export default connect(mapStateToProps, null)(UserComponent);
