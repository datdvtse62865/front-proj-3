/**
 *
 * WalletPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWalletPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function WalletPage() {
  useInjectReducer({ key: 'walletPage', reducer });
  useInjectSaga({ key: 'walletPage', saga });

  return <div />;
}

WalletPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  walletPage: makeSelectWalletPage(),
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

export default compose(withConnect)(WalletPage);
