import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import { WebApp } from 'meteor/webapp';
import { Links } from './../imports/api/links';
import './../imports/utils/simpl-schema-error';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, response, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      response.statusCode = 302;
      response.setHeader('Location', link.url);
      response.end();
    } else {
      next();
    }
  });

  Accounts.validateNewUser(user => {
    const email = user.emails[0].address;

    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email });

    return true;
  });
});
