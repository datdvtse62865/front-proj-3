import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeMainPage state domain
 */

const selectHomeMainPageDomain = state => state.homeMainPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeMainPage
 */

const makeSelectHomeMainPage = () =>
  createSelector(
    selectHomeMainPageDomain,
    substate => substate,
  );

export default makeSelectHomeMainPage;
export { selectHomeMainPageDomain };
