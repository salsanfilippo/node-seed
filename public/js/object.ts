/// <reference path="../../typings/json-fn/json-fn.d.ts" />

import jsonfn = require("json-fn");

export module Object {
  /**
   * @description Makes a deep copy of an object
   * @memberof Object
   * @method clone
   * @param obj {*}The object to clone.
   * @returns {Object} The cloned object.
   */
  export function clone(obj: any): any {
    return jsonfn.clone(obj, true);
  }

  /**
   * @description Determines if two objects are equal
   * @memberof Object
   * @method equals
   * @param obj {*} The first object to compare.
   * @param other The second object to compare.
   * @returns {boolean} True if both objects are equal. False, otherwise.
   */
  export function equals(obj: any, other: any): boolean {
    if (Object.isNullOrUndefined(obj) ||
      Object.isNullOrUndefined(other)) {
      return (obj === null) && (other === null);
    }

    if (typeof (obj) === "string") {
      return obj === other;
    }

    if (typeof(obj) !== "object") {
      return obj === other;
    }

    return JSON.stringify(obj) === JSON.stringify(other);
  }

  /**
   * @description Generates a hash code for an Object.
   * @memberof Object
   * @method hashCode
   * @param obj {*} The object to generate a hashcode from.
   * @returns {int} The hashcode of the Object.
   */
  export function hashCode(obj: any): number {
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
  }

  /**
   * @description Determines if an Object is null or undefined.
   * @memberof Object
   * @method isNullOrUndefined
   * @param obj {*} The Object to test.
   * @returns {boolean} True if the Object is null or undefined. False otherwise.
   */
  export function isNullOrUndefined(obj: any): boolean {
    return ((typeof obj == 'undefined') || (obj === null));
  }
}

