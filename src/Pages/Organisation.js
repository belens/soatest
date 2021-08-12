import React, { Component } from "react";
import styled from "styled-components";
import { palette, spacing } from "@material-ui/system";
import { withRouter } from "react-router";

import { getOrganisationByName } from "../utils/dataUtils";
import { Container } from "@material-ui/core";
import OrganisationCard from "../components/OrganisationCard";
const Box = styled.div`
  ${palette}
  ${spacing}
`;

class Organisation extends Component {
  renderNotFound = () => {
    return <Container fixed>Organisation not found</Container>;
  };
  render() {
    const urlParams = this.props.match.params;
    const org = getOrganisationByName(urlParams.name);
    if (!org) {
      return this.renderNotFound();
    }
    return (
      <Box>
        <OrganisationCard {...org}></OrganisationCard>
      </Box>
    );
  }
}

const OrganisationWithRouter = withRouter(Organisation);

export default OrganisationWithRouter;
