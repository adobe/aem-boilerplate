import * as rlApi from '@dropins/storefront-requisition-list/api.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListView from '@dropins/storefront-requisition-list/containers/RequisitionListView.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';

import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_REQUISITION_LISTS_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    const isEnabled = await rlApi.isRequisitionListEnabled();
    if (!isEnabled) {
      return;
    }
    // Set Fetch Headers (Service)
    rlApi.setFetchGraphQlHeaders?.((prev) => ({ ...prev, ...getHeaders('cs') }));
    let viewRenderFunction = null;

    const renderView = async () => {
      const { searchParams } = new URL(window.location.href);
      const requisitionListUid = searchParams.get('requisitionListUid');

      const requisitionList = await rlApi.getRequisitionList(requisitionListUid);
      viewRenderFunction = rlRenderer.render(RequisitionListView, {
        requisitionList,
        routeRequisitionListGrid: () => rootLink(`${CUSTOMER_REQUISITION_LISTS_PATH}`),
      });

      return viewRenderFunction(block);
    };

    renderView();
  }
}
