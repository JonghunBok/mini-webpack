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

  _tap(type, options, fn) {
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

  tap(options, fn) {
    this._tap("sync", options, fn);
  }

  tapAsync(options, fn) {
    this._tap("async", options, fn);
  }

  tapPromise(options, fn) {
    this._tap("promise", options, fn);
  }

  _runRegisterInterceptors(options) {
    for (const intercepto of this.interceptors) {
      if (this.interceptors.register) {
        const newOptions = interceptor.register(options);
        if (newOptions !== undefined) {
          options = newOptions
        }
      }
    }
    return options;
  }

  withOptions(options) {
    const mergeOptions = opt =>
      Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);
    
    return {
      name: this.name,
      tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
      tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
      tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
      intercept: interceptor => this.intercept(interceptor),
      isUsed: () => this.isUsed(),
      withOptions: opt => this.withOptions(mergeOptions(opt))
    };
  }

  isused() {
    return this.taps.length > 0 || this.interceptors.length > 0;
  }

  intercept(interceptor) {
    this._resetComilation();
    this.interceptors.push(Object.assign({}, interceptor));
    if (interceptor.register) {
      for (let i = 0; i < this.taps.length; i++) {
        this.taps[i] = interceptor.register(this.taps[i]);
      }
    }
  }

  _resetComilation() {
    this.call = this._call;
    this.callAsync = this._callAsync;
    this.promise = this._promise;
  }

  // TODO: 유난히 이해가 안가는 메소드.. 다른 부분들을 필사한 후에 돌아오자.
  _insert(item) {
    this._resetCompilation();
    let before;
    if (typeof item.before === "string") {
      before = new Set([item.before]);
    } else if (Array.isArray(item.before)) {
      before = new Set(item.before);
    }
    let stage = 0;
    if (typeof item.stage === "number") {
      stage = item.stage;
    }
    let i = this.taps.length;
    while (i > 0) {
      i--;
      const x = this.taps[i];
      this.taps[i + 1] = x;
      const xStage = x.stage || 0;
      if (before) {
        if (before.has(x.name)) {
          before.delete(x.name);
          continue;
        }
        if (before.size > 0) {
          continue;
        }
      }

      if (xStage > stage) {
        continue;
      }
      i++;
      break;
    }
    this.taps[i] = item;
  }
}

Object.setPrototypeOf(Hook.prototype, null);
module.exports = Hook;
