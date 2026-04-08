# @dropins/storefront-requisition-list

## 1.3.0-alpha-20260331122640

### Minor Changes

- 4205285: feat: add Move to List and Copy to List features for requisition list items

  - Add `moveItemsBetweenRequisitionLists` API to move items from one requisition list to another, removing them from the source and adding to the destination
  - Add `copyItemsBetweenRequisitionLists` API to copy items between requisition lists, keeping items in the source list
  - Add `RequisitionListPicker` reusable component for selecting a requisition list from a scrollable list of cards
  - Add "Move to List" and "Copy to List" bulk action buttons in the requisition list view, with modal-based list selection
  - Refactor `RequisitionListSelector` to use `RequisitionListPicker` for consistent list selection UX
  - Include destination list name in success alert messages for both move and copy operations

- 4205285: Begin next development cycle
- 9fdf4f4: Add an an active class and prop to the **RequisitionListSelector** so the button on the PDP page can reflect when the current product is already in the requisition list. Both an `active` prop as well as `requisition-list-selector--active` class was added. In addition, the `activeIcon` was also included should that the developer would like to change the button icon once an active state is truthy.
- 98cd3b9: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 1.2.0

### Minor Changes

- a23ab81: Replaced API catalog functions with props that must be injected from the integration layer

### Patch Changes

- 9dfd6da: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0
- 13f4ea9: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 2f02836: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- b8e1dbe: Fix RequisitionListSelector Storybook stories: WhenRequisitionListIsDisabled now correctly shows disabled behavior via loaders and state; WithoutExistingRequisitionLists shows empty lists via loader; Docs overview uses iframe isolation (docs.story.inline: false) so all stories appear and work correctly together.
- c26676c: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 1.2.0-beta.4

### Patch Changes

- 9dfd6da: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.2.0-beta.3

### Patch Changes

- 2f02836: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 1.2.0-beta.2

### Patch Changes

- c26676c: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 1.2.0-beta.1

### Minor Changes

- a23ab81: Replaced API catalog functions with props that must be injected from the integration layer

## 1.1.1-beta.0

### Patch Changes

- 13f4ea9: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- b8e1dbe: Fix RequisitionListSelector Storybook stories: WhenRequisitionListIsDisabled now correctly shows disabled behavior via loaders and state; WithoutExistingRequisitionLists shows empty lists via loader; Docs overview uses iframe isolation (docs.story.inline: false) so all stories appear and work correctly together.
