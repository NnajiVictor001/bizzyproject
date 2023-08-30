import store from 'store';
import { webCreationSliceActions } from 'store/web-creation';

export const looksGoodWebsiteCreationActions = (nextWebCreation) => {
  const { activeWebCreation } = store.getState().webCreation;

  store.dispatch(webCreationSliceActions.toggleWebCreation(activeWebCreation));
  store.dispatch(webCreationSliceActions.toggleWebCreation(nextWebCreation));
  store.dispatch(webCreationSliceActions.selectActiveWebCreation(nextWebCreation));
  store.dispatch(webCreationSliceActions.setCompleted(activeWebCreation));
};
