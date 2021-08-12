import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import HomeAltPage from "./Pages/HomeAlt";
import AboutPage from "./Pages/About";
import OrganisationPage from "./Pages/Organisation";

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export default function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Work Sans", "sans-serif"],
        },
        breakpoints: {
          keys: ["xs", "sm", "md", "lg", "xl"],
          up: (key) => `@media (min-width:${values[key]}px)`,
        },
        shape: { borderRadius: 28 },

        palette: {
          primary: {
            main: "#ee4e8b",
          },
          background: {
            paper: "#fff",
            default: "#fff",
          },
          secondary: {
            contrastText: "#fff",
            dark: "#1976d2",
            light: "#64b5f6",
            main: "#ee4e8b",
          },
        },
      }),
    []
  );
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/organisations/:name">
              <OrganisationPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/alt" component={HomeAltPage}></Route>
          </Switch>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}
