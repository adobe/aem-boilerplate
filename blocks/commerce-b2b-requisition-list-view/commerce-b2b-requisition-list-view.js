import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListView
  from '@dropins/storefront-requisition-list/containers/RequisitionListView.js';

import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_REQUISITION_LISTS_PATH,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    // Ensure requisition list is initialized and get required props
    // (getProductData, enrichConfigurableProducts)
    const {
      getProductData,
      enrichConfigurableProducts,
    } = await import('../../scripts/initializers/requisition-list.js');

    let viewRenderFunction = null;

    const renderView = async () => {
      const { searchParams } = new URL(window.location.href);
      const requisitionListUid = searchParams.get('requisitionListUid');

      viewRenderFunction = rlRenderer.render(RequisitionListView, {
        requisitionListUid,
        routeRequisitionListGrid: () => rootLink(`${CUSTOMER_REQUISITION_LISTS_PATH}`),
        getProductData,
        enrichConfigurableProducts,
      });

      return viewRenderFunction(block);
    };

    await renderView();
  }
}
