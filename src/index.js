// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// Blockstack app
import App from './app'

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

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById('root'));

registerServiceWorker();
