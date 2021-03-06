/* eslint-disable no-use-before-define */
import React from "react";
import ProvinceSelect from "./ProvinceSelect";
import dataUtils from "../utils/dataUtils";
import FilterSearchOrganisations from "./FilterSearchOrganisations";
import TimeAutocomplete from "./TimeAutocomplete";
import Map from "./Map";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import OrganisationList from "./OrganisationList";
import { withRouter } from "react-router";
import qs from "query-string";

const SearchCopyDisplay = { xs: "none", sm: "none", md: "inline" };

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
      activeProvinceName: q || null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeProvinceName } = this.state;
    if (prevState.activeProvinceName !== activeProvinceName) {
      this.addQuery("q", activeProvinceName);
    }
  }

  handleProvinceChange = (selectedItem, b) => {
    const activeProvinceName = (selectedItem && selectedItem.provinceName) || null;
    this.setState({
      activeProvinceName,
    });
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
    this.setState({ options: state });
  };
  getOrganisations = () => {
    const { activeProvinceName, options } = this.state;
    let organisations = [];
    if (!activeProvinceName) {
      return organisations;
    }

    organisations = dataUtils.getOrganisationsByProvince(activeProvinceName);

    if (!options) {
      return organisations;
    }
    console.log(options);
    if (typeof options.isFree === "boolean" && options.isFree === true) {
      organisations = organisations.filter((org) => {
        return org.isFree === options.isFree;
      });
    }
    if (typeof options.onAppointment === "boolean" && options.onAppointment === true) {
      organisations = organisations.filter((org) => {
        return org.onAppointment === options.onAppointment;
      });
    }

    if (typeof options.isAnonymous === "boolean" && options.isAnonymous === true) {
      organisations = organisations.filter((org) => {
        return org.isAnonymous === options.isAnonymous;
      });
    }

    return organisations;
  };

  render() {
    const { activeProvinceName } = this.state;
    const provinceProps = dataUtils.getProvinceProps(activeProvinceName);
    const orgs = this.getOrganisations();
    const provinces = dataUtils.getProvinces();

    return (
      <Container>
        <SearchBox style={{ textAlign: "center" }}>
          <Box component="span" display={SearchCopyDisplay}>
            Ik wil me{" "}
          </Box>
          <TimeAutocomplete />
          <Box component="div" display={SearchCopyDisplay}>
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
            defaultValue={qs.parse(this.props.location.search).q}
            data={provinces.map((val) => {
              return { provinceName: val };
            })}
          />
        </SearchBox>
        <MapContainer>
          <Map {...provinceProps} orgs={orgs} language="nl-BE"></Map>
        </MapContainer>
        <FilterSearchOrganisations
          onOptionsChange={this.handleOptionsChange}
        ></FilterSearchOrganisations>

        {activeProvinceName && <OrganisationList orgs={orgs}></OrganisationList>}
      </Container>
    );
  }
}

const SearchWithRouter = withRouter((props) => <Search {...props}></Search>);

export default SearchWithRouter;
