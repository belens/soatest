import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';

const FC = styled(FormControl)`
  width: 100%;
  text-align: center;

`
export default function SwitchesGroup(props) {
  const [state, setState] = React.useState({
    free: false,
    onAppointment: true,
  });

  const handleChange = (event) => {
    const newState = { ...state, [event.target.name]: event.target.checked }
    setState(newState);
    if (props.onOptionsChange) {
      console.log(props);
      props.onOptionsChange(newState);
    }
  };

  return (
    <FC component="fieldset">
      <FormLabel component="legend">Meer Opties</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.free} onChange={handleChange} name="free" />}
          label="Gratis Consultatie"
        />
        <FormControlLabel
          control={<Switch checked={state.onAppointment} onChange={handleChange} name="onAppointment" />}
          label="Op Afspraak"
        />
      </FormGroup>
    </FC>
  );
}