/**
 *
 * HomeMainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomeMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function HomeMainPage() {
  useInjectReducer({ key: 'homeMainPage', reducer });
  useInjectSaga({ key: 'homeMainPage', saga });

  return <div />;
}

HomeMainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeMainPage: makeSelectHomeMainPage(),
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

export default compose(withConnect)(HomeMainPage);
