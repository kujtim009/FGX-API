import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import classes from "./DataTable.module.css";
import Expand from "./Expand";

const customStyles = {
  table: {
    style: {
      backgroundColor: "gray"
    }
  },
  rows: {
    style: {}
  },
  headCells: {
    style: {
      paddingLeft: "4px", // override the cell padding for head cells
      paddingRight: "4px",
      border: "1px solid rgb(182, 182, 182)",
      fontWeight: "bold",
      backgroundColor: "lightgray",
      width: "fit-content"
    }
  },
  cells: {
    style: {
      paddingLeft: "4px", // override the cell padding for data cells
      paddingRight: "4px",
      borderRight: "1px solid rgb(182, 182, 182)",
      width: "fit-content"
    }
  }
};

const MyComponent = props => (
  <DataTable
    columns={props.columns}
    data={props.data}
    highlightOnHover
    expandableRows
    expandableRowsComponent={<Expand data={props.data} />}
    pointerOnHover
    dense
    pagination
    paginationPerPage={15}
    customStyles={customStyles}
    className={classes.table}
  />
);

export default MyComponent;
