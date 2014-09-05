'use strict';

var User    = require('../models/user'),
    moment  = require('moment'),
    Message = require('../models/message');


exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout();
  req.flash('notice', 'T.T.F.N');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.messages = function(req, res){
  req.user.messages(function(err, messages){
    console.log('>>>**<<<<', messages);
    res.render('users/messages', {messages:messages, moment:moment});
  });
};

exports.message = function(req, res){
  Message.read(req.params.msgId, function(err, message){
    res.render('users/message', {message:message, moment:moment});
  });
};

exports.displayProfile = function(req, res){
  User.displayProfile(req.params.userId, function(err, user){
    //No user found, return error
    if(!user) {
      req.flash('error', 'No user found.');
      res.redirect('/');
    }
    //Is it the owner?
    else if(user._id.toString() === req.user._id.toString()){
      res.render('users/owner-page', {user: user});
    }
    //Display public profile
    else {
      res.render('users/public-page', {user: user});
    }
  });
};



exports.browse = function(req, res){
  User.find({isVisible:true}, function(err, users){
    res.render('users/browse', {users:users});
  });
};


