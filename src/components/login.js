import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router";
import Input from "./input/input";

import { ActionMethods } from "store/actions/";
const { getUserData, onLogin } = ActionMethods;

const Desc = styled.div`
  font-weight: bold;
  text-align: center;
`;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const DescContainer = styled.div`
  padding-bottom: 15px;
`;

const ErrorField = styled.div`
  color: red;
`;

const DOMAIN_URL = JSON.parse(localStorage.getItem("domainUrl")) || "";

const ErrorComponent = ({ isValid, message }) => {
  if (isValid) return null;
  return <ErrorField>{message}</ErrorField>;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormData: {
        userName: {
          value: "",
          touched: false,
          isValid: false,
          invalidMsg: "Please enter username",
          config: {
            type: "input",
            placeholder: "Enter username",
          },
          mandatory: true,
          name: "Login",
          objName: "userName",
          onEnterEvent: true,
        },
        password: {
          value: "",
          touched: false,
          isValid: false,
          invalidMsg: "Please enter password",
          config: {
            type: "password",
            placeholder: "Enter password",
          },
          mandatory: true,
          name: "Password",
          objName: "password",
          onEnterEvent: true,
        },
        domainUrl: {
          value: DOMAIN_URL,
          touched: false,
          isValid: DOMAIN_URL ? true : false,
          invalidMsg: "Please enter valid URL",
          config: {
            type: "input",
            placeholder: "Enter URL",
          },
          mandatory: true,
          name: "URL",
          objName: "domainUrl",
          onEnterEvent: true,
          isUrlField: true,
        },
      },
    };
  }

  componentDidMount() {
    this.props.resizeWidget();
  }

  componentDidUpdate() {
    this.props.resizeWidget();
  }

  // getTheStateInputTemplate(eachInputProp) {
  //   return (
  //     <Form.Group
  //       className={
  //         eachInputProp.istouched
  //           ? eachInputProp.validationPath
  //             ? ""
  //             : "error"
  //           : ""
  //       }
  //     >
  //       <Form.Label>{eachInputProp.name}</Form.Label>
  //       {eachInputProp.mandatory ? <Asterisk>*</Asterisk> : ""}
  //       <Form.Control
  //         type={eachInputProp.type}
  //         placeholder={eachInputProp.placeholder}
  //         value={eachInputProp.valuePath}
  //         onChange={(e) =>
  //           this.inputChangedHandler(e, eachInputProp.path, eachInputProp)
  //         }
  //         onKeyPress={event => {
  //           if (event.key === 'Enter' && eachInputProp.path === 'domainUrl') {
  //             this.onLoginSubmit()
  //           }
  //         }}
  //       />
  //     </Form.Group>
  //   );
  // }
  isValidURL = (url) => {
    let isValid = true;
    try {
      new URL(url);
    } catch (e) {
      isValid = false;
    }
    return isValid;
  };
  checkValidity(options, value) {
    let isValid = true;
    if (options.mandatory) {
      isValid = value.trim() !== "" && isValid;
      isValid = options.isUrlField
        ? isValid && this.isValidURL(value)
        : isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginFormData = {
      ...this.state.loginFormData,
    };
    let updatedFormElement = {
      ...updatedLoginFormData[inputIdentifier],
    };
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement,
      event.target.value
    );
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedLoginFormData[inputIdentifier] = updatedFormElement;
    this.setState({
      loginFormData: updatedLoginFormData,
    });
  };
  onLoginSubmit() {
    // let trmpString = this.state.loginFormData.userName + ':' + this.state.loginFormData.password
    // console.log(trmpString)
    // let tep = window.btoa(trmpString)
    // tep = 'Basic ' + tep
    let vm = this;
    let paths = ["userName", "password", "domainUrl"];
    let validationSuccess = false;
    let inputFields = this.state.loginFormData;
    paths.forEach((eachPath) => {
      inputFields[eachPath].touched = true;
      if (vm.state.loginFormData[eachPath].mandatory && !validationSuccess) {
        validationSuccess = !vm.state.loginFormData[eachPath].isValid
          ? true
          : false;
      }
    });
    this.setState({ loginFormData: inputFields });
    if (!validationSuccess) {
      let domainUrl = vm.state.loginFormData.domainUrl.value;
      if (!domainUrl.trim().endsWith("/")) {
        domainUrl = domainUrl + "/";
      }
      localStorage.setItem("domainUrl", JSON.stringify(domainUrl));
      this.props.action.onLogin({
        username: this.state.loginFormData.userName.value,
        password: this.state.loginFormData.password.value,
      });
    }
  }
  render() {
    let paths = ["userName", "password", "domainUrl"];
    let inputTemplates = paths.map((eachPath) => (
      <Input
        value={this.state.loginFormData[eachPath].value}
        name={eachPath.name}
        path={this.state.loginFormData[eachPath]}
        config={this.state.loginFormData[eachPath].config}
        changed={this.inputChangedHandler}
        onEnterEventClicked={() => this.onLoginSubmit()}
      >
        <ErrorComponent
          message={this.state.loginFormData[eachPath]["invalidMsg"]}
          isValid={
            this.state.loginFormData[eachPath].touched &&
            this.state.loginFormData[eachPath].mandatory
              ? this.state.loginFormData[eachPath].isValid
                ? true
                : false
              : true
          }
        />
      </Input>
    ));
    let loginTemplate = "";
    // let loginInputTemplate = this.getTheStateInputTemplate({
    //   name: "Login",
    //   path: "userName",
    //   valuePath: this.state.loginFormData.userName.value,
    //   istouched: this.state.loginFormData.userName.touched,
    //   validationPath: this.state.loginFormData.userName.isValid,
    //   type: "input",
    //   placeholder: "Enter username",
    //   mandatory: true,
    // });
    // let passwordInputTemplate = this.getTheStateInputTemplate({
    //   name: "Password",
    //   path: "password",
    //   valuePath: this.state.loginFormData.password.value,
    //   istouched: this.state.loginFormData.password.touched,
    //   validationPath: this.state.loginFormData.password.isValid,
    //   type: "password",
    //   placeholder: "Enter password",
    //   mandatory: true,
    // });
    // let urlInputTemplate = (
    //   <Input
    //     name= "URL"
    //     elementType= "input"
    //     path={this.state.loginFormData.domainUrl}
    //     config={this.state.loginFormData.domainUrl.config}
    //     changed={(event) => this.inputChangedHandler(event, "domainUrl")}
    //   />
    // )
    loginTemplate = this.props.loggedIn ? (
      <Redirect push to="/menu" loggedIn={this.props.loggedIn} />
    ) : (
      <InnerContent>
        <DescContainer>
          <Desc>Use OvalEdge extension</Desc>
          <Desc> for instant access to your data</Desc>
        </DescContainer>
        <Form>
          {inputTemplates}
          <Button variant="oe" block onClick={() => this.onLoginSubmit()}>
            Login
          </Button>
        </Form>
      </InnerContent>
    );
    return <>{loginTemplate}</>;
  }
}

const mapStateToProps = (state) => {
  const { ovalEdgeUser } = state;
  return {
    userData: ovalEdgeUser.userData,
    loggedIn: ovalEdgeUser.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        getUserData,
        onLogin,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
