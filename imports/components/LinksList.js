import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from './../api/links';
import { Meteor } from 'meteor/meteor';

class LinksList extends Component {
  state = {
    links: []
  };
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }
  render() {
    const linksList = this.state.links.map(link => {
      return <p key={link._id}>{link.url}</p>;
    });

    return (
      <div>
        <p>Links List</p>
        {linksList}
      </div>
    );
  }
}

export default LinksList;
