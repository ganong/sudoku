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
  options: {
    easyMode: bool, // true - highlight row, column and box
  },
}
*/

const initGridState = () => {
  const grids = buildGrid();

  // turn unsolved grid numbers into objects with the required extra data
  const grid = grids.grid.map(row => {
    return row.map(n => ({
      value: n,
      immutable: n !== 0,
      solved: null,
    }));
  });

  const initState = {
    solvedGrid: grids.solvedGrid,
    grid,
    selected: {
      rowIdx: null,
      colIdx: null,
    },
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
      };
    }

    case 'clear': {
      const { rowIdx, colIdx } = state.selected;
      // do not update if immutable
      if (state.grid[rowIdx][colIdx].immutable) {
        return state;
      }

      const grid = _.cloneDeep(state.grid);
      grid[rowIdx][colIdx].value = 0;
      grid[rowIdx][colIdx].solved = null;
      
      return {
        ...state,
        grid,
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
  const { grid, selected, options } = state;

  return (
    <Grid
      grid={grid}
      dispatch={dispatch}
      selected={selected}
      options={options}
    />
  );
}

export default App;
