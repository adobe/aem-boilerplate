import {
  parseUrlHashTags,
  hideLink,
  showLink,
  removeLink,
} from './parser.js';
import { getActiveRules } from '../personalization/api.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * This method contains default logic for built-in namespace/tag combination(s).
 *
 * @param {HTMLAnchorElement} el target DOM element to apply conditions
 * @param {string} namespace hash tags namespace
 * @param {string} value hash tag value
 */
const defaultConditionApply = (el, namespace, value, activeRules) => {
  if (namespace === 'display_for_') {
    if (value === 'desktop_only' && !isDesktop.matches) {
      removeLink(el);
    }

    if (value === 'mobile_only' && isDesktop.matches) {
      removeLink(el);
    }

    if (value.startsWith('segment')) {
      const segments = activeRules.customerSegments.map((s) => s.name.toLowerCase());
      const [_prefix, segment] = [...value.split('_')];
      if (!segments.includes(segment.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('group')) {
      const [_prefix, group] = [...value.split('_')];
      if (group.toLowerCase() !== activeRules.customerGroup?.toLowerCase()) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('cartrule')) {
      const rules = activeRules.cart.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(rule.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }

    if (value.startsWith('catalogrule')) {
      const rules = activeRules.catalogPriceRules.map((s) => s.name.toLowerCase());
      const [_prefix, rule] = [...value.split('_')];
      if (!rules.includes(rule.toLowerCase())) {
        hideLink(el);
      } else {
        showLink(el);
      }
    }
  }
};

/**
 * Executes links personalization for domElement
 *
 * @param {HTMLElement} domElement - root DOM element for parser
 * @param {function} conditionApply - an optional callback with conditions to execute
 */
async function applyHashTagsForDomElement(domElement, conditionApply = null) {
  const activeRules = await getActiveRules();
  parseUrlHashTags(domElement, conditionApply || defaultConditionApply, activeRules);
}

export default applyHashTagsForDomElement;
