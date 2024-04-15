/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2022 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.

* Adobe permits you to use and modify this file solely in accordance with
* the terms of the Adobe license agreement accompanying it.
*************************************************************************/

import { propertyChange, ExecuteRule, Initialize, RemoveItem, FormLoad, FieldChanged, ValidationComplete, Change, Valid, Invalid, SubmitSuccess, CustomEvent, SubmitError, SubmitFailure, Submit, RemoveInstance, AddInstance, Reset, AddItem, Click } from './afb-events.js';
import Formula from '../formula/index.js';
import { format, parseDefaultDate, datetimeToNumber, parseDateSkeleton, formatDate, numberToDatetime } from './afb-formatters.min.js';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const ConstraintType = Object.freeze({
    PATTERN_MISMATCH: 'patternMismatch',
    TOO_SHORT: 'tooShort',
    TOO_LONG: 'tooLong',
    RANGE_OVERFLOW: 'rangeOverflow',
    RANGE_UNDERFLOW: 'rangeUnderflow',
    TYPE_MISMATCH: 'typeMismatch',
    VALUE_MISSING: 'valueMissing',
    STEP_MISMATCH: 'stepMismatch',
    FORMAT_MISMATCH: 'formatMismatch',
    ACCEPT_MISMATCH: 'acceptMismatch',
    FILE_SIZE_MISMATCH: 'fileSizeMismatch',
    UNIQUE_ITEMS_MISMATCH: 'uniqueItemsMismatch',
    MIN_ITEMS_MISMATCH: 'minItemsMismatch',
    MAX_ITEMS_MISMATCH: 'maxItemsMismatch',
    EXPRESSION_MISMATCH: 'expressionMismatch'
});
const constraintKeys = Object.freeze({
    pattern: ConstraintType.PATTERN_MISMATCH,
    minLength: ConstraintType.TOO_SHORT,
    maxLength: ConstraintType.TOO_LONG,
    maximum: ConstraintType.RANGE_OVERFLOW,
    minimum: ConstraintType.RANGE_UNDERFLOW,
    type: ConstraintType.TYPE_MISMATCH,
    required: ConstraintType.VALUE_MISSING,
    step: ConstraintType.STEP_MISMATCH,
    format: ConstraintType.FORMAT_MISMATCH,
    accept: ConstraintType.ACCEPT_MISMATCH,
    maxFileSize: ConstraintType.FILE_SIZE_MISMATCH,
    uniqueItems: ConstraintType.UNIQUE_ITEMS_MISMATCH,
    minItems: ConstraintType.MIN_ITEMS_MISMATCH,
    maxItems: ConstraintType.MAX_ITEMS_MISMATCH,
    validationExpression: ConstraintType.EXPRESSION_MISMATCH
});
const defaultConstraintTypeMessages = Object.freeze({
    [ConstraintType.PATTERN_MISMATCH]: 'Please match the format requested.',
    [ConstraintType.TOO_SHORT]: 'Please lengthen this text to ${0} characters or more.',
    [ConstraintType.TOO_LONG]: 'Please shorten this text to ${0} characters or less.',
    [ConstraintType.RANGE_OVERFLOW]: 'Value must be less than or equal to ${0}.',
    [ConstraintType.RANGE_UNDERFLOW]: 'Value must be greater than or equal to ${0}.',
    [ConstraintType.TYPE_MISMATCH]: 'Please enter a valid value.',
    [ConstraintType.VALUE_MISSING]: 'Please fill in this field.',
    [ConstraintType.STEP_MISMATCH]: 'Please enter a valid value.',
    [ConstraintType.FORMAT_MISMATCH]: 'Specify the value in allowed format : ${0}.',
    [ConstraintType.ACCEPT_MISMATCH]: 'The specified file type not supported.',
    [ConstraintType.FILE_SIZE_MISMATCH]: 'File too large. Reduce size and try again.',
    [ConstraintType.UNIQUE_ITEMS_MISMATCH]: 'All the items must be unique.',
    [ConstraintType.MIN_ITEMS_MISMATCH]: 'Specify a number of items equal to or greater than ${0}.',
    [ConstraintType.MAX_ITEMS_MISMATCH]: 'Specify a number of items equal to or less than ${0}.',
    [ConstraintType.EXPRESSION_MISMATCH]: 'Please enter a valid value.'
});
let customConstraintTypeMessages = {};
const getConstraintTypeMessages = () => {
    return {
        ...defaultConstraintTypeMessages,
        ...customConstraintTypeMessages
    };
};
class ValidationError {
    fieldName;
    errorMessages;
    constructor(fieldName = '', errorMessages = []) {
        this.errorMessages = errorMessages;
        this.fieldName = fieldName;
    }
}
var FocusOption;
(function (FocusOption) {
    FocusOption["NEXT_ITEM"] = "nextItem";
    FocusOption["PREVIOUS_ITEM"] = "previousItem";
})(FocusOption || (FocusOption = {}));
const objToMap = (o) => new Map(Object.entries(o));
const stringViewTypes = objToMap({ 'date': 'date-input', 'data-url': 'file-input', 'binary': 'file-input' });
const typeToViewTypes = objToMap({
    'number': 'number-input',
    'boolean': 'checkbox',
    'object': 'panel',
    'array': 'panel',
    'file': 'file-input',
    'file[]': 'file-input'
});
const arrayTypes = ['string[]', 'boolean[]', 'number[]', 'array'];
const defaultFieldTypes = (schema) => {
    const type = schema.type || 'string';
    if ('enum' in schema) {
        const enums = schema.enum;
        if (enums.length > 2 || arrayTypes.indexOf(type) > -1) {
            return 'drop-down';
        }
        else {
            return 'checkbox';
        }
    }
    if (type === 'string' || type === 'string[]') {
        return stringViewTypes.get(schema.format) || 'text-input';
    }
    return typeToViewTypes.get(type) || 'text-input';
};
const getProperty = (data, key, def) => {
    if (key in data) {
        return data[key];
    }
    else if (!key.startsWith(':')) {
        const prefixedKey = `:${key}`;
        if (prefixedKey in data) {
            return data[prefixedKey];
        }
    }
    return def;
};
const isFile = function (item) {
    return (item?.type === 'file' || item?.type === 'file[]') ||
        ((item?.type === 'string' || item?.type === 'string[]') &&
            (item?.format === 'binary' || item?.format === 'data-url'));
};
const isCheckbox = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox';
};
const isCheckboxGroup = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox-group';
};
const isEmailInput = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return (fieldType === 'text-input' && item?.format === 'email') || fieldType === 'email';
};
const isDateField = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return (fieldType === 'text-input' && item?.format === 'date') || fieldType === 'date-input';
};
const isCaptcha = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'captcha';
};
function deepClone(obj, idGenerator) {
    let result;
    if (obj instanceof Array) {
        result = [];
        result = obj.map(x => deepClone(x, idGenerator));
    }
    else if (typeof obj === 'object' && obj !== null) {
        result = {};
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = deepClone(value, idGenerator);
        });
    }
    else {
        result = obj;
    }
    if (idGenerator && result && result.id) {
        result.id = idGenerator();
    }
    return result;
}
const jsonString = (obj) => {
    return JSON.stringify(obj, null, 2);
};
const isRepeatable$1 = (obj) => {
    return ((obj.repeatable &&
        ((obj.minOccur === undefined && obj.maxOccur === undefined) ||
            (obj.minOccur !== undefined && obj.maxOccur !== undefined && obj.maxOccur !== 0) ||
            (obj.minOccur !== undefined && obj.maxOccur !== undefined && obj.minOccur !== 0 && obj.maxOccur !== 0) ||
            (obj.minOccur !== undefined && obj.minOccur >= 0) ||
            (obj.maxOccur !== undefined && obj.maxOccur !== 0))) || false);
};
class DataValue {
    $_name;
    $_value;
    $_type;
    $_fields = [];
    constructor($_name, $_value, $_type = typeof $_value) {
        this.$_name = $_name;
        this.$_value = $_value;
        this.$_type = $_type;
    }
    valueOf() {
        return this.$_value;
    }
    get $name() {
        return this.$_name;
    }
    get $value() {
        const enabled = this.$_fields.find(x => x.enabled !== false);
        if (!enabled && this.$_fields.length) {
            return undefined;
        }
        return this.$_value;
    }
    setValue(typedValue, originalValue, fromField) {
        this.$_value = typedValue;
        this.$_fields.forEach(x => {
            if (fromField !== x) {
                x.value = originalValue;
            }
        });
    }
    get $type() {
        return this.$_type;
    }
    $bindToField(field) {
        if (this.$_fields.indexOf(field) === -1) {
            this.$_fields.push(field);
        }
    }
    $convertToDataValue() {
        return this;
    }
    get $isDataGroup() {
        return false;
    }
}
const value = Symbol('NullValue');
class NullDataValueClass extends DataValue {
    constructor() {
        super('', value, 'null');
    }
    setValue() {
    }
    $bindToField() {
    }
    $length() {
        return 0;
    }
    $convertToDataValue() {
        return this;
    }
    $addDataNode() {
    }
    $removeDataNode() {
    }
    $getDataNode() {
        return this;
    }
    $containsDataNode() {
        return false;
    }
}
const NullDataValue = new NullDataValueClass();
class DataGroup extends DataValue {
    $_items;
    createEntry(key, value) {
        const t = value instanceof Array ? 'array' : typeof value;
        if (typeof value === 'object' && value != null) {
            return new DataGroup(key, value, t);
        }
        else {
            return new DataValue(key, value, t);
        }
    }
    constructor(_name, _value, _type = typeof _value) {
        super(_name, _value, _type);
        if (_value instanceof Array) {
            this.$_items = _value.map((value, index) => {
                return this.createEntry(index, value);
            });
        }
        else {
            this.$_items = Object.fromEntries(Object.entries(_value).map(([key, value]) => {
                return [key, this.createEntry(key, value)];
            }));
        }
    }
    get $value() {
        const enabled = this.$_fields.find(x => x.enabled !== false);
        if (!enabled && this.$_fields.length) {
            return this.$type === 'array' ? [] : {};
        }
        else if (this.$type === 'array') {
            return Object.values(this.$_items).filter(x => typeof x !== 'undefined').map(x => x.$value);
        }
        else {
            return Object.fromEntries(Object.values(this.$_items).filter(x => typeof x !== 'undefined').map(x => {
                return [x.$name, x.$value];
            }));
        }
    }
    get $length() {
        return Object.entries(this.$_items).length;
    }
    $convertToDataValue() {
        return new DataValue(this.$name, this.$value, this.$type);
    }
    $addDataNode(name, value, override = false) {
        if (value !== NullDataValue) {
            if (this.$type === 'array') {
                const index = name;
                if (!override) {
                    this.$_items.splice(index, 0, value);
                }
                else {
                    this.$_items[name] = value;
                }
            }
            else {
                this.$_items[name] = value;
            }
        }
    }
    $removeDataNode(name) {
        if (this.$type === 'array') {
            this.$_items.splice(name, 1);
        }
        else {
            this.$_items[name] = undefined;
        }
    }
    $getDataNode(name) {
        if (this.$_items.hasOwnProperty(name)) {
            return this.$_items[name];
        }
    }
    $containsDataNode(name) {
        return this.$_items.hasOwnProperty(name) && typeof (this.$_items[name]) !== 'undefined';
    }
    get $isDataGroup() {
        return true;
    }
}
const TOK_DOT = 'DOT';
const TOK_IDENTIFIER = 'Identifier';
const TOK_GLOBAL = 'Global';
const TOK_REPEATABLE = 'Repeatable';
const TOK_BRACKET = 'bracket';
const TOK_NUMBER = 'Number';
const globalStartToken = '$';
const repeatableStartToken = '#';
const identifier = (value, start) => {
    return {
        type: TOK_IDENTIFIER,
        value,
        start
    };
};
const bracket = (value, start) => {
    return {
        type: TOK_BRACKET,
        value,
        start
    };
};
const global$ = () => {
    return {
        type: TOK_GLOBAL,
        start: 0,
        value: globalStartToken
    };
};
const repeatable = () => {
    return {
        type: TOK_REPEATABLE,
        start: 0,
        value: repeatableStartToken
    };
};
const isAlphaNum = function (ch) {
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || (ch >= '0' && ch <= '9')
        || ch === '_';
};
const isGlobal = (prev, stream, pos) => {
    return prev === null && stream[pos] === globalStartToken;
};
const isRepeatable = (prev, stream, pos) => {
    return prev === null && stream[pos] === repeatableStartToken;
};
const isIdentifier = (stream, pos) => {
    const ch = stream[pos];
    if (ch === '$') {
        return stream.length > pos && isAlphaNum(stream[pos + 1]);
    }
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || ch === '_';
};
const isNum = (ch) => {
    return (ch >= '0' && ch <= '9');
};
class Tokenizer {
    stream;
    _current;
    _tokens = [];
    _result_tokens = [];
    constructor(stream) {
        this.stream = stream;
        this._current = 0;
    }
    _consumeGlobal() {
        this._current += 1;
        return global$();
    }
    _consumeRepeatable() {
        this._current += 1;
        return repeatable();
    }
    _consumeUnquotedIdentifier(stream) {
        const start = this._current;
        this._current += 1;
        while (this._current < stream.length && isAlphaNum(stream[this._current])) {
            this._current += 1;
        }
        return identifier(stream.slice(start, this._current), start);
    }
    _consumeQuotedIdentifier(stream) {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (stream[this._current] !== '"' && this._current < maxLength) {
            let current = this._current;
            if (stream[current] === '\\' && (stream[current + 1] === '\\'
                || stream[current + 1] === '"')) {
                current += 2;
            }
            else {
                current += 1;
            }
            this._current = current;
        }
        this._current += 1;
        return identifier(JSON.parse(stream.slice(start, this._current)), start);
    }
    _consumeNumber(stream) {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (isNum(stream[this._current]) && this._current < maxLength) {
            this._current += 1;
        }
        const n = stream.slice(start, this._current);
        const value = parseInt(n, 10);
        return { type: TOK_NUMBER, value, start };
    }
    _consumeBracket(stream) {
        const start = this._current;
        this._current += 1;
        let value;
        if (isNum(stream[this._current])) {
            value = this._consumeNumber(stream).value;
        }
        else {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        if (this._current < this.stream.length && stream[this._current] !== ']') {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        this._current++;
        return bracket(value, start);
    }
    tokenize() {
        const stream = this.stream;
        while (this._current < stream.length) {
            const prev = this._tokens.length ? this._tokens.slice(-1)[0] : null;
            if (isGlobal(prev, stream, this._current)) {
                const token = this._consumeGlobal();
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (isRepeatable(prev, stream, this._current)) {
                const token = this._consumeRepeatable();
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (isIdentifier(stream, this._current)) {
                const token = this._consumeUnquotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (stream[this._current] === '.' && prev != null && prev.type !== TOK_DOT) {
                this._tokens.push({
                    type: TOK_DOT,
                    value: '.',
                    start: this._current
                });
                this._current += 1;
            }
            else if (stream[this._current] === '[') {
                const token = this._consumeBracket(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (stream[this._current] === '"') {
                const token = this._consumeQuotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else {
                const p = Math.max(0, this._current - 2);
                const s = Math.min(this.stream.length, this._current + 2);
                throw new Error(`Exception at parsing stream ${this.stream.slice(p, s)}`);
            }
        }
        return this._result_tokens;
    }
}
const tokenize = (stream) => {
    return new Tokenizer(stream).tokenize();
};
const resolveData = (data, input, create) => {
    let tokens;
    if (typeof input === 'string') {
        tokens = tokenize(input);
    }
    else {
        tokens = input;
    }
    let result = data;
    let i = 0;
    const createIntermediateNode = (token, nextToken, create) => {
        return nextToken === null ? create :
            (nextToken.type === TOK_BRACKET) ? new DataGroup(token.value, [], 'array') :
                new DataGroup(token.value, {});
    };
    while (i < tokens.length && result != null) {
        const token = tokens[i];
        if (token.type === TOK_GLOBAL) {
            result = data;
        }
        else if (token.type === TOK_IDENTIFIER) {
            if (result instanceof DataGroup && result.$type === 'object') {
                if (result.$containsDataNode(token.value) && result.$getDataNode(token.value).$value !== null) {
                    result = result.$getDataNode(token.value);
                }
                else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(token.value, toCreate);
                    result = toCreate;
                }
                else {
                    result = undefined;
                }
            }
            else {
                throw new Error(`Looking for ${token.value} in ${result.$value}`);
            }
        }
        else if (token.type === TOK_BRACKET) {
            if (result instanceof DataGroup && result.$type === 'array') {
                const index = token.value;
                if (index < result.$length) {
                    result = result.$getDataNode(index);
                }
                else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(index, toCreate);
                    result = toCreate;
                }
                else {
                    result = undefined;
                }
            }
            else {
                throw new Error(`Looking for index ${token.value} in non array${result.$value}`);
            }
        }
        i += 1;
    }
    return result;
};
class FileObject {
    data;
    mediaType = 'application/octet-stream';
    name = 'unknown';
    size = 0;
    constructor(init) {
        Object.assign(this, init);
    }
    get type() {
        return this.mediaType;
    }
    toJSON() {
        return {
            'name': this.name,
            'size': this.size,
            'mediaType': this.mediaType,
            'data': this.data.toString()
        };
    }
    equals(obj) {
        return (this.data === obj.data &&
            this.mediaType === obj.mediaType &&
            this.name === obj.name &&
            this.size === obj.size);
    }
}
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
const fileSizeRegex = /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;
const randomWord = (l) => {
    const ret = [];
    for (let i = 0; i <= l; i++) {
        let randIndex;
        if (i === 0) {
            randIndex = Math.floor(Math.random() * (chars.length - 11));
        }
        else {
            randIndex = Math.floor(Math.random() * (chars.length));
        }
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};
const getAttachments = (input, excludeUnbound = false) => {
    const items = input.items || [];
    return items?.reduce((acc, item) => {
        if (excludeUnbound && item.dataRef === null) {
            return acc;
        }
        let ret = null;
        if (item.isContainer) {
            ret = getAttachments(item, excludeUnbound);
        }
        else {
            if (isFile(item.getState())) {
                ret = {};
                const name = item.name || '';
                const dataRef = (item.dataRef != null)
                    ? item.dataRef
                    : (name.length > 0 ? item.name : undefined);
                if (item.value instanceof Array) {
                    ret[item.id] = item.value.map((x) => {
                        return { ...x, 'dataRef': dataRef };
                    });
                }
                else if (item.value != null) {
                    ret[item.id] = { ...item.value, 'dataRef': dataRef };
                }
            }
        }
        return Object.assign(acc, ret);
    }, {});
};
const getFileSizeInBytes = (str) => {
    let retVal = 0;
    if (typeof str === 'string') {
        const matches = fileSizeRegex.exec(str.trim());
        if (matches != null) {
            retVal = sizeToBytes(parseFloat(matches[1]), (matches[2] || 'kb').toUpperCase());
        }
    }
    return retVal;
};
const sizeToBytes = (size, symbol) => {
    const sizes = { 'KB': 1, 'MB': 2, 'GB': 3, 'TB': 4 };
    const i = Math.pow(1024, sizes[symbol]);
    return Math.round(size * i);
};
const IdGenerator = function* (initial = 50) {
    const initialize = function () {
        const arr = [];
        for (let i = 0; i < initial; i++) {
            arr.push(randomWord(10));
        }
        return arr;
    };
    const passedIds = {};
    let ids = initialize();
    do {
        let x = ids.pop();
        while (x in passedIds) {
            if (ids.length === 0) {
                ids = initialize();
            }
            x = ids.pop();
        }
        passedIds[x] = true;
        yield ids.pop();
        if (ids.length === 0) {
            ids = initialize();
        }
    } while (ids.length > 0);
};
const isDataUrl = (str) => {
    const dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
    return dataUrlRegex.exec(str.trim()) != null;
};
const extractFileInfo = (file) => {
    if (file !== null) {
        let retVal = null;
        if (file instanceof FileObject) {
            retVal = file;
        }
        else if (typeof File !== 'undefined' && file instanceof File) {
            retVal = {
                name: file.name,
                mediaType: file.type,
                size: file.size,
                data: file
            };
        }
        else if (typeof file === 'string' && isDataUrl(file)) {
            const result = dataURItoBlob(file);
            if (result !== null) {
                const { blob, name } = result;
                retVal = {
                    name: name,
                    mediaType: blob.type,
                    size: blob.size,
                    data: blob
                };
            }
        }
        else {
            let jFile = file;
            try {
                jFile = JSON.parse(file);
                retVal = jFile;
                if (!retVal.mediaType) {
                    retVal.mediaType = retVal.type;
                }
            }
            catch (ex) {
            }
            if (typeof jFile?.data === 'string' && isDataUrl(jFile?.data)) {
                const result = dataURItoBlob(jFile?.data);
                if (result !== null) {
                    const blob = result.blob;
                    retVal = {
                        name: jFile?.name,
                        mediaType: jFile?.type || jFile?.mediaType,
                        size: blob.size,
                        data: blob
                    };
                }
            }
            else if (typeof jFile === 'string') {
                const fileName = jFile.split('/').pop();
                retVal = {
                    name: fileName,
                    mediaType: 'application/octet-stream',
                    size: 0,
                    data: jFile
                };
            }
            else if (typeof jFile === 'object') {
                retVal = {
                    name: jFile?.name,
                    mediaType: jFile?.type || jFile?.mediaType,
                    size: jFile?.size,
                    data: jFile?.data
                };
            }
        }
        if (retVal !== null && retVal.data != null) {
            return new FileObject(retVal);
        }
        return null;
    }
    else {
        return null;
    }
};
const dataURItoBlob = (dataURI) => {
    const regex = /^data:([a-z]+\/[a-z0-9-+.]+)?(?:;name=([^;]+))?(;base64)?,(.+)$/;
    const groups = regex.exec(dataURI);
    if (groups !== null) {
        const type = groups[1] || '';
        const name = groups[2] || 'unknown';
        const isBase64 = typeof groups[3] === 'string';
        if (isBase64) {
            const binary = atob(groups[4]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            const blob = new window.Blob([new Uint8Array(array)], { type });
            return { name, blob };
        }
        else {
            const blob = new window.Blob([groups[4]], { type });
            return { name, blob };
        }
    }
    else {
        return null;
    }
};
const isFormOrSiteContainer = (model) => {
    return (':items' in model || 'cqItems' in model) && (':itemsOrder' in model || 'cqItemsOrder' in model);
};
const sitesModelToFormModel = (sitesModel) => {
    if (!sitesModel || !Object.keys(sitesModel).length) {
        return sitesModel;
    }
    if (isFormOrSiteContainer(sitesModel)) {
        const itemsArr = [];
        const itemsOrder = sitesModel[':itemsOrder'] || sitesModel.cqItemsOrder;
        const items = sitesModel[':items'] || sitesModel.cqItems;
        itemsOrder.forEach((elemName) => {
            itemsArr.push(sitesModelToFormModel(items[elemName]));
        });
        sitesModel.items = itemsArr;
    }
    return sitesModel;
};
const replaceTemplatePlaceholders = (str, values = []) => {
    return str?.replace(/\${(\d+)}/g, (match, index) => {
        const replacement = values[index];
        return typeof replacement !== 'undefined' ? replacement : match;
    });
};
const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonth = (leapYear, month) => {
    if (leapYear && month == 2) {
        return 29;
    }
    return days[month - 1];
};
const isLeapYear = (year) => {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
};
const coerceType = (param, type) => {
    let num;
    switch (type) {
        case 'string':
            return param + '';
        case 'number':
            num = +param;
            if (!isNaN(num)) {
                return num;
            }
            break;
        case 'boolean':
            if (typeof param === 'string') {
                return param === 'true';
            }
            else if (typeof param === 'number') {
                return param !== 0;
            }
    }
    throw `${param} has invalid type. Expected : ${type}, Actual ${typeof param}`;
};
const checkNumber = (inputVal) => {
    if (inputVal === '' || inputVal == null) {
        return {
            value: '', valid: true
        };
    }
    let value = parseFloat(inputVal);
    const valid = !isNaN(value);
    if (!valid) {
        value = inputVal;
    }
    return {
        value, valid
    };
};
const checkInteger = (inputVal) => {
    if (inputVal == '' || inputVal == null) {
        return {
            value: '', valid: true
        };
    }
    let value = parseFloat(inputVal);
    const valid = !isNaN(value) && Math.round(value) === value;
    if (!valid) {
        value = inputVal;
    }
    return {
        value, valid
    };
};
const toArray = (inputVal) => {
    if (inputVal != null && !(inputVal instanceof Array)) {
        return [inputVal];
    }
    return inputVal;
};
const checkBool = (inputVal) => {
    const valid = typeof inputVal === 'boolean' || inputVal === 'true' || inputVal === 'false';
    const value = typeof inputVal === 'boolean' ? inputVal : (valid ? inputVal === 'true' : inputVal);
    return { valid, value };
};
const checkFile = (inputVal) => {
    const value = extractFileInfo(inputVal);
    const valid = value !== null;
    return {
        value: valid ? value : inputVal,
        valid
    };
};
const matchMediaType = (mediaType, accepts) => {
    return !mediaType || accepts.some((accept) => {
        const trimmedAccept = accept.trim();
        const prefixAccept = trimmedAccept.split('/')[0];
        const suffixAccept = trimmedAccept.split('.')[1];
        return ((trimmedAccept.includes('*') && mediaType.startsWith(prefixAccept)) ||
            (trimmedAccept.includes('.') && mediaType.endsWith(suffixAccept)) ||
            (trimmedAccept === mediaType));
    });
};
const partitionArray = (inputVal, validatorFn) => {
    const value = toArray(inputVal);
    if (value == null) {
        return [[], [value]];
    }
    return value.reduce((acc, x) => {
        if (acc[1].length == 0) {
            const r = validatorFn(x);
            const index = r.valid ? 0 : 1;
            acc[index].push(r.value);
        }
        return acc;
    }, [[], []]);
};
const ValidConstraints = {
    date: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'format'],
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'],
    array: ['minItems', 'maxItems', 'uniqueItems'],
    file: ['accept', 'maxFileSize'],
    email: ['minLength', 'maxLength', 'format', 'pattern']
};
const validationConstraintsList = ['type', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minItems',
    'maxItems', 'uniqueItems', 'minLength', 'maxLength', 'pattern', 'required', 'enum', 'accept', 'maxFileSize'];
const Constraints = {
    type: (constraint, inputVal) => {
        let value = inputVal;
        if (inputVal == undefined) {
            return {
                valid: true,
                value: inputVal
            };
        }
        let valid = true, res;
        switch (constraint) {
            case 'string':
                valid = true;
                value = inputVal.toString();
                break;
            case 'string[]':
                value = toArray(inputVal);
                break;
            case 'number':
                res = checkNumber(inputVal);
                value = res.value;
                valid = res.valid;
                break;
            case 'boolean':
                res = checkBool(inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'integer':
                res = checkInteger(inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'integer[]':
                res = partitionArray(inputVal, checkInteger);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'file':
                res = checkFile(inputVal instanceof Array ? inputVal[0] : inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'file[]':
                res = partitionArray(inputVal, checkFile);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'number[]':
                res = partitionArray(inputVal, checkNumber);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'boolean[]':
                res = partitionArray(inputVal, checkBool);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
        }
        return {
            valid,
            value
        };
    },
    format: (constraint, input) => {
        let valid = true;
        const value = input;
        if (input === null) {
            return { value, valid };
        }
        let res;
        switch (constraint) {
            case 'date':
                res = dateRegex.exec((input || '').trim());
                if (res != null) {
                    const [match, year, month, date] = res;
                    const [nMonth, nDate] = [+month, +date];
                    const leapYear = isLeapYear(+year);
                    valid = (nMonth >= 1 && nMonth <= 12) &&
                        (nDate >= 1 && nDate <= daysInMonth(leapYear, nMonth));
                }
                else {
                    valid = false;
                }
                break;
            case 'email':
                valid = new RegExp(emailRegex).test((input || '').trim());
                break;
            case 'data-url':
                valid = true;
                break;
        }
        return { valid, value };
    },
    minimum: (constraint, value) => {
        return { valid: value >= constraint, value };
    },
    maximum: (constraint, value) => {
        return { valid: value <= constraint, value };
    },
    exclusiveMinimum: (constraint, value) => {
        return { valid: value > constraint, value };
    },
    exclusiveMaximum: (constraint, value) => {
        return { valid: value < constraint, value };
    },
    minItems: (constraint, value) => {
        return { valid: (value instanceof Array) && value.length >= constraint, value };
    },
    maxItems: (constraint, value) => {
        return { valid: (value instanceof Array) && value.length <= constraint, value };
    },
    uniqueItems: (constraint, value) => {
        return { valid: !constraint || ((value instanceof Array) && value.length === new Set(value).size), value };
    },
    minLength: (constraint, value) => {
        return { ...Constraints.minimum(constraint, typeof value === 'string' ? value.length : 0), value };
    },
    maxLength: (constraint, value) => {
        return { ...Constraints.maximum(constraint, typeof value === 'string' ? value.length : 0), value };
    },
    pattern: (constraint, value) => {
        let regex;
        if (typeof constraint === 'string') {
            regex = new RegExp(constraint);
        }
        else {
            regex = constraint;
        }
        return { valid: regex.test(value), value };
    },
    required: (constraint, value) => {
        const valid = constraint ? value != null && value !== '' : true;
        return { valid, value };
    },
    enum: (constraint, value) => {
        return {
            valid: constraint.indexOf(value) > -1,
            value
        };
    },
    accept: (constraint, value) => {
        if (!constraint || constraint.length === 0 || value === null || value === undefined) {
            return {
                valid: true,
                value
            };
        }
        const tempValue = value instanceof Array ? value : [value];
        const invalidFile = tempValue.some((file) => !matchMediaType(file.type, constraint));
        return {
            valid: !invalidFile,
            value
        };
    },
    maxFileSize: (constraint, value) => {
        const sizeLimit = typeof constraint === 'string' ? getFileSizeInBytes(constraint) : constraint;
        return {
            valid: !(value instanceof FileObject) || value.size <= sizeLimit,
            value
        };
    }
};
const editableProperties = [
    'value',
    'label',
    'description',
    'visible',
    'enabled',
    'valid',
    'errorMessage',
    'readOnly',
    'enum',
    'enumNames',
    'required',
    'properties',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'maximum',
    'maxItems',
    'minimum',
    'minItems',
    'checked'
];
const dynamicProps = [
    ...editableProperties,
    'index',
    'activeChild'
];
const staticFields = ['plain-text', 'image'];
class ActionImplWithTarget {
    _action;
    _target;
    constructor(_action, _target) {
        this._action = _action;
        this._target = _target;
    }
    get type() {
        return this._action.type;
    }
    get payload() {
        return this._action.payload;
    }
    get metadata() {
        return this._action.metadata;
    }
    get target() {
        return this._target;
    }
    get isCustomEvent() {
        return this._action.isCustomEvent;
    }
    get originalAction() {
        return this._action.originalAction;
    }
    toString() {
        return this._action.toString();
    }
}
const target = Symbol('target');
const qualifiedName = Symbol('qualifiedName');
function dependencyTracked() {
    return function (target, propertyKey, descriptor) {
        const get = descriptor.get;
        if (get != undefined) {
            descriptor.get = function () {
                this.ruleEngine.trackDependency(this);
                return get.call(this);
            };
        }
    };
}
const addOnly = (includeOrExclude) => (...fieldTypes) => (target, propertyKey, descriptor) => {
    const get = descriptor.get;
    if (get != undefined) {
        descriptor.get = function () {
            if (fieldTypes.indexOf(this.fieldType) > -1 === includeOrExclude) {
                return get.call(this);
            }
            return undefined;
        };
    }
    const set = descriptor.set;
    if (set != undefined) {
        descriptor.set = function (value) {
            if (fieldTypes.indexOf(this.fieldType) > -1 === includeOrExclude) {
                set.call(this, value);
            }
        };
    }
};
const include = addOnly(true);
const exclude = addOnly(false);
class BaseNode {
    _options;
    _ruleNode;
    _lang = '';
    _callbacks = {};
    _dependents = [];
    _jsonModel;
    _tokens = [];
    get isContainer() {
        return false;
    }
    constructor(params, _options) {
        this._options = _options;
        this[qualifiedName] = null;
        this._jsonModel = {
            ...params,
            id: 'id' in params ? params.id : this.form.getUniqueId()
        };
    }
    setupRuleNode() {
        const self = this;
        this._ruleNode = new Proxy(this.ruleNodeReference(), {
            get: (ruleNodeReference, prop) => {
                return self.getFromRule(ruleNodeReference, prop);
            }
        });
    }
    ruleNodeReference() {
        return this;
    }
    getRuleNode() {
        return this._ruleNode;
    }
    getFromRule(ruleNodeReference, prop) {
        if (prop === Symbol.toPrimitive || (prop === 'valueOf' && !ruleNodeReference.hasOwnProperty('valueOf'))) {
            return this.valueOf;
        }
        else if (prop === target) {
            return this;
        }
        else if (typeof (prop) === 'string') {
            if (prop.startsWith('$')) {
                prop = prop.substr(1);
                if (typeof this[prop] !== 'function') {
                    const retValue = this[prop];
                    if (retValue instanceof BaseNode) {
                        return retValue.getRuleNode();
                    }
                    else if (retValue instanceof Array) {
                        return retValue.map(r => r instanceof BaseNode ? r.getRuleNode() : r);
                    }
                    else {
                        return retValue;
                    }
                }
            }
            else {
                if (ruleNodeReference.hasOwnProperty(prop)) {
                    return ruleNodeReference[prop];
                }
                else if (typeof ruleNodeReference[prop] === 'function') {
                    return ruleNodeReference[prop];
                }
            }
        }
    }
    get id() {
        return this._jsonModel.id;
    }
    get index() {
        if (this.parent) {
            return this.parent.indexOf(this);
        }
        return 0;
    }
    get parent() {
        return this._options.parent;
    }
    get type() {
        return this._jsonModel.type;
    }
    get repeatable() {
        return this.parent?.hasDynamicItems();
    }
    get fieldType() {
        return this._jsonModel.fieldType || 'text-input';
    }
    get ':type'() {
        return this._jsonModel[':type'] || this.fieldType;
    }
    get name() {
        return this._jsonModel.name;
    }
    get description() {
        return this._jsonModel.description;
    }
    set description(d) {
        this._setProperty('description', d);
    }
    get dataRef() {
        return this._jsonModel.dataRef;
    }
    get visible() {
        if (this.parent?.visible !== undefined) {
            return this.parent?.visible ? this._jsonModel.visible : false;
        }
        else {
            return this._jsonModel.visible;
        }
    }
    set visible(v) {
        if (v !== this._jsonModel.visible) {
            const changeAction = propertyChange('visible', v, this._jsonModel.visible);
            this._jsonModel.visible = v;
            this.notifyDependents(changeAction);
        }
    }
    get form() {
        return this._options.form;
    }
    get ruleEngine() {
        return this.form.ruleEngine;
    }
    get label() {
        return this._jsonModel.label;
    }
    set label(l) {
        if (l !== this._jsonModel.label) {
            const changeAction = propertyChange('label', l, this._jsonModel.label);
            this._jsonModel = {
                ...this._jsonModel,
                label: l
            };
            this.notifyDependents(changeAction);
        }
    }
    get uniqueItems() {
        return this._jsonModel.uniqueItems;
    }
    isTransparent() {
        const isNonTransparent = this.parent?._jsonModel.type === 'array';
        return !this._jsonModel.name && !isNonTransparent;
    }
    getState(forRestore = false) {
        return {
            ...this._jsonModel,
            properties: this.properties,
            index: this.index,
            parent: undefined,
            qualifiedName: this.qualifiedName,
            ...(this.repeatable === true ? {
                repeatable: true,
                minOccur: this.parent.minItems,
                maxOccur: this.parent.maxItems
            } : {}),
            ':type': this[':type'],
            ...(forRestore ? {
                _dependents: this._dependents.length ? this._dependents.map(x => x.node.id) : undefined,
                allowedComponents: undefined,
                columnClassNames: undefined,
                columnCount: undefined,
                gridClassNames: undefined
            } : {})
        };
    }
    subscribe(callback, eventName = 'change') {
        this._callbacks[eventName] = this._callbacks[eventName] || [];
        this._callbacks[eventName].push(callback);
        return {
            unsubscribe: () => {
                this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
            }
        };
    }
    _addDependent(dependent) {
        if (this._dependents.find(({ node }) => node === dependent) === undefined) {
            const subscription = this.subscribe((change) => {
                const changes = change.payload.changes;
                const propsToLook = [...dynamicProps, 'items'];
                const isPropChanged = changes.findIndex(x => {
                    return propsToLook.indexOf(x.propertyName) > -1;
                }) > -1;
                if (isPropChanged) {
                    dependent.dispatch(new ExecuteRule());
                }
            });
            this._dependents.push({ node: dependent, subscription });
        }
    }
    removeDependent(dependent) {
        const index = this._dependents.findIndex(({ node }) => node === dependent);
        if (index > -1) {
            this._dependents[index].subscription.unsubscribe();
            this._dependents.splice(index, 1);
        }
    }
    queueEvent(action) {
        const actionWithTarget = new ActionImplWithTarget(action, this);
        this.form.getEventQueue().queue(this, actionWithTarget, ['valid', 'invalid'].indexOf(actionWithTarget.type) > -1);
    }
    dispatch(action) {
        this.queueEvent(action);
        this.form.getEventQueue().runPendingQueue();
    }
    notifyDependents(action) {
        const depsToRestore = this._jsonModel._dependents;
        if (depsToRestore) {
            depsToRestore.forEach((x) => {
                const node = this.form.getElement(x);
                if (node) {
                    this._addDependent(node);
                }
            });
            this._jsonModel._dependents = undefined;
        }
        const handlers = this._callbacks[action.type] || [];
        handlers.forEach(x => {
            x(new ActionImplWithTarget(action, this));
        });
    }
    isEmpty(value = this._jsonModel.value) {
        return value === undefined || value === null || value === '';
    }
    _setProperty(prop, newValue, notify = true, notifyChildren = (action) => { }) {
        const oldValue = this._jsonModel[prop];
        let isValueSame = false;
        if (newValue !== null && oldValue !== null &&
            typeof newValue === 'object' && typeof oldValue === 'object') {
            isValueSame = JSON.stringify(newValue) === JSON.stringify(oldValue);
        }
        else {
            isValueSame = oldValue === newValue;
        }
        if (!isValueSame) {
            this._jsonModel[prop] = newValue;
            const changeAction = propertyChange(prop, newValue, oldValue);
            if (notify) {
                this.notifyDependents(changeAction);
            }
            notifyChildren.call(this, changeAction);
            if (validationConstraintsList.includes(prop)) {
                this.validate();
            }
            return changeAction.payload.changes;
        }
        return [];
    }
    _bindToDataModel(contextualDataModel) {
        if (this.id === '$form') {
            this._data = contextualDataModel;
            return;
        }
        const dataRef = this._jsonModel.dataRef;
        let _data, _parent = contextualDataModel, _key = '';
        if (dataRef === null) {
            _data = NullDataValue;
        }
        else if (dataRef !== undefined && !this.repeatable) {
            if (this._tokens.length === 0) {
                this._tokens = tokenize(dataRef);
            }
            let searchData = contextualDataModel;
            if (this._tokens[0].type === TOK_GLOBAL) {
                searchData = this.form.getDataNode();
            }
            else if (this._tokens[0].type === TOK_REPEATABLE) {
                let repeatRoot = this.parent;
                while (!repeatRoot.repeatable && repeatRoot !== this.form) {
                    repeatRoot = repeatRoot.parent;
                }
                searchData = repeatRoot.getDataNode();
            }
            if (typeof searchData !== 'undefined') {
                const name = this._tokens[this._tokens.length - 1].value;
                const create = this.defaultDataModel(name);
                _data = resolveData(searchData, this._tokens, create);
                _parent = resolveData(searchData, this._tokens.slice(0, -1));
                _key = name;
            }
        }
        else {
            if (contextualDataModel !== NullDataValue && staticFields.indexOf(this.fieldType) === -1) {
                _parent = contextualDataModel;
                const name = this._jsonModel.name || '';
                const key = contextualDataModel.$type === 'array' ? this.index : name;
                _key = key;
                if (key !== '') {
                    const create = this.defaultDataModel(key);
                    if (create !== undefined) {
                        _data = contextualDataModel.$getDataNode(key);
                        if (_data === undefined) {
                            _data = create;
                            contextualDataModel.$addDataNode(key, _data);
                        }
                    }
                }
                else {
                    _data = undefined;
                }
            }
        }
        if (_data) {
            if (!this.isContainer && _parent !== NullDataValue && _data !== NullDataValue) {
                _data = _data?.$convertToDataValue();
                _parent.$addDataNode(_key, _data, true);
            }
            _data?.$bindToField(this);
            this._data = _data;
        }
    }
    _data;
    getDataNode() {
        return this._data;
    }
    get lang() {
        if (this._jsonModel.lang) {
            this._lang = this._jsonModel.lang;
        }
        if (!this._lang) {
            if (this.parent) {
                this._lang = this.parent.lang;
            }
            else {
                this._lang = Intl.DateTimeFormat().resolvedOptions().locale;
            }
        }
        return this._lang;
    }
    get properties() {
        return this._jsonModel.properties || {};
    }
    set properties(p) {
        this._setProperty('properties', { ...p });
    }
    getNonTransparentParent() {
        let nonTransparentParent = this.parent;
        while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
            nonTransparentParent = nonTransparentParent.parent;
        }
        return nonTransparentParent;
    }
    _initialize(mode) {
        if (typeof this._data === 'undefined') {
            let dataNode, parent = this.parent;
            do {
                dataNode = parent.getDataNode();
                parent = parent.parent;
            } while (dataNode === undefined);
            this._bindToDataModel(dataNode);
        }
    }
    _applyUpdates(propNames, updates) {
        return propNames.reduce((acc, propertyName) => {
            const currentValue = updates[propertyName];
            const changes = this._setProperty(propertyName, currentValue, false);
            if (changes.length > 0) {
                acc[propertyName] = changes[0];
            }
            return acc;
        }, {});
    }
    get qualifiedName() {
        if (this.isTransparent()) {
            return null;
        }
        if (this[qualifiedName] !== null) {
            return this[qualifiedName];
        }
        const parent = this.getNonTransparentParent();
        if (parent && parent.type === 'array') {
            this[qualifiedName] = `${parent.qualifiedName}[${this.index}]`;
        }
        else {
            this[qualifiedName] = `${parent.qualifiedName}.${this.name}`;
        }
        return this[qualifiedName];
    }
    focus() {
        if (this.parent) {
            this.parent.activeChild = this;
        }
    }
    _getDefaults() {
        return {};
    }
    _applyDefaultsInModel() {
        Object.entries(this._getDefaults()).map(([key, value]) => {
            if (this._jsonModel[key] === undefined && value !== undefined) {
                this._jsonModel[key] = value;
            }
            else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.keys(value).forEach((keyOfValue) => {
                    if (this._jsonModel[key][keyOfValue] === undefined) {
                        this._jsonModel[key][keyOfValue] = value[keyOfValue];
                    }
                });
            }
        });
    }
}
__decorate([
    dependencyTracked()
], BaseNode.prototype, "index", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "description", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "visible", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "label", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "properties", null);
class Scriptable extends BaseNode {
    _events = {};
    _rules = {};
    getRules() {
        return typeof this._jsonModel.rules !== 'object' ? {} : this._jsonModel.rules;
    }
    getCompiledRule(eName, rule) {
        if (!(eName in this._rules)) {
            const eString = rule || this.getRules()[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                try {
                    this._rules[eName] = this.ruleEngine.compileRule(eString, this.lang);
                }
                catch (e) {
                    this.form.logger.error(`Unable to compile rule \`"${eName}" : "${eString}"\` Exception : ${e}`);
                }
            }
            else {
                throw new Error(`only expression strings are supported. ${typeof (eString)} types are not supported`);
            }
        }
        return this._rules[eName];
    }
    getCompiledEvent(eName) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel.events?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                eString = [eString];
            }
            if (typeof eString !== 'undefined' && eString.length > 0) {
                this._events[eName] = eString.map(x => {
                    try {
                        return this.ruleEngine.compileRule(x, this.lang);
                    }
                    catch (e) {
                        this.form.logger.error(`Unable to compile expression \`"${eName}" : "${eString}"\` Exception : ${e}`);
                    }
                    return null;
                }).filter(x => x !== null);
            }
        }
        return this._events[eName] || [];
    }
    applyUpdates(updates) {
        Object.entries(updates).forEach(([key, value]) => {
            if (key in editableProperties || (key in this && typeof this[key] !== 'function')) {
                try {
                    this[key] = value;
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    }
    executeAllRules(context) {
        const entries = Object.entries(this.getRules());
        if (entries.length > 0) {
            const scope = this.getExpressionScope();
            entries.forEach(([prop, rule]) => {
                const node = this.getCompiledRule(prop, rule);
                if (node) {
                    const newVal = this.ruleEngine.execute(node, scope, context, true);
                    if (editableProperties.indexOf(prop) > -1) {
                        const oldAndNewValueAreEmpty = this.isEmpty() && this.isEmpty(newVal) && prop === 'value';
                        if (!oldAndNewValueAreEmpty) {
                            this[prop] = newVal;
                        }
                    }
                    else {
                        this.form.logger.warn(`${prop} is not a valid editable property.`);
                    }
                }
            });
        }
    }
    getExpressionScope() {
        const parent = this.getNonTransparentParent();
        const target = {
            self: this.getRuleNode(),
            siblings: parent?.ruleNodeReference() || {}
        };
        const scope = new Proxy(target, {
            get: (target, prop) => {
                if (prop === Symbol.toStringTag) {
                    return 'Object';
                }
                if (typeof prop === 'string' && prop.startsWith('$')) {
                    const retValue = target.self[prop];
                    if (retValue instanceof BaseNode) {
                        return retValue.getRuleNode();
                    }
                    else if (retValue instanceof Array) {
                        return retValue.map(r => r instanceof BaseNode ? r.getRuleNode() : r);
                    }
                    else {
                        return retValue;
                    }
                }
                else {
                    if (prop in target.siblings) {
                        return target.siblings[prop];
                    }
                    else {
                        return target.self[prop];
                    }
                }
            },
            has: (target, prop) => {
                prop = prop;
                const selfPropertyOrChild = target.self[prop];
                const sibling = target.siblings[prop];
                return typeof selfPropertyOrChild != 'undefined' || typeof sibling != 'undefined';
            }
        });
        return scope;
    }
    executeEvent(context, node) {
        let updates;
        if (node) {
            updates = this.ruleEngine.execute(node, this.getExpressionScope(), context);
        }
        if (typeof updates !== 'undefined' && updates != null) {
            this.applyUpdates(updates);
        }
    }
    executeRule(event, context) {
        if (typeof event.payload.ruleName === 'undefined') {
            this.executeAllRules(context);
        }
    }
    executeExpression(expr) {
        const ruleContext = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this
        };
        const node = this.ruleEngine.compileRule(expr, this.lang);
        return this.ruleEngine.execute(node, this.getExpressionScope(), ruleContext);
    }
    executeAction(action) {
        const context = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this,
            '$event': {
                type: action.type,
                payload: action.payload,
                target: this.getRuleNode()
            }
        };
        const eventName = action.isCustomEvent ? `custom:${action.type}` : action.type;
        const funcName = action.isCustomEvent ? `custom_${action.type}` : action.type;
        const node = this.getCompiledEvent(eventName);
        if (funcName in this && typeof this[funcName] === 'function') {
            this[funcName](action, context);
        }
        node.forEach((n) => this.executeEvent(context, n));
        this.notifyDependents(action);
    }
}
const notifyChildrenAttributes = [
    'readOnly', 'enabled'
];
class Container extends Scriptable {
    _children = [];
    _childrenReference;
    _itemTemplate = null;
    fieldFactory;
    constructor(json, _options) {
        super(json, { form: _options.form, parent: _options.parent, mode: _options.mode });
        this.fieldFactory = _options.fieldFactory;
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enabled: true,
            readOnly: false
        };
    }
    ruleNodeReference() {
        return this._childrenReference;
    }
    get items() {
        return this._children;
    }
    get maxItems() {
        return this._jsonModel.maxItems;
    }
    set maxItems(m) {
        this._jsonModel.maxItems = m;
        const minItems = this._jsonModel.minItems || 1;
        const itemsLength = this._children.length;
        const items2Remove = Math.min(itemsLength - m, itemsLength - minItems);
        if (items2Remove > 0) {
            for (let i = 0; i < items2Remove; i++) {
                this.getDataNode().$removeDataNode(m + i);
                this._childrenReference.pop();
            }
            const elems = this._children.splice(m, items2Remove);
            this.notifyDependents(propertyChange('items', elems, null));
        }
    }
    get minItems() {
        return this._jsonModel.minItems;
    }
    set minItems(m) {
        this._jsonModel.minItems = m;
        const itemsLength = this._children.length;
        const difference = itemsLength - m;
        const items2Add = Math.abs(difference);
        if (difference < 0) {
            const elems = [];
            for (let i = 0; i < items2Add; i++) {
                elems.push(this._addChild(this._itemTemplate, null, true));
            }
            this.notifyDependents(propertyChange('items', elems, null));
        }
    }
    hasDynamicItems() {
        return this._itemTemplate != null;
    }
    get isContainer() {
        return true;
    }
    _activeChild = null;
    isSiteContainer(item) {
        return (':items' in item || 'cqItems' in item) && !('fieldType' in item);
    }
    isAFormField(item) {
        return ('fieldType' in item || 'id' in item || 'name' in item || 'dataRef' in item || 'type' in item);
    }
    _getFormAndSitesState(isRepeatableChild = false, forRestore = false) {
        return this._jsonModel.items ? this._jsonModel.items.map((x) => {
            if (this.isSiteContainer(x)) {
                const newObjWithId = {
                    ...(x?.id ? { id: this.form.getUniqueId() } : {})
                };
                return {
                    ...x,
                    ...newObjWithId,
                    ':items': this.walkSiteContainerItems(x)
                };
            }
            else if (this.isAFormField(x)) {
                return { ...this.form.getElement(x?.id).getState(isRepeatableChild, forRestore) };
            }
            else {
                return x;
            }
        }) : [];
    }
    getItemsState(isRepeatableChild = false, forRestore = false) {
        if (this._jsonModel.type === 'array' || isRepeatable$1(this._jsonModel) || isRepeatableChild) {
            if (isRepeatableChild) {
                return this._getFormAndSitesState(isRepeatableChild, forRestore);
            }
            else {
                return this._children.map(x => {
                    return { ...x.getState(true, forRestore) };
                });
            }
        }
        else {
            return this._getFormAndSitesState(isRepeatableChild, forRestore);
        }
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return {
            ...super.getState(forRestore),
            ...(forRestore ? {
                ':items': undefined,
                ':itemsOrder': undefined
            } : {}),
            items: this.getItemsState(isRepeatableChild, forRestore),
            enabled: this.enabled,
            readOnly: this.readOnly
        };
    }
    _createChild(child, options) {
        return this.fieldFactory.createField(child, options);
    }
    walkSiteContainerItems(x) {
        return Object.fromEntries(Object.entries(x[':items']).map(([key, value]) => {
            if (this.isAFormField(value)) {
                return [key, this.form.getElement(value?.id).getState()];
            }
            else if (this.isSiteContainer(value)) {
                return this.walkSiteContainerItems(value);
            }
            else {
                if (typeof value === 'object') {
                    const newObjWithId = {
                        ...(value?.id ? { id: this.form.getUniqueId() } : {})
                    };
                    return [key, {
                            ...value,
                            ...newObjWithId
                        }
                    ];
                }
                else {
                    return [key, value];
                }
            }
        }));
    }
    _addChildToRuleNode(child, options) {
        const self = this;
        const { parent = this } = options;
        const name = parent.type == 'array' ? parent._children.length + '' : child.name || '';
        if (name.length > 0) {
            Object.defineProperty(parent._childrenReference, name, {
                get: () => {
                    if (child.isContainer && child.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(child);
                    }
                    if (self.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(self);
                        if (this._children[name] !== undefined) {
                            return this._children[name].getRuleNode();
                        }
                    }
                    else {
                        return child.getRuleNode();
                    }
                },
                configurable: true,
                enumerable: true
            });
        }
    }
    _addChild(itemJson, index, cloneIds = false, mode = 'create') {
        let nonTransparentParent = this;
        while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
            nonTransparentParent = nonTransparentParent.parent;
        }
        if (typeof index !== 'number' || index > nonTransparentParent._children.length) {
            index = this._children.length;
        }
        const form = this.form;
        const itemTemplate = {
            index,
            ...deepClone(itemJson, cloneIds ? () => { return form.getUniqueId(); } : undefined)
        };
        const retVal = this._createChild(itemTemplate, { parent: this, form: this.form, mode });
        itemJson.id = retVal.id;
        this.form.fieldAdded(retVal);
        this._addChildToRuleNode(retVal, { parent: nonTransparentParent });
        if (index === this._children.length) {
            this._children.push(retVal);
        }
        else {
            this._children.splice(index, 0, retVal);
        }
        return retVal;
    }
    indexOf(f) {
        return this._children.indexOf(f);
    }
    defaultDataModel(name) {
        const type = this._jsonModel.type || undefined;
        if (type === undefined) {
            return undefined;
        }
        else {
            const instance = type === 'array' ? [] : {};
            return new DataGroup(name, instance, type);
        }
    }
    _canHaveRepeatingChildren(mode = 'create') {
        const items = this._jsonModel.items;
        return this._jsonModel.type == 'array' && this.getDataNode() != null &&
            (items.length === 1 || (items[0].repeatable == true && mode === 'restore'));
    }
    _initialize(mode) {
        super._initialize(mode);
        const items = this._jsonModel.items || [];
        this._childrenReference = this._jsonModel.type == 'array' ? [] : {};
        if (this._canHaveRepeatingChildren(mode)) {
            this._itemTemplate = deepClone(items[0]);
            if (mode === 'restore') {
                this._itemTemplate.repeatable = undefined;
            }
            if (typeof (this._jsonModel.minItems) !== 'number') {
                this._jsonModel.minItems = 0;
            }
            if (typeof (this._jsonModel.maxItems) !== 'number') {
                this._jsonModel.maxItems = -1;
            }
            if (typeof (this._jsonModel.initialItems) !== 'number') {
                this._jsonModel.initialItems = Math.max(1, this._jsonModel.minItems);
            }
            for (let i = 0; i < this._jsonModel.initialItems; i++) {
                let child;
                if (mode === 'restore') {
                    let itemTemplate = this._itemTemplate;
                    if (i < this._jsonModel.items.length) {
                        itemTemplate = deepClone(items[i]);
                        itemTemplate.repeatable = undefined;
                    }
                    child = this._addChild(itemTemplate, undefined, i > this._jsonModel.items.length - 1, mode);
                }
                else {
                    child = this._addChild(this._itemTemplate, undefined, i > this._jsonModel.items.length - 1);
                }
                if (mode === 'create') {
                    items[0].id = child.id;
                }
                child._initialize(mode);
            }
        }
        else if (items.length > 0) {
            items.forEach((item) => {
                if (this.isSiteContainer(item)) {
                    this._initializeSiteContainer(item);
                }
                else if (this.isAFormField(item)) {
                    const child = this._addChild(item, undefined, false, mode);
                    child._initialize(mode);
                }
                else {
                    this.form.logger.warn(`A container item was not initialized. ${item}`);
                }
            });
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
        }
        else {
            this.form.logger.warn('A container exists with no items.');
        }
        this.setupRuleNode();
    }
    _initializeSiteContainer(item) {
        Object.entries(item[':items']).forEach(([key, value]) => {
            if (this.isAFormField(value)) {
                const child = this._addChild(value);
                child._initialize();
            }
            else if (this.isSiteContainer(value)) {
                return this._initializeSiteContainer(value);
            }
        });
    }
    addItem(action) {
        if ((action.type === 'addItem' || action.type == 'addInstance') && this._itemTemplate != null) {
            if ((this._jsonModel.maxItems === -1) || (this._children.length < this._jsonModel.maxItems)) {
                const dataNode = this.getDataNode();
                let instanceIndex = action.payload;
                const retVal = this._addChild(this._itemTemplate, action.payload, true);
                if (typeof instanceIndex !== 'number' || instanceIndex > this._children.length) {
                    instanceIndex = this._children.length;
                }
                const _data = retVal.defaultDataModel(instanceIndex);
                if (_data) {
                    dataNode.$addDataNode(instanceIndex, _data);
                }
                retVal._initialize('create');
                this.notifyDependents(propertyChange('items', retVal.getState(), null));
                retVal.dispatch(new Initialize());
                retVal.dispatch(new ExecuteRule());
                for (let i = instanceIndex + 1; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
            }
        }
    }
    removeItem(action) {
        if ((action.type === 'removeItem' || action.type == 'removeInstance') && this._itemTemplate != null) {
            if (this._children.length == 0) {
                return;
            }
            let instanceIndex = action.payload;
            if (typeof instanceIndex !== 'number') {
                instanceIndex = this._children.length - 1;
            }
            const state = this._children[instanceIndex].getState();
            if (this._children.length > this._jsonModel.minItems) {
                this._childrenReference.pop();
                this._children.splice(instanceIndex, 1);
                this.getDataNode().$removeDataNode(instanceIndex);
                for (let i = instanceIndex; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
                this.notifyDependents(propertyChange('items', null, state));
            }
        }
    }
    queueEvent(action) {
        super.queueEvent(action);
        if (action.metadata?.dispatch) {
            this.items.forEach(x => {
                x.queueEvent(action);
            });
        }
    }
    reset() {
        if (this.type === 'array' || isRepeatable$1(this._jsonModel)) {
            if (this.items.length > this._jsonModel.initialItems) {
                const itemsToBeRemoved = this.items.length - this._jsonModel.initialItems;
                for (let i = 0; i < itemsToBeRemoved; i++) {
                    this.dispatch(new RemoveItem());
                }
            }
        }
        this.items.forEach(x => {
            x.reset();
        });
    }
    validate() {
        return this.items.flatMap(x => {
            return x.validate();
        }).filter(x => x.fieldName !== '');
    }
    dispatch(action) {
        super.dispatch(action);
    }
    importData(contextualDataModel) {
        this._bindToDataModel(contextualDataModel);
        const dataNode = this.getDataNode() || contextualDataModel;
        this.syncDataAndFormModel(dataNode);
    }
    syncDataAndFormModel(contextualDataModel) {
        if (contextualDataModel?.$type === 'array' && this._itemTemplate != null) {
            const dataLength = contextualDataModel?.$value.length;
            const itemsLength = this._children.length;
            const maxItems = this._jsonModel.maxItems === -1 ? dataLength : this._jsonModel.maxItems;
            const minItems = this._jsonModel.minItems;
            let items2Add = Math.min(dataLength - itemsLength, maxItems - itemsLength);
            const items2Remove = Math.min(itemsLength - dataLength, itemsLength - minItems);
            while (items2Add > 0) {
                items2Add--;
                const child = this._addChild(this._itemTemplate);
                child._initialize('create');
            }
            if (items2Remove > 0) {
                this._children.splice(dataLength, items2Remove);
                for (let i = 0; i < items2Remove; i++) {
                    this._childrenReference.pop();
                }
            }
        }
        this._children.forEach(x => {
            x.importData(contextualDataModel);
        });
    }
    get activeChild() {
        return this._activeChild;
    }
    set activeChild(c) {
        if (c !== this._activeChild) {
            let activeChild = this._activeChild;
            while (activeChild instanceof Container) {
                const temp = activeChild.activeChild;
                activeChild.activeChild = null;
                activeChild = temp;
            }
            const change = propertyChange('activeChild', c, this._activeChild);
            this._activeChild = c;
            if (this.parent && c !== null) {
                this.parent.activeChild = this;
            }
            this._jsonModel.activeChild = c?.id;
            this.notifyDependents(change);
        }
    }
    get enabled() {
        if (this.parent?.enabled !== undefined) {
            return !this.parent?.enabled ? false : this._jsonModel.enabled;
        }
        else {
            return this._jsonModel.enabled;
        }
    }
    set enabled(e) {
        this._setProperty('enabled', e, true, this.notifyChildren);
    }
    get readOnly() {
        if (this.parent?.readOnly !== undefined) {
            return this.parent.readOnly ? true : this._jsonModel.readOnly;
        }
        else {
            return this._jsonModel.readOnly;
        }
    }
    set readOnly(e) {
        this._setProperty('readOnly', e, true, this.notifyChildren);
    }
    notifyChildren(action) {
        if (action.payload !== undefined && action.payload.changes !== undefined) {
            for (const change of action.payload.changes) {
                if (change.propertyName !== undefined && notifyChildrenAttributes.includes(change.propertyName)) {
                    this.items.forEach((child) => {
                        this.notifyDependents.call(child, propertyChange(change.propertyName, child.getState()[change.propertyName], null));
                        if (child.fieldType === 'panel') {
                            this.notifyChildren.call(child, action);
                        }
                    });
                }
            }
        }
    }
}
__decorate([
    dependencyTracked()
], Container.prototype, "maxItems", null);
__decorate([
    dependencyTracked()
], Container.prototype, "minItems", null);
__decorate([
    dependencyTracked()
], Container.prototype, "activeChild", null);
class Node {
    _jsonModel;
    constructor(inputModel) {
        this._jsonModel = {
            ...inputModel
        };
    }
    getP(key, def) {
        return getProperty(this._jsonModel, key, def);
    }
    get isContainer() {
        return false;
    }
}
class FormMetaData extends Node {
    get version() {
        return this.getP('version', '');
    }
    get grammar() {
        return this.getP('grammar', '');
    }
}
class SubmitMetaData {
    lang;
    captchaInfo;
    constructor(lang = '', captchaInfo) {
        this.lang = lang;
        this.captchaInfo = captchaInfo;
    }
}
const levels = {
    off: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
class Logger {
    debug(msg) {
        this.log(msg, 'debug');
    }
    info(msg) {
        this.log(msg, 'info');
    }
    warn(msg) {
        this.log(msg, 'warn');
    }
    error(msg) {
        this.log(msg, 'error');
    }
    log(msg, level) {
        if (this.logLevel !== 0 && this.logLevel <= levels[level]) {
            console[level](msg);
        }
    }
    logLevel;
    constructor(logLevel = 'off') {
        this.logLevel = levels[logLevel];
    }
}
class EventNode {
    _node;
    _event;
    constructor(_node, _event) {
        this._node = _node;
        this._event = _event;
    }
    get node() {
        return this._node;
    }
    get event() {
        return this._event;
    }
    isEqual(that) {
        return that !== null && that !== undefined && this._node == that._node && this._event.type == that._event.type;
    }
    toString() {
        return this._node.id + '__' + this.event.type;
    }
    valueOf() {
        return this.toString();
    }
}
class EventQueue {
    logger;
    static MAX_EVENT_CYCLE_COUNT = 10;
    _runningEventCount;
    _isProcessing = false;
    _pendingEvents = [];
    constructor(logger = new Logger('off')) {
        this.logger = logger;
        this._runningEventCount = {};
    }
    get length() {
        return this._pendingEvents.length;
    }
    get isProcessing() {
        return this._isProcessing;
    }
    isQueued(node, event) {
        const evntNode = new EventNode(node, event);
        return this._pendingEvents.find(x => evntNode.isEqual(x)) !== undefined;
    }
    queue(node, events, priority = false) {
        if (!node || !events) {
            return;
        }
        if (!(events instanceof Array)) {
            events = [events];
        }
        events.forEach(e => {
            const evntNode = new EventNode(node, e);
            const counter = this._runningEventCount[evntNode.valueOf()] || 0;
            if (counter < EventQueue.MAX_EVENT_CYCLE_COUNT) {
                this.logger.info(`Queued event : ${e.type} node: ${node.id} - ${node.name}`);
                if (priority) {
                    const index = this._isProcessing ? 1 : 0;
                    this._pendingEvents.splice(index, 0, evntNode);
                }
                else {
                    this._pendingEvents.push(evntNode);
                }
                this._runningEventCount[evntNode.valueOf()] = counter + 1;
            }
            else {
                this.logger.info(`Skipped queueing event : ${e.type} node: ${node.id} - ${node.name} with count=${counter}`);
            }
        });
    }
    empty() {
        this._pendingEvents = [];
    }
    runPendingQueue() {
        if (this._isProcessing) {
            return;
        }
        this._isProcessing = true;
        while (this._pendingEvents.length > 0) {
            const e = this._pendingEvents[0];
            this.logger.info(`Dequeued event : ${e.event.type} node: ${e.node.id} - ${e.node.name}`);
            e.node.executeAction(e.event);
            this._pendingEvents.shift();
        }
        this._runningEventCount = {};
        this._isProcessing = false;
    }
}
const request$1 = (url, data = null, options = {}) => {
    const opts = { ...defaultRequestOptions, ...options };
    const updatedUrl = opts.method === 'GET' && data ? convertQueryString(url, data) : url;
    if (opts.method !== 'GET') {
        opts.body = data;
    }
    return fetch(updatedUrl, {
        ...opts
    }).then(async (response) => {
        let body;
        if (!response.ok) {
            console.error(`Error while fetching response from ${url} : ${response.statusText}`);
        }
        if (response?.headers?.get('Content-Type')?.includes('application/json')) {
            body = await response.json();
        }
        else {
            body = await response.text();
        }
        const headers = {};
        response?.headers?.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            status: response.status,
            body,
            headers
        };
    });
};
const defaultRequestOptions = {
    method: 'GET'
};
const convertQueryString = (endpoint, payload) => {
    if (!payload) {
        return endpoint;
    }
    let updatedPayload = {};
    try {
        updatedPayload = JSON.parse(payload);
    }
    catch (err) {
        console.log('Query params invalid');
    }
    const params = [];
    Object.keys(updatedPayload).forEach((key) => {
        if (Array.isArray(updatedPayload[key])) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(updatedPayload[key]))}`);
        }
        else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(updatedPayload[key])}`);
        }
    });
    if (!params.length) {
        return endpoint;
    }
    return endpoint.includes('?') ? `${endpoint}&${params.join('&')}` : `${endpoint}?${params.join('&')}`;
};
const getCustomEventName = (name) => {
    const eName = name;
    if (eName.length > 0 && eName.startsWith('custom:')) {
        return eName.substring('custom:'.length);
    }
    return eName;
};
const request = async (context, uri, httpVerb, payload, success, error, headers) => {
    const endpoint = uri;
    const requestOptions = {
        method: httpVerb
    };
    let inputPayload;
    if (payload && payload instanceof FileObject && payload.data instanceof File) {
        const formData = new FormData();
        formData.append(payload.name, payload.data);
        inputPayload = formData;
    }
    else if (payload instanceof FormData) {
        inputPayload = payload;
    }
    else if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
        const headerNames = Object.keys(headers);
        if (headerNames.length > 0) {
            requestOptions.headers = {
                ...headers,
                ...(headerNames.indexOf('Content-Type') === -1 ? { 'Content-Type': 'application/json' } : {})
            };
        }
        else {
            requestOptions.headers = { 'Content-Type': 'application/json' };
        }
        const contentType = requestOptions?.headers?.['Content-Type'] || 'application/json';
        if (contentType === 'application/json') {
            inputPayload = JSON.stringify(payload);
        }
        else if (contentType.indexOf('multipart/form-data') > -1) {
            inputPayload = multipartFormData(payload);
        }
        else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            inputPayload = urlEncoded(payload);
        }
    }
    const result = await request$1(endpoint, inputPayload, requestOptions);
    if (result?.status >= 200 && result?.status <= 299) {
        const eName = getCustomEventName(success);
        if (success === 'submitSuccess') {
            context.form.dispatch(new SubmitSuccess(result, true));
        }
        else {
            context.form.dispatch(new CustomEvent(eName, result, true));
        }
    }
    else {
        context.form.logger.error('Error invoking a rest API');
        const eName = getCustomEventName(error);
        if (error === 'submitError') {
            context.form.dispatch(new SubmitError(result, true));
            context.form.dispatch(new SubmitFailure(result, true));
        }
        else {
            context.form.dispatch(new CustomEvent(eName, result, true));
        }
    }
};
const urlEncoded = (data) => {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value != null && typeof value === 'object') {
            formData.append(key, jsonString(value));
        }
        else {
            formData.append(key, value);
        }
    });
    return formData;
};
const multipartFormData = (data, attachments) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value != null && typeof value === 'object') {
            formData.append(key, jsonString(value));
        }
        else {
            formData.append(key, value);
        }
    });
    const addAttachmentToFormData = (objValue, formData) => {
        if (objValue?.data instanceof File) {
            let attIdentifier = `${objValue?.dataRef}/${objValue?.name}`;
            if (!attIdentifier.startsWith('/')) {
                attIdentifier = `/${attIdentifier}`;
            }
            formData.append(attIdentifier, objValue.data);
        }
    };
    if (attachments) {
        Object.keys(attachments).reduce((acc, curr) => {
            const objValue = attachments[curr];
            if (objValue && objValue instanceof Array) {
                return [...acc, ...objValue.map((x) => addAttachmentToFormData(x, formData))];
            }
            else {
                return [...acc, addAttachmentToFormData(objValue, formData)];
            }
        }, []);
    }
    return formData;
};
const submit = async (context, success, error, submitAs = 'multipart/form-data', input_data = null) => {
    const endpoint = context.form.action;
    let data = input_data;
    if (typeof data != 'object' || data == null) {
        data = context.form.exportData();
    }
    const attachments = getAttachments(context.form, true);
    let submitContentType = submitAs;
    const submitDataAndMetaData = { 'data': data, 'submitMetadata': context.form.exportSubmitMetaData() };
    let formData = submitDataAndMetaData;
    if (Object.keys(attachments).length > 0 || submitAs === 'multipart/form-data') {
        formData = multipartFormData(submitDataAndMetaData, attachments);
        submitContentType = 'multipart/form-data';
    }
    await request(context, endpoint, 'POST', formData, success, error, {
        'Content-Type': submitContentType
    });
};
const createAction = (name, payload = {}) => {
    switch (name) {
        case 'change':
            return new Change(payload);
        case 'submit':
            return new Submit(payload);
        case 'click':
            return new Click(payload);
        case 'addItem':
            return new AddItem(payload);
        case 'removeItem':
            return new RemoveItem(payload);
        case 'reset':
            return new Reset(payload);
        case 'addInstance':
            return new AddInstance(payload);
        case 'removeInstance':
            return new RemoveInstance(payload);
        default:
            console.error('invalid action');
    }
};
class FunctionRuntimeImpl {
    static instance = null;
    customFunctions = {};
    constructor() {
    }
    static getInstance() {
        if (!FunctionRuntimeImpl.instance) {
            FunctionRuntimeImpl.instance = new FunctionRuntimeImpl();
        }
        return FunctionRuntimeImpl.instance;
    }
    registerFunctions(functions) {
        Object.entries(functions).forEach(([name, funcDef]) => {
            let finalFunction = funcDef;
            if (typeof funcDef === 'function') {
                finalFunction = {
                    _func: (args, data, interpreter) => {
                        const globals = {
                            form: interpreter.globals.$form,
                            field: interpreter.globals.$field,
                            event: interpreter.globals.$event,
                            functions: {
                                setProperty: (target, payload) => {
                                    const eventName = 'custom:setProperty';
                                    const args = [target, eventName, payload];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().dispatchEvent._func.call(undefined, args, data, interpreter);
                                },
                                reset: (target) => {
                                    const eventName = 'reset';
                                    target = target || 'reset';
                                    const args = [target, eventName];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().dispatchEvent._func.call(undefined, args, data, interpreter);
                                },
                                validate: (target) => {
                                    const args = [target];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().validate._func.call(undefined, args, data, interpreter);
                                },
                                exportData: () => {
                                    return FunctionRuntimeImpl.getInstance().getFunctions().exportData._func.call(undefined, args, data, interpreter);
                                },
                                submitForm: (payload, validateForm, contentType) => {
                                    const submitAs = contentType || 'multipart/form-data';
                                    const args = ['custom:submitSuccess', 'custom:submitError', submitAs, payload, validateForm];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().submitForm._func.call(undefined, args, data, interpreter);
                                }
                            }
                        };
                        return funcDef(...args, globals);
                    },
                    _signature: []
                };
            }
            if (!finalFunction.hasOwnProperty('_func')) {
                console.warn(`Unable to register function with name ${name}.`);
                return;
            }
            FunctionRuntimeImpl.getInstance().customFunctions[name] = finalFunction;
        });
    }
    unregisterFunctions(...names) {
        names.forEach(name => {
            if (name in FunctionRuntimeImpl.getInstance().customFunctions) {
                delete FunctionRuntimeImpl?.getInstance().customFunctions[name];
            }
        });
    }
    getFunctions() {
        function isArray(obj) {
            if (obj !== null) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }
            return false;
        }
        function valueOf(a) {
            if (a === null || a === undefined) {
                return a;
            }
            if (isArray(a)) {
                return a.map(i => valueOf(i));
            }
            return a.valueOf();
        }
        function toString(a) {
            if (a === null || a === undefined) {
                return '';
            }
            return a.toString();
        }
        const defaultFunctions = {
            validate: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    let validation;
                    if (typeof element === 'string' || typeof element === 'undefined') {
                        validation = interpreter.globals.form.validate();
                    }
                    else {
                        validation = interpreter.globals.form.getElement(element.$id).validate();
                    }
                    if (Array.isArray(validation) && validation.length) {
                        interpreter.globals.form.logger.error('Form Validation Error');
                    }
                    return validation;
                },
                _signature: []
            },
            setFocus: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const flag = args[1];
                    try {
                        const field = interpreter.globals.form.getElement(element?.$id) || interpreter.globals.field;
                        interpreter.globals.form.setFocus(field, flag);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('An error has occurred within the setFocus API.');
                    }
                },
                _signature: []
            },
            getData: {
                _func: (args, data, interpreter) => {
                    interpreter.globals.form.logger.warn('The `getData` function is depricated. Use `exportData` instead.');
                    return interpreter.globals.form.exportData();
                },
                _signature: []
            },
            exportData: {
                _func: (args, data, interpreter) => {
                    return interpreter.globals.form.exportData();
                },
                _signature: []
            },
            importData: {
                _func: (args, data, interpreter) => {
                    const inputData = args[0];
                    if (typeof inputData === 'object' && inputData !== null) {
                        interpreter.globals.form.importData(inputData);
                    }
                    return {};
                },
                _signature: []
            },
            submitForm: {
                _func: (args, data, interpreter) => {
                    let success = 'custom:submitSuccess';
                    let error = 'custom:submitError';
                    let submit_data;
                    let validate_form;
                    let submit_as;
                    if (args.length > 0 && typeof valueOf(args[0]) === 'object') {
                        submit_data = args.length > 0 ? valueOf(args[0]) : null;
                        validate_form = args.length > 1 ? valueOf(args[1]) : true;
                        submit_as = args.length > 2 ? toString(args[2]) : 'multipart/form-data';
                    }
                    else {
                        interpreter.globals.form.logger.warn('This usage of submitForm is deprecated. Please see the documentation and update');
                        success = toString(args[0]);
                        error = toString(args[1]);
                        submit_as = args.length > 2 ? toString(args[2]) : 'multipart/form-data';
                        submit_data = args.length > 3 ? valueOf(args[3]) : null;
                        validate_form = args.length > 4 ? valueOf(args[4]) : true;
                    }
                    interpreter.globals.form.dispatch(new Submit({
                        success,
                        error,
                        submit_as,
                        validate_form: validate_form,
                        data: submit_data
                    }));
                    return {};
                },
                _signature: []
            },
            request: {
                _func: (args, data, interpreter) => {
                    const uri = toString(args[0]);
                    const httpVerb = toString(args[1]);
                    const payload = valueOf(args[2]);
                    let success, error, headers = {};
                    if (typeof (args[3]) === 'string') {
                        interpreter.globals.form.logger.warn('This usage of request is deprecated. Please see the documentation and update');
                        success = valueOf(args[3]);
                        error = valueOf(args[4]);
                    }
                    else {
                        headers = valueOf(args[3]);
                        success = valueOf(args[4]);
                        error = valueOf(args[5]);
                    }
                    request(interpreter.globals, uri, httpVerb, payload, success, error, headers);
                    return {};
                },
                _signature: []
            },
            addInstance: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const payload = args.length > 2 ? valueOf(args[2]) : undefined;
                    try {
                        const formElement = interpreter.globals.form.getElement(element.$id);
                        const action = createAction('addInstance', payload);
                        formElement.addItem(action);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('Invalid argument passed in addInstance. An element is expected');
                    }
                },
                _signature: []
            },
            removeInstance: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const payload = args.length > 2 ? valueOf(args[2]) : undefined;
                    try {
                        const formElement = interpreter.globals.form.getElement(element.$id);
                        const action = createAction('removeInstance', payload);
                        formElement.removeItem(action);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('Invalid argument passed in removeInstance. An element is expected');
                    }
                },
                _signature: []
            },
            dispatchEvent: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    let eventName = valueOf(args[1]);
                    let payload = args.length > 2 ? valueOf(args[2]) : undefined;
                    let dispatch = false;
                    if (typeof element === 'string') {
                        payload = eventName;
                        eventName = element;
                        dispatch = true;
                    }
                    let event;
                    if (eventName.startsWith('custom:')) {
                        event = new CustomEvent(eventName.substring('custom:'.length), payload, dispatch);
                    }
                    else {
                        event = createAction(eventName, payload);
                    }
                    if (event != null) {
                        if (typeof element === 'string') {
                            interpreter.globals.form.dispatch(event);
                        }
                        else {
                            interpreter.globals.form.getElement(element.$id).dispatch(event);
                        }
                    }
                    return {};
                },
                _signature: []
            }
        };
        return { ...defaultFunctions, ...FunctionRuntimeImpl.getInstance().customFunctions };
    }
}
const FunctionRuntime = FunctionRuntimeImpl.getInstance();
class Form extends Container {
    _ruleEngine;
    _eventQueue;
    _fields = {};
    _ids;
    _invalidFields = [];
    constructor(n, fieldFactory, _ruleEngine, _eventQueue = new EventQueue(), logLevel = 'off', mode = 'create') {
        super(n, { fieldFactory: fieldFactory, mode });
        this._ruleEngine = _ruleEngine;
        this._eventQueue = _eventQueue;
        this._logger = new Logger(logLevel);
        if (mode === 'create') {
            this.queueEvent(new Initialize());
            this.queueEvent(new ExecuteRule());
        }
        this._ids = IdGenerator();
        this._bindToDataModel(new DataGroup('$form', {}));
        this._initialize(mode);
        if (mode === 'create') {
            this.queueEvent(new FormLoad());
        }
    }
    _logger;
    get logger() {
        return this._logger;
    }
    dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g;
    get metaData() {
        const metaData = this._jsonModel.metadata || {};
        return new FormMetaData(metaData);
    }
    get action() {
        return this._jsonModel.action;
    }
    importData(dataModel) {
        this._bindToDataModel(new DataGroup('$form', dataModel));
        this.syncDataAndFormModel(this.getDataNode());
        this._eventQueue.runPendingQueue();
    }
    exportData() {
        return this.getDataNode()?.$value;
    }
    resolveQualifiedName(qualifiedName) {
        let foundFormElement = null;
        this.visit(formElement => {
            if (formElement.qualifiedName === qualifiedName) {
                foundFormElement = formElement;
            }
        });
        return foundFormElement;
    }
    exportSubmitMetaData() {
        let submitMetaInstance = null;
        const captchaInfoObj = {};
        function addCaptchaField(fieldName, fieldValue) {
            if (captchaInfoObj[fieldName]) {
                return;
            }
            captchaInfoObj[fieldName] = fieldValue;
        }
        this.visit(field => {
            if (field.fieldType === 'captcha') {
                addCaptchaField(field.qualifiedName, field.value);
            }
        });
        submitMetaInstance = new SubmitMetaData(this.form.lang, captchaInfoObj);
        return submitMetaInstance;
    }
    #getNavigableChildren(children) {
        return children.filter(child => child.visible === true);
    }
    #getFirstNavigableChild(container) {
        const navigableChidren = this.#getNavigableChildren(container.items);
        if (navigableChidren) {
            return navigableChidren[0];
        }
        return null;
    }
    #setActiveFirstDeepChild(currentField) {
        if (!currentField.isContainer) {
            const parent = currentField.parent;
            parent.activeChild = currentField;
            return;
        }
        this.#clearCurrentFocus(currentField);
        let currentActiveChild = currentField.activeChild;
        currentActiveChild = (currentActiveChild === null) ? this.#getFirstNavigableChild(currentField) : currentField.activeChild;
        this.#setActiveFirstDeepChild(currentActiveChild);
    }
    #getNextItem(currIndex, navigableChidren) {
        if (currIndex < (navigableChidren.length - 1)) {
            return navigableChidren[currIndex + 1];
        }
        return null;
    }
    #getPreviousItem(currIndex, navigableChidren) {
        if (currIndex > 0) {
            return navigableChidren[currIndex - 1];
        }
        return null;
    }
    #clearCurrentFocus(field) {
        const parent = field.parent;
        if (parent != null && parent.activeChild != null) {
            parent.activeChild = null;
        }
    }
    setFocus(field, focusOption) {
        if (!focusOption) {
            this.#clearCurrentFocus(field);
            this.#setActiveFirstDeepChild(field);
            return;
        }
        const parent = (field?.isContainer ? field : field.parent);
        const navigableChidren = this.#getNavigableChildren(parent.items);
        let activeChild = parent.activeChild;
        let currActiveChildIndex = activeChild !== null ? navigableChidren.indexOf(activeChild) : -1;
        if (parent.activeChild === null) {
            this.#setActiveFirstDeepChild(navigableChidren[0]);
            currActiveChildIndex = 0;
            return;
        }
        if (focusOption === FocusOption.NEXT_ITEM) {
            activeChild = this.#getNextItem(currActiveChildIndex, navigableChidren);
        }
        else if (focusOption === FocusOption.PREVIOUS_ITEM) {
            activeChild = this.#getPreviousItem(currActiveChildIndex, navigableChidren);
        }
        if (activeChild !== null) {
            this.#setActiveFirstDeepChild(activeChild);
        }
    }
    getState(forRestore = false) {
        const self = this;
        const res = super.getState(false, forRestore);
        res.id = '$form';
        Object.defineProperty(res, 'data', {
            get: function () {
                return self.exportData();
            }
        });
        Object.defineProperty(res, 'attachments', {
            get: function () {
                return getAttachments(self);
            }
        });
        return res;
    }
    get type() {
        return 'object';
    }
    isTransparent() {
        return false;
    }
    get form() {
        return this;
    }
    get ruleEngine() {
        return this._ruleEngine;
    }
    getUniqueId() {
        if (this._ids == null) {
            return '';
        }
        return this._ids.next().value;
    }
    fieldAdded(field) {
        this._fields[field.id] = field;
        field.subscribe((action) => {
            if (this._invalidFields.indexOf(action.target.id) === -1) {
                this._invalidFields.push(action.target.id);
            }
        }, 'invalid');
        field.subscribe((action) => {
            const index = this._invalidFields.indexOf(action.target.id);
            if (index > -1) {
                this._invalidFields.splice(index, 1);
            }
        }, 'valid');
        field.subscribe((action) => {
            const field = action.target.getState();
            if (field) {
                const shallowClone = (obj) => {
                    if (obj && typeof obj === 'object') {
                        if (Array.isArray(obj)) {
                            return obj.map(shallowClone);
                        }
                        else {
                            return { ...obj };
                        }
                    }
                    return obj;
                };
                const changes = action.payload.changes.map(({ propertyName, currentValue, prevValue }) => {
                    return {
                        propertyName,
                        currentValue: shallowClone(currentValue),
                        prevValue: shallowClone(prevValue)
                    };
                });
                const fieldChangedAction = new FieldChanged(changes, field);
                this.dispatch(fieldChangedAction);
            }
        });
    }
    visit(callBack) {
        this.traverseChild(this, callBack);
    }
    traverseChild(container, callBack) {
        container.items.forEach((field) => {
            if (field.isContainer) {
                this.traverseChild(field, callBack);
            }
            callBack(field);
        });
    }
    validate() {
        const validationErrors = super.validate();
        this.dispatch(new ValidationComplete(validationErrors));
        return validationErrors;
    }
    isValid() {
        return this._invalidFields.length === 0;
    }
    dispatch(action) {
        if (action.type === 'submit') {
            super.queueEvent(action);
            this._eventQueue.runPendingQueue();
        }
        else {
            super.dispatch(action);
        }
    }
    submit(action, context) {
        const validate_form = action?.payload?.validate_form;
        if (!validate_form || this.validate().length === 0) {
            const payload = action?.payload || {};
            const successEventName = payload?.success ? payload?.success : 'submitSuccess';
            const failureEventName = payload?.error ? payload?.error : 'submitError';
            submit(context, successEventName, failureEventName, payload?.submit_as, payload?.data);
        }
    }
    reset() {
        super.reset();
        this._invalidFields = [];
    }
    getElement(id) {
        if (id == this.id) {
            return this;
        }
        return this._fields[id];
    }
    get qualifiedName() {
        return '$form';
    }
    getEventQueue() {
        return this._eventQueue;
    }
    get name() {
        return '$form';
    }
    get value() {
        return null;
    }
    get id() {
        return '$form';
    }
    get title() {
        return this._jsonModel.title || '';
    }
}
function stringToNumber(str, language) {
    if (str === null) {
        return 0;
    }
    const n = +str;
    if (!isNaN(n)) {
        return n;
    }
    if (language) {
        const date = parseDefaultDate(str, language, true);
        if (date !== str) {
            return datetimeToNumber(date);
        }
    }
    return 0;
}
function getStringToNumberFn(locale) {
    if (locale == null) {
        const localeOptions = new Intl.DateTimeFormat().resolvedOptions();
        locale = localeOptions.locale;
    }
    return (str) => stringToNumber(str, locale);
}
class RuleEngine {
    _context;
    _globalNames = [
        '$form',
        '$field',
        '$event'
    ];
    customFunctions;
    debugInfo = [];
    constructor() {
        this.customFunctions = FunctionRuntime.getFunctions();
    }
    compileRule(rule, locale) {
        const formula = new Formula(this.customFunctions, getStringToNumberFn(locale), this.debugInfo);
        return { formula, ast: formula.compile(rule, this._globalNames) };
    }
    execute(node, data, globals, useValueOf = false) {
        const { formula, ast } = node;
        const oldContext = this._context;
        this._context = globals;
        let res = undefined;
        try {
            res = formula.run(ast, data, 'en-US', globals);
        }
        catch (err) {
            this._context?.form?.logger?.error(err);
        }
        while (this.debugInfo.length > 0) {
            this._context?.form?.logger?.debug(this.debugInfo.pop());
        }
        let finalRes = res;
        if (useValueOf) {
            if (typeof res === 'object' && res !== null) {
                finalRes = Object.getPrototypeOf(res).valueOf.call(res);
            }
        }
        this._context = oldContext;
        return finalRes;
    }
    trackDependency(subscriber) {
        if (this._context && this._context.field !== undefined && this._context.field !== subscriber) {
            subscriber._addDependent(this._context.field);
        }
    }
}
class Fieldset extends Container {
    constructor(params, _options) {
        super(params, _options);
        if (_options.mode !== 'restore') {
            this._applyDefaults();
            this.queueEvent(new Initialize());
            this.queueEvent(new ExecuteRule());
        }
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            visible: true,
            required: false,
            label: {
                visible: true,
                richText: false
            }
        };
    }
    _applyDefaults() {
        super._applyDefaultsInModel();
        if (this._jsonModel.dataRef && this._jsonModel.type === undefined) {
            this._jsonModel.type = 'object';
        }
    }
    get type() {
        const ret = super.type;
        if (ret === 'array' || ret === 'object') {
            return ret;
        }
        return undefined;
    }
    get items() {
        return super.items;
    }
    get value() {
        return null;
    }
    get fieldType() {
        return 'panel';
    }
}
class InstanceManager extends Fieldset {
    get maxOccur() {
        return this._jsonModel.maxItems;
    }
    set maxOccur(m) {
        this.maxItems = m;
    }
    get minOccur() {
        return this.minItems;
    }
    addInstance(action) {
        return this.addItem(action);
    }
    removeInstance(action) {
        return this.removeItem(action);
    }
}
__decorate([
    dependencyTracked()
], InstanceManager.prototype, "maxOccur", null);
__decorate([
    dependencyTracked()
], InstanceManager.prototype, "minOccur", null);
const validTypes = ['string', 'number', 'integer', 'boolean', 'file', 'string[]', 'number[]', 'integer[]', 'boolean[]', 'file[]', 'array', 'object'];
class Field extends Scriptable {
    constructor(params, _options) {
        super(params, _options);
        if (_options.mode !== 'restore') {
            this._applyDefaults();
            this.queueEvent(new Initialize());
            this.queueEvent(new ExecuteRule());
        }
    }
    _ruleNodeReference = [];
    _initialize() {
        super._initialize();
        this.setupRuleNode();
    }
    ruleNodeReference() {
        if (this.type?.endsWith('[]')) {
            this._ruleNodeReference = [];
        }
        else {
            this._ruleNodeReference = this;
        }
        return this._ruleNodeReference;
    }
    _getDefaults() {
        return {
            readOnly: false,
            enabled: true,
            visible: true,
            label: {
                visible: true,
                richText: false
            },
            required: false,
            type: this._getFallbackType()
        };
    }
    _getFallbackType() {
        const type = this._jsonModel.type;
        let finalType = type;
        if (typeof type !== 'string' || validTypes.indexOf(type) === -1) {
            const _enum = this.enum;
            finalType = typeof (_enum?.[0]);
            if (finalType === 'undefined' && typeof this._jsonModel.default !== 'undefined') {
                if (this._jsonModel.default instanceof Array && this._jsonModel.default.length > 0) {
                    finalType = `${typeof (this._jsonModel.default[0])}[]`;
                }
                else {
                    finalType = typeof (this._jsonModel.default);
                }
            }
            if (finalType.indexOf('undefined') === 0) {
                const typeMappings = {
                    'text-input': 'string',
                    'multiline-input': 'string',
                    'number-input': 'number',
                    'date-input': 'string',
                    'email': 'string',
                    'plain-text': 'string',
                    'image': 'string',
                    'checkbox': 'boolean'
                };
                finalType = typeMappings[this.fieldType];
            }
        }
        return finalType;
    }
    _applyDefaults() {
        super._applyDefaultsInModel();
        this.coerceParam('required', 'boolean');
        this.coerceParam('readOnly', 'boolean');
        this.coerceParam('enabled', 'boolean');
        const type = this._jsonModel.type;
        if (typeof type !== 'string' || validTypes.indexOf(type) === -1) {
            this._jsonModel.type = this._getFallbackType();
        }
        if (['plain-text', 'image'].indexOf(this.fieldType) === -1) {
            this._jsonModel.value = undefined;
        }
        const value = this._jsonModel.value;
        if (value === undefined) {
            const typedRes = Constraints.type(this.getInternalType() || 'string', this._jsonModel.default);
            this._jsonModel.value = typedRes.value;
        }
        if (this._jsonModel.type !== 'string') {
            this.unset('emptyValue');
        }
        if (this._jsonModel.fieldType === undefined) {
            this.form.logger.debug('fieldType property is mandatory. Please ensure all the fields have a fieldType');
            if (this._jsonModel.viewType) {
                if (this._jsonModel.viewType.startsWith('custom:')) {
                    this.form.logger.error('viewType property has been removed. For custom types, use :type property');
                }
                else {
                    this.form.logger.error('viewType property has been removed. Use fieldType property');
                }
                this._jsonModel.fieldType = this._jsonModel.viewType;
            }
            else {
                this._jsonModel.fieldType = defaultFieldTypes(this._jsonModel);
            }
        }
        if (this._jsonModel.enum === undefined) {
            const type = this._jsonModel.type;
            if (type === 'boolean') {
                this._jsonModel.enum = [true, false];
            }
        }
        else {
            if (typeof this._jsonModel.enumNames === 'undefined') {
                this._jsonModel.enumNames = this._jsonModel.enum.map(_ => _.toString());
            }
            while (this._jsonModel.enumNames.length < this._jsonModel.enum.length) {
                this._jsonModel.enumNames.push(this._jsonModel.enum[this._jsonModel.enumNames.length].toString());
            }
        }
        const props = ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'];
        if (this._jsonModel.type !== 'string') {
            this.unset('format', 'pattern', 'minLength', 'maxLength');
        }
        else if (this._jsonModel.fieldType === 'date-input') {
            this._jsonModel.format = 'date';
        }
        this.coerceParam('minLength', 'number');
        this.coerceParam('maxLength', 'number');
        if (this._jsonModel.type !== 'number' && this._jsonModel.format !== 'date' && this._jsonModel.type !== 'integer') {
            this.unset('step', ...props);
        }
        props.forEach(c => {
            this.coerceParam(c, this._jsonModel.type === 'integer' ? 'number' : this._jsonModel.type);
        });
        if (typeof this._jsonModel.step !== 'number') {
            this.coerceParam('step', 'number');
        }
    }
    unset(...props) {
        props.forEach(p => this._jsonModel[p] = undefined);
    }
    coerceParam(param, type) {
        const val = this._jsonModel[param];
        if (typeof val !== 'undefined' && typeof val !== type) {
            this.form.logger.info(`${param} is not of type ${type}. Trying to coerce.`);
            try {
                this._jsonModel[param] = coerceType(val, type);
            }
            catch (e) {
                this.form.logger.warn(e);
                this.unset(param);
            }
        }
    }
    get editFormat() {
        return this.withCategory(this._jsonModel.editFormat);
    }
    get displayFormat() {
        return this.withCategory(this._jsonModel.displayFormat);
    }
    get displayValueExpression() {
        return this._jsonModel.displayValueExpression;
    }
    get placeholder() {
        return this._jsonModel.placeholder;
    }
    get readOnly() {
        if (this.parent.readOnly !== undefined) {
            return this.parent.readOnly === true ? true : this._jsonModel.readOnly;
        }
        else {
            return this._jsonModel.readOnly;
        }
    }
    set readOnly(e) {
        this._setProperty('readOnly', e);
    }
    get enabled() {
        if (this.parent.enabled !== undefined) {
            return this.parent.enabled === false ? false : this._jsonModel.enabled;
        }
        else {
            return this._jsonModel.enabled;
        }
    }
    set enabled(e) {
        this._setProperty('enabled', e);
    }
    get valid() {
        return this._jsonModel?.validity?.valid;
    }
    set valid(e) {
        const validity = {
            valid: e
        };
        this._setProperty('valid', e);
        this._setProperty('validity', validity);
    }
    get validity() {
        return this._jsonModel.validity;
    }
    get emptyValue() {
        if (this._jsonModel.emptyValue === 'null') {
            return null;
        }
        else if (this._jsonModel.emptyValue === '' && this.type === 'string') {
            return '';
        }
        else {
            return undefined;
        }
    }
    get enum() {
        return this._jsonModel.enum;
    }
    set enum(e) {
        this._setProperty('enum', e);
    }
    get enumNames() {
        return this._jsonModel.enumNames;
    }
    set enumNames(e) {
        this._setProperty('enumNames', e);
    }
    get required() {
        return this._jsonModel.required || false;
    }
    set required(r) {
        this._setProperty('required', r);
    }
    get maximum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.maximum;
        }
    }
    set maximum(m) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._setProperty('maximum', m);
        }
    }
    get minimum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.minimum;
        }
    }
    set minimum(m) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._setProperty('minimum', m);
        }
    }
    withCategory(df) {
        if (df) {
            const hasCategory = df?.match(/^(?:date|num)\|/);
            if (hasCategory === null) {
                if (this.format === 'date') {
                    df = `date|${df}`;
                }
                else if (this.type === 'number' || this.type === 'integer') {
                    df = `num|${df}`;
                }
                return df;
            }
        }
        return df;
    }
    get editValue() {
        const df = this.editFormat;
        if (df && this.isNotEmpty(this.value) && this.valid !== false) {
            try {
                return format(this.value, this.lang, df);
            }
            catch (e) {
                return this.value;
            }
        }
        else {
            return this.value;
        }
    }
    get displayValue() {
        if (this.displayValueExpression && typeof this.displayValueExpression === 'string' && this.displayValueExpression.length !== 0) {
            return this.executeExpression(this.displayValueExpression);
        }
        const df = this.displayFormat;
        if (df && this.isNotEmpty(this.value) && this.valid !== false) {
            try {
                return format(this.value, this.lang, df);
            }
            catch (e) {
                return this.value;
            }
        }
        else {
            return this.value;
        }
    }
    getDataNodeValue(typedValue) {
        return this.isEmpty() ? this.emptyValue : typedValue;
    }
    updateDataNodeAndTypedValue(val) {
        const dataNode = this.getDataNode();
        if (staticFields.indexOf(this.fieldType) > -1 && typeof dataNode !== 'undefined') {
            return;
        }
        const Constraints = this._getConstraintObject();
        const typeRes = Constraints.type(this.getInternalType() || 'string', val);
        const changes = this._setProperty('value', typeRes.value, false);
        if (changes.length > 0) {
            this._updateRuleNodeReference(typeRes.value);
            if (typeof dataNode !== 'undefined') {
                dataNode.setValue(this.getDataNodeValue(this._jsonModel.value), this._jsonModel.value, this);
            }
        }
        return changes;
    }
    get value() {
        if (this._jsonModel.value === undefined) {
            return null;
        }
        else {
            return this._jsonModel.value;
        }
    }
    set value(v) {
        const changes = this.updateDataNodeAndTypedValue(v);
        let uniqueRes = { valid: true };
        let constraint = 'type';
        if (changes?.length > 0) {
            let updates = {};
            const typeRes = Constraints.type(this.getInternalType() || 'string', v);
            if (this.parent.uniqueItems && this.parent.type === 'array') {
                uniqueRes = Constraints.uniqueItems(this.parent.uniqueItems, this.parent.getDataNode().$value);
                constraint = 'uniqueItems';
            }
            if (typeRes.valid && uniqueRes.valid) {
                updates = this.evaluateConstraints();
            }
            else {
                const valid = typeRes.valid && uniqueRes.valid;
                const changes = {
                    valid,
                    'errorMessage': typeRes.valid && uniqueRes.valid ? '' : this.getErrorMessage('type'),
                    ...(valid ? {} : {
                        'validationMessage': valid ? '' : this.getErrorMessage(constraint),
                        'validity': {
                            valid,
                            [constraintKeys[constraint]]: true
                        }
                    })
                };
                updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
            }
            if (updates.valid) {
                this.triggerValidationEvent(updates);
            }
            const changeAction = new Change({ changes: changes.concat(Object.values(updates)) });
            this.dispatch(changeAction);
        }
    }
    reset() {
        const changes = this.updateDataNodeAndTypedValue(this.default);
        const validationStateChanges = {
            'valid': undefined,
            'errorMessage': '',
            'validationMessage': '',
            'validity': {
                valid: undefined
            }
        };
        const updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], validationStateChanges);
        const changeAction = new Change({ changes: changes.concat(Object.values(updates)) });
        this.dispatch(changeAction);
    }
    _updateRuleNodeReference(value) {
        if (this.type?.endsWith('[]')) {
            if (value != null) {
                value.forEach((val, index) => {
                    this._ruleNodeReference[index] = val;
                });
                while (value.length !== this._ruleNodeReference.length) {
                    this._ruleNodeReference.pop();
                }
            }
            else {
                while (this._ruleNodeReference.length !== 0) {
                    this._ruleNodeReference.pop();
                }
            }
        }
    }
    getInternalType() {
        return this.type;
    }
    valueOf() {
        const obj = this[target];
        const actualField = obj === undefined ? this : obj;
        actualField.ruleEngine.trackDependency(actualField);
        return actualField._jsonModel.value || null;
    }
    toString() {
        const obj = this[target];
        const actualField = obj === undefined ? this : obj;
        return actualField._jsonModel.value?.toString() || '';
    }
    getErrorMessage(constraint) {
        const afConstraintKey = constraint;
        const html5ConstraintType = constraintKeys[afConstraintKey];
        const constraintTypeMessages = getConstraintTypeMessages();
        return this._jsonModel.constraintMessages?.[afConstraintKey]
            || replaceTemplatePlaceholders(constraintTypeMessages[html5ConstraintType], [this._jsonModel[afConstraintKey]]);
    }
    get errorMessage() {
        return this._jsonModel.errorMessage;
    }
    set errorMessage(e) {
        this._setProperty('errorMessage', e);
        this._setProperty('validationMessage', e);
    }
    get screenReaderText() {
        return this._jsonModel.screenReaderText;
    }
    _getConstraintObject() {
        return Constraints;
    }
    isArrayType() {
        return this.type ? this.type.indexOf('[]') > -1 : false;
    }
    checkEnum(value, constraints) {
        if (this._jsonModel.enforceEnum === true && value != null) {
            const fn = constraints.enum;
            if (value instanceof Array && this.isArrayType()) {
                return value.every(x => fn(this.enum || [], x).valid);
            }
            else {
                return fn(this.enum || [], value).valid;
            }
        }
        return true;
    }
    checkStep() {
        const value = this._jsonModel.value;
        const step = this._jsonModel.step;
        if (typeof step === 'number') {
            const prec = step.toString().split('.')?.[1]?.length || 0;
            const factor = Math.pow(10, prec);
            const fStep = step * factor;
            const fVal = value * factor;
            const iv = this._jsonModel.minimum || this._jsonModel.default || 0;
            const fIVal = iv * factor;
            const qt = (fVal - fIVal) / fStep;
            const valid = Math.abs(fVal - fIVal) % fStep < .001;
            let next, prev;
            if (!valid) {
                next = (Math.ceil(qt) * fStep + fIVal) / factor;
                prev = (next - fStep) / factor;
            }
            return {
                valid,
                next,
                prev
            };
        }
        return {
            valid: true
        };
    }
    checkValidationExpression() {
        const validationExp = this._jsonModel.validationExpression;
        if (typeof validationExp === 'string' && validationExp.length !== 0) {
            return this.executeExpression(validationExp);
        }
        return true;
    }
    getConstraints() {
        switch (this.type) {
            case 'string':
                switch (this.format) {
                    case 'date':
                        return ValidConstraints.date;
                    case 'email':
                        return ValidConstraints.email;
                    case 'binary':
                        return ValidConstraints.file;
                    case 'data-url':
                        return ValidConstraints.file;
                    default:
                        return ValidConstraints.string;
                }
            case 'file':
                return ValidConstraints.file;
            case 'number':
            case 'integer':
                return ValidConstraints.number;
        }
        if (this.isArrayType()) {
            return ValidConstraints.array;
        }
        return [];
    }
    get format() {
        if (typeof this._jsonModel.format === 'undefined') {
            if (this.type === 'string') {
                switch (this.fieldType) {
                    case 'date-input':
                        this._jsonModel.format = 'date';
                        break;
                    case 'file-input':
                        this._jsonModel.format = 'data-url';
                        break;
                }
            }
        }
        return this._jsonModel.format;
    }
    get enforceEnum() {
        return this._jsonModel.enforceEnum;
    }
    get tooltip() {
        return this._jsonModel.tooltip;
    }
    get maxLength() {
        return this._jsonModel.maxLength;
    }
    get minLength() {
        return this._jsonModel.minLength;
    }
    get pattern() {
        return this._jsonModel.pattern;
    }
    get step() {
        if (this.type === 'number' || this.format === 'date') {
            return this._jsonModel.step;
        }
    }
    get exclusiveMinimum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.exclusiveMinimum;
        }
    }
    set exclusiveMinimum(eM) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._jsonModel.exclusiveMinimum = eM;
        }
    }
    get exclusiveMaximum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.exclusiveMaximum;
        }
    }
    set exclusiveMaximum(eM) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._jsonModel.exclusiveMaximum = eM;
        }
    }
    get default() {
        return this._jsonModel.default;
    }
    isNotEmpty(value) {
        return value != null && value !== '';
    }
    evaluateConstraints() {
        let constraint = 'type';
        const elem = this._jsonModel;
        const value = this._jsonModel.value;
        const Constraints = this._getConstraintObject();
        const supportedConstraints = this.getConstraints();
        let valid = true;
        if (valid) {
            valid = Constraints.required(this.required, value).valid &&
                (this.isArrayType() && this.required ? value.length > 0 : true);
            constraint = 'required';
        }
        if (valid && this.isNotEmpty(value)) {
            const invalidConstraint = supportedConstraints.find(key => {
                if (key in elem && elem[key] !== undefined) {
                    const restriction = elem[key];
                    const fn = Constraints[key];
                    if (value instanceof Array && this.isArrayType()) {
                        if (ValidConstraints.array.indexOf(key) !== -1) {
                            return !fn(restriction, value).valid;
                        }
                        else {
                            return value.some(x => !(fn(restriction, x).valid));
                        }
                    }
                    else if (typeof fn === 'function') {
                        return !fn(restriction, value).valid;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            if (invalidConstraint != null) {
                valid = false;
                constraint = invalidConstraint;
            }
            else {
                valid = this.checkEnum(value, Constraints);
                constraint = 'enum';
                if (valid && this.type === 'number') {
                    valid = this.checkStep().valid;
                    constraint = 'step';
                }
                if (valid) {
                    valid = this.checkValidationExpression();
                    constraint = 'validationExpression';
                }
            }
        }
        if (!valid) {
            this.form.logger.info(`${constraint} constraint evaluation failed ${this._jsonModel[constraint]}. Received ${this._jsonModel.value}`);
        }
        const changes = {
            'valid': valid,
            'errorMessage': valid ? '' : this.getErrorMessage(constraint),
            ...({
                'validationMessage': valid ? '' : this.getErrorMessage(constraint),
                'validity': {
                    valid,
                    ...(valid ? {} : { [constraintKeys[constraint]]: true })
                }
            })
        };
        return this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
    }
    triggerValidationEvent(changes) {
        if (changes.validity) {
            if (this.validity.valid) {
                this.dispatch(new Valid());
            }
            else {
                this.dispatch(new Invalid());
            }
        }
    }
    validate() {
        if (this.visible === false) {
            return [];
        }
        const changes = this.evaluateConstraints();
        if (changes.validity) {
            this.triggerValidationEvent(changes);
            this.notifyDependents(new Change({ changes: Object.values(changes) }));
        }
        return this.valid ? [] : [new ValidationError(this.id, [this._jsonModel.errorMessage])];
    }
    importData(contextualDataModel) {
        this._bindToDataModel(contextualDataModel);
        const dataNode = this.getDataNode();
        if (dataNode !== undefined && dataNode !== NullDataValue && dataNode.$value !== this._jsonModel.value) {
            const changeAction = propertyChange('value', dataNode.$value, this._jsonModel.value);
            this._jsonModel.value = dataNode.$value;
            this.queueEvent(changeAction);
        }
    }
    defaultDataModel(name) {
        const value = staticFields.indexOf(this.fieldType) > -1 ? undefined : this.getDataNodeValue(this._jsonModel.value);
        return new DataValue(name, value, this.type || 'string');
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return {
            ...super.getState(forRestore),
            editFormat: this.editFormat,
            displayFormat: this.displayFormat,
            editValue: this.editValue,
            displayValue: this.displayValue,
            enabled: this.enabled,
            readOnly: this.readOnly
        };
    }
    markAsInvalid(message, constraint = null) {
        const changes = {
            'valid': false,
            'errorMessage': message,
            'validationMessage': message,
            'validity': {
                valid: false,
                ...(constraint != null ? { [constraintKeys[constraint]]: true } : {})
            }
        };
        const updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
        const changeAction = new Change({ changes: [].concat(Object.values(updates)) });
        if (changeAction.payload.changes.length !== 0) {
            this.triggerValidationEvent(updates);
            this.dispatch(changeAction);
        }
    }
}
__decorate([
    dependencyTracked(),
    exclude('button', 'image', 'plain-text')
], Field.prototype, "readOnly", null);
__decorate([
    dependencyTracked(),
    exclude('image', 'plain-text')
], Field.prototype, "enabled", null);
__decorate([
    dependencyTracked()
], Field.prototype, "valid", null);
__decorate([
    dependencyTracked()
], Field.prototype, "validity", null);
__decorate([
    dependencyTracked()
], Field.prototype, "enum", null);
__decorate([
    dependencyTracked()
], Field.prototype, "enumNames", null);
__decorate([
    dependencyTracked()
], Field.prototype, "required", null);
__decorate([
    include('date-input', 'number-input')
], Field.prototype, "editValue", null);
__decorate([
    dependencyTracked()
], Field.prototype, "value", null);
__decorate([
    dependencyTracked()
], Field.prototype, "errorMessage", null);
__decorate([
    include('text-input', 'date-input', 'file-input', 'email')
], Field.prototype, "format", null);
__decorate([
    include('text-input')
], Field.prototype, "maxLength", null);
__decorate([
    include('text-input')
], Field.prototype, "minLength", null);
__decorate([
    include('text-input')
], Field.prototype, "pattern", null);
__decorate([
    dependencyTracked()
], Field.prototype, "exclusiveMinimum", null);
__decorate([
    dependencyTracked()
], Field.prototype, "exclusiveMaximum", null);
function addNameToDataURL(dataURL, name) {
    return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}
function processFiles(files) {
    return Promise.all([].map.call(files, processFile));
}
async function processFile(file) {
    const { name, size, type } = file;
    const fileObj = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
            resolve(new FileObject({
                data: addNameToDataURL(event.target.result, name),
                type,
                name,
                size
            }));
        };
        reader.readAsDataURL(file.data);
    });
    return fileObj;
}
class FileUpload extends Field {
    _getDefaults() {
        return {
            ...super._getDefaults(),
            accept: ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
            maxFileSize: '2MB'
        };
    }
    _getFallbackType() {
        return 'file';
    }
    get maxFileSize() {
        return getFileSizeInBytes(this._jsonModel.maxFileSize);
    }
    get accept() {
        return this._jsonModel.accept;
    }
    _applyUpdates(propNames, updates) {
        return propNames.reduce((acc, propertyName) => {
            const prevValue = this._jsonModel[propertyName];
            const currentValue = updates[propertyName];
            if (currentValue !== prevValue) {
                acc[propertyName] = {
                    propertyName,
                    currentValue,
                    prevValue
                };
                if (prevValue instanceof FileObject && typeof currentValue === 'object' && propertyName === 'value') {
                    this._jsonModel[propertyName] = new FileObject({ ...prevValue, ...{ 'data': currentValue.data } });
                }
                else {
                    this._jsonModel[propertyName] = currentValue;
                }
            }
            return acc;
        }, {});
    }
    getInternalType() {
        return this.type?.endsWith('[]') ? 'file[]' : 'file';
    }
    getDataNodeValue(typedValue) {
        let dataNodeValue = typedValue;
        if (dataNodeValue != null) {
            if (this.type === 'string') {
                dataNodeValue = dataNodeValue.data?.toString();
            }
            else if (this.type === 'string[]') {
                dataNodeValue = dataNodeValue instanceof Array ? dataNodeValue : [dataNodeValue];
                dataNodeValue = dataNodeValue.map((_) => _?.data?.toString());
            }
        }
        return dataNodeValue;
    }
    async _serialize() {
        const val = this._jsonModel.value;
        if (val === undefined) {
            return null;
        }
        const filesInfo = await processFiles(val instanceof Array ? val : [val]);
        return filesInfo;
    }
    importData(dataModel) {
        this._bindToDataModel(dataModel);
        const dataNode = this.getDataNode();
        if (dataNode !== undefined && dataNode !== NullDataValue) {
            const value = dataNode?.$value;
            if (value != null) {
                const res = Constraints.type(this.getInternalType(), value);
                if (!res.valid) {
                    this.form.logger.debug(`unable to bind ${this.name} to data`);
                }
                this.form.getEventQueue().queue(this, propertyChange('value', res.value, this._jsonModel.value));
                this._jsonModel.value = res.value;
            }
            else {
                this._jsonModel.value = null;
            }
        }
    }
}
const requiredConstraint = (offValue) => (constraint, value) => {
    const valid = Constraints.required(constraint, value).valid && (!constraint || value != offValue);
    return { valid, value };
};
class Checkbox extends Field {
    offValue() {
        const opts = this.enum;
        return opts.length > 1 ? opts[1] : null;
    }
    _getConstraintObject() {
        const baseConstraints = { ...super._getConstraintObject() };
        baseConstraints.required = requiredConstraint(this.offValue());
        return baseConstraints;
    }
    _applyDefaults() {
        if (typeof this._jsonModel.checked === 'boolean') {
            if (this._jsonModel.checked) {
                this._jsonModel.default = this._jsonModel.enum?.[0];
            }
            else {
                this._jsonModel.default = this._jsonModel.enum?.[1];
            }
        }
        super._applyDefaults();
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true
        };
    }
    get enum() {
        return this._jsonModel.enum || [];
    }
    updateDataNodeAndTypedValue(val) {
        const changes = super.updateDataNodeAndTypedValue(val);
        const valueChange = changes.find((c) => c.propertyName === 'value');
        if (valueChange) {
            const oldChecked = valueChange.prevValue === this._jsonModel.enum?.[0];
            const newChecked = valueChange.currentValue === this._jsonModel.enum?.[0];
            if (oldChecked !== newChecked) {
                changes.push({
                    propertyName: 'checked',
                    prevValue: oldChecked,
                    currentValue: newChecked
                });
            }
        }
        return changes;
    }
    set checked(check) {
        if (check) {
            this.value = this._jsonModel.enum?.[0];
        }
        else {
            this.value = this._jsonModel.enum?.[1];
        }
    }
    get checked() {
        return this.value === this._jsonModel.enum?.[0];
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return {
            ...super.getState(isRepeatableChild, forRestore),
            checked: this.checked
        };
    }
}
__decorate([
    dependencyTracked()
], Checkbox.prototype, "checked", null);
class CheckboxGroup extends Field {
    constructor(params, _options) {
        super(params, _options);
    }
    _getFallbackType() {
        const fallbackType = super._getFallbackType();
        if (typeof fallbackType === 'string') {
            return `${fallbackType}[]`;
        }
        else {
            return 'string[]';
        }
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true,
            enum: []
        };
    }
}
class DateField extends Field {
    locale;
    _dataFormat = 'yyyy-MM-dd';
    _applyDefaults() {
        super._applyDefaults();
        this.locale = new Intl.DateTimeFormat().resolvedOptions().locale;
        if (!this._jsonModel.editFormat) {
            this._jsonModel.editFormat = 'short';
        }
        if (!this._jsonModel.displayFormat) {
            this._jsonModel.displayFormat = this._jsonModel.editFormat;
        }
        if (!this._jsonModel.placeholder) {
            this._jsonModel.placeholder = parseDateSkeleton(this._jsonModel.editFormat, this.locale);
        }
        if (!this._jsonModel.description) {
            this._jsonModel.description = `To enter today's date use ${formatDate(new Date(), this.locale, this._jsonModel.editFormat)}`;
        }
    }
    get value() {
        return super.value;
    }
    set value(value) {
        if (typeof value === 'number') {
            const coercedValue = numberToDatetime(value);
            if (!isNaN(coercedValue)) {
                super.value = formatDate(coercedValue, this.locale, this._dataFormat);
            }
        }
        else {
            super.value = value;
        }
    }
}
class EmailInput extends Field {
    _getDefaults() {
        return {
            ...super._getDefaults(),
            format: 'email'
        };
    }
}
class Captcha extends Field {
    getDataNode() {
        return undefined;
    }
}
const alternateFieldTypeMapping = {
    'text': 'text-input',
    'number': 'number-input',
    'email': 'email',
    'file': 'file-input',
    'range': 'range',
    'textarea': 'multiline-input'
};
class FormFieldFactoryImpl {
    createField(child, _options) {
        let retVal;
        const options = {
            ..._options,
            fieldFactory: this
        };
        child.fieldType = child.fieldType ? (child.fieldType in alternateFieldTypeMapping ?
            alternateFieldTypeMapping[child.fieldType] : child.fieldType)
            : 'text-input';
        if (isRepeatable$1(child)) {
            const newChild = {
                ...child,
                ...('items' in child && { 'type': 'object' }),
                minOccur: undefined,
                maxOccur: undefined,
                repeatable: undefined,
                name: undefined
            };
            const newJson = {
                ...{
                    minItems: child.minOccur || 0,
                    maxItems: child.maxOccur || -1,
                    fieldType: child.fieldType,
                    type: 'array',
                    name: child.name,
                    dataRef: child.dataRef
                },
                ...{
                    'items': [newChild]
                }
            };
            retVal = new InstanceManager(newJson, options);
        }
        else if ('items' in child) {
            retVal = new Fieldset(child, options);
        }
        else {
            if (isFile(child) || child.fieldType === 'file-input') {
                retVal = new FileUpload(child, options);
            }
            else if (isCheckbox(child)) {
                retVal = new Checkbox(child, options);
            }
            else if (isCheckboxGroup(child)) {
                retVal = new CheckboxGroup(child, options);
            }
            else if (isEmailInput(child)) {
                retVal = new EmailInput(child, options);
            }
            else if (isDateField(child)) {
                retVal = new DateField(child, options);
            }
            else if (isCaptcha(child)) {
                retVal = new Captcha(child, options);
            }
            else {
                retVal = new Field(child, options);
            }
        }
        return retVal;
    }
}
const FormFieldFactory = new FormFieldFactoryImpl();
const createFormInstance = (formModel, callback, logLevel = 'error', fModel = undefined) => {
    try {
        let f = fModel;
        if (f == null) {
            formModel = sitesModelToFormModel(formModel);
            f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel);
        }
        const formData = formModel?.data;
        if (formData) {
            f.importData(formData);
        }
        if (typeof callback === 'function') {
            callback(f);
        }
        f.getEventQueue().runPendingQueue();
        return f;
    }
    catch (e) {
        console.error(`Unable to create an instance of the Form ${e}`);
        throw new Error(e);
    }
};
const defaultOptions = {
    logLevel: 'error'
};
const restoreFormInstance = (formModel, data = null, { logLevel } = defaultOptions) => {
    try {
        const form = new Form({ ...formModel }, FormFieldFactory, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel, 'restore');
        if (data) {
            form._bindToDataModel(new DataGroup('$form', data));
            form.syncDataAndFormModel(form.getDataNode());
        }
        form.getEventQueue().empty();
        return form;
    }
    catch (e) {
        console.error(`Unable to restore an instance of the Form ${e}`);
        throw new Error(e);
    }
};
const validateFormInstance = (formModel, data) => {
    try {
        const f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine());
        if (data) {
            f.importData(data);
        }
        return f.validate().length === 0;
    }
    catch (e) {
        throw new Error(e);
    }
};
const validateFormData = (formModel, data) => {
    try {
        const f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine());
        if (data) {
            f.importData(data);
        }
        const res = f.validate();
        return {
            messages: res,
            valid: res.length === 0
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
const fetchForm = (url, headers = {}) => {
    const headerObj = new Headers();
    Object.entries(headers).forEach(([key, value]) => {
        headerObj.append(key, value);
    });
    return new Promise((resolve, reject) => {
        request$1(`${url}.model.json`, null, { headers }).then((response) => {
            if (response.status !== 200) {
                reject('Not Found');
            }
            else {
                let formObj = response.body;
                if ('model' in formObj) {
                    const { model } = formObj;
                    formObj = model;
                }
                resolve(jsonString(formObj));
            }
        });
    });
};
const registerFunctions = (functions) => {
    FunctionRuntime.registerFunctions(functions);
};

export { createFormInstance, fetchForm, registerFunctions, restoreFormInstance, validateFormData, validateFormInstance };
