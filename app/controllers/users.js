'use strict';

var User = require('../models/user');

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



