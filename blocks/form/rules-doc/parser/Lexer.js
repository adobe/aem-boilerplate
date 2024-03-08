import tokenDefinitions from './Tokens.js';

const {
  TOK_ADD,
  TOK_COMMA,
  TOK_CONCATENATE,
  TOK_DIVIDE,
  TOK_EQ,
  TOK_GT,
  TOK_GTE,
  TOK_LITERAL,
  TOK_LPAREN,
  TOK_LT,
  TOK_LTE,
  TOK_MULTIPLY,
  TOK_NE,
  TOK_NUMBER,
  TOK_QUOTEDIDENTIFIER,
  TOK_RPAREN,
  TOK_SUBTRACT,
  TOK_UNARY_MINUS,
  TOK_UNQUOTEDIDENTIFIER,
  TOK_SHEET_ACCESS,
} = tokenDefinitions;

const basicTokens = {
  '!': TOK_SHEET_ACCESS,
  ',': TOK_COMMA,
  '(': TOK_LPAREN,
  ')': TOK_RPAREN,
};

const operatorStartToken = {
  '<': true,
  '>': true,
  '=': true,
};

const skipChars = {
  ' ': true,
  '\t': true,
  '\n': true,
};

function isNum(ch) {
  return (ch >= '0' && ch <= '9') || (ch === '.');
}

function isAlphaNum(ch) {
  return (ch >= 'a' && ch <= 'z')
    || (ch >= 'A' && ch <= 'Z')
    || (ch >= '0' && ch <= '9')
    || ch === '_';
}

function isIdentifier(stream, pos) {
  const ch = stream[pos];
  // $ is special -- it's allowed to be part of an identifier if it's the first character
  if (ch === '$') {
    return stream.length > pos && isAlphaNum(stream[pos + 1]);
  }
  // return whether character 'isAlpha'
  return (ch >= 'a' && ch <= 'z')
    || (ch >= 'A' && ch <= 'Z')
    || ch === '_';
}

export default class Lexer {
  constructor(debug = []) {
    this.debug = debug;
  }

  tokenize(stream) {
    const tokens = [];
    this.current = 0;
    let start;
    let identifier;
    let token;
    while (this.current < stream.length) {
      const prev = tokens.length ? tokens.slice(-1)[0].type : null;

      if (isIdentifier(stream, this.current)) {
        start = this.current;
        identifier = this.consumeUnquotedIdentifier(stream);
        tokens.push({
          type: TOK_UNQUOTEDIDENTIFIER,
          value: identifier,
          start,
        });
      } else if (basicTokens[stream[this.current]] !== undefined) {
        tokens.push({
          type: basicTokens[stream[this.current]],
          value: stream[this.current],
          start: this.current,
        });
        this.current += 1;
      } else if (stream[this.current] === '-'
        && ![TOK_NUMBER, TOK_RPAREN, TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER].includes(prev)) {
        token = { type: TOK_UNARY_MINUS, value: '-', start: this.current };
        this.current += 1;
        tokens.push(token);
      } else if (isNum(stream[this.current])) {
        token = this.consumeNumber(stream);
        tokens.push(token);
      } else if (stream[this.current] === "'") {
        start = this.current;
        identifier = this.consumeQuotedIdentifier(stream);
        tokens.push({
          type: TOK_QUOTEDIDENTIFIER,
          value: identifier,
          start,
        });
      } else if (stream[this.current] === '"') {
        start = this.current;
        identifier = this.consumeRawStringLiteral(stream);
        tokens.push({
          type: TOK_LITERAL,
          value: identifier,
          start,
        });
      } else if (operatorStartToken[stream[this.current]] !== undefined) {
        tokens.push(this.consumeOperator(stream));
      } else if (skipChars[stream[this.current]] !== undefined) {
        // Ignore whitespace.
        this.current += 1;
      } else if (stream[this.current] === '&') {
        tokens.push({ type: TOK_CONCATENATE, value: '&', start: this.current });
        this.current += 1;
      } else if (stream[this.current] === '+') {
        tokens.push({ type: TOK_ADD, value: '+', start: this.current });
        this.current += 1;
      } else if (stream[this.current] === '-') {
        tokens.push({ type: TOK_SUBTRACT, value: '-', start: this.current });
        this.current += 1;
      } else if (stream[this.current] === '*') {
        tokens.push({ type: TOK_MULTIPLY, value: '*', start: this.current });
        this.current += 1;
      } else if (stream[this.current] === '/') {
        tokens.push({ type: TOK_DIVIDE, value: '/', start: this.current });
        this.current += 1;
      } else {
        const error = new Error(`Unknown character:${stream[this.current]}`);
        error.name = 'LexerError';
        throw error;
      }
    }
    return tokens;
  }

