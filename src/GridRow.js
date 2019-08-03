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
  highlightLight: {
    backgroundColor: '#e6edf2',
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

const getBoxStyles = (rowIdx, colIdx, box, selected, selectedValue, valueCoords, easyMode) => {
  const boxStyles = [styles.box, styles.borderRight, styles.borderBottom];

  // border styles based on row/col
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

  
  // light highlight if box is in the row/col/square of the selected value
  const rowSquare = Math.floor(rowIdx / 3);
  const colSquare = Math.floor(colIdx / 3);
  const selectedRowSquare = Math.floor(selected.rowIdx / 3);
  const selectedColSquare = Math.floor(selected.colIdx / 3);
  if (selected.rowIdx === rowIdx 
    || selected.colIdx === colIdx
    || (rowSquare === selectedRowSquare && colSquare === selectedColSquare)
  ) {
    boxStyles.push(styles.highlightLight);
  } else if (easyMode) { // else b/c if we've already added the light highlight, no need to check the valueCoords
    // light highlight if box is in the row/col/square of any values matching the selected value
    for (let i = 0, len = valueCoords.length; i < len; i++) {
      const vcRowSquare = Math.floor(valueCoords[i][0] / 3);
      const vcColSquare = Math.floor(valueCoords[i][1] / 3);
      if (valueCoords[i][0] === rowIdx 
        || valueCoords[i][1] === colIdx
        || (rowSquare === vcRowSquare && colSquare === vcColSquare)
      ) {
        boxStyles.push(styles.highlightLight);
        break; // if we find a match, no need to check the rest of the valueCoords
      }
    }
  }
      

  // highlight if box value matches selected value
  if (selectedValue && selectedValue === box.value) {
    boxStyles.push(styles.highlight);
  }
  // strong highlight if this is the selected box
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


const Row = ({ row, rowIdx, selected, selectedValue, valueCoords, easyMode, dispatch }) => (
  <View style={{ flexDirection: 'row' }}>
    {row.map((box, colIdx) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch({ type: 'select', payload: { rowIdx, colIdx } });
          }}
          key={`${rowIdx}-${colIdx}`}
        >
          <View style={getBoxStyles(rowIdx, colIdx, box, selected, selectedValue, valueCoords, easyMode)}>
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
