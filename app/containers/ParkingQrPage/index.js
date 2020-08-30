/**
 *
 * ParkingQrPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectParkingQrPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ParkingQrPage() {
  useInjectReducer({ key: 'parkingQrPage', reducer });
  useInjectSaga({ key: 'parkingQrPage', saga });

  return <div />;
}

ParkingQrPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  parkingQrPage: makeSelectParkingQrPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ParkingQrPage);
