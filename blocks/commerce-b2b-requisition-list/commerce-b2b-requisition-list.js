import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListGrid
  from '@dropins/storefront-requisition-list/containers/RequisitionListGrid.js';

import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_REQUISITION_LIST_DETAILS_PATH,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    // Ensure endpoint and auth headers are set before the grid fetches
    await import('../../scripts/initializers/requisition-list.js');

    let gridRenderFunction = null;

    const renderGrid = async () => {
      gridRenderFunction = rlRenderer.render(RequisitionListGrid, {
        routeRequisitionListDetails: (uid) => rootLink(`${CUSTOMER_REQUISITION_LIST_DETAILS_PATH}?requisitionListUid=${uid}`),
        slots: {},
      });

      return gridRenderFunction(block);
    };

    await renderGrid();
  }
}
