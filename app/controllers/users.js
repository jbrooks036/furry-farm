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

/*
exports.edit = function(req, res){
  User.findById(req.params.id, function(err, client){
    if(res.locals.user._id.toString() === client._id.toString()){
      res.render('users/edit', {client:client});
    }else{
      res.redirect('/users/'+client._id);
    }
  });
};

exports.update = function(req, res){
  res.locals.user.save(req.body, function(){
    res.redirect('/profile');
  });
};
*/


