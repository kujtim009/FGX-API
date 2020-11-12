import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const DataGrid = (props) => {
  let columns = null;
  let BucketColumns = null;
  let SubBucketColumns = null;

  let data = null;
  let BucketsData = null;
  let SubBucketsData = null;

  if (!props.profession) {
    data = props.data;
    columns = props.columns.map((item) => ({
      headerName: item.name,
      field: item.name,
      sortable: true,
      filter: true,
    }));
  } else {
    columns = [
      {
        headerName: "Profession",
        field: "profession",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Count",
        field: "count",
        sortable: true,
        filter: true,
      },
    ];

    BucketColumns = [
      {
        headerName: "Profession Buckets",
        field: "profession",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Count",
        field: "count",
        sortable: true,
        filter: true,
      },
    ];

    SubBucketColumns = [
      {
        headerName: "Profession Sub Buckets",
        field: "profession",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Count",
        field: "count",
        sortable: true,
        filter: true,
      },
    ];

    data = Object.keys(props.availableProfessions).map((key) => ({
      profession: key,
      count: props.availableProfessions[key],
    }));

    BucketsData = Object.keys(props.availableProfessionsBucket).map((key) => ({
      profession: key,
      count: props.availableProfessionsBucket[key],
    }));

    SubBucketsData = Object.keys(props.availableProfessionsSubBucket).map(
      (key) => ({
        profession: key,
        count: props.availableProfessionsSubBucket[key],
      })
    );
  }
  let showProfessinBuckets = props.profession
    ? [
        <br />,
        <React.Fragment>
          <h3>Profession Buckets</h3>
          <AgGridReact
            columnDefs={BucketColumns}
            rowData={BucketsData}></AgGridReact>
        </React.Fragment>,
        <br />,
        <React.Fragment>
          <h3>Profession Sub Buckets</h3>
          <AgGridReact
            columnDefs={SubBucketColumns}
            rowData={SubBucketsData}></AgGridReact>
        </React.Fragment>,
      ]
    : null;
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        maxWidth: "100%",
      }}>
      <React.Fragment>
        <h3>Data:</h3>
        <AgGridReact columnDefs={columns} rowData={data}></AgGridReact>
      </React.Fragment>
      {showProfessinBuckets}
    </div>
  );
};

export default DataGrid;
