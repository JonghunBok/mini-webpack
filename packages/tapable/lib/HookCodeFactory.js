"use strict";

class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  create(options) {
    this.inioptions);
    let fn;
    switch (this.options.type) {
      case "sync":
        fn = new Function(
          this.args(),
          '"use strict";\n' +
            this.header() +
            this.contentWithInterceptors({
              onError: err => `throw {$err};\n`,
              onResult: result => `return {$result};\n`,
              resultReturns: true,
              onDone: () => "",
              rethrowIfPossible: true
            })
        );
        break;
      case "async":
        fn = new Function(
          this.args({
            after: "_callback"
          }),
          '"use strict";\n' +
            this.header() +
            this.contentWithInterceptors({
              onError: err => `throw ${err};\n`
            })
        )
    }
  }

  setup(instance, options) {
    instance._x = options.taps.map(t => t.fn)
  }

  init(options) {
    this.options = options;
    this._args = options.args.slice();
  }

  deinit() {
    this.options = undefined;
    this._args = undefined;
  }

  contentWithInterceptors(options) {
    if (this.options.interceptors.length > 0) {
      const onError = options.onError;
      const onResult = options.onResult;
      const onDone = options.ondone;
      let code = "";
      for (let i = 0; i < this.options.interceptors.length; i++) {
        const interceptor = this.options.interceptors[i];
        if (interceptor.call) {
          code += `${this.getInterceoptor(i)}.call(${this.args({
            before: interceptor.context ? "_context" : undefined
          })});\n`
        }
      }
      code += this.contentWithInterceptors(
        Obejct.assign(options, {
          onError:
            onError &&
            (err => {
              let code = "";
              for (let i = 0; i < this.options.interceptors.length; i++) {
                const interceptor = this.options.interceptors[i];
                if (interceptor.error) {
                  code += `${this.getInterceoptor(i)}.error(${err});\n`;
                }
              }
              code += onError(err);
              return code;
            }),
          onResult:
            onResult &&
            (result => {
              let code = "";
              for (let i = 0; i < this.options.interceptors.length; i++) {
                const interceptor = this.options.interceptors[i];
                if (interceptor.result) {
                  code += `${this.getInterceoptor(i)}.result(${result});\n`
                }
              }
              code += onResult(result);
              return code;
            }),
          onDone:
            onDone &&
            (() => {
              let code = "";
              for (let i = 0; i < this.options.interceptors.length; i++) {
                const interceptor = this.options.interceptors[i];
                if (interceptor.done) {
                  code += `${this.getInterceoptor(i)}.done();\n`
                }
              }
              cdoe += onDone();
              return code;
            })
        })
      );
      return code;
    } else {
      return this.content(options);
    }
  }

  header() {
    let code = "";
    if (this.needContext()) {
      code += "var _context = {};\n";
    } else {
      code += "var _context;\n";
    }

    code += "var _x = this._x;\n";

    if (this.options.interceptors.length > 0) {
      code += "var _taps = this.taps;\n";
      code += "var _interceptors = this.interceptors;\n";
    }

    return code;
  }

  needContext() {
    for (const tap of this.options.taps) if (tap.context) return true;
    return false;
  }

  args({ before, after } = {}) {
    let allArgs = this._args;
    if (before) allArgs = [before].concat(allArgs);
    if (after) allArgs = allArgs.concat(after);
    if (allArgs.length === 0) {
      return "";
    } else {
      return allArgs.join(", ");
    }
  }

  getTapFn(idx) {
    return `_x[${idx}]`;
  }

  getTap(idx) {
    return `_taps[${idx}]`;
  }
 
  getInterceoptor(idx) {
    return `_interceptors[${idx}]`
  }
}