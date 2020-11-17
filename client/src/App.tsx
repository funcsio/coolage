import React from "react";
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import PickerCont from "./PickerContainer";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PickerCont />
      </div>
    </ThemeProvider>
  );
}

export default App;
