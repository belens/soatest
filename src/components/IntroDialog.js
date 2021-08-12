import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import ProvinceSelect from "./ProvinceSelect";
import FilterSearchOrganisations from "./FilterSearchOrganisations";

const Title = styled(DialogTitle)`
  h2 {
    font-size: 32px;
    color: #4a4a4a;
    font-weight: 900;
  }
  em {
    color: #ee4e8b;
    font-style: normal;
  }
`;

class IntroDialog extends Component {
  constructor(params) {
    super(params);
    this.state = {
      open: true,
      province: null,
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onModalDismiss(this.state);
    this.setState({ open: false });
  };
  handleProvinceSelect = (select) => {
    this.setState({ province: select });
  };
  handeOptionsChange = (options) => {
    this.setState({ ...this.state, options: options });
  };
  render() {
    return (
      <Dialog
        fullScreen={false}
        hideBackdrop={true}
        open={this.state.open}
        // onClose={this.handleClose}
        PaperProps={{
          style: { borderRadius: 12, width: 680, marginLeft: 450, padding: 20, maxWidth: "100%" },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <Title id="responsive-dialog-title">
          Laat je <em>testen</em>
        </Title>
        <DialogContent>
          <DialogContentText>
            <ProvinceSelect
              autoFocus
              style={{ width: "100%" }}
              defaultValue={this.state.province && this.state.province.provinceName}
              onChange={this.handleProvinceSelect}
            ></ProvinceSelect>
            <FilterSearchOrganisations
              onOptionsChange={this.handeOptionsChange}
            ></FilterSearchOrganisations>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" variant="contained">
            Zoeken
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default IntroDialog;
