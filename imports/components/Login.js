import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  state = {
    error: ''
  };
  onFormSubmit = e => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  };
  render() {
    const { error } = this.state;

    return (
      <div>
        <h1>Login to Short Link App</h1>
        {error ? <p>{error}</p> : null}
        <form onSubmit={this.onFormSubmit} noValidate>
          <input ref="email" type="email" name="email" placeholder="Email" />
          <input
            ref="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}

export default Login;
