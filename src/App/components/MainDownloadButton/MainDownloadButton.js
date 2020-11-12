import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import queryDownloadActionCreator from "../../../store/ActionCreators/queryDownloadAction";

class MainDownloadButton extends Component {
  render() {
    return (
      <React.Fragment>
        <Card
          style={{
            marginTop: "37px",
          }}>
          <Card.Header
            style={{
              maxHeight: "30px",
              paddingTop: "5px",
              border: "0.5px solid lightgray",
            }}>
            <h5 className="mb-4">Download records here:</h5>
          </Card.Header>
          <Card.Body
            style={{
              maxHeight: "70px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}>
            <Button
              onClick={() =>
                this.props.downloadQuery(
                  this.props.prms,
                  this.props.activeProject
                )
              }>
              Download
            </Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloadQuery: (prm, activeProject) =>
      dispatch(queryDownloadActionCreator(prm, activeProject)),
  };
};

export default connect(null, mapDispatchToProps)(MainDownloadButton);
