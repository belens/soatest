import React, { Component } from "react";
import OrganisationCard from "./OrganisationCard";
export default class OrganisationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: props.orgs,
    };
  }
  render() {
    const { orgs } = this.state;
    return (
      <div>
        {orgs.map((org) => {
          return <OrganisationCard {...org} />;
        })}
      </div>
    );
  }
}
