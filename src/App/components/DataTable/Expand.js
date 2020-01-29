import React from "react";

export default function Expand(props) {
  const data = [];
  Object.keys(props.data).forEach((key, indx) => {
    data.push(
      <li key={indx}>
        <b>{key + " / "}</b>
        {props.data[key]}
      </li>
    );
  });
  console.log(props.data);
  return (
    <div>
      <ul>{data}</ul>
    </div>
  );
}
