/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ProvinceSelect(props) {
  console.log(props)
  return (
    <Autocomplete
      options={props.data}
      onChange={(event, newValue) => {
        props.onChange(newValue);
      }}
      getOptionLabel={(option) => option.title}
      style={{ width: 210, display: "inline-block", verticalAlign: "middle" }}
      renderInput={(params) => (
        <TextField autoFocus {...params} variant="outlined" label="Provincie" />
      )}
    />
  );
}
