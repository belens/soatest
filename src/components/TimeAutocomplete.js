/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={times}
      getOptionLabel={(option) => option.title}
      defaultValue={times.find(v => v.title[0])} 
      style={{ width: 200, display: "inline-block", verticalAlign: 'middle' }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Wanneer"
        />
      )}
    />
  );
}

var times = [
  { title: "binnenkort" },
  { title: "Zo snel mogelijk" },
  { title: "Deze week" },
];
