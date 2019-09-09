import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from './../imports/App';

import { BrowserRouter } from 'react-router-dom';
import './../imports/utils/simpl-schema-error';

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  );
});
