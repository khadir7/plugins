import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";

import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import BackButton from "components/BackButton";
import LoaderComponent from "components/LoaderComponent";
import CheckMarkIcon from "assets/icons/CheckMarkIcon";
import ErrorIcon from "assets/icons/ErrorIcon";

import { ActionMethods } from "store/actions/";

const { saveServiceDeskData, clearReportingState } = ActionMethods;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const Flex = styled.div`
  display: flex;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  svg {
    height: inherit;
  }
`;

const MessageText = styled.span`
  padding-left: 10px;
  color: ${(props) => props.color};
`;

const ContextComponent = ({ contextValue, setContextValue }) => {
  return (
    <Form.Group>
      <Form.Label>Context URL</Form.Label>
      <Form.Control
        type="input"
        placeholder="Enter Context URL"
        value={contextValue}
        onChange={(e) => setContextValue(e.target.value)}
      ></Form.Control>
    </Form.Group>
  );
};

const SuccessMessage = () => {
  return (
    <MessageContainer>
      <CheckMarkIcon />
      <MessageText color="#219653">Issue reported successfully</MessageText>
    </MessageContainer>
  );
};

const ErrorMessage = () => {
  return (
    <MessageContainer>
      <ErrorIcon />
      <MessageText color="#EB5757">Unable to report issue</MessageText>
    </MessageContainer>
  );
};

const FeedBackComponent = ({ reportingError, reportingSuccess }) => {
  if (!(reportingError || reportingSuccess)) return null;
  return reportingSuccess ? <SuccessMessage /> : <ErrorMessage />;
};

class serviceDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuggestions: false,
      hideSuggestions: true,
      contextValue: props.contextURL,
      searchValue: {
        name: "",
      },
      formData: {
        objectType: null,
        description: {
          value: "",
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
  componentWillUnmount() {
    this.props.action.clearReportingState();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.reportingSuccess) {
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  }
  // onBlurHandler = () => {
  //   const { hideSuggestions } = this.state;
  //   if (hideSuggestions) {
  //     this.hideSuggestions();
  //   }
  // };
  // onMouseOverHandler = () => {
  //   this.setState({ hideSuggestions: false });
  // };
  // onMouseLeaveHandler = () => {
  //   this.setState({ hideSuggestions: true });
  // };
  // onChangeHandler = (e) => {
  //   switch (this.state.formData.objectType) {
  //     case "Tables":
  //       this.props.action.getSearchDataForTables({
  //         term: e.target.value.trim(),
  //         startIndex: 0,
  //         endIndex: 5,
  //       });
  //       break;
  //     case "Column":
  //       this.props.action.getSearchDataForColumns({
  //         term: e.target.value.trim(),
  //         startIndex: 0,
  //         endIndex: 5,
  //         oetableid: 0,
  //       });
  //       break;
  //     case "File":
  //       this.props.action.getSearchDataForFiles({
  //         term: e.target.value.trim(),
  //         startIndex: 0,
  //         endIndex: 5,
  //       });
  //       break;
  //     case "Reports":
  //       this.props.action.getSearchDataForCharts({
  //         term: e.target.value.trim(),
  //         startIndex: 0,
  //         endIndex: 5,
  //       });
  //       break;
  //     case "Business Glossary":
  //       this.props.action.getSearchDataForBusinessGlossary({
  //         published: true,
  //         term: e.target.value.trim(),
  //         startIndex: 0,
  //         endIndex: 5
  //       })
  //       break;
  //   }
  //   let path = {name: e.target.value.trim()}
  //   this.setState({ searchValue: path });
  //   this.setState({ showSuggestions: true });
  // };
  // hideSuggestions = () => {
  //   this.setState({ showSuggestions: false, hideSuggestions: true });
  // };
  // setSearchValue = (searchValue) => {
  //   this.setState({ searchValue });
  //   this.hideSuggestions();
  // };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginFormData = {
      ...this.state.formData,
    };
    let updatedFormElement = {
      ...updatedLoginFormData[inputIdentifier],
    };
    // updatedFormElement.isValid = this.checkValidity(path, event.target.value);
    updatedFormElement.value = event.target.value;
    // updatedFormElement.touched = true;
    updatedLoginFormData[inputIdentifier] = updatedFormElement;
    this.setState({
      formData: updatedLoginFormData,
    });
  };
  // onObjectTypeSelection (event, inputIdentifier) {
  //   const updatedDomainSelectedValueForm = {
  //     ...this.state.formData,
  //   };
  //   let updatedFormElement = {
  //     ...updatedDomainSelectedValueForm[inputIdentifier],
  //   };
  //   updatedFormElement =
  //     event.target.value.toString() !== "-1" ? event.target.value : null;
  //   updatedDomainSelectedValueForm[inputIdentifier] = updatedFormElement;
  //   this.setState({
  //     formData: updatedDomainSelectedValueForm,
  //     searchValue: {name: ""}
  //   });
  //   this.props.action.setServiceDeskSearchData([])
  // }
  onSubmitOnReport() {
    const { match } = this.props;
    const { contextValue } = this.state;
    let options = {};
    if (match.params?.context === "context") {
      options = {
        urlContext: contextValue,
        type: "dataquality",
        description: this.state.formData.description.value,
      };
    } else {
      options = {
        description: this.state.formData.description.value,
        objectType: this.props.selectedDetailData.objectType,
        type: "dataquality",
        objectId: this.props.selectedDetailData.id,
        objectName: this.props.selectedDetailData.name,
      };
    }
    this.props.action.saveServiceDeskData(options);
  }
  render() {
    // const { showSuggestions, searchValue } = this.state;
    const { contextValue, formData } = this.state;
    const { match, isReporting, reportingSuccess, reportingError } = this.props;

    let isContext = match.params?.context === "context";

    let isBtnDisabled = true;

    if (isContext) {
      isBtnDisabled =
        formData.description.value.trim() && contextValue.trim() ? false : true;
    } else {
      isBtnDisabled = formData.description.value.trim() ? false : true;
    }

    return (
      <InnerContent>
        <Form>
          {/* <Form.Group>
            <Form.Label>Request Object Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.onObjectTypeSelection(e, "objectType")}
            >
              <option key={-1} value={-1}>
                ---Select Object Type ---
              </option>
              {Constants.REQUEST_OBJECT_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Request Object</Form.Label>
            <Form.Control
              disabled={this.state.formData.objectType ? false : true}
              as="input"
              placeholder="Enter table/column/file/report/business glossary"
              onBlur={this.onBlurHandler}
              onChange={this.onChangeHandler}
              value={searchValue.name}
            ></Form.Control>
            <Suggestions
              show={showSuggestions}
              onMouseOverHandler={this.onMouseOverHandler}
              onMouseLeaveHandler={this.onMouseLeaveHandler}
              setSearchValue={this.setSearchValue}
              options={this.props.serviceDeskSearchData}
            />
          </Form.Group> */}
          {isContext ? (
            <ContextComponent
              contextValue={contextValue}
              setContextValue={(value) =>
                this.setState({ contextValue: value })
              }
            />
          ) : (
            <Form.Group>
              <Form.Label>Selected Type</Form.Label>
              <Form.Control
                disabled
                className="resize-none"
                as="input"
                value={this.props.selectedDetailData.name}
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Service Request Description</Form.Label>
            <Form.Control
              className="resize-none"
              as="textarea"
              placeholder="Enter description"
              rows="5"
              value={this.state.formData.description.value}
              onChange={(e) => this.inputChangedHandler(e, "description")}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.onSubmitOnReport();
                }
              }}
            />
          </Form.Group>
          <FeedBackComponent
            reportingError={reportingError}
            reportingSuccess={reportingSuccess}
          />
          <Flex>
            <BackButton classes="mr-1 col" isBlock={false} />
            <Button
              variant="oe"
              className={`col ${isBtnDisabled ? `-disabled` : ``}`}
              onClick={() => !isBtnDisabled && this.onSubmitOnReport(isBtnDisabled)}
            >
              Report
            </Button>
          </Flex>
        </Form>
        {isReporting ? <LoaderComponent /> : null}
      </InnerContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { ovalEdgeSearchTerm, ovalEdgeDetail } = state;
  return {
    serviceDeskSearchData: ovalEdgeSearchTerm.serviceDeskSearchData,
    selectedDetailData: ovalEdgeDetail.selectedDetailData,
    isReporting: ovalEdgeSearchTerm.isReporting,
    reportingSuccess: ovalEdgeSearchTerm.reportingSuccess,
    reportingError: ovalEdgeSearchTerm.reportingError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        saveServiceDeskData,
        clearReportingState,
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(serviceDesk));
