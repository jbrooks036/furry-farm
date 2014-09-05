/* global describe, before, beforeEach, it */

'use strict';

process.env.DB   = 'furry-farm-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../app/index'),
    cookie  = null,
    request = require('supertest');

describe('users', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=a@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /register', function(){
    it('should show the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('get /users/edit', function(){
    it('should show the user profile edit page', function(done){
      request(app)
      .get('/users/edit')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Edit Profile');
      });
    });
  });

  describe('get /auth/twitter', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/twitter')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /auth/twitter/callback', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/twitter/callback')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /auth/facebook', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/facebook')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /auth/facebook/callback', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/facebook/callback')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /auth/google', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/google')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /auth/google/callback', function(){
    it('should take user to the home page', function(done){
      request(app)
      .get('/auth/google/callback')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });


});//closing bracket


