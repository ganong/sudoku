import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _ from 'lodash';

import Row from './GridRow';


const styles = StyleSheet.create({
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

const Grid = ({ grid, selected, dispatch }) => (
  <View style={styles.grid}>
    <View>
      {grid.map((row, rowIdx) => (
        <Row
          key={`grid-row-${rowIdx}`}
          row={row}
          rowIdx={rowIdx}
          selected={selected}
          // @todo use a selector to get the highlighted square's value and pass it through instead of doing this...
          selectedValue={_.get(grid, [selected.rowIdx, selected.colIdx, 'value'])}
          dispatch={dispatch}
        />
      ))}
    </View>
    <View style={styles.buttons}>
      <Button
        title="Clear"
        onPress={() => {
          dispatch({ type: 'clear' });
        }}
      />
    </View>
    <View style={styles.numbers}>
      {_.range(1, 10).map(n => (
        <TouchableWithoutFeedback
          key={n}
          onPress={() => {
            dispatch({ type: 'update', payload: { value: n } });
          }}
          style={styles.numberPane}
        >
          <Text style={styles.number}>
            {n}
          </Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  </View>
);

export default Grid;
