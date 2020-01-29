import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../store/actions";

class CostumProfDropBox extends Component {
  componentDidUpdate() {}
  onChangeHandler(event) {
    this.props.profChangeAction(event.target.value);
  }
  render() {
    const dropElements = [];
    if (this.props.availableProfessions) {
      dropElements.push(
        <option key="0" value="">
          All professions
        </option>
      );
      Object.keys(this.props.availableProfessions).forEach(key => {
        dropElements.push(
          <option key={key} value={key}>
            {key + " (" + this.props.availableProfessions[key] + ")"}
          </option>
        );
      });
    }

    const compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="xs"
            value={this.props.selectedElement}
            as="select"
            id={this.props.item.id}
            className="mb-3"
            onChange={e => this.onChangeHandler(e)}>
            {dropElements}
          </Form.Control>
        </Form.Group>
      </div>
    );

    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    availableProfessions: state.filterReducer.availableProfessions,
    selectedProfession: state.filterReducer.selectedProfession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profChangeAction: prof =>
      dispatch({
        type: actionTypes.CHANGE_PROFESSION,
        payload: prof
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumProfDropBox);
