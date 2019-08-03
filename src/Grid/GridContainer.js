import { connect } from 'react-redux';

import { toggleEasyMode } from '../Options/duck';
import { clearSquare, updateSquare } from './duck';
import { getGrid, getNumbersRemaining, getErrors } from './selectors';

import Grid from './Grid';


const mapStateToProps = state => ({
  grid: getGrid(state), 
  numbersRemaining: getNumbersRemaining(state), 
  errors: getErrors(state),
});
const mapDispatchToProps = {
  toggleEasyMode,
  clearSquare,
  updateSquare
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
