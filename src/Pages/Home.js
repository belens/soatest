import React, { Component } from "react";
import styled from "styled-components";
import { palette, spacing } from "@material-ui/system";
import SearchForm from "../components/SearchForm";
import dataUtils from "../utils/dataUtils";

const Box = styled.div`
  ${palette}
  ${spacing}
`;

export default class Home extends Component {
  render() {
    return (
      <div>
        <Box p={3}>
          <SearchForm data={dataUtils.getProvinces()} />
        </Box>
      </div>
    );
  }
}
