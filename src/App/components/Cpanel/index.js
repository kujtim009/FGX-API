import React from "react";
import { connect } from "react-redux";

import { BarLoader } from "react-spinners";
import { Form, Button, Card, Collapse } from "react-bootstrap";
import DEMO from "../../../store/constant";
import { Link } from "react-router-dom";
import checkAauthActionCreator from "../../../store/ActionCreators/checkAuthAction";
import getAsignedUserColumnsActionCreator from "../../../store/ActionCreators/cpanelAction/columnAction";
import getRegistredUsersActionCreator from "../../../store/ActionCreators/cpanelAction/registredUsersAction";
import postColumnsActionCreator from "../../../store/ActionCreators/cpanelAction/postColumnsAction";
import * as actionTypes from "../../../store/actions";
import SortableAsignUserColumns from "../SortableList/sortableAsignUserColumns";
import UserAsignedLicenseType from "../../components/UserAsignedLicenseType/UserAsignedLicenseType";
import UserAsignedProjects from "../../components/UserAsignedProjects/UserAsignedProjects";
import UserMaxDnldAssign from "../../components/UserMaxDnldAssign/UserMaxDnldAssign";
import getAsignedUserLicTypeActionCreator from "../../../store/ActionCreators/cpanelAction/getUserLicenseTypeAction";
import getAsignedUserProjectsActionCreator from "../../../store/ActionCreators/cpanelAction/getUserProjectsAction";
import getAsignedMaxActionActionCreator from "../../../store/ActionCreators/cpanelAction/getUserMaxDnldAction";
import postAsignLicType from "../../../store/ActionCreators/cpanelAction/postAssignLicType";
import postAsignProjects from "../../../store/ActionCreators/cpanelAction/postAssignProjects";
import postMaxDnld from "../../../store/ActionCreators/cpanelAction/postAssignMaxDnld";
import SortableProfessionAssign from "../../components/SortableProfessionAssign/SortableProfessionAssign";
import SortableBucketAssign from "../../components/SortableBucketAssign/SortableBucketAssign";

import getProfessionActionCreator from "../../../store/ActionCreators/cpanelAction/getProfessionsAction";
import postProfessionActionCreator from "../../../store/ActionCreators/cpanelAction/postProfessionAction";
import postBucketsActionCreator from "../../../store/ActionCreators/cpanelAction/postBucketsAction";
import getBucketsActionCreator from "../../../store/ActionCreators/cpanelAction/getBucketsAction";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import postRegisterUserActionCreator from "../../../store/ActionCreators/cpanelAction/postRegisterUserAction";

import UserTimePeriod from "../../components/UserTimePeriod/UserTImePeriod";
import getUserTimePeriodActionCreator from "../../../store/ActionCreators/cpanelAction/getUserTimePeridAction";
import postTimePeriodActionCreator from "../../../store/ActionCreators/cpanelAction/postUserTimerPeriodAction";
import ApiAlert from "../Alert";

class Cpanel extends React.Component {
  state = {
    userAsighnColumns: 1,
    licenseTypeAsign: 1,
    projectAsign: 1,
    maxDnldAsign: 1,
    professionAsign: 1,
    bucketAsign: 1,
    registerNewUser: 1,
    userTimePeriodAsign: 1,
    enableProfessionSaveButton: true,
    enableBucketSaveButton: true,
  };

  componentDidMount() {
    this.props.checkAauthAction();
  }

  componentWillUnmount() {}

  onAsignUserColumnsHandler = () => {
    const userAsighnColumns = this.state.userAsighnColumns;
    this.setState({
      userAsighnColumns: userAsighnColumns !== 2 ? 2 : 0,
    });

    if (userAsighnColumns <= 1) this.props.getRegistredUsersAction();
  };

  onProfessionAsignHandler = () => {
    const professionAsign = this.state.professionAsign;
    this.setState({
      professionAsign: professionAsign !== 2 ? 2 : 0,
    });

    if (professionAsign <= 1) this.props.getRegistredUsersAction();
  };

  onMaxDnldAssingHandler = () => {
    const maxDnldAsign = this.state.maxDnldAsign;
    this.setState({
      maxDnldAsign: maxDnldAsign !== 2 ? 2 : 0,
    });

    if (maxDnldAsign <= 1) this.props.getRegistredUsersAction();
  };

