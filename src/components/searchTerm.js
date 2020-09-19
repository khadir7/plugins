import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BackButton from "components/BackButton";
import RenderItems from "components/renderItems";
import SuggestTermIcon from "assets/icons/SuggestTermIcon";
import { bindActionCreators } from "redux";
import { ActionMethods } from "store/actions/";
import { Link } from "react-router-dom";
import TextComponent from "./TextComponent";
const {
  getBusinessGlossaryDatabySearchKeyword,
  getSearchData,
  clearSearchData,
  clearTermData,
  setDetailData,
  setShowSelectedValueInSearch,
} = ActionMethods;

const Icon = styled.span`
  cursor: pointer;
`;

const Asterisk = styled.span`
  color: red;
`;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const StyledButton = styled(Button)`
  ${(props) =>
    props.variant === "outline-oe" &&
    `&:hover {
    background: #edfaff;
  }`}
`;

class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      showSuggestTerm: false,
      formData: {
        searchTerm: "",
      },
      startIndex: 0,
      endIndex: 5,
    };
  }
  componentDidMount() {
    let { startIndex, endIndex } = this.state;
    this.props.action.clearTermData();
    if (this.props.showSelectedValueInSearch) {
      this.props.action.getBusinessGlossaryDatabySearchKeyword({
        searchTerm: this.props.selectedPropsBrowserValue || "",
        startIndex,
        endIndex,
      });
      this.setState({
        formData: {
          searchTerm: this.props.selectedPropsBrowserValue || "",
        },
      });
    } else {
      this.props.action.getBusinessGlossaryDatabySearchKeyword({
        searchTerm: "",
        startIndex,
        endIndex,
      });
    }
    this.props.resizeWidget();
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.selectedPropsBrowserValue !==
        this.props.selectedPropsBrowserValue &&
      this.props.showSelectedValueInSearch
    ) {
      this.setState(
        {
          formData: {
            searchTerm: newProps.selectedPropsBrowserValue
              ? newProps.selectedPropsBrowserValue
              : "",
          },
          startIndex: 0,
        },
        () =>
          this.renderDataBasedOnType(
            this.state.formData.searchTerm,
            this.state.active
          )
      );
    }
  }
  componentWillUnmount() {
    this.props.clearSearch();
    this.props.action.setShowSelectedValueInSearch(false);
  }
  onVarientChange(value, activeTabName) {
    if (
      !(
        (activeTabName === "DATA" && value === true) ||
        (activeTabName === "TERM" && value === false)
      )
    ) {
      this.setState(
        {
          active: value,
          startIndex: 0,
        },
        () => this.renderDataBasedOnType(this.state.formData.searchTerm, value)
      );
    }
  }
  renderDataBasedOnType(value, checkValue, clear = true) {
    let { startIndex, endIndex } = this.state;
    let searchValue = value ? value : "";
    if (checkValue) {
      (clear || !startIndex) && this.props.action.clearTermData();
      this.props.action.getBusinessGlossaryDatabySearchKeyword({
        searchTerm: searchValue || "",
        startIndex,
        endIndex,
      });
    } else {
      (clear || !startIndex) && this.props.action.clearSearchData();
      this.props.action.getSearchData({
        term: searchValue,
        startIndex,
        endIndex,
      });
    }
    this.props.resizeWidget();
  }
  openDetailedSearch = (event) => {
    let searchTerm = event.target.value;
    let isEnterEvent = event.key === "Enter";
    if (isEnterEvent && !this.state.active && searchTerm.trim()) {
      window.open(
        `${JSON.parse(
          localStorage.getItem("domainUrl")
        )}#nav/advancedsearch?searchTerm=${searchTerm}`
      );
    }
  };
  handleOnScroll = (e) => {
    const target = e.target;
    let { endOfSearchData, termEndOfSearch } = this.props;
    let { active } = this.state;
    let loadData = active ? !termEndOfSearch : !endOfSearchData;
    if (
      Math.round(
        target.offsetHeight + target.scrollTop - target.scrollHeight
      ) >= 0 &&
      loadData
    ) {
      //detecting scroll end position
      setTimeout(() => {
        this.renderDataBasedOnType(
          this.state.formData.searchTerm,
          this.state.active,
          false
        );
        this.setState((prevState) => ({
          startIndex: prevState.startIndex + 5,
        }));
      }, 100);
    }
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedsuggestBusinessGlossaryForm = {
      ...this.state.formData,
    };
    let updatedFormElement = {
      ...updatedsuggestBusinessGlossaryForm[inputIdentifier],
    };
    updatedFormElement = event.target.value;
    updatedsuggestBusinessGlossaryForm[inputIdentifier] = updatedFormElement;
    this.setState(
      {
        formData: updatedsuggestBusinessGlossaryForm,
        startIndex: 0,
      },
      () => this.renderDataBasedOnType(updatedFormElement, this.state.active)
    );
  };
  getTheStateInputTemplate(eachInputProp) {
    return (
      <Form.Group>
        <Form.Label>{eachInputProp.name}</Form.Label>
        {eachInputProp.mandatory ? <Asterisk>*</Asterisk> : ""}
        <Form.Control
          type={eachInputProp.type}
          placeholder={eachInputProp.placeholder}
          value={eachInputProp.value}
          onChange={(e) => this.inputChangedHandler(e, eachInputProp.path)}
        />
      </Form.Group>
    );
  }
  onSelectedValue(eachObject) {
    this.props.action.setDetailData(eachObject);
    this.props.history.push("/detail/" + eachObject.redirectLink);
  }
  render() {
    const { loggedIn } = this.props;
    const { active } = this.state;
    // if (!loggedIn) {
    //   return <Redirect push to="/" />;
    // }
    let termTemplate = "";
    let searchTermInputTemplate = this.getTheStateInputTemplate({
      name: `Search ${active ? `Term` : `Data`}`,
      path: "searchTerm",
      value: this.state.formData.searchTerm,
      type: "input",
      placeholder: `Enter ${active ? `term` : `data`}`,
      mandatory: true,
    });
    let searchResults = "";
    termTemplate = (
      <>
        <InnerContent borderBottom={true}>
          {searchTermInputTemplate}
          {/* <Form.Label>Show result by type</Form.Label>
          <ButtonGroup className="p-0 col mb-2">
            <StyledButton
              variant={this.state.active ? "oe" : "outline-oe"}
              onClick={() => this.onVarientChange(!this.state.active, "TERM")}
            >
              Term
            </StyledButton>
            <StyledButton
              variant={!this.state.active ? "oe" : "outline-oe"}
              onClick={() => this.onVarientChange(!this.state.active, "DATA")}
            >
              Data
            </StyledButton>
          </ButtonGroup> */}
        </InnerContent>
        {this.state.active ? (
          <TextComponent
            color="rgb(0, 153, 204)"
            bold={true}
            hover={false}
            text="Want to create a custom term?"
          >
            <Link to="/suggestTerm">
              <Icon>
                <SuggestTermIcon />
              </Icon>
            </Link>
          </TextComponent>
        ) : (
          ""
        )}
        {searchResults}
        <RenderItems
          searchResults={
            this.state.active
              ? this.props.ovalEdgeSearchResult
              : this.props.searchData
          }
          resizeWidget={() => this.props.resizeWidget()}
          onSelectedValue={(obj) => this.onSelectedValue(obj)}
          // handleOnScroll={this.handleOnScroll}
          msg={
            this.state.formData.searchTerm
              ? ""
              : "Start typing any term to see results"
          }
        />
        <InnerContent>
          <BackButton />
        </InnerContent>
      </>
    );
    return <>{termTemplate}</>;
  }
}

