/**
 *
 * ReportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReportPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ReportPage() {
  useInjectReducer({ key: 'reportPage', reducer });
  useInjectSaga({ key: 'reportPage', saga });

  return <div />;
}

ReportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reportPage: makeSelectReportPage(),
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

export default compose(withConnect)(ReportPage);
