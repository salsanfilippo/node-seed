import sm = require('../serializable');

var ISerializable = sm.serialize.ISerializable;
var Serializable = sm.serialize.Serializable;

var ISerializerHelper = sm.serialize.ISerializerHelper;
var Serializer = sm.serialize.Serializer;

class User extends Serializable {
  name:string;
  surname:string;
  street:string;
  number:number;
  birthDate:Date;
}

class UserSerializer implements ISerializerHelper {
  "@serializer":string = null;
  birthDate:Date = null;
  name:string  = null;
  surname:string  = null;
  street:string  = null;
  number:number  = null;
  set_birthDate(date:Date):string {
    return [ date.getFullYear(), date.getMonth()+1, date.getDate()].join('/');
  }
  get_birthDate(dateString:string):Date {
    var dateParts:string[] = dateString.split('/');
    var date = new Date();
    date.setFullYear(parseInt(dateParts[0],10));
    date.setMonth(parseInt(dateParts[1],10)-1);
    date.setDate(parseInt(dateParts[2],10));
    return date;
  }
}

// Registration
Serializer.registerClass(() => { return User },UserSerializer);

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
