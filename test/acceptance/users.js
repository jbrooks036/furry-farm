/* global describe, before, beforeEach, it */

'use strict';

process.env.DB   = 'template-test';

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
      .send('email=bob@aol.com')
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

  describe('get /farm/user/:id', function(){
    it('should show a owner profile', function(done){
      request(app)
      .get('/farm/user/000000000000000000000001')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should show a public user\'s profile', function(done){
      request(app)
      .get('/farm/user/000000000000000000000002')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should not show a private user\'s profile', function(done){
      request(app)
      .get('/farm/user/000000000000000000000002')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

});

