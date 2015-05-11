/// <reference path="../../typings/json-fn/json-fn.d.ts" />
var jsonfn = require("json-fn");
var Object;
(function (Object) {
    /**
     * @description Makes a deep copy of an object
     * @memberof Object
     * @method clone
     * @param obj {*}The object to clone.
     * @returns {Object} The cloned object.
     */
    function clone(obj) {
        return jsonfn.clone(obj, true);
    }
    Object.clone = clone;
    /**
     * @description Determines if two objects are equal
     * @memberof Object
     * @method equals
     * @param obj {*} The first object to compare.
     * @param other The second object to compare.
     * @returns {boolean} True if both objects are equal. False, otherwise.
     */
    function equals(obj, other) {
        if (Object.isNullOrUndefined(obj) || Object.isNullOrUndefined(other)) {
            return (obj === null) && (other === null);
        }
        if (typeof (obj) === "string") {
            return obj === other;
        }
        if (typeof (obj) !== "object") {
            return obj === other;
        }
        return JSON.stringify(obj) === JSON.stringify(other);
    }
    Object.equals = equals;
    /**
     * @description Generates a hash code for an Object.
     * @memberof Object
     * @method hashCode
     * @param obj {*} The object to generate a hashcode from.
     * @returns {int} The hashcode of the Object.
     */
    function hashCode(obj) {
        if ((typeof obj === 'undefined') || (obj === null) || (obj.length === 0))
            return 0;
        var str = JSON.stringify(obj);
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    Object.hashCode = hashCode;
    /**
     * @description Determines if an Object is null or undefined.
     * @memberof Object
     * @method isNullOrUndefined
     * @param obj {*} The Object to test.
     * @returns {boolean} True if the Object is null or undefined. False otherwise.
     */
    function isNullOrUndefined(obj) {
        return ((typeof obj == 'undefined') || (obj === null));
    }
    Object.isNullOrUndefined = isNullOrUndefined;
})(Object = exports.Object || (exports.Object = {}));
//# sourceMappingURL=object.js.map