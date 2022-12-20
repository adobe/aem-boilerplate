/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console, object-curly-newline */
import { assert } from '@esm-bundle/chai';
import sinon from 'sinon';
import {
  cumulativeLayoutShiftReporter,
  domContentLoadedReporter,
  firstContentfulPaintReporter,
  firstInputDelayReporter,
  firstPaintReporter,
  largestContentfulPaintReporter,
  longTaskReporter,
  resourceLoadReporter,
  init,
} from './index';

describe('Performance Logger Plugin', () => {
  let reporter;
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  describe('#cumulativeLayoutShiftReporter', () => {
    beforeEach(() => {
      reporter = cumulativeLayoutShiftReporter({});
    });

    it('logs the details of the CLS event', () => {
      const entry = {
        value: 1337,
        startTime: 42,
        sources: [
          {
            node: { nodeType: Node.ELEMENT_NODE, nodeName: 'DIV' },
            currentRect: { top: 1, right: 3, bottom: 5, left: 7 },
            previousRect: { top: 0, right: 0, bottom: 0, left: 0 },
          },
          {
            node: { nodeType: Node.TEXT_NODE, parentElement: { nodeType: Node.ELEMENT_NODE, nodeName: 'SPAN' } },
            currentRect: { top: 23, right: 29, bottom: 31, left: 37 },
            previousRect: { top: 11, right: 13, bottom: 17, left: 19 },
          },
        ],
      };
      reporter(entry);
      assert(console.log.calledWithMatch(sinon.match(/42.*cls.*1337ms/)));
      // eslint-disable-next-line no-regex-spaces
      assert(console.log.calledWith(sinon.match(/from:    0    0    0    0\n.*to:      1    3    5    7/)));
      assert(console.log.calledWith({ nodeType: Node.ELEMENT_NODE, nodeName: 'DIV' }));
      // eslint-disable-next-line no-regex-spaces
      assert(console.log.calledWith(sinon.match(/from:   11   13   17   19\n.*to:     23   29   31   37/)));
      assert(console.log.calledWith({ nodeType: Node.ELEMENT_NODE, nodeName: 'SPAN' }));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar', sources: [] });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar', sources: [] })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = cumulativeLayoutShiftReporter({ debug: true });
      reporter({ foo: 'bar', sources: [] });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar', sources: [] })));
    });
  });

  describe('#domContentLoadedReporter', () => {
    beforeEach(() => {
      reporter = domContentLoadedReporter({});
    });

    it('logs the details of the DOMContentLoaded event', () => {
      const entry = {
        name: 'http://foo.bar',
        domContentLoadedEventStart: 42,
        domContentLoadedEventEnd: 1337,
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*dcl.*http:\/\/foo.bar.*1295.00ms/));
    });

    it('logs the details of the load event', () => {
      const entry = {
        name: 'http://foo.bar',
        loadEventStart: 42,
        loadEventEnd: 1337,
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*load.*http:\/\/foo.bar.*1295.00ms/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = domContentLoadedReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#firstContentfulPaintReporter', () => {
    beforeEach(() => {
      reporter = firstContentfulPaintReporter({});
    });

    it('logs the details of the FCP event', () => {
      const entry = { startTime: 42 };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*fcp/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = firstContentfulPaintReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#firstInputDelayReporter', () => {
    beforeEach(() => {
      reporter = firstInputDelayReporter({});
    });

    it('logs the details of the FID event', () => {
      const entry = {
        name: 'foo',
        startTime: 42,
        duration: 1337,
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*fid.*foo.*1337ms/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = firstInputDelayReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#firstPaintReporter', () => {
    beforeEach(() => {
      reporter = firstPaintReporter({});
    });

    it('logs the details of the FP event', () => {
      const entry = { startTime: 42 };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*fp/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = firstPaintReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#largestContentfulPaintReporter', () => {
    beforeEach(() => {
      reporter = largestContentfulPaintReporter({});
    });

    it('logs the details of the LCP event', () => {
      const entry = {
        startTime: 42,
        url: 'http://foo.bar',
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*lcp.*http:\/\/foo.bar/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = largestContentfulPaintReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#longTaskReporter', () => {
    beforeEach(() => {
      reporter = longTaskReporter({});
    });

    it('logs the details of the TBT event', () => {
      const entry = {
        startTime: 42,
        duration: 1337,
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/42.*tbt.*1337ms/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = longTaskReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#resourceLoadReporter', () => {
    beforeEach(() => {
      reporter = resourceLoadReporter({});
    });

    it('logs the details of the non-blocking load event on resources', () => {
      const entry = {
        name: 'foo',
        startTime: 42,
        duration: 1337,
        initiatorType: 'script',
        renderBlockingStatus: 'non-blocking',
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/1379.*load.*foo/));
    });

    it('logs the details of the blocking load event on resources', () => {
      const entry = {
        name: 'foo',
        startTime: 42,
        duration: 1337,
        initiatorType: 'script',
        renderBlockingStatus: 'blocking',
      };
      reporter(entry);
      assert(console.log.calledWithMatch(/1379.*load.*foo.*by script, blocking/));
    });

    it('does not log the full entry when debug not is set', () => {
      reporter({ foo: 'bar' });
      assert(console.log.neverCalledWithMatch(JSON.stringify({ foo: 'bar' })));
    });

    it('logs the full entry when debug is set', () => {
      reporter = resourceLoadReporter({ debug: true });
      reporter({ foo: 'bar' });
      assert(console.log.calledWith(JSON.stringify({ foo: 'bar' })));
    });
  });

  describe('#init', () => {
    const mockList = {
      getEntries: () => [{}],
      getEntriesByName: () => [{}],
    };
    const observeMock = sinon.stub();

    beforeEach(() => {
      window.PerformanceObserver = sinon.stub(window, 'PerformanceObserver').callsFake((cb) => {
        cb(mockList);
        return {
          observe: observeMock,
        };
      });
    });

    afterEach(() => {
      window.PerformanceObserver.restore();
      observeMock.reset();
    });

    it('observes load events by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'navigation' })));
      assert(console.log.calledWithMatch(/dcl/));
    });

    it('does not observe load events if disabled', () => {
      init({ dcl: false });
      assert(console.log.neverCalledWithMatch(/dcl/));
    });

    it('observes first paint events by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'paint' })));
      assert(console.log.calledWithMatch(/fp/));
    });

    it('does not observe first paint events if disabled', () => {
      init({ fp: false });
      assert(console.log.neverCalledWithMatch(/fp/));
    });

    it('observes FCP events by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'paint' })));
      assert(console.log.calledWithMatch(/fcp/));
    });

    it('does not observe FCP events if disabled', () => {
      init({ fcp: false });
      assert(console.log.neverCalledWithMatch(/fcp/));
    });

    it('observes FID by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'first-input' })));
      assert(console.log.calledWithMatch(/fid/));
    });

    it('does not observe FID events if disabled', () => {
      init({ fid: false });
      assert(console.log.neverCalledWithMatch(/fid/));
    });

    it('observes LCP by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'largest-contentful-paint' })));
      assert(console.log.calledWithMatch(/lcp/));
    });

    it('does not observe LCP events if disabled', () => {
      init({ lcp: false });
      assert(console.log.neverCalledWithMatch(/lcp/));
    });

    it('observes CLS by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'layout-shift' })));
      assert(console.log.calledWithMatch(/cls/));
    });

    it('does not observe CLS events if disabled', () => {
      init({ cls: false });
      assert(console.log.neverCalledWithMatch(/cls/));
    });

    it('observes TBT by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'longtask' })));
      assert(console.log.calledWithMatch(/tbt/));
    });

    it('does not observe TBT events if disabled', () => {
      init({ tbt: false });
      assert(console.log.neverCalledWithMatch(/tbt/));
    });

    it('observes resource loads by default', () => {
      init({});
      assert(observeMock.calledWith(sinon.match({ type: 'resource' })));
      assert(console.log.calledWithMatch(/load/));
    });

    it('does not observe resource loads if disabled', () => {
      init({ resources: false });
      assert(console.log.neverCalledWithMatch(/load/));
    });

    it('gracefully swallows error', () => {
      window.PerformanceObserver.callsFake(() => { throw new Error('Foo'); });
      const spy = sinon.spy(init);
      spy();
      assert(!spy.threw());
    });
  });
});
