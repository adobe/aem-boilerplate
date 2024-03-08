/* eslint-disable no-param-reassign */

import { getId } from './util.js';

/* eslint-disable class-methods-use-this */
const PROPERTY = 'property';

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
    Repeatable: 'repeatable',
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
    ['checkbox', 'checkbox'],
    ['textarea', 'multiline-input'],
    ['fieldset', 'panel'],
    ['button', 'button'],
  ]);

  /**
     * @param {string} formPath
     */
  async getForm(formPath) {
    if (!formPath) {
      throw new Error('formPath is required');
    }
    const resp = await fetch(formPath);
    const json = await resp.json();
    return json;
  }

  #initFormDef(name) {
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

  #initField() {
    return {
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    };
  }

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
    const formDef = this.#initFormDef(name);

    this.panelMap.set('root', formDef);

    exData.data.forEach((/** @type {{ [s: string]: any; } | ArrayLike<any>} */ item) => {
      if (item.Type) {
        // eslint-disable-next-line no-unused-vars
        const source = Object.fromEntries(Object.entries(item).filter(([_, v]) => (v != null && v !== '')));
        let field = { ...source, ...this.#initField() };
        field.id = field.Id || getId(field.Name);
        field.value = field.Value || '';
        this.#transformFieldNames(field);

        if (this.#isProperty(field)) {
          this.#handleProperites(formDef, field);
        } else {
          if (field?.fieldType === 'fieldset') {
            this.panelMap.set(field?.name, field);
            delete field?.constraintMessages;
          }
          field = this.#handleField(field);
          this.#addToParent(field);
        }
      }
    });

    return formDef;
  }

  /**
     * @param {any} formDef Headless Form definition
     * @param {any} field
     */
  #handleProperites(formDef, field) {
    formDef.properties[field.name] = field.default;
  }

  #handleCheckboxAndRadio(field) {
    if (field?.fieldType === 'checkbox-group' || field?.fieldType === 'radio-group') {
      if (!field.enum) {
        field.enum = ['yes'];
      }
    }
  }

  #handleRules(field) {
    const rulesMapping = {
      value: 'Value Expression',
      visible: 'Visible Expression',
    };
    const entries = Object.entries(rulesMapping)
      .map(([ruleName, excelRuleName]) => [ruleName, field?.[excelRuleName]])
      .filter((e) => e[1]);
    field.rules = Object.fromEntries(entries);
  }

  /**
     * Transform flat field to Crispr Field
     * @param {any} field
     * @returns
     */
  #handleField(field) {
    this.#transformFieldType(field);
    this.#transformFlatToHierarchy(field);
    this.#handleCheckboxAndRadio(field);
    this.#handleMultiValues(field, 'enum');
    this.#handleMultiValues(field, 'enumNames');
    this.#handleRules(field);
    this.#handleFranklinSpecialCases(field);
    this.#handlePanel(field);
    this.#handleSpecialButtons(field);
    return field;
  }

  #handleSpecialButtons(field) {
    if (field?.fieldType === 'submit' || field?.fieldType === 'reset') {
      field.buttonType = field.fieldType;
      field.fieldType = 'button';
      field.properties = field.properties || {};
      field.properties['fd:buttonType'] = field.buttonType;
    }
  }

  /**
     * Convert flat field to hierarchy based on dot notation.
     * @param {any} item Flat field Definition
     * @returns
     */
  #transformFlatToHierarchy(item) {
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
     * handle multivalues field i.e. comma seprator to array.
     * @param {{ [x: string]: any; }} item
     * @param {string | number} key
     */
  #handleMultiValues(item, key) {
    let values;
    if (item && item[key] && typeof item[key] === 'string') {
      values = item[key]?.split(',').map((value) => value.trim());
      item[key] = values;
    }
  }

  /**
     * Handle special use cases of Franklin.
     * @param {{ required: string | boolean; }} item
     */
  #handleFranklinSpecialCases(item) {
    // Franklin Mandatory uses x for true.
    item.required = (item.required === 'x' || item.required === 'true' || item.required === true);

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
  }

  /**
     * Handle Panel related transformation.
     * @param {*} field
     */
  #handlePanel(field) {
    if (field?.fieldType === 'panel') {
      // Ignore name if type is not defined on panel.
      /* if (typeof field?.type === 'undefined') {
        field.name = null;
      } */
    }
  }

  /**
     * @param {any} field FieldJson
     */
  #isProperty(field) {
    return field && field.fieldType === PROPERTY;
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
