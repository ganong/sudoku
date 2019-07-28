import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _ from 'lodash';


const styles = StyleSheet.create({
  borderRight: {
    borderRightColor: '#4682b4',
    borderRightWidth: 2,
  },
  borderLeft: {
    borderLeftColor: '#4682b4',
    borderLeftWidth: 2,
  },
  borderTop: {
    borderTopColor: '#4682b4',
    borderTopWidth: 2,
  },
  borderBottom: {
    borderBottomColor: '#4682b4',
    borderBottomWidth: 2,
  },
  borderTopThick: {
    borderTopWidth: 4,
  },
  borderBottomThick: {
    borderBottomWidth: 4,
  },
  borderLeftThick: {
    borderLeftWidth: 4,
  },
  borderRightThick: {
    borderRightWidth: 4,
  },
  highlight: {
    backgroundColor: '#d4eaf9',
  },
  highlightStrong: {
    backgroundColor: '#cdcdf7',
  },
  box: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 30,
  },
  solved: {
    color: '#0b8ec6',
  },
  error: {
    color: '#dc143c',
  },
});

const getBoxStyles = (rowIdx, colIdx, box, selected, selectedValue) => {
  const boxStyles = [styles.box, styles.borderRight, styles.borderBottom];
  if (rowIdx % 3 === 0) {
    boxStyles.push(styles.borderTop);
  }
  if (colIdx % 3 === 0) {
    boxStyles.push(styles.borderLeft);
  }
  if (rowIdx === 0) {
    boxStyles.push(styles.borderTopThick);
  }
  if (rowIdx === 8) {
    boxStyles.push(styles.borderBottomThick);
  }
  if (colIdx === 0) {
    boxStyles.push(styles.borderLeftThick);
  }
  if (colIdx === 8) {
    boxStyles.push(styles.borderRightThick);
  }
  if (selectedValue && selectedValue === box.value) {
    boxStyles.push(styles.highlight);
  }
  if (selected.rowIdx === rowIdx && selected.colIdx === colIdx) {
    boxStyles.push(styles.highlightStrong);
  }
  return boxStyles;
}

const getNumberStyles = (box) => {
  const numStyles = [styles.number];
  if (box.solved === false) {
    numStyles.push(styles.error);
  }
  if (box.solved === true) {
    numStyles.push(styles.solved);
  }
  return numStyles;
}


const Row = ({ row, rowIdx, selected, selectedValue, dispatch }) => (
  <View style={{ flexDirection: 'row' }}>
    {row.map((box, colIdx) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch({ type: 'select', payload: { rowIdx, colIdx } });
          }}
          key={`${rowIdx}-${colIdx}`}
        >
          <View style={getBoxStyles(rowIdx, colIdx, box, selected, selectedValue)}>
            <Text 
              style={getNumberStyles(box)}
            >
              {box.value || ''}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    })}
  </View>
);

export default Row;
