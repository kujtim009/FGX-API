import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import * as actionTypes from "../../../store/actions";

function ApiAlert(props) {
  const message = useSelector((state) => state.filterReducer.message);
  const dispatch = useDispatch();

  const alert = useAlert();
  if (props.show)
    alert.show(message, {
      timeout: 2000, // custom timeout just for this one alert
      type: "error",
      onOpen: () => {
        console.log(message);
      }, // callback that will be executed after this alert open
      onClose: () => {
        console.log(message);
        dispatch({
          type: actionTypes.ON_ALERT_CLOSE,
        });
      }, // callback that will be executed after this alert is removed
    });
  return <React.Fragment></React.Fragment>;
}

export default ApiAlert;
