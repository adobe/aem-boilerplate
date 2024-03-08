import functions from './functions.js';

export default class Runtime {
  constructor(debug, toNumber) {
    this.toNumber = toNumber;
    this.functionTable = functions(debug);
  }

  callFunction(name, resolvedArgs, data, interpreter) {
    // this check will weed out 'valueOf', 'toString' etc
    if (!Object.prototype.hasOwnProperty.call(this.functionTable, name)) throw new Error(`Unknown function: ${name}()`);

    const functionEntry = this.functionTable[name];
    return functionEntry.func.call(this, resolvedArgs, data, interpreter);
  }
}
