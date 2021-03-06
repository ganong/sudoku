import _ from 'lodash';
import buildGrid from './utils';

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
  numbersRemaining: { // how many of each number 1-9 are left to be input in the grid
    1: number,
    2: number,
    ...
  },
  errors: number,
}
*/

const initialState = {
  solvedGrid: null,
  grid: null,
  selected: null,
  numbersRemaining: null,
  errors: null,
};

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
    errors: 0,
  };

  return initState;
};


// actions
const SELECT_SQUARE = 'sudoku/grid/select-square';
const CLEAR_SQUARE = 'sudoku/grid/clear-square';
const UPDATE_SQUARE = 'sudoku/grid/update-square';
const CREATE_GRID = 'sudoku/grid/create';
const RESET_GRID = 'sudoku/grid/reset';


// reducers
export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_GRID:
      return initGridState();

    case RESET_GRID:
      return initialState;

    case UPDATE_SQUARE: {
      const { value } = payload;
      const { rowIdx, colIdx } = state.selected;
      // do not update if immutable
      if (state.grid[rowIdx][colIdx].immutable) {
        return state;
      }

      const grid = _.cloneDeep(state.grid);
      const solved = value === state.solvedGrid[rowIdx][colIdx];
      const oldValue = grid[rowIdx][colIdx].value;
      grid[rowIdx][colIdx].value = value;
      grid[rowIdx][colIdx].solved = solved;

      const numbersRemaining = { ...state.numbersRemaining };
      if (oldValue !== value) {
        numbersRemaining[value] = numbersRemaining[value] - 1;
        if (oldValue > 0) {
          numbersRemaining[oldValue] = numbersRemaining[oldValue] + 1;
        }
      }
      
      return {
        ...state,
        grid,
        numbersRemaining, 
        errors: solved ? state.errors : (state.errors + 1)
      };
    }

    case CLEAR_SQUARE: {
      const { rowIdx, colIdx } = state.selected;
      // do not update if immutable
      if (state.grid[rowIdx][colIdx].immutable) {
        return state;
      }

      const grid = _.cloneDeep(state.grid);
      const oldValue = grid[rowIdx][colIdx].value;
      grid[rowIdx][colIdx].value = 0;
      grid[rowIdx][colIdx].solved = null;
      
      return {
        ...state,
        grid,
        numbersRemaining: {
          ...state.numbersRemaining,
          [oldValue]: state.numbersRemaining[oldValue] + 1,
        }
      };
    }
    
    case SELECT_SQUARE: {
      const { rowIdx, colIdx } = payload;
      return {
        ...state,
        selected: {
          rowIdx,
          colIdx,
        },
      };
    }

    default:
      return state;
  }
}

// action creators
export const selectSquare = (rowIdx, colIdx) => ({
  type: SELECT_SQUARE,
  payload: { rowIdx, colIdx },
});

export const clearSquare = () => ({ type: CLEAR_SQUARE });

export const updateSquare = (value) => ({
  type: UPDATE_SQUARE,
  payload: { value },
});

export const createGrid = () => ({ type: CREATE_GRID });
export const resetGrid = () => ({ type: RESET_GRID });
