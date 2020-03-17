import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import CsvDownloader from "react-csv-downloader";
import queryDownloadActionCreator from "../../../store/ActionCreators/queryDownloadAction";

class MainDownloadButton extends Component {
  render() {
    const startDownload = this.props.status ? (
      <CsvDownloader
        columns={this.props.dnldColumns}
        datas={this.props.dnldData}
        filename="myfile"
      />
    ) : null;
    return (
      <React.Fragment>
        <Card>
          <Card.Header
            style={{
              maxHeight: "30px",
              paddingTop: "5px",
              border: "0.5px solid lightgray"
            }}>
            <h5 className="mb-4">Download records here:</h5>
          </Card.Header>
          <Card.Body
            style={{
              maxHeight: "70px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}>
            <Button onClick={() => this.props.downloadQuery(this.props.prms)}>
              Download
            </Button>
            {startDownload}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadQuery: prm => dispatch(queryDownloadActionCreator(prm))
  };
};

export default connect(null, mapDispatchToProps)(MainDownloadButton);
