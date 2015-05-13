/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
var User = require("./model/User");
var Cat = require("./model/Cat");
var mongoose = require("mongoose");
before(function (done) {
    if (mongoose.connection.readyState == 0) {
        mongoose.connection.on('error', function (err) {
            if (err)
                console.log(err + '\n');
        });
        var db = mongoose.connect('mongodb://localhost/dev', function (err) {
            if (err) {
                console.log('Error: ' + err + '\n');
                done(err);
            }
            else {
                console.log('connection opened' + '\n');
                done();
            }
        });
    }
    else {
        done();
    }
});
after(function (done) {
    try {
        if (mongoose.connection.readyState > 0) {
            mongoose.disconnect(function (err) {
                if (err)
                    console.log('Error: ' + err + '\n');
            });
            console.log('connection closed' + '\n');
        }
    }
    finally {
        done();
    }
});
var user = null;
describe('Auth', function () {
    after(function (done) {
        if (user != null)
            user.remove(null, function (err) {
                user = null;
                if (err)
                    console.log('Error: ' + err + '\n');
                else
                    console.log('removed user\n');
            });
        setTimeout(done, 2000);
    });
    describe('User', function () {
        it('Add User', function (done) {
            user = new User({
                email: "ssanfilippo@pacificbiosciences.com",
                password: 'p@ssw0rd!',
                displayName: 'Sal Sanfilippo'
            });
            user.save(function (err) {
                if (err) {
                    done(err);
                }
                else {
                    console.log('created user: ' + user.email + '\n');
                    done();
                }
            });
        });
    });
});
var cat = null;
describe('Test', function () {
    after(function (done) {
        if (user != null)
            user.remove(null, function (err) {
                user = null;
                if (err)
                    console.log('Error: ' + err + '\n');
                else
                    console.log('removed cat\n');
            });
        setTimeout(done, 2000);
    });
    describe('Cat', function () {
        it('Adopt Cat', function (done) {
            cat = new Cat({
                name: "Aurora",
                breed: 'Siamese'
            });
            cat.save(function (err) {
                if (err) {
                    done(err);
                }
                else {
                    console.log('created cat: ' + cat.name + ' ...meow\n');
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=extensions-test.js.map