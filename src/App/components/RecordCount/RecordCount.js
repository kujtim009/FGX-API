import React, { Component } from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

export default class RecordCount extends Component {
  render() {
    return (
      <React.Fragment>
        <Card.Body>
          <h5 className="mb-4">Your search returned:</h5>
          <div className="row d-flex align-items-center">
            <div className="col-9">
              <h3 className="f-w-300 d-flex align-items-center m-b-0">
                <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                <b>{this.props.counter + "   "}</b> Records, we will display
                only 100 max!:
              </h3>
            </div>
          </div>
        </Card.Body>
      </React.Fragment>
    );
  }
}
