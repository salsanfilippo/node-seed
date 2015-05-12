
interface Object {
  /**
   * @description Makes a deep copy of an object
   * @memberof Object.extensions
   * @method clone
   * @param obj {*}The object to clone.
   * @returns {Object} The cloned object.
   */
  clone(obj: any): any;

  /**
   * @description Makes a deep copy of an object
   * @memberof Object.extensions
   * @method equals
   * @param obj {*} The first object to compare.
   * @param other The second object to compare.
   * @returns {boolean} True if both objects are equal. False, otherwise.
   */
  equals(obj: any, other:any):boolean;

  /**
   * @description Generates a hash code for an Object.
   * @memberof Object.extensions
   * @method hashCode
   * @param obj {*} The object to generate a hashcode from.
   * @returns {int} The hashcode of the Object.
   */
  hashCode(obj:any):number;

  /**
   * @description Determines if an Object is null or undefined.
   * @memberof Object.extensions
   * @method isNullOrUndefined
   * @param obj {*} The Object to test.
   * @returns {boolean} True if the Object is null or undefined. False otherwise.
   */
  isNullOrUndefined(obj:any):boolean;
}

interface ObjectConstructor {
}

declare var Object: ObjectConstructor;

interface String {
  EMPTY:string;
  equals(s2: string): boolean;
}

interface StringConstructor {
  equals(s1:string, s2:string):boolean;
}

declare var String: StringConstructor;
