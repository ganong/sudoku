import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createGrid } from './duck';
import { getGrid } from './selectors';

import GridContainer from './GridContainer';
import Loading from '../components/Loading';


class GridScreen extends React.Component {
  componentDidMount() {
    const { createGrid, navigation } = this.props;
    if (this.shouldCreateNewGame()) {
      createGrid();
      navigation.setParams({ newGame: false });
    }
  }

  shouldCreateNewGame() {
    const { grid, navigation } = this.props;
    const newGame = navigation.getParam('newGame', false);
    return grid === null || newGame;
  }

  render() {
    if (this.shouldCreateNewGame()) {
      return (
        <Loading />
      );
    }

    return (
      <GridContainer />
    );
  }
}
GridScreen.propTypes = {
  grid: PropTypes.array,
  createGrid: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  grid: getGrid(state),
});
const mapDispatchToProps = {
  createGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(GridScreen);
