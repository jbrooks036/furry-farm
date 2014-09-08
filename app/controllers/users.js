'use strict';

var User    = require('../models/user'),
    moment  = require('moment'),
    mp      = require('multiparty'),
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

exports.edit = function(req, res){
  res.render('users/edit');
};

exports.uploadPhoto = function(req, res){
  User.findById(req.user._id.toString(), function(err, user){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      user.uploadPhoto(files, function(){
        res.redirect('/users/edit');
      });
    });
  });
};

exports.update = function(req, res){
  res.locals.user.save(req.body, function(){
    res.redirect('/farm/users/' + res.locals.user._id);
  });
};

exports.messages = function(req, res){
  req.user.messages(function(err, messages){
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
    if(!user) {
      req.flash('error', 'No user found or profile is private.');
      res.redirect('/');
    }
    else if(user._id.toString() === req.user._id.toString()){
      res.render('users/owner-page', {waggers: user.waggers || []});
    }
    else {
      res.render('users/public-page', {publicUser: user});
    }
  });
};

exports.wag = function(req, res){
  User.addWag(req.params.toId, req.user._id, function(err, savedItem){
    req.flash('success', 'You wagged at someone!');
    res.redirect('/farm/users/' + req.params.toId);
  });
};

exports.lick = function(req, res){
  User.addLick(req.params.lickee, req.user._id, function(err, savedItem){
    req.flash('success', 'You licked someone! View them in your favorites.');
    res.redirect('/farm/users/' + req.params.lickee);
  });
};

exports.browse = function(req, res){
  var filter = req.query || {isVisible:true};
  User.find(filter, function(err, users){
    res.render('users/browse', {users:users});
  });
};
