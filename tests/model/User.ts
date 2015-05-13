/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");
import IUser = require("./IUser");

interface IUserModel extends IUser, mongoose.Model<mongoose.Document> {
}

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String
});

var User:IUserModel = <IUserModel> mongoose.model("User", userSchema);
export = User;