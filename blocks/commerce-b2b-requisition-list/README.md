# Commerce B2B Requisition List Block

## Overview

The Commerce B2B Requisition List block surfaces a buyer's requisition lists using the `@dropins/storefront-requisition-list` drop-in. It renders a grid of lists, supports navigating to a specific list (detail view), and provides a route back to the grid. The block gates access by authentication and feature availability.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| – | – | – | This block has no authorable configuration. | – | – |

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block yet. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated users**: Required. Unauthenticated users are redirected to `CUSTOMER_LOGIN_PATH`.
- **Feature availability**: If `isRequisitionListEnabled()` returns false, the block renders nothing (feature off).
- **Empty state**: When the buyer has no requisition lists, the grid renders an empty state (`[data-testid="empty-list"]`).

### User Interaction Flows

1. **Initialization**: Auth check → feature flag check → render grid with `getRequisitionLists()` data.
2. **Grid → Detail**: Selecting a list calls `routeRequisitionListDetails(uid)`. The block fetches the list via `getRequisitionList(uid)` and renders `RequisitionListView` in-place.
3. **Detail → Grid**: `routeRequisitionListGrid()` swaps back to the previously rendered grid instance in the same container.

## Error Handling

- **API errors**: The requisition list drop-ins handle their own error display.
- **Auth/feature checks**: If unauthenticated, redirect to login. If feature disabled, return early (no UI).
- **Data loading**: Grid and detail views render loading states provided by the drop-ins; no additional handling is required in the wrapper.
