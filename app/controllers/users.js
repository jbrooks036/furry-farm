'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
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

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.displayProfile = function(req, res){
  console.log(req.params.userId);
  User.displayProfile(req.params.userId, function(err, user){
    console.log(user);
    if(user._id === res.locals.user._id){
      res.render('users/owner-page', {user: user});
    }
    else {
      if(!user) {
        req.flash('error', 'No user found.');
        res.redirect('/');
      }
      else {
        res.render('user/public-page', {user: user});        
      }
    }
  });
};



