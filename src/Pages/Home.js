import React, { Component } from "react";
import styled from "styled-components";
import { palette, spacing } from "@material-ui/system";
import Map from "../components/Map";
import { Grid } from "@material-ui/core";
import IntroDialog from "../components/IntroDialog";
import OrganisationList from "../components/OrganisationList";
import DataUtils from "../utils/dataUtils";
import ProvinceSelect from "../components/ProvinceSelect";
import FilterSearchOrganisations from "../components/FilterSearchOrganisations";

const Sidebox = styled(Grid)`
  ${palette}
  ${spacing}
  
  height: 100vh;
  background-color: #ee4e8b;
`;
const SlideboxRight = styled(Grid)`
  ${palette}
  ${spacing}
  
  height: 100vh;
  width: 540px;
  overflow: auto;
  background-color: #fff;
`;

const Description = styled.p`
  max-width: 320px;

  margin: 20px 0 0;
  font-size: 16px;
  font-weight: normal;

  line-height: 1.25;
  letter-spacing: normal;
  color: #fff;
`;

const Title = styled.h1`
  width: 320px;
  height: 32px;
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  color: rgba(0, 0, 0, 0.7);

  > em {
    color: white;
    font-style: normal;
  }
`;
const MapContainer = styled(Grid)`
  height: 100vh;
  flex: 1;
`;

const Logo = styled.img`
  margin: 45px 0;
`;

export default class Home extends Component {
  state = {
    activeProvinceName: null,
  };
  getOrganisations = () => {
    const { activeProvinceName, options } = this.state;
    let organisations = [];
    if (!activeProvinceName) {
      return organisations;
    }

    organisations = DataUtils.getOrganisationsByProvince(activeProvinceName);

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
  handleModalDismiss = ({ province, options }) => {
    this.setState({ activeProvinceName: province ? province.provinceName : null, options });
  };
  handleProvinceSelect = (province) => {
    this.setState({ activeProvinceName: province ? province.provinceName : null });
  };
  render() {
    const { activeProvinceName } = this.state;
    const orgs = this.getOrganisations();
    const provinceProps = DataUtils.getProvinceProps(activeProvinceName);
    console.log(orgs);

    return (
      <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="stretch">
        {activeProvinceName ? (
          <Sidebox p={1} xs={0}>
            <Logo src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />
          </Sidebox>
        ) : (
          <Sidebox p={3} xs={4}>
            <Logo src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />
            <Title>
              Something <em>title</em>
            </Title>

            <Description>
              Lorem ipsum dolor sit amet, consec tetur adipiscing elit cras gravida tellus nisi
              lacinia, non sollicitudin mauris tristi. Integer sagittis dapibus turpis mollis elit
              accumsan non. Nulla facilisi. Etiam aliquet quis arcu vitae facilisis. Nullam nec est
              lectus. Praesent sapien nibh, faucibus ac ornare in.
            </Description>
          </Sidebox>
        )}

        <MapContainer item xs>
          <Map {...provinceProps} orgs={orgs} style={{ height: "100vh" }}></Map>
        </MapContainer>

        {activeProvinceName && (
          <SlideboxRight p={3}>
            <ProvinceSelect
              onChange={this.handleProvinceSelect}
              defaultValue={activeProvinceName}
            ></ProvinceSelect>
            <FilterSearchOrganisations
              onOptionsChange={(options) => {
                this.setState({ options });
              }}
              options={this.state.options}
            ></FilterSearchOrganisations>
            {activeProvinceName && <OrganisationList orgs={orgs}></OrganisationList>}
          </SlideboxRight>
        )}
        <IntroDialog onModalDismiss={this.handleModalDismiss}></IntroDialog>
      </Grid>
    );
  }
}