  consumeUnquotedIdentifier(stream) {
    const start = this.current;
    this.current += 1;
    while (this.current < stream.length && isAlphaNum(stream[this.current])) {
      this.current += 1;
    }
    return stream.slice(start, this.current);
  }

  consumeQuotedIdentifier(stream) {
    const start = this.current;
    this.current += 1;
    const maxLength = stream.length;
    let foundNonAlpha = !isIdentifier(stream, start + 1);
    while (stream[this.current] !== "'" && this.current < maxLength) {
      // You can escape a quote and you can escape an escape.
      let { current } = this;
      if (!isAlphaNum(stream[current])) foundNonAlpha = true;
      if (stream[current] === '\\' && (stream[current + 1] === '\\'
        || stream[current + 1] === "'")) {
        current += 2;
      } else {
        current += 1;
      }
      this.current = current;
    }
    this.current += 1;
    const val = stream.slice(start, this.current);
    // Check for unnecessary double quotes.
    // json-formula uses double quotes to escape characters that don't belong in names names.
    // e.g. 'purchase-order'.address
    // If we find a quoted entity with spaces or all legal characters, issue a warning
    try {
      if (!foundNonAlpha || val.includes(' ')) {
        this.debug.push(`Suspicious quotes: ${val}`);
        this.debug.push(`Did you intend a literal? '${val.replace(/'/g, '')}'?`);
      }
      // eslint-disable-next-line no-empty
    } catch (e) { }
    return val.substring(1, val.length - 1);
  }

  consumeRawStringLiteral(stream) {
    const start = this.current;
    this.current += 1;
    const maxLength = stream.length;
    while (stream[this.current] !== '"' && this.current < maxLength) {
      // You can escape a single quote and you can escape an escape.
      let { current } = this;
      if (stream[current] === '\\' && (stream[current + 1] === '\\'
        || stream[current + 1] === '"')) {
        current += 2;
      } else {
        current += 1;
      }
      this.current = current;
    }
    this.current += 1;
    const literal = stream.slice(start + 1, this.current - 1);
    return literal.replaceAll('\\"', '"');
  }

  consumeNumber(stream) {
    const start = this.current;
    this.current += 1;
    const maxLength = stream.length;
    while (isNum(stream[this.current]) && this.current < maxLength) {
      this.current += 1;
    }
    const n = stream.slice(start, this.current);
    let value;
    if (n.includes('.')) {
      value = parseFloat(n);
    } else {
      value = parseInt(n, 10);
    }
    return { type: TOK_NUMBER, value, start };
  }

  consumeOperator(stream) {
    const start = this.current;
    const startingChar = stream[start];
    this.current += 1;
    if (startingChar === '<') {
      if (stream[this.current] === '=') {
        this.current += 1;
        return { type: TOK_LTE, value: '<=', start };
      }
      if (stream[this.current] === '>') {
        this.current += 1;
        return { type: TOK_NE, value: '<>', start };
      }
      return { type: TOK_LT, value: '<', start };
    }
    if (startingChar === '>') {
      if (stream[this.current] === '=') {
        this.current += 1;
        return { type: TOK_GTE, value: '>=', start };
      }
      return { type: TOK_GT, value: '>', start };
    }
    // startingChar is '='
    if (stream[this.current] === '=') {
      this.current += 1;
      return { type: TOK_EQ, value: '==', start };
    }
    return { type: TOK_EQ, value: '=', start };
  }
}
