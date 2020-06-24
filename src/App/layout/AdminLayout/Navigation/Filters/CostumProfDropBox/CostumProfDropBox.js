import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../store/actions";
import getUserProfessionsSubBucket from "../../../../../../store/ActionCreators/getSubProfessionAction";

class CostumProfDropBox extends Component {
  componentDidUpdate() {}
  onChangeHandler(event) {
    if (this.props.item.id === "profession_bucket") {
      this.props.profBucketChangeAction(event.target.value);
      this.props.onProfessionBucketClickActon(
        this.props.selectedState,
        event.target.value
      );
    } else if (this.props.item.id === "profession_subbucket") {
      this.props.profSubBucketChangeAction(event.target.value);
    } else {
      this.props.profChangeAction(event.target.value);
    }
  }
  render() {
    const dropElements = [];
    if (this.props.item.id === "profession_bucket") {
      if (this.props.availableProfessionsBucket) {
        dropElements.push(
          <option key="0" value="">
            All profession Buckets
          </option>
        );
      }
    } else if (this.props.item.id === "profession_subbucket") {
      if (this.props.availableProfessionsSubBucket) {
        dropElements.push(
          <option key="0" value="">
            Profession Sub Buckets
          </option>
        );
      }
    } else {
      if (this.props.availableProfessions) {
        dropElements.push(
          <option key="0" value="">
            All Professions
          </option>
        );
      }
    }

    if (this.props.item.id === "profession_bucket") {
      Object.keys(this.props.availableProfessionsBucket).forEach((key) => {
        dropElements.push(
          <option key={key} value={key}>
            {key + " (" + this.props.availableProfessionsBucket[key] + ")"}
          </option>
        );
      });
    } else if (this.props.item.id === "profession_subbucket") {
      Object.keys(this.props.availableProfessionsSubBucket).forEach((key) => {
        dropElements.push(
          <option key={key} value={key}>
            {key + " (" + this.props.availableProfessionsSubBucket[key] + ")"}
          </option>
        );
      });
    } else {
      Object.keys(this.props.availableProfessions).forEach((key) => {
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
            onChange={(e) => this.onChangeHandler(e)}>
            {dropElements}
          </Form.Control>
        </Form.Group>
      </div>
    );

    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedState: state.filterReducer.selectedState,
    availableProfessions: state.filterReducer.availableProfessions,
    selectedProfession: state.filterReducer.selectedProfession,
    availableProfessionsBucket: state.filterReducer.availableProfessionsBucket,
    selectedProfessionBucket: state.filterReducer.selectedProfessionBucket,
    availableProfessionsSubBucket:
      state.filterReducer.availableProfessionsSubBucket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profChangeAction: (prof) =>
      dispatch({
        type: actionTypes.CHANGE_PROFESSION,
        payload: prof,
      }),
    profBucketChangeAction: (prof) =>
      dispatch({
        type: actionTypes.CHANGE_PROFESSION_BUCKETS,
        payload: prof,
      }),
    profSubBucketChangeAction: (prof) =>
      dispatch({
        type: actionTypes.CHANGE_PROFESSION_SUB_BUCKETS,
        payload: prof,
      }),
    onProfessionBucketClickActon: (state, profession) =>
      dispatch(getUserProfessionsSubBucket(state, profession)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumProfDropBox);
