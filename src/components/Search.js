/* eslint-disable no-use-before-define */
import React from "react";
import ComboBox from "./ComboBox";
import data from "../utils/dataUtils";
// import SwitchesGroup from "./SwitchesGroup";
import TimeAutocomplete from "./TimeAutocomplete";
import OrganisationCard from "./OrganisationCard";
import styled from "styled-components";

var Box = styled.div`
  text-align: center;
`;
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { province: null };
    // this.state = { province: 'Brussels' };
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
      <Box>
        <div>
          <p>
            Ik wil me{" "}
            <TimeAutocomplete
            // onChange={this.handleChange}
            />{" "}
            laten testen in regio{" "}
            <ComboBox
              onChange={this.handleChange}
              data={this.props.data.map((val, i) => {
                return { title: val, year: val };
              })}
            />
          </p>
        </div>

        {this.state.province &&
          data.getOrganisationsByProvince(this.state.province).map((org) => {
            return <OrganisationCard {...org} />;
          })}
        {/* <SwitchesGroup ></SwitchesGroup> */}
        {/* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */}
      </Box>
    );
  }
}
