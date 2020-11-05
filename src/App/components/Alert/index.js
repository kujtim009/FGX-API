import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import * as actionTypes from "../../../store/actions";

function ApiAlert(props) {
  const messageFilter = useSelector((state) => state.filterReducer.message);
  const messageCpanel = useSelector((state) => state.cpanelReducer.message);

  const message = props.cpanelError ? messageCpanel : messageFilter;
  const dispatch = useDispatch();

  const alert = useAlert();
  const positive = props.positive ? "success" : "error";

  if (props.show)
    alert.show(message, {
      timeout: 4000, // custom timeout just for this one alert
      type: positive,
      onOpen: () => {}, // callback that will be executed after this alert open
      onClose: () => {
        dispatch({
          type: actionTypes.ON_ALERT_CLOSE,
        });
      }, // callback that will be executed after this alert is removed
    });
  return <React.Fragment></React.Fragment>;
}

export default ApiAlert;
