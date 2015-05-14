'use strict'

var impl = require('./../extensions/extensions').ObjectImpl;

/**
 * @description Makes a deep copy of an object
 * @memberof Object.extensions
 * @method clone
 * @param obj {*}The object to clone.
 * @returns {Object} The cloned object.
 */
Object.clone = function (obj) {
    return impl.clone(obj);
}

/**
 * @description Makes a deep copy of an object
 * @memberof Object.extensions
 * @method equals
 * @param obj {*} The first object to compare.
 * @param other The second object to compare.
 * @returns {boolean} True if both objects are equal. False, otherwise.
 */
Object.equals = function (obj, other) {
    return impl.equals(obj, other);
}

/**
 * @description Generates a hash code for an Object.
 * @memberof Object.extensions
 * @method hashCode
 * @param obj {*} The object to generate a hashcode from.
 * @returns {int} The hashcode of the Object.
 */
Object.hashCode = function (obj) {
    return impl.hashCode(obj);
}

/**
 * @description Determines if an Object is null or undefined.
 * @memberof Object.extensions
 * @method isNullOrUndefined
 * @param obj {*} The Object to test.
 * @returns {boolean} True if the Object is null or undefined. False otherwise.
 */
Object.isNullOrUndefined = function (obj) {
    return impl.isNullOrUndefined(obj);
}

