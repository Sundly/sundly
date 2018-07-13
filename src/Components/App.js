// Dependencies
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

// Components
import Shell from "./Shell";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#feea4e",
      contrastText: "#444"
    },
    secondary: {
      main: "#f44336",
      contrastText: "#fff"
    }
  }
});

class App extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Shell content={children} />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
}

export default App;
