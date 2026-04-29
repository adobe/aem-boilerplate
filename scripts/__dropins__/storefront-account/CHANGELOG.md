# @dropins/storefront-account

## 3.3.0

### Minor Changes

- 573f3e7: Add fieldIdPrefix prop support to the Addresses container
- 98d4563: Adds stored payment methods to My Account: customers can see saved cards (and similar methods), remove a stored method, and optionally filter by payment method code. Data comes from GraphQL (getCustomerPaymentTokens, deletePaymentToken) or from the event bus when tokens are already on the client. The UI reuses and extends PaymentCard, introduces PaymentMethods / PaymentMethodsWrapper, and includes Storybook, html-host, and unit test coverage across API, transforms, hooks, fixtures, and containers.
- 3cbdd4f: Adds a confirmation step before removing a stored payment method in My Account: choosing Remove opens a PaymentModal with copy and a preview of the card; Cancel closes without deleting, and Remove confirms and runs the existing delete flow (deletePaymentToken via removeToken). Introduces PaymentModal (component, styles, Storybook, and tests), wires PaymentMethodsWrapper to pending-removal state, extends payment card modal props and English strings, and adds unit tests for the modal and delete confirmation behavior.
- 01c919b: Add a new component for a Payment Card

## 3.3.0-beta.0

### Minor Changes

- 573f3e7: Add fieldIdPrefix prop support to the Addresses container
- 98d4563: Adds stored payment methods to My Account: customers can see saved cards (and similar methods), remove a stored method, and optionally filter by payment method code. Data comes from GraphQL (getCustomerPaymentTokens, deletePaymentToken) or from the event bus when tokens are already on the client. The UI reuses and extends PaymentCard, introduces PaymentMethods / PaymentMethodsWrapper, and includes Storybook, html-host, and unit test coverage across API, transforms, hooks, fixtures, and containers.
- 3cbdd4f: Adds a confirmation step before removing a stored payment method in My Account: choosing Remove opens a PaymentModal with copy and a preview of the card; Cancel closes without deleting, and Remove confirms and runs the existing delete flow (deletePaymentToken via removeToken). Introduces PaymentModal (component, styles, Storybook, and tests), wires PaymentMethodsWrapper to pending-removal state, extends payment card modal props and English strings, and adds unit tests for the modal and delete confirmation behavior.
- 01c919b: Add a new component for a Payment Card

## 3.2.1

### Patch Changes

- b47c3b4: Fix customer **select/dropdown custom attributes** end-to-end: extend `GET_CUSTOMER` with `AttributeSelectedOptions` / `selected_options`, map those values in `transformCustomer`, and prefer field `defaultValue` over option `isDefault` in `FormInputs` selects.

  Fix **date-only** strings in `formatDateToLocale` so calendar days do not shift by timezone (ISO `YYYY-MM-DD` formatted with UTC; optional whitespace trimmed).

## 3.2.0

### Minor Changes

- d6e93e0: This PR adds `orderTime` to `OrderModel`. This is required to show order date and time in OrdersListCard.
  By default, only date is displayed.

  To show the date and the time, there is a new slot implemented (`OrdersListOrderTime`). To use it, it needs to be added to block in Boilerplate, like in the following example:

  ```javascript
  (...)
      OrdersListOrderTime: (ctx) => {
            const container = document.createElement('p');
            const tpl = `${ctx.deliveryDateText} ${ctx.orderDate} ${ctx.orderTime}`;
            container.append(tpl);
            ctx.replaceWith(container);
      },
  (...)
  ```

- 68f5eda: Enable CustomerOrder GraphQL fragment extension

### Patch Changes

- 4d27653: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- d8a9db4: Bump build-tools version
- b4c01f1: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 63456fd: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 63456fd: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 4d27653: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- d8a9db4: Bump build-tools version

## 3.2.0-beta.0

### Minor Changes

- d6e93e0: This PR adds `orderTime` to `OrderModel`. This is required to show order date and time in OrdersListCard.
  By default, only date is displayed.

  To show the date and the time, there is a new slot implemented (`OrdersListOrderTime`). To use it, it needs to be added to block in Boilerplate, like in the following example:

  ```javascript
  (...)
      OrdersListOrderTime: (ctx) => {
            const container = document.createElement('p');
            const tpl = `${ctx.deliveryDateText} ${ctx.orderDate} ${ctx.orderTime}`;
            container.append(tpl);
            ctx.replaceWith(container);
      },
  (...)
  ```

- 68f5eda: Enable CustomerOrder GraphQL fragment extension

### Patch Changes

- b4c01f1: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
