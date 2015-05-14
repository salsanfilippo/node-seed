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
var userModel = require("./model/user");
var user = new userModel.User();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var express = require('express');
var methodOverride = require('method-override');
var applicationRoot = __dirname;
var multipart = require('connect-multiparty');
var recaptcha = require('recaptcha').Recaptcha;
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var users = require('./routes/users');
// Include these files
require('./public/js/includes/object.js');
require('./public/js/includes/string.js');
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(favicon('%s/public/img/favicon.png'.sprintf(applicationRoot)));
app.use(express.static('%s/public'.sprintf(applicationRoot)));
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.disable('etag');
    next();
});
app.get('/api', function (req, res) {
    res.sendFile('%s/public/views/api.html'.sprintf(applicationRoot));
});
app.get('/', function (req, res) {
    res.redirect('index.html');
});
app.use(function (req, res) {
    // Use response.sendfile, as it streams instead of reading the file into memory.
    res.sendFile('%s/public/index.html'.sprintf(applicationRoot));
});
app.use('/', routes);
app.use('/users', users);
var eq = String.equals('foo', 'foo');
var ne = String.equals('foo', 'bar');
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
var o = { foo: 'bar' };
var hc = Object.hashCode(o);
module.exports = app;
//# sourceMappingURL=app.js.map