import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import SearchTerm from "./searchTerm";
import { Link } from "react-router-dom";
import ReportMenuIcon from "assets/icons/ReportMenuIcon";
import FavoriteIcon from "assets/icons/FavoriteIcon";
import SearchIcon from "assets/icons/SearchIcon";
import ToggleButton from "components/ToggleButton";

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const CustomLabel = styled.label`
  color: #495057;
  font-size: 1rem;
`;

const DescContainer = styled.div``;

const IconText = styled.div`
  font-weight: 500;
  color: orange;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;
// drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.18))
const MenuIconContainer = styled.div`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: orange;
  height: 100px;
  width: 100px;
  background: #ffa5000d;
  zoom: 1;
  transition: zoom 300ms ease 0s;
  filter: none;
  border: 1px solid orange;
  border-radius: 8px;
}
  &:hover {
    filter: drop-shadow(rgba(0, 0, 0, 0.18) 0px 4px 30px);
    zoom: 1.02;
    background: white;
  }
  svg {
    height: 70px;
    width: 70px;
    fill: currentColor;
    circle {
      display: none;
    }
    path {
      stroke: currentColor;
      fill: currentColor;
    }
  }
`;

const Desc = styled.div`
  font-weight: bold;
  text-align: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: false,
      showModals: {
        showHomeModal: false,
        showSuggestModal: false,
      },
    };
  }
  componentDidMount() {
    this.props.resizeWidget();
    /* global chrome */
    if (chrome.storage) {
      chrome.storage.sync.get(["enableSelection"], (result) => {
        this.setState({ toggleState: result.enableSelection || false });
      });
    }
  }
  componentDidUpdate() {
    this.props.resizeWidget();
  }
  updateToggleState = () => {
    if (chrome.storage) {
      chrome.storage.sync.set(
        { enableSelection: !this.state.toggleState },
        () => {
          this.setState({ toggleState: !this.state.toggleState });
        }
      );
    }
  };
  render() {
    let homeTemplate = "";
    // if (!this.props.loggedIn) {
    //   this.props.history.push("/");
    // }
    if (this.state.showModals.showSuggestModal) {
      homeTemplate = (
        <SearchTerm
          resizeWidget={this.props.resizeWidget}
          selectedBrowserValue={this.props.selectedBrowserValue}
        />
      );
    } else {
      homeTemplate = (
        <InnerContent>
          {/* <DescContainer>
            <Desc>Use OvalEdge extension</Desc>
            <Desc> for instant access to your data</Desc>
          </DescContainer> */}
          <IconsContainer>
            <Link to="/favourite">
              <MenuIconContainer>
                <FavoriteIcon />
                <IconText>Favorite</IconText>
              </MenuIconContainer>
            </Link>
            <Link to="/search/term">
              <MenuIconContainer>
                <SearchIcon />
                <IconText>Search</IconText>
              </MenuIconContainer>
            </Link>
            <Link to="/suggestTerm">
              <MenuIconContainer>
                <ReportMenuIcon />
                <IconText>Term</IconText>
              </MenuIconContainer>
            </Link>
          </IconsContainer>
          <ToggleContainer className="mt-3">
            <ToggleButton
              checked={this.state.toggleState}
              onchange={this.updateToggleState}
            />
            <CustomLabel className="form-label">
              Open extension on selection
            </CustomLabel>
          </ToggleContainer>
        </InnerContent>
      );
    }
    return <>{homeTemplate}</>;
  }
}

export default withRouter(Home);
