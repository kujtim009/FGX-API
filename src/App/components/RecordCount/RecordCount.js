import React, { Component } from "react";
import { Row, Col, Card, Button, Tabs, Tab } from "react-bootstrap";

export default class RecordCount extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Header
            style={{
              maxHeight: "30px",
              paddingTop: "5px",
              border: "0.5px solid lightgray"
            }}>
            <h5 className="mb-4">Your search returned:</h5>
          </Card.Header>
          <Card.Body style={{ maxHeight: "50px", paddingTop: "10px" }}>
            <h3 className="f-w-300 d-flex align-items-center m-b-0">
              <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
              <b>{this.props.counter + " "}</b>&nbsp;&nbsp; records, we will
              display only 100 max!
            </h3>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
