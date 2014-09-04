'use strict';

var local       = require('./local'),
    twitter     = require('./twitter'),
    facebook    = require('./facebook'),
    google      = require('./google'),
    serialize   = require('./serialize'),
    deserialize = require('./deserialize');

module.exports = function(passport, app){
  passport.use(local);
  passport.use(twitter);
  passport.use(facebook);
  passport.use(google);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  app.use(passport.initialize());
  app.use(passport.session());
};


