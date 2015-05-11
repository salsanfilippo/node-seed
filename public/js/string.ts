/// <reference path="./object.ts" />

import Object = require('object');

export class String {
  equals(s2: string): boolean {
    return false;
  }
}

export module String {
  /**
   * @description Compares two strings for equality.
   * @method equals
   * @memberof String
   * @param string {String} The first string to compare.
   * @param other {String} The second string to compare.
   * @returns {boolean} True if strings are equal. False otherwise.
   * @example var isEqual = String.equals('string', 'string');
   */
  export function equals(string1: string, string2: string) {
    return Object.equals(string1, string2);
  }

  export function isNullOrEmpty(s: string): boolean {
    return Object.isNullOrUndefined(s);
  }
}
