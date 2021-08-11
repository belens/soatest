import React, { Component } from "react";
import styled from "styled-components";
import { palette, spacing } from "@material-ui/system";
import SearchForm from "../components/SearchForm";

const Box = styled.div`
  ${palette}
  ${spacing}
`;

export default class HomeAlt extends Component {
  render() {
    return (
      <div>
        <Box p={3}>
          <SearchForm />
        </Box>
      </div>
    );
  }
}
