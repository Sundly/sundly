// Dependencies
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
// Styles
import './app.css';
// Private App Routes
import PrivateRoutes from './private-routes'

// Blockstack
const blockstack = require('blockstack');

const checkSignedInStatus = () => {
  if (blockstack.isUserSignedIn()) {
    return true;
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(_userData) {
      window.location = window.location.origin
    })
    return false;
  }
}

const blockstackAuth = {
  isAuthenticated: checkSignedInStatus(),
  authenticate(cb) {
    blockstack.redirectToSignIn()
  },
  signout(cb) {
    cb();
    blockstack.signUserOut(window.location.href)
      .then(() => { this.isAuthenticated = false })
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    blockstackAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      blockstackAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />
    )
  }} />
)

class Logout extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    blockstackAuth.signout(() => history.push('/login'))
  }

  render() {
    return '';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <PrivateRoute path='/' component={PrivateRoutes} />
        </div>
      </Router>
    )
  }
}

export default App;
