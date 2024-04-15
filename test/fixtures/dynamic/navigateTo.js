import assert from 'assert';
import sinon from 'sinon';

export const sample = {
  items: [
    {
      id: 'navigateToNew',
      fieldType: 'button',
      name: 'navigateToNew',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To New Window',
      },
      events: {
        click: [
          "navigateTo('https://www.google.com', '_newwindow')",
        ],
      },
    },
    {
      id: 'navigateToBlank',
      fieldType: 'button',
      name: 'navigateToBlank',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To Blank',
      },
      events: {
        click: [
          "navigateTo('https://www.google.com', '_blank')",
        ],
      },
    },
    {
      id: 'navigateToParent',
      fieldType: 'button',
      name: 'navigateToParent',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To Parent',
      },
      events: {
        click: [
          "navigateTo('https://www.google.com', '_parent')",
        ],
      },
    },
    {
      id: 'navigateToSelf',
      fieldType: 'button',
      name: 'navigateToSelf',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To self',
      },
      events: {
        click: [
          "navigateTo('https://www.google.com', '_self')",
        ],
      },
    },
    {
      id: 'navigateToTop',
      fieldType: 'button',
      name: 'navigateToTop',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To top',
      },
      events: {
        click: [
          "navigateTo('https://www.google.com', '_top')",
        ],
      },
    },
    {
      id: 'navigateToRelative',
      fieldType: 'button',
      name: 'navigateToRelative',
      visible: true,
      type: 'string',
      enabled: true,
      label: {
        visible: true,
        value: 'Navigate To relative url',
      },
      events: {
        click: [
          "navigateTo('/a/b/c', '_blank')",
        ],
      },
    },
  ],
};

let mock;
export function before() {
  mock = sinon.fake();
}

export function op(block) {
  global.window = Object.create(window);
  Object.defineProperty(global.window, 'open', {
    value: mock,
    writable: true,
  });
  Object.defineProperty(global.window, 'location', {
    value: {
      href: 'https://localhost:3000/',
    },
    writable: false,
  });
  let btn = block.querySelector('#navigateToNew');
  btn.click();

  btn = block.querySelector('#navigateToBlank');
  btn.click();

  btn = block.querySelector('#navigateToParent');
  btn.click();

  btn = block.querySelector('#navigateToSelf');
  btn.click();

  btn = block.querySelector('#navigateToTop');
  btn.click();

  btn = block.querySelector('#navigateToRelative');
  btn.click();
}

export function expect() {
  assert.equal(mock.callCount, 6, 'window.open was not called 6 times');
  assert.deepEqual(mock.getCall(0).args, ['https://www.google.com', '_blank', 'width=1000,height=800'], 'window.open was not called with blank');
  assert.deepEqual(mock.getCall(1).args, ['https://www.google.com', '_blank', null], 'window.open was not called with blank and args');
  assert.deepEqual(mock.getCall(2).args, ['https://www.google.com', '_parent', null], 'window.open was not called with parent');
  assert.deepEqual(mock.getCall(3).args, ['https://www.google.com', '_self', null], 'window.open was not called with self');
  assert.deepEqual(mock.getCall(4).args, ['https://www.google.com', '_top', null], 'window.open was not called with top');
  assert.deepEqual(mock.getCall(5).args, ['/a/b/c', '_blank', null], 'window.open was not called with relative url');
}