  onBucketAsignHandler = () => {
    const bucketAsign = this.state.bucketAsign;
    this.setState({
      bucketAsign: bucketAsign !== 2 ? 2 : 0,
    });

    if (bucketAsign <= 1) this.props.getRegistredUsersAction();
  };

  onLicenseTypeChangeHandler = () => {
    const licenseTypeAsign = this.state.licenseTypeAsign;
    this.setState({
      licenseTypeAsign: licenseTypeAsign !== 2 ? 2 : 0,
    });

    if (licenseTypeAsign <= 1) this.props.getRegistredUsersAction();
  };

  onProjectChangeHandler = () => {
    const projectAsign = this.state.projectAsign;
    this.setState({
      projectAsign: projectAsign !== 2 ? 2 : 0,
    });

    if (projectAsign <= 1) this.props.getRegistredUsersAction();
  };

  onRegisterNewUserHandler = () => {
    const registerNewUser = this.state.registerNewUser;
    this.setState({
      registerNewUser: registerNewUser !== 2 ? 2 : 0,
    });
  };

  onUserTimePeriodHandler = () => {
    const userTimePeriodAsign = this.state.userTimePeriodAsign;
    this.setState({
      userTimePeriodAsign: userTimePeriodAsign !== 2 ? 2 : 0,
    });
    if (userTimePeriodAsign <= 1) this.props.getRegistredUsersAction();
  };

  onChangeHandler(event) {
    this.props.registredUserChangeAction(event.target.value);

    if (this.state.userAsighnColumns === 2)
      this.props.getUserColumnsAction(event.target.value);

    if (this.state.licenseTypeAsign === 2)
      this.props.getUserAsignedLicenseTypeAction(event.target.value);

    if (this.state.projectAsign === 2)
      this.props.getUserAsignedProjectsAction(event.target.value);

    if (this.state.maxDnldAsign === 2)
      this.props.getUserMaxDownloadAction(event.target.value);

    if (this.state.userTimePeriodAsign === 2)
      this.props.getUserAsignedTimePeriodAction(event.target.value);

    if (this.state.bucketAsign === 2) {
      this.props.getAllBuckets(event.target.value);
      this.setState({
        enableBucketSaveButton: false,
      });
    }
    if (this.state.professionAsign === 2) {
      this.props.getAllProfessions(event.target.value);
      this.setState({
        enableProfessionSaveButton: false,
      });
    }
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
        onChange={(e) => this.onChangeHandler(e)}>
        <option value={0}>Select user</option>
        {dropDownUsersElements}
      </Form.Control>
    );

    const {
      userAsighnColumns,
      licenseTypeAsign,
      projectAsign,
      maxDnldAsign,
      professionAsign,
      bucketAsign,
      registerNewUser,
      userTimePeriodAsign,
    } = this.state;

