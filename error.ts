/// <reference path="./typings/node/node.d.ts" />

export var strings = require('./strings').errors;

export interface IServerError extends Error {
  stack:string;
}

export class ServerError implements IServerError {
  status:number;
  name:string;
  message:string;
  stack:string;

  getStatus() { return this.status; }
  getName() { return this.name; }
  getMessage() { return this.message; }
  getStacktrace () { return this.stack; }

  constructor(status:number, name:string, message:string) {
    this.status = status;
    this.name = name;
    this.message = message;
  }
}

/**
 * The server cannot or will not process the request due to something that is perceived
 * to be a client error (e.g., malformed request syntax, invalid request message framing,
 * or deceptive request routing).
 */
export class BadRequestError extends ServerError {
  constructor() {
    super(400, strings['400-name'], strings['400-message']);
  }
}

/**
 * Similar to 403 Forbidden, but specifically for use when authentication is required and has
 * failed or has not yet been provided. The response must include a WWW-Authenticate header
 * field containing a challenge applicable to the requested resource. See
 * <a href="/wiki/Basic_access_authentication">Basic access authentication</a> and
 * <a href="/wiki/Digest_access_authentication">Digest access authentication</a>.

 */
export class UnauthorizedError extends ServerError {
  constructor() {
    super(401, strings['401-name'], strings['401-message']);
  }
}
/**
 * The request was a valid request, but the server is refusing to respond to it. Unlike a 401
 * Unauthorized response, authenticating will make no difference.
 */
export class ForbiddenError extends ServerError {
  constructor() {
    super(403, strings['403-name'], strings['403-message']);
  }
}

/**
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 */
export class PageNotFoundError extends ServerError {
  constructor() {
    super(404, strings['404-name'], strings['404-message']);
  }
}

/**
 * A generic error message, given when an unexpected condition was encountered and no more
 * specific message is suitable.
 */
export class InternalServerErrorError extends ServerError {
  constructor() {
    super(500, strings['500-name'], strings['500-message']);
  }
}

/**
 * The server either does not recognize the request method, or it lacks the ability to fulfil
 * the request. Usually this implies future availability (e.g., a new feature of a web-service
 * API).
 */
export class NotImplementedError extends ServerError {
  constructor() {
    super(501, strings['501-name'], strings['501-message']);
  }
}

/**
 * The server is currently unavailable (because it is overloaded or down for maintenance).
 * Generally, this is a temporary state.
 */
export class ServiceUnavailableError extends ServerError {
  constructor() {
    super(503, strings['503-name'], strings['503-message']);
  }
}

// Hack to ensure ServerError has Error as its prototype (base type). This makes instances of ServerError
// and all its subclasses instances of Error. This is needed for the stacktrace (stack property) to be
// populated when an exception is thrown.
eval("ServerError.prototype.__proto__ = new Error()");
