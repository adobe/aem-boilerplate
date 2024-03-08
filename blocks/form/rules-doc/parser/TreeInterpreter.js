import tokenDefinitions from './Tokens.js';
import {
  getToNumber,
} from './utils.js';

const {
  TOK_EQ,
  TOK_GT,
  TOK_LT,
  TOK_GTE,
  TOK_LTE,
  TOK_NE,
} = tokenDefinitions;

export default class TreeInterpreter {
  constructor(runtime, debug) {
    this.runtime = runtime;
    this.debug = debug;
    this.toNumber = getToNumber(debug);
  }

  search(node, value) {
    return this.visit(node, value);
  }

  visit(n, v) {
    const visitFunctions = {
      Field: (node, value) => {
        // we used to check isObject(value) here -- but it is possible for an array-based
        // object to have properties.  So we'll allow the child check on objects and arrays.
        if (value !== null) {
          let field = value[node.name];
          // fields can be objects with overridden methods. e.g. valueOf
          // so don't resolve to a function...
          if (typeof field === 'function') field = undefined;
          if (field === undefined) {
            try {
              this.debug.push(`Failed to find: '${node.name}'`);
              const available = Object.keys(value).map((a) => `'${a}'`).toString();
              if (available.length) this.debug.push(`Available fields: ${available}`);
              // eslint-disable-next-line no-empty
            } catch (e) { }
            return null;
          }
          return field;
        }
        return null;
      },

      Comparator: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);

        if (node.name === TOK_EQ) return first === second;
        if (node.name === TOK_NE) return first !== second;
        if (node.name === TOK_GT) return first > second;
        if (node.name === TOK_GTE) return first >= second;
        if (node.name === TOK_LT) return first < second;
        if (node.name === TOK_LTE) return first <= second;
        throw new Error(`Unknown comparator: ${node.name}`);
      },

      Identity: (_node, value) => value,

      AddExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '+');
      },

      ConcatenateExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        first = first.toString();
        second = second.toString();
        return this.applyOperator(first, second, '&');
      },

      SubtractExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '-');
      },

      MultiplyExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '*');
      },

      DivideExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '/');
      },

      UnaryMinusExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return first * -1;
      },

      Literal: (node) => node.value,

      Number: (node) => node.value,

      Function: (node, value) => {
        // Special case for if()
        // we need to make sure the results are called only after the condition is evaluated
        // Otherwise we end up with both results invoked -- which could include side effects
        // For "if", the last parameter to callFunction is false (bResolved) to indicate there's
        // no point in validating the argument type.
        if (node.name === 'if') return this.runtime.callFunction(node.name, node.children, value, this, false);
        const resolvedArgs = node.children.map((child) => this.visit(child, value));
        return this.runtime.callFunction(node.name, resolvedArgs, value, this);
      },

    };
    const fn = n && visitFunctions[n.type];
    if (!fn) throw new Error(`Unknown/missing node type ${(n && n.type) || ''}`);
    return fn(n, v);
  }

  applyOperator(first, second, operator) {
    if (Array.isArray(first) && Array.isArray(second)) {
      // balance the size of the arrays
      const shorter = first.length < second.length ? first : second;
      const diff = Math.abs(first.length - second.length);
      shorter.length += diff;
      shorter.fill(null, shorter.length - diff);
      const result = [];
      for (let i = 0; i < first.length; i += 1) {
        result.push(this.applyOperator(first[i], second[i], operator));
      }
      return result;
    }

    if (Array.isArray(first)) return first.map((a) => this.applyOperator(a, second, operator));
    if (Array.isArray(second)) return second.map((a) => this.applyOperator(first, a, operator));

    if (operator === '*') return this.toNumber(first, this.debug) * this.toNumber(second, this.debug);
    if (operator === '&') return first.toString() + second.toString();
    if (operator === '+') {
      return this.toNumber(first, this.debug) + this.toNumber(second, this.debug);
    }
    if (operator === '-') return this.toNumber(first, this.debug) - this.toNumber(second, this.debug);
    if (operator === '/') {
      const result = first / second;
      return Number.isFinite(result) ? result : null;
    }
    throw new Error(`Unknown operator: ${operator}`);
  }
}