    const content = this.props.isAdmin ? (
      <React.Fragment>
        <h5>Control Panel</h5>
        {loader}
        {/* ASSIIGN PROJECTS TO USER */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onProjectChangeHandler}
                aria-controls="accordion2"
                aria-expanded={projectAsign === 2}>
                Assign Projects to users!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.projectAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <UserAsignedProjects
                  usersProjects={this.props.userAsignedProjects}
                />

                <Card.Footer>
                  <Button
                    onClick={() =>
                      this.props.postUserProjectsAction(
                        this.props.userAsignedProjects,
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
        {/* ASSIIGN MAX DNLD TO USER */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onMaxDnldAssingHandler}
                aria-controls="accordion2"
                aria-expanded={maxDnldAsign === 2}>
                Assign max records download!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.maxDnldAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <UserMaxDnldAssign userMaxDnld={this.props.userMaxDnld} />

                <Card.Footer>
                  <Button
                    onClick={() =>
                      this.props.postMaxDnldAction(
                        this.props.userMaxDnld,
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
        {/* ASSIIGN LICENSE TYPES */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onLicenseTypeChangeHandler}
                aria-controls="accordion2"
                aria-expanded={licenseTypeAsign === 2}>
                Assign License Types!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.licenseTypeAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <UserAsignedLicenseType
                  usersLicType={this.props.userAsignedLicenseTypes}
                />

                <Card.Footer>
                  <Button
                    onClick={() =>
                      this.props.postUserLicTypeAction(
                        this.props.userAsignedLicenseTypes,
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
        {/* ASSIIGN USER COLUMNS */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onAsignUserColumnsHandler}
                aria-controls="accordion2"
                aria-expanded={userAsighnColumns === 2}>
                Assign User Columns!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.userAsighnColumns === 2}>
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
        {/* ASSIIGN PROFESSIONS */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onProfessionAsignHandler}
                aria-controls="accordion2"
                aria-expanded={professionAsign === 2}>
                Assign Professions to User!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.professionAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <SortableProfessionAssign
                  unAsignedProfessions={this.props.unAsignedProfessions}
                  asignedProfessions={this.props.asignedProfessions}
                  asignedProfessionChangehandler={
                    this.props.asignedUserProfessionChangeAction
                  }
                  unAsignedProfessionHandler={
                    this.props.unAsignedUserProfessionChangeAction
                  }
                />

                <Card.Footer>
                  <Button
                    disabled={this.state.enableProfessionSaveButton}
                    onClick={() =>
                      this.props.postUserProfessions(
                        this.props.asignedProfessions,
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
        {/* ASSIIGN BUCKETS TO USERS */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onBucketAsignHandler}
                aria-controls="accordion2"
                aria-expanded={bucketAsign === 2}>
                Assign Profession Buckets to User!
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.bucketAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <SortableBucketAssign
                  unAsignedBuckets={this.props.unAsignedBuckets}
                  asignedBuckets={this.props.asignedBuckets}
                  asignedBucketsChangeHandler={
                    this.props.asignedUserBucketsChangeAction
                  }
                  unAsignedBucketsHandler={
                    this.props.unAsignedUserBucketsChangeAction
                  }
                />

                <Card.Footer>
                  <Button
                    disabled={this.state.enableBucketsSaveButton}
                    onClick={() =>
                      this.props.postUserBuckets(
                        this.props.asignedBuckets,
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
        {/* REGISTER NEW USER */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onRegisterNewUserHandler}
                aria-controls="accordion2"
                aria-expanded={registerNewUser === 2}>
                Register New User
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.registerNewUser === 2}>
            <div id="accordion2">
              <Card.Body>
                <RegisterUser
                  message={this.props.message}
                  addUserAction={this.props.postRegisterUser}
                />
              </Card.Body>
            </div>
          </Collapse>
        </Card>
        {/* USER TIME PERIOD ASIGN */}
        <Card className="mt-2">
          <Card.Header>
            <Card.Title as="h5">
              <Link
                onClick={this.onUserTimePeriodHandler}
                aria-controls="accordion2"
                aria-expanded={userTimePeriodAsign === 2}>
                Asign Time Period
              </Link>
            </Card.Title>
          </Card.Header>
          <Collapse in={this.state.userTimePeriodAsign === 2}>
            <div id="accordion2">
              <Card.Body>
                {dropDownUsers}
                <UserTimePeriod
                  userID={this.props.selectedUserId}
                  message={this.props.message}
                  createdDate={this.props.timePeriodCreatedDate}
                  expirationDate={this.props.timePeriodExpirationDate}
                  dayesLeft={this.props.timePeriodDayes}
                  postTimePeriod={this.props.postTimePeriod}
                  changeTimePeriodCrtd={
                    this.props.changeUserAsignedTimePeriodCrtdAction
                  }
                  changeTimePeriodExpr={
                    this.props.changeUserAsignedTimePeriodExprAction
                  }
                />
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
        {
          <ApiAlert
            show={this.props.showErrorMessage}
            positive={this.props.positiveMessage}
            cpanelError={true}
          />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.authReducer.isAdmin,
    columns: state.filterReducer.columns,
    cpanelSpinner: state.cpanelReducer.cpanelSpinner,
    registredUsers: state.cpanelReducer.registredUsers,
    selectedUserId: state.cpanelReducer.selectedUserId,
    unAsignedColumns: state.cpanelReducer.unAsignedColumns,
    asignedColumns: state.cpanelReducer.asignedColumns,
    userAsignedLicenseTypes: state.cpanelReducer.userAsignedLicenseTypes,
    userAsignedProjects: state.cpanelReducer.userAsignedProjects,
    unAsignedProfessions: state.cpanelReducer.unAsignedProfessions,
    asignedProfessions: state.cpanelReducer.asignedProfessions,
    unAsignedBuckets: state.cpanelReducer.unAsignedBuckets,
    asignedBuckets: state.cpanelReducer.asignedBuckets,
    message: state.cpanelReducer.message,
    timePeriodCreatedDate: state.cpanelReducer.timePeriodCreatedDate,
    timePeriodExpirationDate: state.cpanelReducer.timePeriodExpirationDate,
    timePeriodDayes: state.cpanelReducer.timePeriodDayes,
    showErrorMessage: state.cpanelReducer.showErrorMessage,
    positiveMessage: state.cpanelReducer.positiveMessage,
    userMaxDnld: state.cpanelReducer.userMaxDnld,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserColumnsAction: (userId) =>
      dispatch(getAsignedUserColumnsActionCreator(userId)),
    getRegistredUsersAction: () => dispatch(getRegistredUsersActionCreator()),
    checkAauthAction: () => dispatch(checkAauthActionCreator()),
    postUserColumnAction: (column, userId) =>
      dispatch(postColumnsActionCreator(column, userId)),
    registredUserChangeAction: (userId) =>
      dispatch({
        type: actionTypes.CHANGE_REG_USER,
        payload: userId,
      }),
    asignedUserColumnChangeAction: (columns) =>
      dispatch({
        type: actionTypes.CHANGE_USER_ASIGNED_COLUMNS,
        payload: columns,
      }),
    unAsignedColumnChangeAction: (columns) =>
      dispatch({
        type: actionTypes.CHANGE_UNASIGNED_COLUMNS,
        payload: columns,
      }),
    getUserAsignedLicenseTypeAction: (userId) =>
      dispatch(getAsignedUserLicTypeActionCreator(userId)),

    getUserAsignedProjectsAction: (userId) =>
      dispatch(getAsignedUserProjectsActionCreator(userId)),

    getUserMaxDownloadAction: (userId) =>
      dispatch(getAsignedMaxActionActionCreator(userId)),

    postUserLicTypeAction: (lic, userId) =>
      dispatch(postAsignLicType(lic, userId)),
    postUserProjectsAction: (projects, userId) =>
      dispatch(postAsignProjects(projects, userId)),
    postMaxDnldAction: (maxDnld, userId) =>
      dispatch(postMaxDnld(maxDnld, userId)),
    getAllProfessions: (userId) => dispatch(getProfessionActionCreator(userId)),
    asignedUserProfessionChangeAction: (professions) =>
      dispatch({
        type: actionTypes.CHANGE_USER_ASIGNED_PROFESSIONS,
        payload: professions,
      }),
    unAsignedUserProfessionChangeAction: (professions) =>
      dispatch({
        type: actionTypes.CHANGE_UNASIGNED_PROFESSIONS,
        payload: professions,
      }),

    asignedUserBucketsChangeAction: (professions) =>
      dispatch({
        type: actionTypes.CHANGE_USER_ASIGNED_BUCKETS,
        payload: professions,
      }),
    unAsignedUserBucketsChangeAction: (professions) =>
      dispatch({
        type: actionTypes.CHANGE_UNASIGNED_BUCKETS,
        payload: professions,
      }),
    postUserProfessions: (professions, userId) =>
      dispatch(postProfessionActionCreator(professions, userId)),

    postUserBuckets: (professions, userId) =>
      dispatch(postBucketsActionCreator(professions, userId)),

    getAllBuckets: (userId) => dispatch(getBucketsActionCreator(userId)),

    postRegisterUser: (userData) =>
      dispatch(postRegisterUserActionCreator(userData)),
    postTimePeriod: (userid, createdDate, expirationDate) =>
      dispatch(
        postTimePeriodActionCreator(userid, createdDate, expirationDate)
      ),
    getUserAsignedTimePeriodAction: (userID) =>
      dispatch(getUserTimePeriodActionCreator(userID)),
    changeUserAsignedTimePeriodCrtdAction: (data) =>
      dispatch({
        type: actionTypes.CHANGE_TIME_PERIOD,
        payload: {
          createdDate: data.createdDate,
          timePeriodDayes: data.dayes,
        },
      }),
    changeUserAsignedTimePeriodExprAction: (data) =>
      dispatch({
        type: actionTypes.CHANGE_TIME_PERIOD,
        payload: {
          expirationData: data.expirationDate,
          timePeriodDayes: data.dayes,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cpanel);
