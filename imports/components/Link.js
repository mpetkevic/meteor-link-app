import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Links } from './../api/links';
import LinksList from './LinksList';
import { Meteor } from 'meteor/meteor';

class Link extends Component {
  onLogout = () => {
    Accounts.logout();
  };

  onAddLink = e => {
    e.preventDefault();

    const url = this.refs.url.value.trim();

    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  };
  render() {
    return (
      <div>
        <h1>Link Component</h1>
        <button onClick={this.onLogout}>Logout</button>
        <LinksList />
        <p>Add Links</p>
        <form onSubmit={this.onAddLink}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}

export default Link;
