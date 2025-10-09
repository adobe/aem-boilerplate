import * as rlApi from '@dropins/storefront-requisition-list/api.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import RequisitionListGrid
  from '@dropins/storefront-requisition-list/containers/RequisitionListGrid.js';
import RequisitionListView from '@dropins/storefront-requisition-list/containers/RequisitionListView.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';

import {
  CUSTOMER_LOGIN_PATH,
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
    let gridRenderFunction = null;

    const renderGrid = async () => {
      gridRenderFunction = rlRenderer.render(RequisitionListGrid, {
        requisitionLists: await rlApi.getRequisitionLists(),
        routeRequisitionListDetails: async (uid) => {
          const requisitionList = await rlApi.getRequisitionList(uid);

          return rlRenderer.render(RequisitionListView, {
            requisitionList,
            routeRequisitionListGrid: () => {
              // Return to the existing grid instance
              if (gridRenderFunction) {
                gridRenderFunction(block);
              }
            },
          })(block);
        },
        slots: {},
      });

      return gridRenderFunction(block);
    };

    renderGrid();
  }
}
