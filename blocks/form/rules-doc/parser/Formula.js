import Parser from './Parser.js';
import TreeInterpreter from './TreeInterpreter.js';
import Runtime from './Runtime.js';

export default class Formula {
  constructor(customFunctions) {
    this.debug = [];
    this.runtime = new Runtime(this.debug, customFunctions);
  }

  compile(stream) {
    let ast;
    try {
      const parser = new Parser();
      ast = parser.parse(stream, this.debug);
    } catch (e) {
      this.debug.push(e.toString());
      throw e;
    }
    return ast;
  }

  evaluate(node, data) {
    // This needs to be improved.  Both the interpreter and runtime depend on
    // each other.  The runtime needs the interpreter to support exprefs.
    // There's likely a clean way to avoid the cyclic dependency.
    this.runtime.interpreter = new TreeInterpreter(
      this.runtime,
      this.debug,
    );

    try {
      return this.runtime.interpreter.search(node, data);
    } catch (e) {
      this.debug.push(e.message || e.toString());
      throw e;
    }
  }
}
