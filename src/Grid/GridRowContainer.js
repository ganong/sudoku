import { connect } from 'react-redux';

import { getEasyMode } from '../Options/selectors';
import { getSelected, getSelectedValue, getMatchingValueCoords } from './selectors';
import { selectSquare } from './duck';

import Row from './GridRow';


const mapStateToProps = state => ({
  easyMode: getEasyMode(state),
  selected: getSelected(state),
  selectedValue: getSelectedValue(state),
  valueCoords: getMatchingValueCoords(state),
});
const mapDispatchToProps = {
  onSelect: selectSquare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
