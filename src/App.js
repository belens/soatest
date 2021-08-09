import "./App.css";
import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import blue from "@material-ui/core/colors/blue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AppBar from "./components/AppBar";

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
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <AppBar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>

            {/* <Route path="/:id" children={<Child />} /> */}
          </Switch>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
