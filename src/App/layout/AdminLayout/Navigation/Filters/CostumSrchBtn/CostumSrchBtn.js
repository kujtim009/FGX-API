import React, { Component } from "react";
// import NavIcon from "./../../../Navigation/NavContent/NavIcon";
// import NavBadge from "./../../NavContent/NavBadge";
// import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

class CostumSrchBtn extends Component {
  state = {
    search: false
  };

  componentDidUpdate() {
    console.log("Component did updatee: ", this.state);
  }
  onSearchHandler(event) {
    console.log("CostumSrchBtn.js: ");
    this.setState({
      search: true
    });
  }
  onClearHandler(event) {
    console.log("CLear.js: ");
  }
  render() {
    let compBody = (
      <div className="nav-link">
        <Button
          variant="secondary"
          size="sm"
          className="mb-0 red"
          onClick={() => this.onClearHandler()}>
          Clear
        </Button>
        <Button
          size="sm"
          className="mb-0"
          onClick={() => this.onSearchHandler()}>
          Search
        </Button>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

export default CostumSrchBtn;
