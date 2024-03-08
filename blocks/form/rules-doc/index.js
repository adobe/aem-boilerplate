function extractRules(data) {
  return data.items
    .reduce(({ fieldIdMap, rules }, fd, index) => {
      const currentRules = Object.entries(fd.rules).map(([prop, expression]) => ({
        prop,
        expression,
      }));
      return {
        fieldIdMap: {
          ...fieldIdMap,
          [index + 2]: { name: fd.name, id: fd.id },
        },
        rules: currentRules.length ? rules.concat([[fd.id, currentRules]]) : rules,
      };
    }, { fieldIdMap: {}, rules: [] });
}

export default async function applyRuleEngine(form, formTag) {
  try {
    const RuleEngine = (await import('./RuleEngine.js')).default;

    const formData = extractRules(form);
    const { fieldIdMap, rules } = formData;

    const ruleEngine = new RuleEngine(rules, fieldIdMap, formTag);
    ruleEngine.enable();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('unable to apply rules ', e);
  }
}
