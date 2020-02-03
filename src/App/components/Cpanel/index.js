import React from "react";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import { Form, Row, Col, Button, Card, Collapse } from "react-bootstrap";
import DEMO from "../../../store/constant";

import checkAauthActionCreator from "../../../store/ActionCreators/checkAuthAction";
import getAsignedUserColumnsActionCreator from "../../../store/ActionCreators/cpanelAction/columnAction";
import getRegistredUsersActionCreator from "../../../store/ActionCreators/cpanelAction/registredUsersAction";
import * as actionTypes from "../../../store/actions";
import SortableList from "../../components/SortableList/SortableList";

class Cpanel extends React.Component {
  state = {
    isBasic: false,
    isMultiTarget: [],
    registredUsersCollapse: 1
  };

  componentDidMount() {
    this.props.checkAauthAction();
    console.log("CPANEL MOUNTED", this.props.location);
  }

  componentWillUnmount() {
    console.log("CPANEL UNMOUNTED");
  }

  onAsignUserColumnsHandler = () => {
    const { registredUsersCollapse } = this.state;
    this.setState({
      registredUsersCollapse: registredUsersCollapse !== 2 ? 2 : 0
    });

    if (registredUsersCollapse <= 1) this.props.getRegistredUsersAction();
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
    const dropDownUsersElements = this.props.registredUsers.map(item => (
      <option value={item.id}>{item.username}</option>
    ));
    const dropDownUsers = (
      <Form.Control
        as="select"
        className="mb-3"
        value={this.props.selectedUserId}
        onChange={e => this.onChangeHandler(e)}>
        {dropDownUsersElements}
      </Form.Control>
    );
    // const asignedColumnsList = this.props.asignedColumns.map(item => ({
    //   id: item.ID,
    //   name: item.Field_name
    // }));
    // const layoutList = this.props.layout.map(item => ({
    //   id: item.FieldID,
    //   name: item.LayoutField
    // }));

    const { registredUsersCollapse } = this.state;

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
                aria-expanded={registredUsersCollapse === 2}>
                Assign User Columns!
              </a>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.registredUsersCollapse === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <SortableList
                  layout={this.props.layout}
                  asignedColumnsList={this.props.asignedColumns}
                  asignedColumnsChangehandler={
                    this.props.asignedUserColumnChangeAction
                  }
                />
                <Card.Text>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Card.Text>
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
    availableProfessions: state.filterReducer.availableProfessions,
    cpanelSpinner: state.cpanelReducer.cpanelSpinner,
    registredUsers: state.cpanelReducer.registredUsers,
    selectedUserId: state.cpanelReducer.selectedUserId,
    layout: state.cpanelReducer.layout,
    asignedColumns: state.cpanelReducer.asignedColumns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserColumnsAction: userId =>
      dispatch(getAsignedUserColumnsActionCreator(userId)),
    getRegistredUsersAction: () => dispatch(getRegistredUsersActionCreator()),
    checkAauthAction: () => dispatch(checkAauthActionCreator()),
    registredUserChangeAction: userId =>
      dispatch({
        type: actionTypes.CHANGE_REG_USER,
        payload: userId
      }),
    asignedUserColumnChangeAction: columns =>
      dispatch({
        type: actionTypes.CHANGE_USER_ASIGNED_COLUMNS,
        payload: columns
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cpanel);
