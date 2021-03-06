import React, { Component } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import classes from "./DateOfBirth.module.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";

class costumDoB extends Component {
  state = { expirationDate: "", createdDate: "" };

  onData1Change = (data) => {
    if (data !== null)
      this.props.changeDobFrom(moment(data).format("YYYY-MM-DD").toString());
    else this.props.changeDobFrom(null);
  };

  onData2Change = (data) => {
    if (data !== null)
      this.props.changeDobTo(moment(data).format("YYYY-MM-DD").toString());
    else this.props.changeDobTo(null);
  };

  onData3Change = (data) => {
    if (data !== null)
      this.props.changeRecordAdded(
        moment(data).format("YYYY-MM-DD").toString()
      );
    else this.props.changeRecordAdded(null);
  };

  render() {
    const dobFrom =
      this.props.dobFrom !== null ? new Date(this.props.dobFrom) : new Date();
    const dobTo =
      this.props.dobTo !== null ? new Date(this.props.dobTo) : new Date();
    const recordAdded =
      this.props.recordAdded !== null
        ? new Date(this.props.recordAdded)
        : new Date();

    const timerPeriodContent = (
      <div>
        <div className={classes.dataPicker}>
          <span style={{ color: "rgb(180, 198, 201)" }}>
            Date of birth from:&nbsp;
          </span>
          <DatePicker
            value={dobFrom}
            onChange={this.onData1Change}
            format="y-MM-dd"
          />
        </div>
        <br />
        <div className={classes.dataPicker}>
          <span style={{ color: "rgb(180, 198, 201)" }}>
            Date of birth to:&nbsp;
          </span>
          <br />

          <DatePicker
            onChange={this.onData2Change}
            value={dobTo}
            format="y-MM-dd"
          />
        </div>
        <br />
        <div className={classes.dataPickerRecordAdded}>
          <span style={{ color: "rgb(180, 198, 201)" }}>
            Records Added:&nbsp;
          </span>
          <br />
          <DatePicker
            onChange={this.onData3Change}
            value={recordAdded}
            format="y-MM-dd"
          />
        </div>
        <br />
      </div>
    );

    return (
      <React.Fragment>
        <div className="auth-content">{timerPeriodContent}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dobFrom: state.cbdReducer.dobFrom,
    dobTo: state.cbdReducer.dobTo,
    recordAdded: state.cbdReducer.recordAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDobFrom: (date) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_DOB_FROM,
        payload: date,
      }),
    changeDobTo: (date) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_DOB_TO,
        payload: date,
      }),
    changeRecordAdded: (date) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_RECORD_ADDED,
        payload: date,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(costumDoB);
