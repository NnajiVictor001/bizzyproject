import store from 'store';
import { productBrandingSliceActions } from 'store/product-branding';

export const looksGoodProductKindActions = (nextKind) => {
  const activeKind = store.getState().productBranding.activeProductKind;

  store.dispatch(productBrandingSliceActions.toggleProductsKind(activeKind));
  store.dispatch(productBrandingSliceActions.toggleProductsKind(nextKind));
  store.dispatch(productBrandingSliceActions.selectActiveProductKind(nextKind));
  store.dispatch(productBrandingSliceActions.setCompleted(activeKind));
};
