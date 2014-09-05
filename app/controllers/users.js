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

exports.edit = function(req, res){
  console.log('>>>>>> users/edit.  req= ', req);
  res.render('users/edit');
};

exports.update = function(req, res){
  console.log('>>>>>> CONTROLLER - USER UPDATE - req.params: ', req.params);
  console.log('>>>>>> CONTROLLER - USER UPDATE - req.body: ', req.body);
  console.log('>>>>>> CONTROLLER - USER UPDATE - req.user: ', req.user);
  res.locals.user.save(req.body, function(){
    // res.redirect('/farm/users/:userId', {user:req.user._id});
    res.redirect('/users/profile', {user:req.user._id});
  });
};


