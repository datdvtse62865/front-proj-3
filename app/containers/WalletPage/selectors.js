import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the walletPage state domain
 */

const selectWalletPageDomain = state => state.walletPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WalletPage
 */

const makeSelectWalletPage = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate,
  );

export default makeSelectWalletPage;
export { selectWalletPageDomain };
