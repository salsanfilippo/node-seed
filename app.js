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
var extensions = {
    object: require('./public/js/includes/object'),
    string: require('./public/js/includes/string')
};
var userModel = require("./model/user");
var user = new userModel.User();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var applicationRoot = __dirname;
var multipart = require('connect-multiparty');
var recaptcha = require('recaptcha').Recaptcha;
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var users = require('./routes/users');
// Include these files
require('./public/js/includes/object.js');
require('./public/js/includes/string.js');
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
var app = express();
var o = { foo: 'bar' };
var hc = Object.hashCode(o);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map