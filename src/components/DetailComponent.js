import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import BackButton from "./BackButton";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ActionMethods } from "store/actions/";

const { getWikiForTable, getWikiForTableColumn } = ActionMethods;

const InnerContent = styled.div`
  padding: 15px;
  border-bottom: ${(props) => (props.borderBottom ? `1px solid #ccc` : `0px`)};
`;

const Header = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 11;
  padding: 0;
  -webkit-box-orient: vertical;
  p {
    word-wrap: break-word;
    overflow: hidden;
    margin-bottom: 0px;
  }
`;

const DetailComponent = (props) => {
  const { type } = useParams();
  useEffect(() => {
    props.resizeWidget();
  });
  useEffect(() => {
    getWikiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getWikiData = () => {
    let objectType = props?.selectedDetailData?.objectType;
    let id = props?.selectedDetailData?.id;
    // eslint-disable-next-line default-case
    switch (objectType) {
      case "oetable":
      case "oefile":
      case "oechart":
        props.action.getWikiForTable({
          oetableid: id,
          object: objectType,
        });
        break;
      case "oecolumn":
        props.action.getWikiForTableColumn({
          oecolumnid: id,
          object: objectType,
        });
        break;
    }
  };

  const onClickOnReportDataQuality = () => {
    props.history.push("/service-desk");
  };
  const onClickOnMoreInfo = (link) => {
    window.open(`${link}`);
  };
  let objectType = props?.selectedDetailData?.objectType;
  let reportIssue = type === "search" && objectType !== "story" ? true : false;
  let name =
    objectType === "oefile"
      ? props?.selectedDetailData?.shortName
      : props?.selectedDetailData.name;

  return (
    <InnerContent>
      <Header title={props?.selectedDetailData?.word || ""}>
        {props?.selectedDetailData?.word || ""}
      </Header>
      <h6 className="mt-2">Description: </h6>
      <Description
        dangerouslySetInnerHTML={{
          __html: name || "",
        }}
      />
      {props.selectedDetailData?.description ? (
        <>
          <h6 className="mt-2">Example: </h6>
          <Description
            dangerouslySetInnerHTML={{
              __html: props.selectedDetailData?.description || "",
            }}
          />
        </>
      ) : null}
      {props.selectedDetailData.link ? (
        <Button
          className="mt-4"
          variant="oe"
          block
          onClick={() => onClickOnMoreInfo(props.selectedDetailData.link)}
        >
          More Info
        </Button>
      ) : null}
      {reportIssue ? (
        <Button variant="oe" block onClick={onClickOnReportDataQuality}>
          Report Data Quality Issue
        </Button>
      ) : (
        ""
      )}
      <BackButton classes={props.selectedDetailData.link ? "" : "mt-4"} />
    </InnerContent>
  );
};

const mapStateToProps = (state) => {
  const { ovalEdgeDetail } = state;
  return {
    selectedDetailData: ovalEdgeDetail.selectedDetailData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(
      { getWikiForTable, getWikiForTableColumn },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailComponent));
