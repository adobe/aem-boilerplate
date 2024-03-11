import functions from './functions.js';

export default class Runtime {
  constructor(debug, customFunctions) {
    const funs = functions(debug);
    this.functionTable = { ...funs, ...customFunctions };
  }

  callFunction(name, resolvedArgs, data, interpreter) {
    // this check will weed out 'valueOf', 'toString' etc
    if (!Object.prototype.hasOwnProperty.call(this.functionTable, name)) throw new Error(`Unknown function: ${name}()`);

    const functionEntry = this.functionTable[name];
    // eslint-disable-next-line no-underscore-dangle
    return functionEntry._func.call(functionEntry, resolvedArgs, data, interpreter);
  }
}
