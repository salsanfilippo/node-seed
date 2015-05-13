var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var global = typeof window !== 'undefined' ? window : eval('root');
var serialize = require('../serializable');
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    return User;
})(serialize.Serializable);
exports.User = User;
var UserSerializer = (function () {
    function UserSerializer() {
        this["@serializer"] = null;
        this.birthDate = null;
        this.name = null;
        this.surname = null;
        this.street = null;
        this.number = null;
    }
    UserSerializer.prototype.set_birthDate = function (date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
    };
    UserSerializer.prototype.get_birthDate = function (dateString) {
        var dateParts = dateString.split('/');
        var date = new Date();
        date.setFullYear(parseInt(dateParts[0], 10));
        date.setMonth(parseInt(dateParts[1], 10) - 1);
        date.setDate(parseInt(dateParts[2], 10));
        return date;
    };
    return UserSerializer;
})();
exports.UserSerializer = UserSerializer;
global.User = User;
serialize.Serializer.registerClass(function () {
    return User;
}, UserSerializer);
//# sourceMappingURL=user.js.map