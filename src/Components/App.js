// Dependencies
import React from "react";
import PropTypes from 'prop-types';

// Components
import Shell from "./Shell";

class App extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <Shell content={children} />
    );
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
}

export default App;
