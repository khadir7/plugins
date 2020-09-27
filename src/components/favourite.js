import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import styled from "styled-components";

import RenderItems from "components/renderItems";
import BackButton from "components/BackButton";

import { ActionMethods } from "store/actions/";

const { getFavouritesInfo, setDetailData } = ActionMethods;

const InnerContent = styled.div`
  padding: 15px;
  
`;

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
    };
  }
  componentDidMount() {
    // this.props.action.getFavouritesInfo();
    /* global chrome */
    if (chrome.storage) {
      chrome.storage.sync.get(["availableTerms"], (result) => {
        this.setState({ favourites: result.availableTerms || [] });
      });
    }
    this.props.resizeWidget();
  }
  onSelectedValue(eachObject) {
    this.props.action.setDetailData(eachObject);
    this.props.history.push("/detail/" + eachObject.redirectLink);
  }
  render() {
    return (
      <>
        <RenderItems
          searchResults={this.state.favourites}
          resizeWidget={() => this.props.resizeWidget()}
          onSelectedValue={(eachFavouriteItem) =>
            this.onSelectedValue(eachFavouriteItem)
          }
          msg="Please create any customized term"
        />
        <InnerContent>
          <BackButton />
        </InnerContent>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { ovalEdgeFavourite } = state;
  return {
    favourites: ovalEdgeFavourite.favourites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      {
        getFavouritesInfo,
        setDetailData,
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Favorite));
