// Dependencies
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
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
    blockstack.handlePendingSignIn().then(function(userData) {
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
    const { from } = this.props.location.state || { from: { pathname: '/p/profile' } }
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
  <Route {...rest} render={(props) => (
    blockstackAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  blockstackAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        blockstackAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Blockstack Create React App</h1>
        </header>
        <Router>
          <div>
            <AuthButton/>
            <ul>
              <li><Link to="/p">Protected Page</Link></li>
            </ul>
            <Route path="/login" component={Login}/>
            <PrivateRoute path='/p' component={PrivateRoutes} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
