import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

const FC = styled(FormControl)`
  width: 100%;
  text-align: center;
  align-items: center;
  display: inline-block;
`;
export default function FilterSearchOrganisations(props) {
  const [state, setState] = React.useState({
    isFree: false,
    onAppointment: false,
  });

  const handleChange = (event) => {
    const newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);
    if (props.onOptionsChange) {
      props.onOptionsChange(newState);
    }
  };

  return (
    <FC component="fieldset">
      <FormControlLabel
        control={<Checkbox checked={state.isFree} onChange={handleChange} name="isFree" />}
        label="Gratis consultaties"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.onAppointment} onChange={handleChange} name="onAppointment" />
        }
        label="Op afspraak"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.isAnonymous} onChange={handleChange} name="isAnonymous" />
        }
        label="Anoniem testen"
      />
    </FC>
  );
}
