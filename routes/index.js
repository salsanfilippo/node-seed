/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/fs-extra/fs-extra.d.ts" />
var express = require('express');
var hbs = require("hbs");
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var source = "<p>\n" + "  Hello, my name is {{name}}. I am from {{hometown}}. I have {{kids.length}} kids:\n" + "</p>\n" + "<ul>\n" + "  {{#kids}}\n" + "    <li>{{name}} is {{age}}</li>\n" + "  {{/kids}}\n" + "</ul>\n";
    var template = hbs.compile(source);
    var data = { "name": "Alan", "hometown": "Somewhere, TX", "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }] };
    var result = template(data);
    res.end(result);
});
module.exports = router;
//# sourceMappingURL=index.js.map