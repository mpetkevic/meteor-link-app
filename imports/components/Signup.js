import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  state = {
    error: ''
  };

  onFormSubmit = e => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters long.'
      });
    }
    Accounts.createUser({ email, password }, err => {
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
        <h1>Sign Up For app</h1>
        {error ? <p>{error}</p> : null}
        <form onSubmit={this.onFormSubmit} noValidate>
          <input ref="email" type="email" name="email" placeholder="Email" />
          <input
            ref="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Create Account</button>
        </form>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
}

export default Signup;
