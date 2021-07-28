import "./App.css";
import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import blue from "@material-ui/core/colors/blue";


import dataUtils from "./utils/dataUtils";
import Search from "./components/Search";
import AppBar from "./components/AppBar";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: blue,
          secondary: {
            main: '#1976d2',
          },
        },
          // type: prefersDarkMode ? "dark" : "light",
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar />
        <header className="App-header">
          <Search data={dataUtils.getProvinces()} />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
