import React from "react";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import BackButton from "components/BackButton";

import { ActionMethods } from "store/actions/";

const { logOutUser } = ActionMethods;

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

const LogOut = ({ loggedIn, ...props }) => {
  if (!loggedIn) {
    return <Redirect push to="/" />;
  }
  const onClickOnlogout = () => {
    props.action.logOutUser()
    props.history.push("/");
  };
  return (
    <InnerContent>
      <DescContainer>
        <Desc>Are you sure that</Desc>
        <Desc>you want to Log Out?</Desc>
      </DescContainer>
      <Flex>
        <BackButton classes="mr-1 col-6" isBlock={false} text="No" />
        <Button
          variant="oeBlack"
          className="col-6"
          onClick={onClickOnlogout}
        >
          Yes
        </Button>
      </Flex>
    </InnerContent>
  );
};

const mapStateToProps = (state) => {
  const { ovalEdgeUser } = state;

  return {
    loggedIn: ovalEdgeUser.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        logOutUser,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogOut));
