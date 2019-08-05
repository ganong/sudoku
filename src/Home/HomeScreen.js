import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Button, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { getGrid } from '../Grid/selectors';


const styles = StyleSheet.create({
  homeScreen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  innerView: {
    alignItems: 'center',
  },
  titleItalic: {
    fontSize: 35,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});


const HomeScreen = ({ navigation, gameInProgress }) => {
  return (
    <View style={styles.homeScreen}>
      <View style={styles.innerView}>
        <Text style={styles.titleItalic}>
          Simply
        </Text>
        <Text style={styles.title}>
          Sudoku
        </Text>
      </View>
      <View style={styles.innerView}>
        {gameInProgress && (
          <Button 
            title="Continue"
            onPress={() => navigation.navigate('Grid')}
          />
        )}
        <Button 
          title="New Game"
          onPress={() => navigation.navigate('Grid', { newGame: true })}
        />
      </View>
    </View>
  );
};
HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  gameInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  gameInProgress: getGrid(state) !== null, 
});

export default connect(mapStateToProps)(HomeScreen);
