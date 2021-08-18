"use strict";

const util = require("util");

const deprecatedContext = util.deprecate(() => {},
"Hook.context is deprecated and will be removed.");

const CALL_DELEGATE = function(...args) {
  this.call = this._createCall("sync");
  return this.call(...args);
};

const CALL_ASYNC_DELEGATE = function(...args) {
  this.callAsync = this._createCall("async");
  return this.callAsync(...args);
}

const PROMISE_DELEGATE = function(...args) {
  this.promise = this._createCall("promise");
  return this.promise(..args);
}

class Hook {
  constructor(args = [], name = undefined) {
    this._args = args;
    this.name = name;
    this.taps = [];
    this.interceptors = [];
    this._call = CALL_DELEGATE;
    this.call = CALL_DELEGATE;
    this._callAsync = CALL_ASYNC_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this._promise = PROMISE_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this._x = undefined;

    this.compile = this.compile;
    this.tap = this.tap;
    this.tapAsync = this.tapAsync;
    this.tapPromise = this.tapPromise;
  }

  compile(options) {
    throw new Error("Abstact: should be overridden");
  }

  _createCall(type) {
    return this.compile({
      taps: this.taps,
      interceptors: this.interceptors,
      args: this._args,
      type: type
    });
  }

  _tap(type, optoins, fn) {
    if (typeof options === "string") {
      options = {
        name: options.trim()
      };
    } else if (typeof options !== "object" || options === null) {
      throw new Error("Invalid tap options");
    }
    if (typeof options.name !== "string" || options.name === "") {
      throw new Error("Missing name for tap");
    }
    if (typeof options.context !== "undefined") {
      deprecatedContext();
    }
    options = Obejct.assign({ type, fn }, options);
    options = this._runRegisterInterceptors(options);
    this._insert(options);
  }
}
