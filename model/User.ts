
var global = typeof window !== 'undefined' ? window : eval('root');
import serialize = require('../serializable');

export class User extends serialize.Serializable {
  name:string;
  surname:string;
  street:string;
  number:number;
  birthDate:Date;
}

export class UserSerializer implements serialize.ISerializerHelper {
  "@serializer":string = null;
  birthDate:Date = null;
  name:string = null;
  surname:string = null;
  street:string = null;
  number:number = null;

  set_birthDate(date:Date):string {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
  }

  get_birthDate(dateString:string):Date {
    var dateParts:string[] = dateString.split('/');

    var date = new Date();
    date.setFullYear(parseInt(dateParts[0], 10));
    date.setMonth(parseInt(dateParts[1], 10) - 1);
    date.setDate(parseInt(dateParts[2], 10));

    return date;
  }
}

global.User = User;
serialize.Serializer.registerClass(() => {
                                           return User
                                         }, UserSerializer);
                                         
