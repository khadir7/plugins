import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import "./App.css";
import SwitchComponent from "components/SwitchComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionMethods } from "store/actions/";
import HeaderComponent from "./components/HeaderComponent";

const { getUserData, setSelectedBrowserValue, getContextUrls } = ActionMethods;

const Container = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-flow: column;
`;

const LayOut = styled.div`
  width: auto;
  height: auto;
  zoom: 0.75;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: white;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBrowserValue: "",
      showModals: {
        showSuggestModal: false,
      },
    };
    this.layOut = React.createRef();
  }

  clearSearch = () => {
    this.setState({
      selectedBrowserValue: "",
    });
  };

  resizeWidget = (obj = {}) => {
    setTimeout(() => {
      let { transition = false } = obj;
      this.layOut.current &&
        window.parent.postMessage(
          {
            name: "resizeIframe",
            height: `${this.layOut.current.offsetHeight}px`,
            transition,
          },
          "*"
        );
    }, 200);
  };

  chromeMessageEventHandler = () => {
    /* global chrome */
    chrome.runtime.onMessage &&
      chrome.runtime.onMessage.addListener((messageObj) => {
        let {
          message = "",
          type,
          host = "",
          url = "",
          search = false,
        } = messageObj;
        if (type === "selectedText") {
          this.setState({ selectedBrowserValue: message });
          this.props.action.setSelectedBrowserValue(message);
          return;
        }
        if (type === "setDomainURL") {
          search && this.props.history.push("/search/term");
          this.setState({ hostURL: host, contextURL: url });
        }
      });
  };

  bindDocumentEvent = () => {
    document.addEventListener("mouseup", this.unBindDragEvent);
  };

  unBindDragEvent = () => {
    window.parent.postMessage(
      {
        name: "closeDrag",
      },
      "*"
    );
  };

  componentDidMount() {
    this.chromeMessageEventHandler();
    // this.props.action.getUserData();
    this.props.action.getContextUrls();
    this.bindDocumentEvent(); //for stopping drag
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.unBindDragEvent);
  }

  componentDidUpdate() {
    this.resizeWidget();
  }

  render() {
    const { loggedIn, userId, contextUrls } = this.props;
    const { hostURL, contextURL } = this.state;
    return (
      <LayOut ref={this.layOut}>
        <Container>
          <HeaderComponent userId={userId} />
          <SwitchComponent
            resizeWidget={this.resizeWidget}
            loggedIn={loggedIn}
            clearSearch={this.clearSearch}
            contextURL={contextUrls.includes(hostURL) ? contextURL : ""}
          />
        </Container>
      </LayOut>
    );
  }
}

const mapStateToProps = (state) => {
  const { ovalEdgeUser, ovalEdgeCommonReducer } = state;
  return {
    loggedIn: ovalEdgeUser.loggedIn,
    userId: ovalEdgeUser?.userData?.userId,
    selectedBrowserValue: ovalEdgeCommonReducer.selectedBrowserValue,
    contextUrls: ovalEdgeUser?.contextUrls,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        getUserData,
        setSelectedBrowserValue,
        getContextUrls,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
