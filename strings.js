/// <reference path="./typings/fs-extra/fs-extra.d.ts" />
/// <reference path="./typings/lib-ext/lib-ext.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fs = require('fs-extra');
var path = require('path');
// Include these files
require('./public/js/includes/object.js');
require('./public/js/includes/string.js');
var Strings = (function () {
    function Strings(__category__) {
        this.__category__ = __category__;
        // Load list from strings file
        this.__filename__ = path.resolve(__dirname, './strings/en-us/%s.strings'.sprintf(__category__));
        var strings = fs.readFileSync(this.__filename__, "utf8");
        var list = JSON.parse(strings);
        for (var key in list) {
            this[key] = list[key];
        }
    }
    return Strings;
})();
exports.Strings = Strings;
var ErrorStrings = (function (_super) {
    __extends(ErrorStrings, _super);
    function ErrorStrings() {
        _super.call(this, 'error');
    }
    return ErrorStrings;
})(Strings);
exports.ErrorStrings = ErrorStrings;
exports.errors = new ErrorStrings();
//# sourceMappingURL=strings.js.map