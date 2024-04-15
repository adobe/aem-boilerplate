/* eslint-env mocha */
import {
  executeTestInFolder, testBasicMarkup, testDynamism, testFormFetch,
} from './testUtils.js';

executeTestInFolder('./test/fixtures/components/');
executeTestInFolder('./test/fixtures/components/text-input/', testBasicMarkup, true);

executeTestInFolder('./test/fixtures/form/');
executeTestInFolder('./test/fixtures/dynamic/', testDynamism);

executeTestInFolder('./test/fixtures/submit/', testDynamism);
executeTestInFolder('./test/fixtures/doc-based-submit/', testDynamism, true);

executeTestInFolder('./test/fixtures/prefill/', testDynamism);
executeTestInFolder('./test/fixtures/docForms/', testDynamism, true);
executeTestInFolder('./test/fixtures/form-fetch/', testFormFetch);
