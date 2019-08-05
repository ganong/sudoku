import React from 'react';
import { connect } from 'react-redux';

import { toggleEasyMode } from '../Options/duck';
import { clearSquare, updateSquare } from './duck';
import { getGrid, getNumbersRemaining, getErrors, isGridSolved } from './selectors';

import Grid from './Grid';
import Navigate from '../Navigate';

const GridContainer = ({ isComplete, ...props}) => {
  if (isComplete) {
    return <Navigate route="Win" />;
  }

  return (
    <Grid {...props} />
  );
};


const mapStateToProps = state => ({
  grid: getGrid(state), 
  numbersRemaining: getNumbersRemaining(state), 
  errors: getErrors(state),
  isComplete: isGridSolved(state),
});
const mapDispatchToProps = {
  toggleEasyMode,
  clearSquare,
  updateSquare
};

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
