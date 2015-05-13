/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require("mongoose");
var catSchema = new mongoose.Schema({
    name: String,
    breed: String
});
var Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
//# sourceMappingURL=Cat.js.map