/* eslint-disable no-use-before-define */
import React from "react";
import ComboBox from "./ComboBox";
import data from "../utils/dataUtils";
// import SwitchesGroup from "./SwitchesGroup";
import TimeAutocomplete from "./TimeAutocomplete";
import OrganisationCard from "./OrganisationCard";
import Map from "./Map";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

var Container = styled.div`
  text-align: center;
`;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { province: null };
    // this.state = { province: "Brussels" };
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  handleChange = (selectedItem, b) => {
    this.setState({
      province: selectedItem ? selectedItem.title : null,
    });
  };

  render() {
    return (
      <Container>
        <div>
          <p>
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
              {" "}laten testen in regio{" "}
            </Box>
            <Box
              component="div"
              display={{ xs: "block", sm: "block", md: "none" }}
              style={{ height: 10 }}
            ></Box>
            <ComboBox
              onChange={this.handleChange}
              data={this.props.data.map((val, i) => {
                return { title: val, year: val };
              })}
            />
          </p>
        </div>
        <div><Map {...data.getProvinceProps(this.state.province)} orgs={data.getOrganisationsByProvince(this.state.province)}  language="nl-BE"></Map></div>
        {this.state.province &&
          data.getOrganisationsByProvince(this.state.province).map((org) => {
            return <OrganisationCard {...org} />;
          })}
        {/* <SwitchesGroup ></SwitchesGroup> */}
        {/* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */}
      </Container>
    );
  }
}
