var pacbio;
(function (pacbio) {
    var serialize;
    (function (serialize) {
        /**
         * The interface any ClassSerializer extends
         */
        var SerializerHelper = (function () {
            function SerializerHelper() {
            }
            return SerializerHelper;
        })();
        serialize.SerializerHelper = SerializerHelper;
        /**
         *  The base class all serializable classes must extend
         */
        var Serializable = (function () {
            function Serializable() {
            }
            /**
             * Serializes the current instance & returns a transportable object
             * @returns {ISerializable}
             */
            Serializable.prototype.serialize = function () {
                return Serializer.serialize(this);
            };
            /**
             * Rehidrates the current instance with the values provided by the passed object
             * @param obj
             */
            Serializable.prototype.deserialize = function (obj) {
                return Serializer.deserialize(this, obj);
            };
            /**
             * Serializes the current instance & returns a JSON string representation
             * @param pretty
             * @returns {string}
             */
            Serializable.prototype.stringify = function (pretty) {
                if (pretty === void 0) { pretty = false; }
                return JSON.stringify(Serializer.serialize(this), null, pretty ? 4 : 0);
            };
            /**
             * Rehidrates the current instance with the values provided by the passed JSON string
             * @param string
             */
            Serializable.prototype.parse = function (string) {
                Serializer.deserialize(this, JSON.parse(string));
            };
            return Serializable;
        })();
        serialize.Serializable = Serializable;
        /**
         *
         */
        var Serializer = (function () {
            function Serializer() {
            }
            /**
             * Registers a class in the serializable class register
             * @param classContext
             * @param SerializerDataClass {typeof SerializerDefinition}
             */
            Serializer.registerClass = function (classContext, SerializerDataClass) {
                // determine class global path by parsing the body of the classContext Function
                var classPath = /return ([A-Za-z0-9_$.]*)/g.exec(classContext.toString())[1];
                // Check if class has been processed
                if (Serializer.serializableRegisters[classPath]) {
                    throw new Error('Class ' + classPath + ' already registered');
                }
                Serializer.getClassFromPath(classPath).prototype['@serializable'] = classPath;
                Serializer.serializableRegisters[classPath] = {
                    keys: Serializer.getMixedNames(SerializerDataClass),
                    serializerData: SerializerDataClass
                };
            };
            /**
             * Serializes the passed instance & returns a transportable object
             * @param instance
             * @returns {any}
             */
            Serializer.serialize = function (instance) {
                var obj = {};
                var register = Serializer.getSerializableRegister(instance);
                register.keys.forEach(function (key) {
                    var value = instance[key];
                    if (!value && !Serializer.isNumeric(value))
                        return; // don't getSerializableProperties void/empty/undefined
                    Serializer.writeAny(obj, key, value, register.serializerData);
                });
                return obj;
            };
            /**
             * Rehidrates the instance with the values provided by the passed object
             * @param instance
             * @param obj
             */
            Serializer.deserialize = function (instance, obj) {
                var register = Serializer.getSerializableRegister(instance);
                Serializer.getSerializableRegister(instance).keys.forEach(function (key) {
                    Serializer.readAny(obj[key], key, instance, register.serializerData);
                });
                delete instance['@serializable'];
                return instance;
            };
            // Private Methods
            /**
             * @param array
             * @returns {any[]}
             */
            Serializer.writeArray = function (array) {
                var dummyObjectArray = { array: [] };
                array.forEach(function (value, i) { return Serializer.writeAny(dummyObjectArray.array, i, value, Serializer.getSerializableRegisterData(value)); });
                return dummyObjectArray.array;
            };
            /**
             * @param value
             * @param key
             * @param obj
             * @param SerializerDataClass
             */
            Serializer.writeAny = function (obj, key, value, SerializerDataClass, fromArray) {
                if (SerializerDataClass === void 0) { SerializerDataClass = null; }
                if (fromArray === void 0) { fromArray = false; }
                if (SerializerDataClass && typeof SerializerDataClass.prototype["set_" + key] == "function") {
                    obj[key] = SerializerDataClass.prototype["set_" + key](value);
                    return;
                }
                var elementType = typeof value;
                switch (true) {
                    case elementType == "boolean":
                    case elementType == "string":
                    case elementType == "number":
                        obj[key] = value;
                        break;
                    case Array.isArray(value):
                        obj[key] = Serializer.writeArray(value);
                        break;
                    case elementType == "object" && !Array.isArray(value):
                        obj[key] = Serializer.isExternalizable(value) ? Serializer.serialize(value) : JSON.parse(JSON.stringify(value));
                        break;
                }
            };
            /**
             * @param array
             * @returns {any[]}
             */
            Serializer.readArray = function (array) {
                var resultArray = [];
                array.forEach(function (element, i) {
                    Serializer.readAny(element, i, resultArray, Serializer.getSerializableRegisterData(element));
                });
                return resultArray;
            };
            /**
             * @param element
             * @param key
             * @param target
             * @param SerializerDataClass
             */
            Serializer.readAny = function (element, key, target, SerializerDataClass) {
                if (SerializerDataClass && typeof SerializerDataClass.prototype["get_" + key] == "function") {
                    target[key] = SerializerDataClass.prototype["get_" + key](element);
                    return;
                }
                var type = typeof element;
                switch (true) {
                    case type == "boolean":
                    case type == "string":
                    case type == "number":
                        target[key] = element;
                        break;
                    case Array.isArray(element):
                        target[key] = Serializer.readArray(element);
                        break;
                    case type == "object" && !Array.isArray(element):
                        if (element.hasOwnProperty('@serializable')) {
                            var moduleParts = element['@serializable'].split('.');
                            var classPath = moduleParts.join('.');
                            if (!target[key])
                                target[key] = Serializer.getClass(classPath);
                            target[key].deserialize(element);
                        }
                        else {
                            target[key] = element;
                        }
                        break;
                }
            };
            /* Helper Methods */
            /**
             * @param SerializerDataClass
             * @returns {string[]}
             */
            Serializer.getMixedNames = function (SerializerDataClass) {
                return Object.getOwnPropertyNames(new SerializerDataClass()).concat("@serializable");
            };
            /**
             * @param instance
             * @returns {boolean}
             */
            Serializer.isExternalizable = function (instance) {
                return '@serializable' in instance && typeof instance.serialize == "function" && typeof instance.deserialize == "function";
            };
            /**
             * @param name
             * @param context
             * @returns {any}
             */
            Serializer.getClassFromPath = function (name, context) {
                if (context === void 0) { context = window; }
                name.split('.').forEach(function (ctx) { return context = context[ctx]; });
                return context;
            };
            /**
             * @param name
             * @param context
             * @returns {any}
             */
            Serializer.getClass = function (name, context) {
                if (context === void 0) { context = window; }
                name.split('.').forEach(function (ctx) { return context = context[ctx]; });
                return new context;
            };
            /**
             * @param instance
             * @returns {ISerializableRegister}
             */
            Serializer.getSerializableRegister = function (instance) {
                var props = Serializer.serializableRegisters[instance['@serializable']] || null;
                return props;
            };
            /**
             *
             * @param instance
             * @returns {ISerializableRegister}
             */
            Serializer.getSerializableRegisterData = function (instance) {
                var register = Serializer.getSerializableRegister(instance);
                return register ? register.serializerData : null;
            };
            Serializer.isNumeric = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            Serializer.serializableRegisters = {};
            return Serializer;
        })();
        serialize.Serializer = Serializer;
    })(serialize = pacbio.serialize || (pacbio.serialize = {}));
})(pacbio || (pacbio = {}));
/* DEMO CODE

import ISerializable = pacbio.serialize.ISerializable;
import Serializable = pacbio.serialize.Serializable;

import ISerializerHelper = pacbio.serialize.ISerializerHelper;
import Serializer = pacbio.serialize.Serializer;

class User extends Serializable
{
  name:string;
  surname:string;
  street:string;
  number:number;
  birthDate:Date;
}

class UserSerializer implements ISerializerHelper
{
  "@serializer":string = null;
  birthDate:Date = null;
  name:string  = null;
  surname:string  = null;
  street:string  = null;
  number:number  = null;
  set_birthDate(date:Date):string
  {
    return [ date.getFullYear(), date.getMonth()+1, date.getDate()].join('/');
  }
  get_birthDate(dateString:string):Date
  {
    var dateParts:string[] = dateString.split('/');
    var date = new Date();
    date.setFullYear(parseInt(dateParts[0],10));
    date.setMonth(parseInt(dateParts[1],10)-1);
    date.setDate(parseInt(dateParts[2],10));
    return date;
  }
}

// Registration
Serializer.registerClass(()=>{ return User },UserSerializer);

// Creane new user instance and populate it with some values
var sourceInstance:User = new User();
sourceInstance.name = "John";
sourceInstance.surname = "Smith";
sourceInstance.street = "Some Street Address";
sourceInstance.number = 67;
sourceInstance.birthDate = new Date();

// Serialize it and store it somewhere
var serializedObject:ISerializable = sourceInstance.serialize();
console.log(serializedObject)

// later to recompose it from data saved to disk
var cloneUserInstance:User = new User();
cloneUserInstance.deserialize(serializedObject);

console.log(sourceInstance, cloneUserInstance)
module pacbio.serialize{  /**   * The interface any ClassSerializer class must implement   */  export interface ISerializerHelper {    "@serializer":string;  }  /**   * The interface any Serializable class must implement   */  export interface ISerializable {    serialize():any;    deserialize(obj:ISerializable):void;    stringify():string;    parse(string:string):void;  }  /**   *  Holds information about the class serializer & keys of a Type   */  export interface ISerializableRegister {    keys:string[];    serializerData:typeof SerializerHelper;  }  /**   *  Holds a dictionary of ISerializableRegister   */  export interface ISerializableRegisters {    [key:string]:ISerializableRegister;  }  /**   * The interface any ClassSerializer extends   */  export class SerializerHelper implements ISerializerHelper {    "@serializer":string;  }  /**   *  The base class all serializable classes must extend   */  export class Serializable implements ISerializable {    /**     * Serializes the current instance & returns a transportable object     * @returns {ISerializable}     */    public serialize():ISerializable {      return Serializer.serialize(this);    }        /**     * Rehidrates the current instance with the values provided by the passed object     * @param obj     */    public deserialize(obj:ISerializable):ISerializable {      return Serializer.deserialize(this, obj);    }    /**     * Serializes the current instance & returns a JSON string representation     * @param pretty     * @returns {string}     */    public stringify(pretty:boolean = false):string {      return JSON.stringify(Serializer.serialize(this), null, pretty ? 4 : 0);    }    /**     * Rehidrates the current instance with the values provided by the passed JSON string     * @param string     */    public parse(string:string):void {      Serializer.deserialize(this, JSON.parse(string));    }  }  /**   *   */  export class Serializer  {    private static serializableRegisters:ISerializableRegisters = { };    /**     * Registers a class in the serializable class register     * @param classContext     * @param SerializerDataClass {typeof SerializerDefinition}     */    public static registerClass(classContext:() => any, SerializerDataClass:typeof SerializerHelper):void {      // determine class global path by parsing the body of the classContext Function      var classPath:string = /return ([A-Za-z0-9_$.]*)/g.exec(classContext.toString())[1];      // Check if class has been processed      if(Serializer.serializableRegisters[ classPath ]) {        throw new Error('Class '+classPath+' already registered');      }      Serializer.getClassFromPath(classPath).prototype['@serializable'] = classPath;      Serializer.serializableRegisters[classPath] = {                                                      keys:Serializer.getMixedNames(SerializerDataClass),                                                      serializerData:SerializerDataClass                                                    };    }    /**     * Serializes the passed instance & returns a transportable object     * @param instance     * @returns {any}     */    public static serialize(instance:ISerializable):ISerializable {      var obj:any = <ISerializable>{};      var register:ISerializableRegister = Serializer.getSerializableRegister(instance);      register.keys.forEach((key:string) => {                                                var value:any = instance[key];                                                if (!value && !Serializer.isNumeric(value))                                                  return; // don't getSerializableProperties void/empty/undefined                                                Serializer.writeAny(obj, key, value, register.serializerData);                                             });      return obj;    }    /**     * Rehidrates the instance with the values provided by the passed object     * @param instance     * @param obj     */    public static deserialize(instance:ISerializable, obj:ISerializable):ISerializable {      var register:ISerializableRegister = Serializer.getSerializableRegister(instance);      Serializer.getSerializableRegister(instance)                .keys                .forEach((key: string) => {                  Serializer.readAny(obj[key], key, instance, register.serializerData);                });      delete instance['@serializable'];      return instance;    }    // Private Methods    /**     * @param array     * @returns {any[]}     */    private static writeArray(array:any[]):any[]    {      var dummyObjectArray:{array:any[]} = { array:[] };      array.forEach((value , i) => Serializer.writeAny(dummyObjectArray.array,                                                       i,                                                       value ,                                                       Serializer.getSerializableRegisterData(value)));      return dummyObjectArray.array;    }    /**     * @param value     * @param key     * @param obj     * @param SerializerDataClass     */    private static writeAny(obj:any,key:any,value:any, SerializerDataClass:any = null, fromArray:boolean = false) {      if (SerializerDataClass &&          typeof SerializerDataClass.prototype["set_"+key] == "function") {        obj[key] = SerializerDataClass.prototype["set_"+key](value);        return;      }      var elementType = typeof value;      switch(true) {        case elementType=="boolean":        case elementType=="string":        case elementType=="number":          obj[key] = value;          break;        case Array.isArray(value):          obj[key] = Serializer.writeArray(value);          break;        case elementType=="object" && !Array.isArray(value):          obj[key] = Serializer.isExternalizable(value)                                         ? Serializer.serialize(value)                                         : JSON.parse(JSON.stringify(value));          break;      }    }    /**     * @param array     * @returns {any[]}     */    private static readArray(array:any[]):any[] {      var resultArray:any[] = [];      array.forEach((element, i) => {                                      Serializer.readAny(element,                                                         i,                                                         resultArray,                                                         Serializer.getSerializableRegisterData(element));                                    });      return resultArray;    }    /**     * @param element     * @param key     * @param target     * @param SerializerDataClass     */    private static readAny(element:any, key:any, target:any, SerializerDataClass:any) {      if (SerializerDataClass &&          typeof SerializerDataClass.prototype["get_"+key] == "function") {        target[key] = SerializerDataClass.prototype["get_"+key](element);        return;      }      var type:string = typeof element;      switch(true) {        case type=="boolean":        case type=="string":        case type=="number":          target[key] = element;          break;        case Array.isArray(element):          target[key] = Serializer.readArray(element);          break;        case type=="object" && !Array.isArray(element):          if(element.hasOwnProperty('@serializable')) {            var moduleParts:string[] = element['@serializable'].split('.');            var classPath:string = moduleParts.join('.');            if(!target[key])              target[key] = Serializer.getClass(classPath);            target[key].deserialize(element);          }          else {            target[key] = element;          }          break;      }    }    /* Helper Methods */    /**     * @param SerializerDataClass     * @returns {string[]}     */    private static getMixedNames(SerializerDataClass:any):string[] {      return Object.getOwnPropertyNames(new SerializerDataClass())                    .concat("@serializable");    }    /**     * @param instance     * @returns {boolean}     */    private static isExternalizable(instance):boolean {      return '@serializable' in instance &&              typeof instance.serialize == "function" &&              typeof instance.deserialize == "function";    }    /**     * @param name     * @param context     * @returns {any}     */    private static getClassFromPath(name:string , context:any = window):any {      name.split('.')          .forEach(ctx=>context = context[ctx]);      return context;    }    /**     * @param name     * @param context     * @returns {any}     */    private static getClass(name:string , context:any = window):any {      name.split('.')          .forEach(ctx=>context = context[ctx]);      return new context;    }    /**     * @param instance     * @returns {ISerializableRegister}     */    private static getSerializableRegister(instance:ISerializable):ISerializableRegister {      var props:ISerializableRegister = Serializer.serializableRegisters[instance['@serializable']] || null;      return props;    }    /**     *     * @param instance     * @returns {ISerializableRegister}     */    private static getSerializableRegisterData(instance:ISerializable):typeof SerializerHelper {      var register = Serializer.getSerializableRegister(instance);      return register ? register.serializerData:null;    }    private static isNumeric(n:any):boolean {      return !isNaN(parseFloat(n)) && isFinite(n);    }  }}/* DEMO CODEimport ISerializable = pacbio.serialize.ISerializable;import Serializable = pacbio.serialize.Serializable;import ISerializerHelper = pacbio.serialize.ISerializerHelper;import Serializer = pacbio.serialize.Serializer;class User extends Serializable{  name:string;  surname:string;  street:string;  number:number;  birthDate:Date;}class UserSerializer implements ISerializerHelper{  "@serializer":string = null;  birthDate:Date = null;  name:string  = null;  surname:string  = null;  street:string  = null;  number:number  = null;  set_birthDate(date:Date):string  {    return [ date.getFullYear(), date.getMonth()+1, date.getDate()].join('/');  }  get_birthDate(dateString:string):Date  {    var dateParts:string[] = dateString.split('/');    var date = new Date();    date.setFullYear(parseInt(dateParts[0],10));    date.setMonth(parseInt(dateParts[1],10)-1);    date.setDate(parseInt(dateParts[2],10));    return date;  }}// RegistrationSerializer.registerClass(()=>{ return User },UserSerializer);// Creane new user instance and populate it with some valuesvar sourceInstance:User = new User();sourceInstance.name = "John";sourceInstance.surname = "Smith";sourceInstance.street = "Some Street Address";sourceInstance.number = 67;sourceInstance.birthDate = new Date();// Serialize it and store it somewhere  var serializedObject:ISerializable = sourceInstance.serialize();console.log(serializedObject)// later to recompose it from data saved to diskvar cloneUserInstance:User = new User();cloneUserInstance.deserialize(serializedObject);console.log(sourceInstance, cloneUserInstance)
 
//# sourceMappingURL=serializable.js.map