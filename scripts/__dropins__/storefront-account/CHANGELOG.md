# @dropins/storefront-account

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
