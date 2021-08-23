"use strict";

class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  create(options) {
    this.init(options);
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
}