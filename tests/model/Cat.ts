/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");
import ICat = require("./ICat");

interface ICatModel extends ICat, mongoose.Model<mongoose.Document> {
}

var catSchema = new mongoose.Schema({
  name: String,
  breed: String
});

var Cat:ICatModel = <ICatModel> mongoose.model("Cat", catSchema);
export = Cat;