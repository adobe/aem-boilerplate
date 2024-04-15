import assert from 'assert';

export const sample = {
  id: 'L2NvbnRlbnQvZm9ybXMvYWYvd2l6YXJkLXdpdGgtbWVudQ==',
  fieldType: 'form',
  title: 'wizard with menu',
  lang: 'en',
  action: '/adobe/forms/af/submit/L2NvbnRlbnQvZm9ybXMvYWYvd2l6YXJkLXdpdGgtbWVudQ==',
  properties: {
    'fd:dor': {
      dorType: 'none',
    },
    'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer',
    'fd:schemaType': 'BASIC',
    'fd:formDataEnabled': false,
  },
  columnClassNames: {
    wizard: 'aem-GridColumn aem-GridColumn--default--12',
  },
  gridClassNames: 'aem-Grid aem-Grid--12 aem-Grid--default--12',
  columnCount: 12,
  events: {
    'custom:setProperty': [
      '$event.payload',
    ],
  },
  ':itemsOrder': [
    'wizard',
  ],
  metadata: {
    grammar: 'json-formula-1.0.0',
    version: '1.0.0',
  },
  adaptiveform: '0.12.1',
  ':items': {
    wizard: {
      id: 'wizard-208196f3a7',
      fieldType: 'panel',
      name: 'wizard1708942357733',
      visible: true,
      description: '<p>Description</p>\r\n',
      enabled: true,
      repeatable: false,
      readOnly: false,
      label: {
        visible: true,
        value: 'Wizard',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      properties: {
        'fd:dor': {
          dorExclusion: false,
          dorExcludeTitle: false,
          dorExcludeDescription: false,
        },
        'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard',
      },
      ':itemsOrder': [
        'panelcontainer',
        'panelcontainer_760408194',
        'panelcontainer_105587269',
      ],
      ':items': {
        panelcontainer: {
          id: 'panelcontainer-17b7de03b4',
          fieldType: 'panel',
          name: 'panelcontainer1708942364313',
          visible: true,
          enabled: true,
          repeatable: false,
          readOnly: false,
          columnClassNames: {
            button: 'aem-GridColumn aem-GridColumn--default--12',
            textinput: 'aem-GridColumn aem-GridColumn--default--12',
          },
          gridClassNames: 'aem-Grid aem-Grid--12 aem-Grid--default--12',
          columnCount: 12,
          label: {
            visible: true,
            value: 'Panel 1',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
              dorExcludeTitle: false,
              dorExcludeDescription: false,
            },
            'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer',
          },
          ':itemsOrder': [
            'textinput',
            'button',
          ],
          appliedCssClassNames: 'model',
          ':items': {
            textinput: {
              id: 'textinput-38918fdb29',
              fieldType: 'text-input',
              name: 'textinput1708942379003',
              type: 'string',
              label: {
                value: 'Text Input',
              },
              events: {
                'custom:setProperty': [
                  '$event.payload',
                ],
              },
              properties: {
                'fd:dor': {
                  dorExclusion: false,
                },
                'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer/textinput',
              },
              ':type': 'forms-components-examples/components/form/textinput',
            },
            button: {
              id: 'showPanelButtonId',
              fieldType: 'button',
              name: 'button1708942440251',
              type: 'string',
              buttonType: 'button',
              properties: {
                'fd:dor': {
                  dorExclusion: true,
                },
                'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer/button',
                'fd:rules': {
                  validationStatus: 'valid',
                },
                'fd:buttonType': 'button',
              },
              label: {
                value: 'Show panel 3',
              },
              events: {
                click: [
                  "dispatchEvent($form.wizard1708942357733.panelcontainer_1055872691708942373716, 'custom:setProperty', {visible : true()})",
                ],
                'custom:setProperty': [
                  '$event.payload',
                ],
              },
              ':type': 'forms-components-examples/components/form/button',
            },
          },
          ':type': 'forms-components-examples/components/form/panelcontainer',
          allowedComponents: {
            components: [],
            applicable: false,
          },
        },
        panelcontainer_760408194: {
          id: 'panelcontainer-57f2f9bd13',
          fieldType: 'panel',
          name: 'panelcontainer_7604081941708942368411',
          visible: true,
          enabled: true,
          repeatable: false,
          readOnly: false,
          columnClassNames: {
            radiobutton: 'aem-GridColumn aem-GridColumn--default--12',
          },
          gridClassNames: 'aem-Grid aem-Grid--12 aem-Grid--default--12',
          columnCount: 12,
          label: {
            visible: true,
            value: 'Panel 2',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
              dorExcludeTitle: false,
              dorExcludeDescription: false,
            },
            'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer_760408194',
          },
          ':itemsOrder': [
            'radiobutton',
          ],
          appliedCssClassNames: 'model',
          ':items': {
            radiobutton: {
              id: 'radiobutton-c4b771a8be',
              fieldType: 'radio-group',
              name: 'radiobutton1708942388803',
              type: 'string',
              enforceEnum: true,
              enumNames: [
                'Item 1',
                'Item 2',
              ],
              label: {
                value: 'Radio Button',
              },
              events: {
                'custom:setProperty': [
                  '$event.payload',
                ],
              },
              properties: {
                'afs:layout': {
                  orientation: 'horizontal',
                },
                'fd:dor': {
                  dorExclusion: false,
                },
                'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer_760408194/radiobutton',
              },
              enum: [
                '0',
                '1',
              ],
              ':type': 'forms-components-examples/components/form/radiobutton',
            },
          },
          ':type': 'forms-components-examples/components/form/panelcontainer',
          allowedComponents: {
            components: [],
            applicable: false,
          },
        },
        panelcontainer_105587269: {
          id: 'panelcontainer-c9434ae14a',
          fieldType: 'panel',
          name: 'panelcontainer_1055872691708942373716',
          visible: false,
          enabled: true,
          repeatable: false,
          readOnly: false,
          columnClassNames: {
            checkboxgroup: 'aem-GridColumn aem-GridColumn--default--12',
          },
          gridClassNames: 'aem-Grid aem-Grid--12 aem-Grid--default--12',
          columnCount: 12,
          label: {
            visible: true,
            value: 'Panel 3',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
              dorExcludeTitle: false,
              dorExcludeDescription: false,
            },
            'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer_105587269',
          },
          ':itemsOrder': [
            'checkboxgroup',
          ],
          appliedCssClassNames: 'model',
          ':items': {
            checkboxgroup: {
              id: 'checkboxgroup-4b0c7cce2c',
              fieldType: 'checkbox-group',
              name: 'checkboxgroup1708942405166',
              type: 'number[]',
              enforceEnum: true,
              enumNames: [
                'Item 1',
                ' Item 2',
              ],
              label: {
                value: 'Check Box Group',
              },
              events: {
                'custom:setProperty': [
                  '$event.payload',
                ],
              },
              properties: {
                'afs:layout': {
                  orientation: 'horizontal',
                },
                'fd:dor': {
                  dorExclusion: false,
                },
                'fd:path': '/content/forms/af/wizard-with-menu/jcr:content/guideContainer/wizard/panelcontainer_105587269/checkboxgroup',
              },
              enum: [
                0,
                1,
              ],
              ':type': 'forms-components-examples/components/form/checkboxgroup',
            },
          },
          ':type': 'forms-components-examples/components/form/panelcontainer',
          allowedComponents: {
            components: [],
            applicable: false,
          },
        },
      },
      ':type': 'forms-components-examples/components/form/wizard',
    },
  },
  ':type': 'forms-components-examples/components/form/container',
};

export function op(block) {
  const allItems = block.querySelectorAll('.wizard-menu-item');
  assert.equal(allItems.length, 3);
  const hideItems = Array.from(allItems).filter((item) => item.dataset.visible === 'false');
  assert.equal(hideItems.length, 1);
  const showPanelButton = block.querySelector('#showPanelButtonId');
  showPanelButton.click();

  // const backButton = block.querySelector('.wizard-button-prev');
  // const displayValue = document.defaultView.getComputedStyle(backButton).display;
  // assert.equal(displayValue, 'none');
}

export function expect(block) {
  const allItems = block.querySelectorAll('.wizard-menu-item');
  assert.equal(allItems.length, 3);
  const hideItems = Array.from(allItems).filter((item) => item.dataset.visible === 'false');
  assert.equal(hideItems.length, 0);
}
