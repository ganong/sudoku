import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _ from 'lodash';

import Row from './GridRowContainer';


const styles = StyleSheet.create({
  errors: {
    alignSelf: 'flex-end',
    paddingBottom: 4,
    paddingRight: 15,
  },
  grid: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  numbers: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  numberPane: {
    width: 40,
  },
  number: {
    fontSize: 40,
  },
});


const Grid = ({ grid, numbersRemaining, errors, toggleEasyMode, clearSquare, updateSquare }) => {
  return (
    <View style={styles.grid}>
      <View style={styles.errors}>
        <Text>
          Errors: {errors}
        </Text>
      </View>
      <View>
        {grid.map((row, rowIdx) => (
          <Row
            key={`grid-row-${rowIdx}`}
            row={row}
            rowIdx={rowIdx}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          title="Clear"
          onPress={clearSquare}
        />
        <Button
          title="Toggle EasyMode"
          onPress={toggleEasyMode}
        />
      </View>
      <View style={styles.numbers}>
        {_.range(1, 10).map(n => (
          numbersRemaining[n] > 0 ? (
            <TouchableWithoutFeedback
              key={n}
              onPress={() => updateSquare(n)}
              style={styles.numberPane}
            >
              <Text style={styles.number}>
                {n}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <View key={n} style={styles.numberPane} />
          )
        ))}
      </View>
    </View>
  );
};
Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  numbersRemaining: PropTypes.object.isRequired,
  errors: PropTypes.number.isRequired,
  toggleEasyMode: PropTypes.func.isRequired,
  clearSquare: PropTypes.func.isRequired,
  updateSquare: PropTypes.func.isRequired,
};

export default Grid;
