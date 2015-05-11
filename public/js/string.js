/// <reference path="./object.ts" />
var Object = require('object');
var String = (function () {
    function String() {
    }
    String.prototype.equals = function (s2) {
        return false;
    };
    return String;
})();
exports.String = String;
var String;
(function (String) {
    /**
     * @description Compares two strings for equality.
     * @method equals
     * @memberof String
     * @param string {String} The first string to compare.
     * @param other {String} The second string to compare.
     * @returns {boolean} True if strings are equal. False otherwise.
     * @example var isEqual = String.equals('string', 'string');
     */
    function equals(string1, string2) {
        return Object.equals(string1, string2);
    }
    String.equals = equals;
    function isNullOrEmpty(s) {
        return Object.isNullOrUndefined(s);
    }
    String.isNullOrEmpty = isNullOrEmpty;
})(String = exports.String || (exports.String = {}));
//# sourceMappingURL=string.js.map