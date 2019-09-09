import React, { Component, Fragment } from 'react';
import Link from './components/Link';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Login from './components/Login';
import { Tracker } from 'meteor/tracker';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  state = {
    unauthenticatedPages: ['/', '/signup'],
    authenticatedPages: ['/links']
  };

  componentDidMount() {
    Tracker.autorun(this.onAutoRun);
  }

  onAutoRun = () => {
    const isAuthenticated = !!Meteor.userId();
    const pathname = this.props.location.pathname;
    const isUnauthenticatedPage = this.state.unauthenticatedPages.includes(
      pathname
    );
    const isAuthenticatedPage = this.state.authenticatedPages.includes(
      pathname
    );

    if (isAuthenticated && isUnauthenticatedPage) {
      this.props.history.replace('/links');
    } else if (!isAuthenticated && isAuthenticatedPage) {
      this.props.history.replace('/');
    }
  };

  onEnterPublicPage = () => {
    if (Meteor.userId()) {
      this.props.history.replace('/links');
    }
  };
  onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  };

  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
            onEnter={this.onEnterPublicPage}
          />
          <Route
            path="/signup"
            component={Signup}
            onEnter={this.onEnterPublicPage}
          />
          <Route
            path="/links"
            component={Link}
            onEnter={this.onEnterPrivatePage}
          />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
