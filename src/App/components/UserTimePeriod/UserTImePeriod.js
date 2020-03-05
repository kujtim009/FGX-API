import React, { Component } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import classes from "./UserTimePeriod.module.css";

class UserTimePeriod extends Component {
  state = { expirationDate: "", createdDate: "" };

  onData1Change = data => {
    // console.log("CHANGE TIME PERIOD DATA1", newDate.toString());
    const crtDate = moment(data);
    const expDate = moment(this.props.expirationDate);

    const dataDiff = expDate.diff(crtDate, "days");
    console.log("ON DATA2 CHANGE: ", crtDate, expDate, dataDiff);
    this.props.changeTimePeriodCrtd(
      data
        ? {
            createdDate: moment(data)
              .format("MM/DD/YYYY")
              .toString(),
            dayes: dataDiff
          }
        : null
    );
  };

  onData2Change = data => {
    const crtDate = moment(this.props.createdDate);
    const expDate = moment(data);

    const dataDiff = expDate.diff(crtDate, "days");
    console.log("ON DATA2 CHANGE: ", crtDate, expDate, dataDiff);
    this.props.changeTimePeriodExpr(
      data
        ? {
            expirationDate: moment(data)
              .format("MM/DD/YYYY")
              .toString(),
            dayes: dataDiff
          }
        : null
    );
  };

  saveTimePeriodHandler = () => {
    const crtDate = moment(this.props.createdDate);
    const expDate = moment(this.props.expirationDate);
    const dataDiff = expDate.diff(crtDate, "days");
    if (dataDiff >= 0)
      this.props.postTimePeriod(
        this.props.userID,
        this.props.createdDate,
        this.props.expirationDate
      );
    else alert("Expiration date can't be smaller!");
  };
  render() {
    const createdDate =
      this.props.createdDate !== "" ? new Date(this.props.createdDate) : null;
    const expirationDate =
      this.props.expirationDate !== ""
        ? new Date(this.props.expirationDate)
        : null;

    const timerPeriodContent =
      this.props.userID !== "" ? (
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <i className="feather icon-user-plus auth-icon" />
            </div>

            <div className="input-group mb-3">
              <h4 className="mb-4">Asign Time Period</h4>
            </div>
            <div className={classes.dataPicker}>
              <span className="mb-4">
                Created Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <DatePicker
                value={createdDate}
                onChange={this.onData1Change}
                format="y-MM-dd"
              />
            </div>
            <br />
            <div className={classes.dataPicker}>
              <span className="mb-4">Expiration Date:&nbsp;</span>
              <DatePicker
                onChange={this.onData2Change}
                value={expirationDate}
                format="y-MM-dd"
              />
            </div>
            <br />
            <div className="input-group mb-3">
              <h4 className="mb-4">Dayes Left:&nbsp;{this.props.dayesLeft}</h4>
            </div>
            <p>{this.props.message}</p>
            <button
              onClick={this.saveTimePeriodHandler}
              className="btn btn-primary shadow-2 mb-4">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="input-group mb-3">
          <h4 className="mb-4">Select User First!</h4>
        </div>
      );
    return <div className="auth-content">{timerPeriodContent}</div>;
  }
}

export default UserTimePeriod;
