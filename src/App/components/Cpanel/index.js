import React from "react";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import { Form, Row, Col, Button, Card, Collapse } from "react-bootstrap";
import DEMO from "../../../store/constant";

import checkAauthActionCreator from "../../../store/ActionCreators/checkAuthAction";
import getAsignedUserColumnsActionCreator from "../../../store/ActionCreators/cpanelAction/columnAction";
import getRegistredUsersActionCreator from "../../../store/ActionCreators/cpanelAction/registredUsersAction";
import postColumnsActionCreator from "../../../store/ActionCreators/cpanelAction/postColumnsAction";
import * as actionTypes from "../../../store/actions";
import SortableAsignUserColumns from "../SortableList/sortableAsignUserColumns";
import UserAsignedLicenseType from "../../components/UserAsignedLicenseType/UserAsignedLicenseType";
import getAsignedUserLicTypeActionCreator from "../../../store/ActionCreators/cpanelAction/postColumnsAction";
getAsignedUserLicTypeActionCreator;
class Cpanel extends React.Component {
  state = {
    userAsighnColumns: 1,
    licenseTypeAsign: 1
  };

  componentDidMount() {
    this.props.checkAauthAction();
  }

  componentWillUnmount() {}

  onAsignUserColumnsHandler = () => {
    const userAsighnColumns = this.state.userAsighnColumns;
    this.setState({
      userAsighnColumns: userAsighnColumns !== 2 ? 2 : 0
    });

    if (userAsighnColumns <= 1) this.props.getRegistredUsersAction();
  };

  onLicenseTypeChangeHandler = () => {
    const licenseTypeAsign = this.state.licenseTypeAsign;
    this.setState({
      licenseTypeAsign: licenseTypeAsign !== 2 ? 2 : 0
    });

    if (licenseTypeAsign <= 1) this.props.getRegistredUsersAction();
  };

  onChangeHandler(event) {
    this.props.registredUserChangeAction(event.target.value);
    this.props.getUserColumnsAction(event.target.value);
  }
  render() {
    const loader = (
      <div>
        <BarLoader
          width={100 + "%"}
          color="gray"
          loading={this.props.cpanelSpinner}
        />
      </div>
    );
    const dropDownUsersElements = this.props.registredUsers.map(
      (item, indx) => (
        <option key={indx} value={item.id}>
          {item.username}
        </option>
      )
    );
    const dropDownUsers = (
      <Form.Control
        as="select"
        className="mb-3"
        value={this.props.selectedUserId}
        onChange={e => this.onChangeHandler(e)}>
        <option value={0}>Select user</option>
        {dropDownUsersElements}
      </Form.Control>
    );

    const { userAsighnColumns, licenseTypeAsign } = this.state;

    const content = this.props.isAdmin ? (
      <React.Fragment>
        <h5>Control Panel</h5>
        {loader}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <a
                href={DEMO.BLANK_LINK}
                onClick={this.onAsignUserColumnsHandler}
                aria-controls="accordion2"
                aria-expanded={userAsighnColumns === 2}>
                Assign License Types!
              </a>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.userAsighnColumns === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <UserAsignedLicenseType
                  unAsignedColumns={this.props.unAsignedColumns}
                  asignedColumnsList={this.props.asignedColumns}
                  asignedColumnsChangehandler={
                    this.props.asignedUserColumnChangeAction
                  }
                  unAsignedColumnsHandler={
                    this.props.unAsignedColumnChangeAction
                  }
                />

                <Card.Footer>
                  <Button
                    onClick={() =>
                      this.props.postUserColumnAction(
                        this.props.asignedColumns,
                        this.props.selectedUserId
                      )
                    }>
                    SAVE CHANGES
                  </Button>
                </Card.Footer>
              </Card.Body>
            </div>
          </Collapse>
        </Card>

        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <a
                href={DEMO.BLANK_LINK}
                onClick={this.onLicenseTypeChangeHandler}
                aria-controls="accordion2"
                aria-expanded={licenseTypeAsign === 2}>
                Assign User Columns!
              </a>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.licenseTypeAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <SortableAsignUserColumns
                  unAsignedColumns={this.props.unAsignedColumns}
                  asignedColumnsList={this.props.asignedColumns}
                  asignedColumnsChangehandler={
                    this.props.asignedUserColumnChangeAction
                  }
                  unAsignedColumnsHandler={
                    this.props.unAsignedColumnChangeAction
                  }
                />

                <Card.Footer>
                  <Button
                    onClick={() =>
                      this.props.postUserColumnAction(
                        this.props.asignedColumns,
                        this.props.selectedUserId
                      )
                    }>
                    SAVE CHANGES
                  </Button>
                </Card.Footer>
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      </React.Fragment>
    ) : (
      <h3 style={{ color: "red" }}>
        You are not authorized to enter this page!
      </h3>
    );

    return (
      <React.Fragment>
        <div>{content}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.authReducer.isAdmin,
    columns: state.filterReducer.columns,
    cpanelSpinner: state.cpanelReducer.cpanelSpinner,
    registredUsers: state.cpanelReducer.registredUsers,
    selectedUserId: state.cpanelReducer.selectedUserId,
    unAsignedColumns: state.cpanelReducer.unAsignedColumns,
    asignedColumns: state.cpanelReducer.asignedColumns,
    userAsignedLicenseTypes: state.cpanelReducer.userAsignedLicenseTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserColumnsAction: userId =>
      dispatch(getAsignedUserColumnsActionCreator(userId)),
    getRegistredUsersAction: () => dispatch(getRegistredUsersActionCreator()),
    checkAauthAction: () => dispatch(checkAauthActionCreator()),
    postUserColumnAction: (column, userId) =>
      dispatch(postColumnsActionCreator(column, userId)),
    registredUserChangeAction: userId =>
      dispatch({
        type: actionTypes.CHANGE_REG_USER,
        payload: userId
      }),
    asignedUserColumnChangeAction: columns =>
      dispatch({
        type: actionTypes.CHANGE_USER_ASIGNED_COLUMNS,
        payload: columns
      }),
    unAsignedColumnChangeAction: columns =>
      dispatch({
        type: actionTypes.CHANGE_UNASIGNED_COLUMNS,
        payload: columns
      }),
    getUserAsignedLicenseTypeAction: userId =>
      dispatch(getAsignedUserLicTypeActionCreator(userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cpanel);
