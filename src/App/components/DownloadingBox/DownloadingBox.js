import React, { Component } from "react";
import Classes from "./DownloadingBox.module.css";
import { BarLoader } from "react-spinners";

export default class DownloadingBox extends Component {
  render() {
    return (
      <div className={Classes.container}>
        Proccessing and Downloaing
        <div className={Classes.text}>
          {" "}
          It might take some time for the system to verifye and proccess you
          data! <br />
          please wait!
        </div>
        <div className={Classes.spinner}>
          <BarLoader width={100 + "%"} color="navy" />
          ...
        </div>
      </div>
    );
  }
}
