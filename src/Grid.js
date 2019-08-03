import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _ from 'lodash';

import Row from './GridRow';


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

const getSelectedValue = (grid, selected) => _.get(grid, [selected.rowIdx, selected.colIdx, 'value']);

const getValueCoords = (grid, value) => {
  const coords = [];

  if (value === 0) return coords;

  grid.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (value === col.value) {
        coords.push([rowIdx, colIdx]);
      }
    });
  });

  return coords;
};

const Grid = ({ grid, selected, options, dispatch, numbersRemaining, errors }) => {
  const selectedValue = getSelectedValue(grid, selected);
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
            selected={selected}
            // @todo use a selector to get the highlighted square's value and pass it through instead of doing this...
            selectedValue={selectedValue}
            valueCoords={getValueCoords(grid, selectedValue)}
            easyMode={options.easyMode}
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
        <Button
          title="Toggle EasyMode"
          onPress={() => {
            dispatch({ type: 'easy-mode' });
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
              {numbersRemaining[n] > 0 && n}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default Grid;
