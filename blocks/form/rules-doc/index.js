export default async function applyRuleEngine(form, formTag) {
  try {
    const { fieldIdMap, rules } = form.properties.rules;
    if (rules.length > 0) {
      const RuleEngine = (await import('./RuleEngine.js')).default;
      const ruleEngine = new RuleEngine(rules, fieldIdMap, formTag);
      ruleEngine.enable();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('unable to apply rules ', e);
  }
}
