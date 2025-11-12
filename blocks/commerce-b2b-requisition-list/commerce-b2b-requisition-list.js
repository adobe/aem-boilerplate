import * as rlApi from '@dropins/storefront-requisition-list/api.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListGrid from '@dropins/storefront-requisition-list/containers/RequisitionListGrid.js';

import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_REQUISITION_LIST_DETAILS_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/requisition-list.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    const isEnabled = await rlApi.isRequisitionListEnabled();
    if (!isEnabled) {
      return;
    }

    let gridRenderFunction = null;

    const renderGrid = async () => {
      gridRenderFunction = rlRenderer.render(RequisitionListGrid, {
        routeRequisitionListDetails: (uid) => rootLink(`${CUSTOMER_REQUISITION_LIST_DETAILS_PATH}?requisitionListUid=${uid}`),
        slots: {},
      });

      return gridRenderFunction(block);
    };

    renderGrid();
  }
}
