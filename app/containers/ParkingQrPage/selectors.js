import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the parkingQrPage state domain
 */

const selectParkingQrPageDomain = state => state.parkingQrPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ParkingQrPage
 */

const makeSelectParkingQrPage = () =>
  createSelector(
    selectParkingQrPageDomain,
    substate => substate,
  );

export default makeSelectParkingQrPage;
export { selectParkingQrPageDomain };
