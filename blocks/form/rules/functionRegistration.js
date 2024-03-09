import { registerFunctions } from './model/afb-runtime.js';

export default async function registerCustomFunctions() {
  try {
    // eslint-disable-next-line no-inner-declarations
    function registerFunctionsInRuntime(module) {
      const keys = Object.keys(module);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const funcDef = module[keys[i]];
        if (typeof funcDef === 'function') {
          const functions = [];
          functions[name] = funcDef;
          registerFunctions(functions);
        }
      }
    }

    const customFunctionModule = await import('../functions.js');
    const ootbFunctionModule = await import('./functions.js');
    registerFunctionsInRuntime(ootbFunctionModule);
    registerFunctionsInRuntime(customFunctionModule);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error occured while registering custom functions in web worker ${e.message}`);
  }
}
