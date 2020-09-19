import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

import BackButton from "components/BackButton";
import Form from "react-bootstrap/Form";
import { bindActionCreators } from "redux";
import { ActionMethods } from "store/actions/";
import Input from "./input/input";

const {
  getOvalEdgeDomains,
  getOvalEdgeCategories,
  insertBusinessGlossary,
  setOvalEdgeCategories,
  setOvalEdgeDomains,
  setShowSelectedValueInSuggest,
} = ActionMethods;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const Flex = styled.div`
  display: flex;
`;

class SuggestTermComponent extends Component {
  state = {
    availableTerms: [],
    dropDownListProps: [
      {
        name: "Domain",
        path: "selectedDomainId",
        value: "globalDomainId",
        label: "domain",
        items: "ovalEdgeDomains",
        show: true,
      },
      {
        name: "Category",
        path: "categoryId",
        value: "categoryId",
        label: "description",
        items: "ovalEdgeCategoryOne",
      },
    ],
    dropDownListState: [
      {
        name: "Sub Category",
        path: "subCategoryId",
        value: "categoryId",
        label: "description",
        items: "subCategoryValues",
      },
    ],
    formData: {
      searchTerm: {
        value: "",
        touched: false,
        isValid: false,
        config: {
          type: "input",
          placeholder: "Enter term",
        },
        mandatory: true,
        name: "Term",
        objName: "searchTerm",
      },
      description: {
        value: "",
        touched: false,
        isValid: false,
        config: {
          rows: 5,
          className: "resize-none",
          type: "textarea",
          as: "textarea",
          placeholder: "Enter description",
        },
        mandatory: true,
        name: "Description",
        objName: "description",
        onEnterEvent: true,
      },
      selectedDomainId: null,
      categoryId: null,
      subCategoryId: null,
    },
    subCategoryValues: [],
  };
  componentDidMount() {
    this.props.action.getOvalEdgeDomains();
    this.props.resizeWidget();
    if (this.props.showSelectedValueInSuggest) {
      let val = this.props.selectedPropsBrowserValue
        ? this.props.selectedPropsBrowserValue
        : "";
      this.inputChangedHandler(
        {
          target: {
            value: val,
          },
        },
        this.state.formData.searchTerm.objName,
        true
      );
    }
    /* global chrome */
    if (chrome.storage) {
      chrome.storage.sync.get(["availableTerms"], (result) => {
        this.setState({ availableTerms: result.availableTerms || [] });
      });
    }
  }
  componentWillUnmount() {
    this.props.action.setOvalEdgeDomains([]);
    this.props.action.setOvalEdgeCategories([]);
    this.props.action.setShowSelectedValueInSuggest(false);
  }
  componentDidUpdate() {
    this.props.resizeWidget({ transition: true });
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.selectedPropsBrowserValue !==
        this.props.selectedPropsBrowserValue &&
      this.props.showSelectedValueInSuggest
    ) {
      let val = newProps.selectedPropsBrowserValue
        ? newProps.selectedPropsBrowserValue
        : "";
      this.inputChangedHandler(
        {
          target: {
            value: val,
          },
        },
        this.state.formData.searchTerm.objName,
        true
      );
    }
  }
  checkValidity(options, value) {
    let isValid = true;
    if (options.mandatory) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier, checkValue) => {
    const updatedsuggestBusinessGlossaryForm = {
      ...this.state.formData,
    };
    let updatedFormElement = {
      ...updatedsuggestBusinessGlossaryForm[inputIdentifier],
    };
    if (!checkValue === true) {
      event.target.value =
        event.target.value !== undefined ? event.target.value : "";
      updatedFormElement.touched = true;
    }
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement,
      event.target.value
    );
    updatedFormElement.value = event.target.value;
    updatedsuggestBusinessGlossaryForm[inputIdentifier] = updatedFormElement;
    this.setState({
      formData: updatedsuggestBusinessGlossaryForm,
    });
  };
  domainValueSelected(event, inputIdentifier) {
    const updatedDomainSelectedValueForm = {
      ...this.state.formData,
    };
    let updatedFormElement = {
      ...updatedDomainSelectedValueForm[inputIdentifier],
    };
    if (inputIdentifier === "selectedDomainId") {
      let catergoryUpdatedId = { ...updatedDomainSelectedValueForm.categoryId };
      catergoryUpdatedId = null;
      updatedDomainSelectedValueForm.categoryId = catergoryUpdatedId;
      if (event.target.value.toString() !== "-1") {
        this.props.action.setOvalEdgeCategories([]);
      }
    }
    updatedFormElement =
      event.target.value.toString() !== "-1" ? event.target.value : null;
    updatedDomainSelectedValueForm[inputIdentifier] = updatedFormElement;
    this.setState({
      formData: updatedDomainSelectedValueForm,
    });
    if (inputIdentifier === "selectedDomainId") {
      this.setState({ subCategoryValues: [] });
      this.props.action.getOvalEdgeCategories(parseInt(event.target.value));
    } else if (inputIdentifier === "categoryId") {
      let tempCategories = this.props.ovalEdgeCategoryOne.reduce(
        (obj, item) => Object.assign(obj, { [item.categoryId]: item }),
        {}
      );
      this.setState({
        subCategoryValues: tempCategories[event.target.value].children,
      });
    }
  }

  onSubmitFormButton() {
    let vm = this;
    let paths = ["searchTerm", "description"];
    let validationSuccess = false;
    paths.forEach((eachPath) => {
      if (vm.state.formData[eachPath].mandatory && !validationSuccess) {
        validationSuccess = !vm.state.formData[eachPath].isValid ? true : false;
      }
    });
    if (!validationSuccess) {
      // this.props.action.insertBusinessGlossary({
      //   globaldomainid: this.state.formData.selectedDomainId,
      //   name: this.state.formData.searchTerm.value,
      //   description: this.state.formData.description.value,
      //   category1Id: this.state.formData.categoryId
      //     ? this.state.formData.categoryId
      //     : 0,
      //   category2Id: this.state.formData.subCategoryId
      //     ? this.state.formData.subCategoryId
      //     : 0,
      //   steward: "admin",
      // });
      let newTerm = {
        name: this.state.formData.description.value,
        type: "BSG",
        objectType: "glossary",
        word: this.state.formData.searchTerm.value,
        redirectLink: "business-glossary",
        displayName: this.state.formData.searchTerm.value,
      };
      let availableTerms = this.state.availableTerms;
      let isNewTerm = true;
      availableTerms = availableTerms.map((term) => {
        if (
          term.word.trim().toLowerCase() ===
          this.state.formData.searchTerm.value.trim().toLowerCase()
        ) {
          isNewTerm = false;
          return Object.assign(term, {
            name: this.state.formData.description.value.trim(),
          });
        }
        return term;
      });
      isNewTerm && availableTerms.push(newTerm);
      chrome.storage.sync.set({ availableTerms });
      this.props.history.goBack();
    }
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
  //         {...eachInputProp.config}
  //         onChange={(e) =>
  //           this.inputChangedHandler(e, eachInputProp.path, eachInputProp)
  //         }
  //         onKeyPress={event => {
  //           if (event.key === 'Enter' && eachInputProp.path === 'description') {
  //             this.onSubmitFormButton()
  //           }
  //         }}
  //       />
  //     </Form.Group>
  //   );
  // }
  render() {
    let dropDownListTemplate = "",
      subCategoryTemplate = "",
      showInputFields = true;
    const formDataPath = this.state.formData;
    let termInputTemplate = (
      <Input
        value={formDataPath.searchTerm.value}
        name={formDataPath.searchTerm.name}
        path={formDataPath.searchTerm}
        config={formDataPath.searchTerm.config}
        changed={this.inputChangedHandler}
        onEnterEventClicked={() => this.onSubmitFormButton()}
      />
    );
    let descriptionInputTemplate = (
      <Input
        value={formDataPath.description.value}
        name={formDataPath.description.name}
        path={formDataPath.description}
        config={formDataPath.description.config}
        changed={this.inputChangedHandler}
        onEnterEventClicked={() => this.onSubmitFormButton()}
      />
    );
    dropDownListTemplate = this.state.dropDownListProps.map((eachDropDown) =>
      this.props[eachDropDown.items]?.length || eachDropDown.show ? (
        <Form.Group key={eachDropDown.name}>
          <Form.Label>{eachDropDown.name}</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => this.domainValueSelected(e, eachDropDown.path)}
          >
            <option key={-1} value={-1}>
              ---Select {eachDropDown.name} ---
            </option>
            {this.props[eachDropDown.items].map((eachOption) => (
              <option
                key={eachOption[eachDropDown.value]}
                value={eachOption[eachDropDown.value]}
              >
                {eachOption[eachDropDown.label]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      ) : (
        ""
      )
    );
    subCategoryTemplate = this.state.dropDownListState.map((eachDropDown) =>
      this.state[eachDropDown.items] &&
      this.state[eachDropDown.items].length > 0 ? (
        <Form.Group key={eachDropDown.name}>
          <Form.Label>{eachDropDown.name}</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => this.domainValueSelected(e, eachDropDown.path)}
          >
            <option key={-1} value={-1}>
              ---Select {eachDropDown.name} ---
            </option>
            {this.state[eachDropDown.items].map((eachOption) => (
              <option
                key={eachOption[eachDropDown.value]}
                value={eachOption[eachDropDown.value]}
              >
                {eachOption[eachDropDown.label]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      ) : (
        ""
      )
    );
    if (
      this.state.formData.selectedDomainId === null ||
      (this.state.formData.selectedDomainId !== null &&
        this.props.ovalEdgeCategoryOne.length > 0 &&
        this.state.formData.categoryId === null) ||
      (this.state.formData.selectedDomainId !== null &&
        this.state.formData.categoryId !== null &&
        this.state.subCategoryValues.length > 0 &&
        this.state.formData.subCategoryId === null)
    ) {
      // showInputFields = false;
    }
    return (
      <InnerContent>
        <Form>
          {termInputTemplate}
          {/* {dropDownListTemplate} */}
          {/* {subCategoryTemplate} */}
          {true ? <>{descriptionInputTemplate}</> : ""}
          <Flex>
            <BackButton classes="mr-1 col" isBlock={false} />
            <Button
              variant="oe"
              className={`col ${
                !showInputFields ||
                !(
                  this.state.formData.searchTerm.value.trim().length > 0 &&
                  this.state.formData.description.value.trim().length > 0
                )
                  ? "-disabled"
                  : ""
              }`}
              onClick={() => this.onSubmitFormButton()}
            >
              Save
            </Button>
          </Flex>
        </Form>
      </InnerContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { ovalEdgeSuggestTerm, ovalEdgeCommonReducer } = state;
  return {
    ovalEdgeDomains: ovalEdgeSuggestTerm.ovalEdgeDomains,
    ovalEdgeCategoryOne: ovalEdgeSuggestTerm.ovalEdgeCategoryOne,
    ovalEdgeDomainsError: ovalEdgeSuggestTerm.ovalEdgeDomainsError,
    showSelectedValueInSuggest:
      ovalEdgeCommonReducer.showSelectedValueInSuggest,
    selectedPropsBrowserValue: ovalEdgeCommonReducer.selectedBrowserValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        getOvalEdgeDomains,
        getOvalEdgeCategories,
        insertBusinessGlossary,
        setOvalEdgeCategories,
        setOvalEdgeDomains,
        setShowSelectedValueInSuggest,
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SuggestTermComponent));
