/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/body-parser/body-parser.d.ts" />
/// <reference path="./typings/cookie-parser/cookie-parser.d.ts" />
/// <reference path="./typings/errorhandler/errorhandler.d.ts" />
/// <reference path="./typings/express/express.d.ts" />
/// <reference path="./typings/fs-extra/fs-extra.d.ts" />
/// <reference path="./typings/method-override/method-override.d.ts" />
/// <reference path="./typings/moment/moment.d.ts" />
/// <reference path="./typings/mongoose/mongoose.d.ts" />
/// <reference path="./typings/nodemailer/nodemailer.d.ts" />
/// <reference path="./typings/winston/winston.d.ts" />

/// <reference path="./typings/lib-ext/lib-ext.d.ts" />
/// <reference path="./typings/json-fn/json-fn.d.ts" />

import userModel = require("./model/user");
var user = new userModel.User();

import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import crypto = require('crypto');
import express = require('express');
import fs = require('fs-extra');
import logger = require('winston');
import mailer = require('nodemailer');
import methodOverride = require('method-override');
import moment = require('moment');
import mongoose = require('mongoose');
import path = require('path');

import jsonfn = require('json-fn');

var applicationRoot = __dirname;
var hbs = require("hbs");
var multipart = require('connect-multiparty');
var recaptcha = require('recaptcha').Recaptcha;

var favicon = require('serve-favicon');

import routes = require('./routes/index');
var users = require('./routes/users');

// Include these files
require('./public/js/includes/object.js');
require('./public/js/includes/string.js');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static('%s/public'.sprintf(applicationRoot)));

app.all('/*',
        (req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token');
          res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

          app.disable('etag');

          next();
        });

app.use(favicon('%s/public/img/favicon.png'.sprintf(applicationRoot)));

app.get('/fooey',
  (req, res) => {
    res.redirect('index.html');
  });

app.get('/api',
        (req, res) => {
          res.sendFile('%s/public/views/api.html'.sprintf(applicationRoot));
        });

app.use('/', <express.RequestHandler> routes);

app.use('/users', users);

app.use('/error', (req, res, next) => {
  throw new Error('Forced Error!');
});

app.use((req, res) => {
  // Use response.sendfile, as it streams instead of reading the file into memory.
  res.sendFile('%s/public/index.html'.sprintf(applicationRoot));
});

var eq:boolean = String.equals('foo', 'foo');
var ne:boolean = String.equals('foo', 'bar');

var b = String.format('hello {0}', 'world');
var c = 'Hello {0} - {1}'.format('Monique', 10);
var d = String.sprintf('Hello %s - %d', 'world', 99);
var e = 'Hello %s - %d'.sprintf('Sal', 88);

String.print('hello {0}', 'world');
'Hello {0} - {1}'.print('Monique', 10);
String.printf('Hello %s - %d', 'world', 99);
'Hello %s - %d'.printf('Sal', 88);

'FuzzyL0gic!'.md5().print();

eq = 'foo'.equals('foo');
ne = 'foo'.equals('bar');

var o:Object = { foo: 'bar' };
var hc = Object.hashCode(o);
'Hashcode of object: {0} is {1}'.print(JSON.stringify(o), hc);

export = app;

function errorNotification(err, str, req) {
  console.log(str);
}