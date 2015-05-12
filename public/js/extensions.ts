/// <reference path="../../typings/json-fn/json-fn.d.ts" />

import jsonfn = require('json-fn');

export class ObjectImpl {
  /**
   * @description Makes a deep copy of an object
   * @memberof Object.extensions
   * @method clone
   * @param obj {*}The object to clone.
   * @returns {Object} The cloned object.
   */
  static clone(obj: any): any {
    return jsonfn.clone(obj, true);
  }

  /**
   * @description Makes a deep copy of an object
   * @memberof Object.extensions
   * @method equals
   * @param obj {*} The first object to compare.
   * @param other The second object to compare.
   * @returns {boolean} True if both objects are equal. False, otherwise.
   */
  static equals(obj: any, other: any): boolean {
    if (ObjectImpl.isNullOrUndefined(obj) ||
      ObjectImpl.isNullOrUndefined(other)) {
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
   * @memberof Object.extensions
   * @method hashCode
   * @param obj {*} The object to generate a hashcode from.
   * @returns {int} The hashcode of the Object.
   */
  static hashCode(obj: any): number {
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
   * @memberof Object.extensions
   * @method isNullOrUndefined
   * @param obj {*} The Object to test.
   * @returns {boolean} True if the Object is null or undefined. False otherwise.
   */
  static isNullOrUndefined(obj: any): boolean {
    return ((typeof obj == 'undefined') || (obj === null));
  }
}

export class StringImpl {
  /**
   * @description An empty string.
   * @constant EMPTY
   * @type {String}
   * @memberof String
   */
  static EMPTY = '';

  /**
   * @description Returns a new string containing a copy of the current string.
   * @method clone
   * @memberof String.prototype
   * @param str {String} The string to clone.
   * @returns {String} A copy of the current string.
   * @example var newString = 'Hello World'.clone();
   */
  static clone(str:string):string {
    return ObjectImpl.clone(str);
  }

  /**
   * @description Compares two strings for equality.
   * @method equals
   * @memberof String
   * @param str {String} The first string to compare.
   * @param other {String} The second string to compare.
   * @returns {boolean} True if strings are equal. False otherwise.
   * @example var isEqual = String.equals('string', 'string');
   */
  static equals(str: string, other: string): boolean {
    if (ObjectImpl.isNullOrUndefined(other))
      return false;

    return str == other;
  }

  /**
   * @description Formats a string using numbered tokens e.g. 'Format string {0}, {1}, {2}'.
   * @method format
   * @memberof String
   * @param format {String} The format for the string.
   * @param params {...*} One or more parameters to format into the format string.
   * @returns {String} The formatted string.
   * @example String.format('Hello, my name is {0} {1}.', 'John', 'Doe');
   */
  static format(format:string, ...params:Array<any>[]):string {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var string = format;

    // start with the second argument (i = 1)
    for (var i = 0; i < params.length; i++) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multi-line search
      var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
      string = string.replace(regEx, arguments[i]);
    }

    return string;
  }

  /**
   * @description Generate a password.
   * @method generatePassword
   * @memberof String
   * @param length {int} Length of the new password.
   * @param inclNumbers {boolean} Whether to include numbers in the new password.
   * @param inclSymbols {boolean} Whether to include symbols in the new password.
   * @returns {string} A new randomly generated password.
   */
  static generatePassword(length:number, inclNumbers:boolean, inclSymbols:boolean):string {
    var vowels:Array<string> = 'aeiou'.split(StringImpl.EMPTY);
    var constonants:Array<string> = 'bcdfghjklmnpqrstvwxyz'.split(StringImpl.EMPTY);
    var symbols:Array<string> = '!@#$%^&*?'.split(StringImpl.EMPTY);
    var word:string = StringImpl.EMPTY, i:number, num:string;

    if (!length)
      length = 8;

    var inclOffset:number = 0;
    if (inclNumbers)
      inclOffset += 3;
    if (inclSymbols)
      inclOffset += 1;

    for (i = 0; i < (length - inclOffset); i++) {
      var letter:string;

      if (i % 2 == 0) { // even = vowels
        letter = vowels[Math.floor(Math.random() * 4)];
      } else {
        letter = constonants[Math.floor(Math.random() * 20)];
      }

      word += (i == 0) ?
        letter.toUpperCase() :
        letter;
    }

    if (inclNumbers) {
      num = Math.floor(Math.random() * 99) + StringImpl.EMPTY;
      if (num.length == 1) num = '00' + num;
      else if (num.length == 2) num = '0' + num;
      word += num;
    }

    if (inclSymbols) {
      word += symbols[Math.floor(Math.random() * 8)];
    }

    return word.substr(0, length);
  }

  /**
   * @description Generates a hashcode for the current string.
   * @method hashCode
   * @memberof String.prototype
   * @param str {String} The string to hash.
   * @returns {String} The hashcode for the current string.
   * @example 'Hello World'.hashCode();
   */
  static hashCode(str:string):number {
    return ObjectImpl.hashCode(str);
  }
}
