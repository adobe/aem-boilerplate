import { createFormInstance } from './model/afb-runtime.js';
import registerCustomFunctions from './functionRegistration.js';

let customFunctionRegistered = false;

export default class RuleEngine {
  rulesOrder = {};

  constructor(formDef) {
    this.form = createFormInstance(formDef);
  }

  getState() {
    return this.form.getState(true);
  }
}

let ruleEngine;
onmessage = (e) => {
  function handleMessageEvent(event) {
    switch (event.data.name) {
      case 'init':
        ruleEngine = new RuleEngine(event.data.payload);
        // eslint-disable-next-line no-case-declarations
        const state = ruleEngine.getState();
        postMessage({
          name: 'init',
          payload: state,
        });
        ruleEngine.dispatch = (msg) => {
          postMessage(msg);
        };
        break;
      default:
        break;
    }
  }

  if (!customFunctionRegistered) {
    registerCustomFunctions().then(() => {
      customFunctionRegistered = true;
      handleMessageEvent(e);
    });
  }
};
