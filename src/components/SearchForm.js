/* eslint-disable no-use-before-define */
import React from "react";
import ProvinceSelect from "./ProvinceSelect";
import data from "../utils/dataUtils";
import SwitchesGroup from "./SwitchesGroup";
import TimeAutocomplete from "./TimeAutocomplete";
import OrganisationCard from "./OrganisationCard";
import Map from "./Map";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import OrganisationList from "./OrganisationList";

var Container = styled.div``;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvince: null,
      selectedProvinceProps: {},
      orgs: [],
    };
    // this.state = { province: "Brussels" };
  }

  componentDidMount() {}

  handleChange = (selectedItem, b) => {
    const selectedProvince = selectedItem && selectedItem.title;
    if (selectedProvince) {
      this.setState({
        selectedProvince,
        selectedProvinceProps: data.getProvinceProps(selectedProvince),
        orgs: data.getOrganisationsByProvince(selectedProvince),
      });
    } else {
      this.setState({
        selectedProvince: null,
        selectedProvinceProps: null,
        orgs: [],
      });
    }
  };

  handleOptionsChange = (state) => {
    // console.log("handleOptionsChange", state);
    const { orgs } = this.state;
    const newOrgs = orgs.reduce((arr, org) => {
      if (
        org.free === state.free &&
        org.onAppointment === state.onAppointment
      ) {
        return [...orgs, org];
      }
      return orgs;
    }, []);
    console.log("handleOptionsChange", newOrgs);
    this.setState({ orgs: newOrgs });
  };

  render() {
    const { selectedProvinceProps, selectedProvince, orgs } = this.state;
    return (
      <Container>
        <div style={{ textAlign: "center" }}>
          <Box
            component="span"
            display={{ xs: "none", sm: "none", md: "inline" }}
          >
            Ik wil me{" "}
          </Box>
          <TimeAutocomplete />
          <Box
            component="div"
            display={{ xs: "none", sm: "none", md: "inline" }}
          >
            {" "}
            laten testen in regio{" "}
          </Box>
          <Box
            component="div"
            display={{ xs: "block", sm: "block", md: "none" }}
            style={{ height: 10 }}
          ></Box>
          <ProvinceSelect
            onChange={this.handleChange}
            data={this.props.data.map((val, i) => {
              return { title: val, year: val };
            })}
          />
        </div>
        <div>
          {/* <Map {...selectedProvinceProps} orgs={orgs} language="nl-BE"></Map> */}
        </div>
        <SwitchesGroup
          onOptionsChange={this.handleOptionsChange}
        ></SwitchesGroup>

        {selectedProvince && <OrganisationList orgs={orgs}></OrganisationList>}
      </Container>
    );
  }
}
