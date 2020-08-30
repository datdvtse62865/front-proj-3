/**
 *
 * TransactionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTransactionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function TransactionPage() {
  useInjectReducer({ key: 'transactionPage', reducer });
  useInjectSaga({ key: 'transactionPage', saga });

  return <div />;
}

TransactionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionPage: makeSelectTransactionPage(),
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

export default compose(withConnect)(TransactionPage);
