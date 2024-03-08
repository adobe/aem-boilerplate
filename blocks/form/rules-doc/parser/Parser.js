import Lexer from './Lexer.js';
import tokenDefinitions from './Tokens.js';

const {
  TOK_EOF,
  TOK_ADD,
  TOK_COMMA,
  TOK_CONCATENATE,
  TOK_DIVIDE,
  TOK_EQ,
  TOK_FIELD,
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

const bindingPower = {
  [TOK_EOF]: 0,
  [TOK_UNQUOTEDIDENTIFIER]: 0,
  [TOK_QUOTEDIDENTIFIER]: 0,
  [TOK_RPAREN]: 0,
  [TOK_NUMBER]: 0,
  [TOK_FIELD]: 0,
  [TOK_COMMA]: 0,
  [TOK_CONCATENATE]: 5,
  [TOK_ADD]: 6,
  [TOK_SUBTRACT]: 6,
  [TOK_MULTIPLY]: 7,
  [TOK_DIVIDE]: 7,
  [TOK_EQ]: 5,
  [TOK_GT]: 5,
  [TOK_LT]: 5,
  [TOK_GTE]: 5,
  [TOK_LTE]: 5,
  [TOK_NE]: 5,
  [TOK_UNARY_MINUS]: 30,
  [TOK_SHEET_ACCESS]: 40,
  [TOK_LPAREN]: 60,
};

export default class Parser {
  parse(expression, debug) {
    this.loadTokens(expression, debug);
    this.index = 0;
    const ast = this.expression(0);
    if (this.lookahead(0) !== TOK_EOF) {
      const t = this.lookaheadToken(0);
      const error = new Error(
        `Unexpected token type: ${t.type}, value: ${t.value}`,
      );
      error.name = 'ParserError';
      throw error;
    }
    return ast;
  }

  loadTokens(expression, debug) {
    const lexer = new Lexer(debug);
    const tokens = lexer.tokenize(expression);
    tokens.push({ type: TOK_EOF, value: '', start: expression.length });
    this.tokens = tokens;
  }

  expression(rbp) {
    const leftToken = this.lookaheadToken(0);
    this.advance();
    let left = this.nud(leftToken);
    let currentToken = this.lookahead(0);
    while (rbp < bindingPower[currentToken]) {
      this.advance();
      left = this.led(currentToken, left);
      currentToken = this.lookahead(0);
    }
    return left;
  }

  lookahead(number) {
    return this.tokens[this.index + number].type;
  }

  lookaheadToken(number) {
    return this.tokens[this.index + number];
  }

  advance() {
    this.index += 1;
  }

  // eslint-disable-next-line consistent-return
  nud(token) {
    let right;
    let expression;
    let node;
    let args;
    switch (token.type) {
      case TOK_LITERAL:
        return { type: 'Literal', value: token.value };
      case TOK_NUMBER:
        return { type: 'Number', value: token.value };
      case TOK_UNQUOTEDIDENTIFIER:
        return { type: 'Field', name: token.value };
      case TOK_QUOTEDIDENTIFIER:
        node = { type: 'Field', name: token.value };
        if (this.lookahead(0) === TOK_LPAREN) {
          throw new Error('Quoted identifier not allowed for function names.');
        }
        return node;
      case TOK_UNARY_MINUS:
        right = this.expression(bindingPower.UnaryMinus);
        return { type: 'UnaryMinusExpression', children: [right] };
      case TOK_FIELD:
        return { type: TOK_FIELD };
      case TOK_LPAREN:
        args = [];
        while (this.lookahead(0) !== TOK_RPAREN) {
          expression = this.expression(0);
          args.push(expression);
        }
        this.match(TOK_RPAREN);
        return args[0];
      default:
        this.errorToken(token);
    }
  }

  // eslint-disable-next-line consistent-return
  led(tokenName, left) {
    let right;
    let name;
    let args;
    let expression;
    let node;
    let rbp;
    switch (tokenName) {
      case TOK_SHEET_ACCESS:
        rbp = bindingPower.Sheet;
        right = this.parseSheetRHS(rbp);
        return { type: 'Subexpression', children: [left, right] };
      case TOK_CONCATENATE:
        right = this.expression(bindingPower.Concatenate);
        return { type: 'ConcatenateExpression', children: [left, right] };
      case TOK_ADD:
        right = this.expression(bindingPower.Add);
        return { type: 'AddExpression', children: [left, right] };
      case TOK_SUBTRACT:
        right = this.expression(bindingPower.Subtract);
        return { type: 'SubtractExpression', children: [left, right] };
      case TOK_MULTIPLY:
        right = this.expression(bindingPower.Multiply);
        return { type: 'MultiplyExpression', children: [left, right] };
      case TOK_DIVIDE:
        right = this.expression(bindingPower.Divide);
        return { type: 'DivideExpression', children: [left, right] };
      case TOK_LPAREN:
        name = left.name;
        args = [];
        while (this.lookahead(0) !== TOK_RPAREN) {
          expression = this.expression(0);
          if (this.lookahead(0) === TOK_COMMA) {
            this.match(TOK_COMMA);
          }
          args.push(expression);
        }
        this.match(TOK_RPAREN);
        node = { type: 'Function', name, children: args };
        return node;
      case TOK_EQ:
      case TOK_NE:
      case TOK_GT:
      case TOK_GTE:
      case TOK_LT:
      case TOK_LTE:
        return this.parseComparator(left, tokenName);
      default:
        this.errorToken(this.lookaheadToken(0));
    }
  }

  match(tokenType) {
    if (this.lookahead(0) === tokenType) {
      this.advance();
    } else {
      const t = this.lookaheadToken(0);
      const error = new Error(`Expected ${tokenType}, got: ${t.type}`);
      error.name = 'ParserError';
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  errorToken(token) {
    const error = new Error(`Invalid token (${token.type}): "${token.value}"`);
    error.name = 'ParserError';
    throw error;
  }

  parseComparator(left, comparator) {
    const right = this.expression(bindingPower[comparator]);
    return { type: 'Comparator', name: comparator, children: [left, right] };
  }

  // eslint-disable-next-line consistent-return
  parseSheetRHS(rbp) {
    const lookahead = this.lookahead(0);
    const exprTokens = [TOK_UNQUOTEDIDENTIFIER];
    if (exprTokens.indexOf(lookahead) >= 0) {
      return this.expression(rbp);
    }
  }
}
