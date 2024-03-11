/* eslint-disable no-param-reassign */

import { getId } from './util.js';

function handleCheckboxAndRadio(field) {
  // if fieldType is checkbox and value is not empty then convert it to enum.
  if (field?.fieldType === 'checkbox' || field?.fieldType === 'radio') {
    if (field.value) {
      field.enum = [field.value];
    } else if (field?.fieldType === 'checkbox') {
      field.enum = ['on']; // default html value
    }
    if (field.checked?.toLowerCase() !== 'true') {
      delete field.value;
    }
  }
}

function extractRules(field) {
  const rulesMapping = {
    value: 'Value Expression',
    visible: 'Visible Expression',
  };
  const entries = Object.entries(rulesMapping)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, excelRuleName]) => field?.[excelRuleName])
    .map(([ruleName, excelRuleName]) => ({ prop: ruleName, expression: field?.[excelRuleName] }));
  return entries;
}

function initFormDef(name) {
  return {
    name,
    adaptiveform: '0.10.0',
    metadata: {
      grammar: 'json-formula-1.0.0',
      version: '1.0.0',
    },
    properties: {},
    items: [],
  };
}

function handleSpecialButtons(field) {
  if (field?.fieldType === 'submit' || field?.fieldType === 'reset') {
    field.buttonType = field.fieldType;
    field.fieldType = 'button';
    field.properties = field.properties || {};
    field.properties['fd:buttonType'] = field.buttonType;
  }
}

function transformFlatToHierarchy(item) {
  Object.keys(item).forEach((key) => {
    if (key.includes('.')) {
      let temp = item;
      const keys = key.split('.');
      keys.forEach((k, i, values) => {
        if (i === values.length - 1) {
          temp[k] = item[key];
        } else {
          temp[k] = temp[k] != null ? temp[k] : {};
          temp = temp[k];
        }
      });
      delete item[key];
    }
  });
}

function handleMultiValues(item, key) {
  let values;
  if (item && item[key] && typeof item[key] === 'string') {
    values = item[key]?.split(',').map((value) => value.trim());
    item[key] = values;
  }
}

const booleanProperty = ['required', 'visible', 'enabled', 'readOnly', 'repeatable'];

function convertStringToBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  const trimmedValue = value?.trim();
  return trimmedValue === 'true' || trimmedValue === 'x';
}

function handleFranklinSpecialCases(item) {
  booleanProperty.forEach((prop) => {
    if (item[prop]) {
      item[prop] = convertStringToBoolean(item[prop]);
    }
  });
  // Franklin Mandatory uses x for true.
  item.required = (item.required === 'x' || item.required === true);

  if (item.Max || item.Min) {
    if (item.fieldType === 'number' || item.fieldType === 'date' || item.fieldType === 'range') {
      item.maximum = item.Max;
      item.minimum = item.Min;
    } else if (item.fieldType === 'panel') {
      item.maxOccur = item.Max;
      item.minOccur = item.Min;
    } else {
      item.maxLength = item.Max;
      item.minLength = item.Min;
    }
    delete item.Max;
    delete item.Min;
  }

  if (item.fieldType === 'plain-text' && !item.value) {
    item.value = item?.label?.value;
    item.label = null;
  }
}

function initField() {
  return {
    constraintMessages: {
      required: 'Please fill in this field.',
    },
  };
}

export default class DocBasedFormToAF {
  panelMap = new Map();

  errors = [];

  fieldPropertyMapping = {
    Default: 'default',
    Step: 'step',
    Pattern: 'pattern',
    Value: 'value',
    Placeholder: 'placeholder',
    Field: 'name',
    Name: 'name',
    ReadOnly: 'readOnly',
    Description: 'description',
    Type: 'fieldType',
    Label: 'label.value',
    Mandatory: 'required',
    Options: 'enum',
    OptionNames: 'enumNames',
    Visible: 'visible',
    Repeatable: 'repeatable',
    Style: 'appliedCssClassNames',
  };

  fieldMapping = new Map([
    ['text', 'text-input'],
    ['number', 'number-input'],
    ['datetime-local', 'date-input'],
    ['file', 'file-input'],
    ['select', 'drop-down'],
    ['radio-group', 'radio-group'],
    ['checkbox-group', 'checkbox-group'],
    ['plain-text', 'plain-text'],
    ['plaintext', 'plain-text'],
    ['checkbox', 'checkbox'],
    ['textarea', 'multiline-input'],
    ['text-area', 'multiline-input'],
    ['fieldset', 'panel'],
    ['button', 'button'],
  ]);

  /**
     * @param {{ total?: number;
     * offset?: number; limit?: number; data: any; ":type"?: string; adaptiveform?: any; }} exData
     *
     * @return {{formDef: any, excelData: any}} response
     */
  transform(exData, { name } = { name: 'Form' }) {
    this.errors = [];
    // if its adaptive form json just return it.
    if (exData?.adaptiveform) {
      return { formDef: exData, excelData: null };
    }
    if (!exData || !exData.data) {
      throw new Error('Unable to retrieve the form details from json');
    }
    const formDef = initFormDef(name);

    this.panelMap.set('root', formDef);
    const fieldIdMap = {};
    const rules = [];
    exData.data.forEach((/** @type {{ [s: string]: any; } | ArrayLike<any>} */ item, index) => {
      if (item.Type) {
        // eslint-disable-next-line no-unused-vars
        const source = Object.fromEntries(Object.entries(item).filter(([_, v]) => (v != null && v !== '')));
        let field = { ...source, ...initField() };
        field.id = field.Id || getId(field.Name);
        field.value = field.Value || '';
        this.#transformFieldNames(field);

        if (field?.fieldType === 'fieldset') {
          this.panelMap.set(field?.name, field);
          delete field?.constraintMessages;
        }
        field = this.#handleField(field);
        this.#addToParent(field);
        fieldIdMap[index + 2] = { name: field.name, id: field.id };
        const currentRules = extractRules(field);
        if (currentRules.length) {
          rules.push([field.id, currentRules]);
        }
      }
    });
    formDef.properties.rules = { fieldIdMap, rules };
    return formDef;
  }

  /**
     * Transform flat field to Crispr Field
     * @param {any} field
     * @returns
     */
  #handleField(field) {
    this.#transformFieldType(field);
    transformFlatToHierarchy(field);
    handleCheckboxAndRadio(field);
    handleMultiValues(field, 'enum');
    handleMultiValues(field, 'enumNames');
    handleFranklinSpecialCases(field);
    handleSpecialButtons(field);
    return field;
  }

  /**
     * Transform CRISPR fieldType to HTML Input Type.
     * @param {any} field FieldJson
     */
  #transformFieldType(field) {
    if (this.fieldMapping.has(field?.fieldType)) {
      field.fieldType = this.fieldMapping.get(field?.fieldType);
    }
  }

  /**
     * Convert Field names from Franklin Form to crispr def.
     * @param {any} field Form Def received from excel
     */
  #transformFieldNames(field) {
    Object.keys(this.fieldPropertyMapping).forEach((key) => {
      if (field[key]) {
        field[this.fieldPropertyMapping[key]] = field[key];
        delete field[key];
      }
    });
  }

  /**
   * Add the field to its relevant parent items.
   * @param {Object} field
   */
  #addToParent(field) {
    const parent = field?.Fieldset || 'root';
    const parentField = this.panelMap.get(this.panelMap.has(parent) ? parent : 'root');
    parentField.items = parentField.items || [];
    parentField.items.push(field);
    delete field?.parent;
  }
}
