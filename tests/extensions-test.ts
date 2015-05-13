/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
import User = require("./model/User");
import Cat = require("./model/Cat");

import mongoose = require("mongoose");

before((done) => {
         if (mongoose.connection.readyState == 0) {
           mongoose.connection
                   .on('error',
                       (err) => {
                          if (err)
                            console.log(err + '\n');
                        });

           var db = mongoose.connect('mongodb://localhost/dev',
                                     (err) => {
                                       if (err) {
                                         console.log('Error: ' + err + '\n');
                                         done(err);
                                       } else {
                                         console.log('connection opened' + '\n');
                                         done();
                                       }
                                     });
         } else {
           done();
         }
       });

after((done) => {
                  try {
                    if (mongoose.connection.readyState > 0) {
                      mongoose.disconnect((err) => {
                                            if (err)
                                              console.log('Error: ' + err + '\n');
                                          });
                      console.log('connection closed' + '\n');
                    }
                  } finally {
                    done();
                  }
                });

var user = null;
describe('Auth',
         () => {
           after((done) => {
             if (user!=null)
               user.remove(null,
                           (err) => {
                             user = null;
                             if (err)
                               console.log('Error: ' + err + '\n');
                             else
                               console.log('removed user\n');
                           });

             setTimeout(done, 2000);
           });
           describe('User',
                    () => {
                      it('Add User',
                        (done) => {
                          user = new User({
                                            email: "ssanfilippo@pacificbiosciences.com",
                                            password: 'p@ssw0rd!',
                                            displayName: 'Sal Sanfilippo'
                                          });
                          user.save((err) => {
                                      if (err) {
                                        done(err);
                                      } else {
                                        console.log('created user: ' + user.email + '\n');
                                        done();
                                      }
                                    });
                        })
                    })
});

var cat = null;
describe('Test',
  () => {
    after((done) => {
      if (user!=null)
        user.remove(null,
          (err) => {
            user = null;
            if (err)
              console.log('Error: ' + err + '\n');
            else
              console.log('removed cat\n');
          });

      setTimeout(done, 2000);
    });
    describe('Cat',
      () => {
        it('Adopt Cat',
          (done) => {
            cat = new Cat({
                        name: "Aurora",
                        breed: 'Siamese'
                      });
            cat.save((err) => {
              if (err) {
                done(err);
              } else {
                console.log('created cat: ' + cat.name + ' ...meow\n');
                done();
              }
            });
          })
      })
  });