const mapStateToProps = (state) => {
  const {
    ovalEdgeUser,
    ovalEdgeBusinessGlossary,
    ovalEdgeSearchTerm,
    ovalEdgeCommonReducer,
  } = state;
  return {
    ovalEdgeSearchResult: ovalEdgeBusinessGlossary.businessGlossary,
    searchData: ovalEdgeSearchTerm.searchData,
    loggedIn: ovalEdgeUser.loggedIn,
    showSelectedValueInSearch: ovalEdgeCommonReducer.showSelectedValueInSearch,
    selectedPropsBrowserValue: ovalEdgeCommonReducer.selectedBrowserValue,
    endOfSearchData:
      ovalEdgeSearchTerm.tableEndOfSearch &&
      ovalEdgeSearchTerm.columnEndOfSearch &&
      ovalEdgeSearchTerm.storyEndOfSearch &&
      ovalEdgeSearchTerm.fileEndOfSearch &&
      ovalEdgeSearchTerm.chartEndOfSearch
        ? true
        : false,
    termEndOfSearch: ovalEdgeBusinessGlossary.termEndOfSearch ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        getBusinessGlossaryDatabySearchKeyword,
        getSearchData,
        clearSearchData,
        clearTermData,
        setDetailData,
        setShowSelectedValueInSearch,
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchTerm));
