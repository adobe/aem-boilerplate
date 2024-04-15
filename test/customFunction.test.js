/* eslint-env mocha */
import assert from 'assert';

import { days } from '../blocks/form/functions.js';

describe('Custom Functions', () => {
  it('should load custom functions', () => {
    const endDate = new Date(); endDate.setDate(endDate.getDate() + 1);
    const startDate = new Date();
    const value = days(endDate, startDate);
    assert.equal(value, 1, 'expected 1 day difference');
  });
});
