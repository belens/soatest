/* eslint-disable no-use-before-define */
import React from "react";
import ProvinceSelect from "./ProvinceSelect";
import data from "../utils/dataUtils";
import TimeAutocomplete from "./TimeAutocomplete";
import Map from "./Map";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import OrganisationList from "./OrganisationList";
import { withRouter } from "react-router";
import qs from "query-string";

var Container = styled.div``;

const SearchBox = styled.div`
  margin: 15px auto;
`;
const MapContainer = styled.div`
  margin: 15px auto;
`;
class Search extends React.Component {
  constructor(props) {
    super(props);
    let q = qs.parse(props.location.search).q;
    this.state = {
      selectedProvince: q || null,
      selectedProvinceProps: data.getProvinceProps(q) || {},
      orgs: data.getOrganisationsByProvince(q) || [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedProvince } = this.state;
    if (prevState.selectedProvince !== selectedProvince) {
      this.addQuery("q", selectedProvince);
    }
  }

  handleProvinceChange = (selectedItem, b) => {
    const selectedProvince = selectedItem && selectedItem.provinceName;
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

  addQuery = (key, value) => {
    const { location } = this.props;
    const params = new URLSearchParams({ [key]: value || "" });
    this.props.history.replace({
      pathname: location.pathname,
      search: value ? params.toString() : "",
    });
  };

  handleOptionsChange = (state) => {
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
    this.setState({ orgs: newOrgs });
  };

  render() {
    const { selectedProvinceProps, selectedProvince, orgs } = this.state;
    const { data } = this.props;

    return (
      <Container>
        <SearchBox style={{ textAlign: "center" }}>
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
            onChange={this.handleProvinceChange}
            defaultValue={selectedProvince}
            data={data.map((val) => {
              return { provinceName: val };
            })}
          />
        </SearchBox>
        <MapContainer>
          <Map {...selectedProvinceProps} orgs={orgs} language="nl-BE"></Map>
        </MapContainer>

        {selectedProvince && (
          <OrganisationList
            orgs={orgs}
            selectedProvince={selectedProvince}
            {...selectedProvinceProps}
          ></OrganisationList>
        )}
      </Container>
    );
  }
}

const SearchWithRouter = withRouter(Search);

export default SearchWithRouter;
