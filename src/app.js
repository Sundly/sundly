import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import PrivateRoutes from './private-routes'
import Login from './Components/Login'
import './app.css';

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

class LoginContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      redirectToReferrer: false
    }
  }

  login(e) {
    e.preventDefault();

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

    return React.createElement(Login, { login: this.login });
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
          <Route path="/login" component={LoginContainer}/>
          <Route path="/logout" component={Logout}/>
          <PrivateRoute path='/' component={PrivateRoutes} />
        </div>
      </Router>
    )
  }
}

export default App;
