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

/* eslint-disable no-console */

const LABEL_COLORS = {
  misc: '#444',
  cls: '#c50',
  dcl: '#185ebd',
  fcp: 'green',
  fid: 'purple',
  fp: 'mediumseagreen',
  lcp: 'darkgreen',
  tbt: 'red',
  load: '#888',
};

const DEFAULT_OPTIONS = {
  debug: false,
  dcl: true,
  cls: true,
  fcp: true,
  fid: true,
  fp: true,
  lcp: true,
  tbt: true,
  resources: true,
};

function log(message, time = new Date() - performance.timeOrigin, type = 'misc', colorOverride = '') {
  const color = colorOverride || LABEL_COLORS[type];
  console.log(
    `%c${Math.round(time).toString().padStart(5, ' ')}%c %c${type}%c ${message}`,
    `background-color: ${LABEL_COLORS.misc}; padding: 3px; border-radius: 3px;`,
    '',
    `background-color: ${color}; padding: 3px 5px; border-radius: 3px;`,
    '',
  );
}

function pad(value, length = 5, filler = ' ') {
  return value.toString().padStart(length, filler);
}

export function domContentLoadedReporter(options) {
  return (entry) => {
    if (entry.loadEventStart) {
      const total = entry.loadEventEnd - entry.loadEventStart;
      log(`${entry.name}. Load handler took ${total.toFixed(2)}ms`, entry.loadEventStart, 'load', 'darkred');
    } else {
      const total = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
      log(`${entry.name}. DomContentLoaded handler took ${total.toFixed(2)}ms`, entry.domContentLoadedEventStart, 'dcl');
    }
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackDomContentLoaded(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(domContentLoadedReporter(options));
  });
  observer.observe({ type: 'navigation', buffered: true });
}

export function firstContentfulPaintReporter(options) {
  return (entry) => {
    log('', entry.startTime, 'fcp');
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackFirstContentfulPaint(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntriesByName('first-contentful-paint').forEach(firstContentfulPaintReporter(options));
  });
  observer.observe({ type: 'paint', buffered: true });
}

export function firstInputDelayReporter(options) {
  return (entry) => {
    log(`${entry.name} took ${entry.duration}ms`, entry.startTime, 'fid');
    console.log(entry.target);
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackFirstInputDelay(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(firstInputDelayReporter(options));
  });
  observer.observe({ type: 'first-input', buffered: true });
}

export function largestContentfulPaintReporter(options) {
  return (entry) => {
    log(entry.url, entry.startTime, 'lcp');
    console.log(entry.element);
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackLagestContentfulPaint(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(largestContentfulPaintReporter(options));
  });
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

export function cumulativeLayoutShiftReporter(options) {
  return (entry) => {
    log(`${Math.round(entry.value * 100000) / 100000}ms`, entry.startTime, 'cls');
    (entry.sources || []).forEach((source) => {
      const to = source.currentRect;
      const from = source.previousRect;
      const { node } = source;
      console.log(
        `        from: ${pad(from.top, 4)} ${pad(from.right, 4)} ${pad(from.bottom, 4)} ${pad(from.left, 4)}\n`
        + `        to:   ${pad(to.top, 4)} ${pad(to.right, 4)} ${pad(to.bottom, 4)} ${pad(to.left, 4)}`,
      );
      console.log(node.nodeType === Node.TEXT_NODE ? node.parentElement : node);
    });
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackCumulativeLayoutShifts(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(cumulativeLayoutShiftReporter(options));
  });
  observer.observe({ type: 'layout-shift', buffered: true });
}

export function longTaskReporter(options) {
  return (entry) => {
    log(`${entry.duration}ms`, entry.startTime, 'tbt');
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackLongTasks(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(longTaskReporter(options));
  });
  observer.observe({ type: 'longtask', buffered: true });
}

export function firstPaintReporter(options) {
  return (entry) => {
    log('', entry.startTime, 'fp');
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackFirstPaint(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntriesByName('first-paint').forEach(firstPaintReporter(options));
  });
  observer.observe({ type: 'paint', buffered: true });
}

export function resourceLoadReporter(options) {
  return (entry) => {
    const blockingStatus = entry.renderBlockingStatus === 'blocking' ? ` (by ${entry.initiatorType}, ${entry.renderBlockingStatus})` : '';
    log(`${entry.name}${blockingStatus}`, Math.round(entry.startTime + entry.duration), 'load');
    if (options.debug) {
      console.log(JSON.stringify(entry));
    }
  };
}

function trackResourceLoads(options) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(resourceLoadReporter(options));
  });
  observer.observe({ type: 'resource', buffered: true });
}

export function init(options = {}) {
  log('Starting Franklin performance logger');
  const config = { ...DEFAULT_OPTIONS, ...options };
  try {
    if (config.dcl) {
      trackDomContentLoaded(options);
    }
    if (config.fcp) {
      trackFirstContentfulPaint(options);
    }
    if (config.fp) {
      trackFirstPaint(options);
    }
    if (config.fid) {
      trackFirstInputDelay(options);
    }
    if (config.lcp) {
      trackLagestContentfulPaint(options);
    }
    if (config.cls) {
      trackCumulativeLayoutShifts(options);
    }
    if (config.tbt) {
      trackLongTasks(options);
    }
    if (config.resources) {
      trackResourceLoads(options);
    }
  } catch (err) {
    // Prevent exception from bubbling up and breaking main script.
    console.log(err);
  }
}
