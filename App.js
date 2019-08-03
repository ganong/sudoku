import React, { useState, useReducer } from 'react';
import _ from 'lodash';

import buildGrid from './src/grid-utils';
import Grid from './src/Grid';


/* state shape:
{
  solvedGrid: [
    [number, number, number, ...],
    ...
  ],
  grid: [
    [
      {
        value: number,
        immutable: bool, // true = was a starting number - ie can't be changed
        solved: bool, // true = matched solvedGrid number in same place, false = doesn't match - error, null = nada
      },
      ...
    ],
    ...
  ],
  selected: {
    rowIdx: number || null,
    colIdx: number || null,
  },
  numbersLeft: { // how many of each number 1-9 are left to be input in the grid
    1: 9,
    2: 9,
    ...
  },
  options: {
    easyMode: bool, // true - highlight row, column and box
  },
}
*/

const initGridState = () => {
  const grids = buildGrid();
  const numbersRemaining = {
    1: 9,
    2: 9,
    3: 9,
    4: 9,
    5: 9,
    6: 9,
    7: 9,
    8: 9,
    9: 9,
  };

  // turn unsolved grid numbers into objects with the required extra data
  const grid = grids.grid.map(row => (
    row.map(n => {
      if (n !== 0) {
        numbersRemaining[n]--;
      }
      return {
        value: n,
        immutable: n !== 0,
        solved: null,
      };
    })
  ));

  const initState = {
    solvedGrid: grids.solvedGrid,
    grid,
    selected: {
      rowIdx: null,
      colIdx: null,
    },
    numbersRemaining,
    options: {
      easyMode: true,
    },
  };

  return initState;
};

const gridReducer = (state, { type, payload }) => {
  switch (type) {
    case 'update': {
      const { value } = payload;
      const { rowIdx, colIdx } = state.selected;
      // do not update if immutable
      if (state.grid[rowIdx][colIdx].immutable) {
        return state;
      }

      const grid = _.cloneDeep(state.grid);
      grid[rowIdx][colIdx].value = value;
      grid[rowIdx][colIdx].solved = value === state.solvedGrid[rowIdx][colIdx];
      
      return {
        ...state,
        grid,
        numbersRemaining: {
          ...state.numbersRemaining,
          [value]: state.numbersRemaining[value] - 1
        }
      };
    }

    case 'clear': {
      const { rowIdx, colIdx } = state.selected;
      // do not update if immutable
      if (state.grid[rowIdx][colIdx].immutable) {
        return state;
      }

      const grid = _.cloneDeep(state.grid);
      const curValue = grid[rowIdx][colIdx].value;
      grid[rowIdx][colIdx].value = 0;
      grid[rowIdx][colIdx].solved = null;
      
      return {
        ...state,
        grid,
        numbersRemaining: {
          ...state.numbersRemaining,
          [curValue]: state.numbersRemaining[curValue] + 1
        }
      };
    }
    
    case 'select': {
      const { rowIdx, colIdx } = payload;
      return {
        ...state,
        selected: {
          rowIdx,
          colIdx,
        },
      };
    }

    case 'easy-mode':
      return {
        ...state,
        options: {
          ...state.options,
          easyMode: !state.options.easyMode,
        },
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(gridReducer, null, initGridState);
  const { grid, selected, options, numbersRemaining } = state;

  return (
    <Grid
      grid={grid}
      dispatch={dispatch}
      selected={selected}
      options={options}
      numbersRemaining={numbersRemaining}
    />
  );
}

export default App;
