/// <reference path="../../typings/json-fn/json-fn.d.ts" />
var jsonfn = require('json-fn');
var ObjectImpl = (function () {
    function ObjectImpl() {
    }
    /**
     * @description Makes a deep copy of an object
     * @memberof Object.extensions
     * @method clone
     * @param obj {*}The object to clone.
     * @returns {Object} The cloned object.
     */
    ObjectImpl.clone = function (obj) {
        return jsonfn.clone(obj, true);
    };
    /**
     * @description Makes a deep copy of an object
     * @memberof Object.extensions
     * @method equals
     * @param obj {*} The first object to compare.
     * @param other The second object to compare.
     * @returns {boolean} True if both objects are equal. False, otherwise.
     */
    ObjectImpl.equals = function (obj, other) {
        if (ObjectImpl.isNullOrUndefined(obj) ||
            ObjectImpl.isNullOrUndefined(other)) {
            return (obj === null) && (other === null);
        }
        if (typeof (obj) === "string") {
            return obj === other;
        }
        if (typeof (obj) !== "object") {
            return obj === other;
        }
        return JSON.stringify(obj) === JSON.stringify(other);
    };
    /**
     * @description Generates a hash code for an Object.
     * @memberof Object.extensions
     * @method hashCode
     * @param obj {*} The object to generate a hashcode from.
     * @returns {int} The hashcode of the Object.
     */
    ObjectImpl.hashCode = function (obj) {
        if ((typeof obj === 'undefined') ||
            (obj === null) ||
            (obj.length === 0))
            return 0;
        var str = JSON.stringify(obj);
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
    /**
     * @description Determines if an Object is null or undefined.
     * @memberof Object.extensions
     * @method isNullOrUndefined
     * @param obj {*} The Object to test.
     * @returns {boolean} True if the Object is null or undefined. False otherwise.
     */
    ObjectImpl.isNullOrUndefined = function (obj) {
        return ((typeof obj == 'undefined') || (obj === null));
    };
    return ObjectImpl;
})();
exports.ObjectImpl = ObjectImpl;
var StringImpl = (function () {
    function StringImpl() {
    }
    StringImpl.equals = function (s1, s2) {
        return ObjectImpl.equals(s1, s2);
    };
    StringImpl.EMPTY = '';
    return StringImpl;
})();
exports.StringImpl = StringImpl;
//# sourceMappingURL=extensions.js.map