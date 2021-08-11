import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

const FC = styled(FormControl)`
  width: 100%;
  text-align: center;
  align-items: center;
`;
export default function SwitchesGroup(props) {
  const [state, setState] = React.useState({
    isFree: false,
    onAppointment: true,
  });

  const handleChange = (event) => {
    const newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);
    if (props.onOptionsChange) {
      console.log(newState);
      props.onOptionsChange(newState);
    }
  };

  return (
    <FC component="fieldset">
      <FormLabel component="legend">Toon enkel:</FormLabel>
      <FormGroup>
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
      </FormGroup>
    </FC>
  );
}
