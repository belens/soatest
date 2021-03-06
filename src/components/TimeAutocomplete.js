/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  return (
    <Autocomplete
      options={times}
      getOptionLabel={(option) => option.title}
      defaultValue={times.find(v => v.title[0])} 
      style={{ width: 210, display: "inline-block", verticalAlign: 'middle' }}
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
  { title: "Zo snel mogelijk" },
  { title: "Deze week" },
];
