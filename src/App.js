import "./App.css";
import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";

import dataUtils from "./utils/dataUtils";
import Search from "./components/Search";
import AppBar from "./components/AppBar";
import { palette, spacing } from "@material-ui/system";
import styled from "styled-components";

const Box = styled.div`
  ${palette}
  ${spacing}
`;
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};
function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        breakpoints: {
          keys: ["xs", "sm", "md", "lg", "xl"],
          up: (key) => `@media (min-width:${values[key]}px)`,
        },
        palette: {
          primary: blue,
          secondary: {
            main: "#1976d2",
          },
        },
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Box p={3}>
        
            <Search data={dataUtils.getProvinces()} />
          
        
      </Box>
    </ThemeProvider>
  );
}

export default App;
