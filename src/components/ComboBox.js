/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.data}
      onChange={(event, newValue) => {
        props.onChange(newValue);
      }}
      getOptionLabel={(option) => option.title}
      style={{ width: 200, display: 'inline-block', 'vertical-align': 'middle' }}
      renderInput={(params) => <TextField autoFocus {...params} variant="outlined" label="Provincie"  />}
    />
  );
}
