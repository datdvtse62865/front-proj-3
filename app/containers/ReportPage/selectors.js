import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reportPage state domain
 */

const selectReportPageDomain = state => state.reportPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportPage
 */

const makeSelectReportPage = () =>
  createSelector(
    selectReportPageDomain,
    substate => substate,
  );

export default makeSelectReportPage;
export { selectReportPageDomain };
