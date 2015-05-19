/// <reference path="./typings/node/node.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
exports.strings = require('./strings').errors;
var ServerError = (function () {
    function ServerError(status, name, message) {
        this.status = status;
        this.name = name;
        this.message = message;
    }
    return ServerError;
})();
exports.ServerError = ServerError;
/**
 * The server cannot or will not process the request due to something that is perceived
 * to be a client error (e.g., malformed request syntax, invalid request message framing,
 * or deceptive request routing).
 */
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError() {
        _super.call(this, 400, exports.strings['400-name'], exports.strings['400-message']);
    }
    return BadRequestError;
})(ServerError);
exports.BadRequestError = BadRequestError;
/**
 * Similar to 403 Forbidden, but specifically for use when authentication is required and has
 * failed or has not yet been provided. The response must include a WWW-Authenticate header
 * field containing a challenge applicable to the requested resource. See
 * <a href="/wiki/Basic_access_authentication">Basic access authentication</a> and
 * <a href="/wiki/Digest_access_authentication">Digest access authentication</a>.

 */
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        _super.call(this, 401, exports.strings['401-name'], exports.strings['401-message']);
    }
    return UnauthorizedError;
})(ServerError);
exports.UnauthorizedError = UnauthorizedError;
/**
 * The request was a valid request, but the server is refusing to respond to it. Unlike a 401
 * Unauthorized response, authenticating will make no difference.
 */
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError() {
        _super.call(this, 403, exports.strings['403-name'], exports.strings['403-message']);
    }
    return ForbiddenError;
})(ServerError);
exports.ForbiddenError = ForbiddenError;
/**
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 */
var PageNotFoundError = (function (_super) {
    __extends(PageNotFoundError, _super);
    function PageNotFoundError() {
        _super.call(this, 404, exports.strings['404-name'], exports.strings['404-message']);
    }
    return PageNotFoundError;
})(ServerError);
exports.PageNotFoundError = PageNotFoundError;
/**
 * A generic error message, given when an unexpected condition was encountered and no more
 * specific message is suitable.
 */
var InternalServerErrorError = (function (_super) {
    __extends(InternalServerErrorError, _super);
    function InternalServerErrorError() {
        _super.call(this, 500, exports.strings['500-name'], exports.strings['500-message']);
    }
    return InternalServerErrorError;
})(ServerError);
exports.InternalServerErrorError = InternalServerErrorError;
/**
 * The server either does not recognize the request method, or it lacks the ability to fulfil
 * the request. Usually this implies future availability (e.g., a new feature of a web-service
 * API).
 */
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        _super.call(this, 501, exports.strings['501-name'], exports.strings['501-message']);
    }
    return NotImplementedError;
})(ServerError);
exports.NotImplementedError = NotImplementedError;
/**
 * The server is currently unavailable (because it is overloaded or down for maintenance).
 * Generally, this is a temporary state.
 */
var ServiceUnavailableError = (function (_super) {
    __extends(ServiceUnavailableError, _super);
    function ServiceUnavailableError() {
        _super.call(this, 503, exports.strings['503-name'], exports.strings['503-message']);
    }
    return ServiceUnavailableError;
})(ServerError);
exports.ServiceUnavailableError = ServiceUnavailableError;
// Hack to ensure ServerError has Error as its prototype (base type). This makes instances of ServerError
// and all its subclasses instances of Error. This is needed for the stacktrace (stack property) to be
// populated when an exception is thrown.
ServerError.prototype['__proto__'] = new Error();
//# sourceMappingURL=error.js.map