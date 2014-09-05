'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User           = require('../../models/user'),
    config         = require('../../../config'),
    google         = new GoogleStrategy(
                     {
                       clientID:     '936106218408-rs6be7fr5ql6hnmj3ktqpigeojfeflmq.apps.googleusercontent.com',
                       clientSecret: config.google.clientSecret,
                       callbackURL:  config.google.callbackUrl
                     },
                     User.googleAuthenticate);
console.log(config.google);

module.exports = google;

