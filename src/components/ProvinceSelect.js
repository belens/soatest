/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

type Props = {
  defaultValue: string,
  data: any,
  onChange: Function,
};

export default function ProvinceSelect(props: Props) {
  const { defaultValue, data, onChange } = props;
  return (
    <Autocomplete
      options={data}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      defaultValue={{ provinceName: defaultValue }}
      getOptionLabel={(option) => option.provinceName}
      style={{ width: 210, display: "inline-block", verticalAlign: "middle" }}
      renderInput={(params) => (
        <TextField autoFocus {...params} variant="outlined" label="Provincie" />
      )}
    />
  );
}
