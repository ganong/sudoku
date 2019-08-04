import _ from 'lodash';
import { createSelector } from 'reselect';


export const getGrid = state => state.grid.grid;
export const getSolvedGrid = state => state.grid.solvedGrid;
export const getSelected = state => state.grid.selected;
export const getNumbersRemaining = state => state.grid.numbersRemaining;
export const getErrors = state => state.grid.errors;

export const getSelectedValue = createSelector(
  getGrid,
  getSelected,
  (grid, selected) => _.get(grid, [selected.rowIdx, selected.colIdx, 'value'])
);

export const getMatchingValueCoords = createSelector(
  getGrid,
  getSelectedValue,
  (grid, value) => {
    const coords = [];

    if (value === 0) return coords;

    grid.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (value !== col.value) return;
        coords.push([rowIdx, colIdx]);
      });
    });

    return coords;
  }
);

export const isGridSolved = createSelector(
  getGrid,
  (grid) => {
    for (rowIdx = 0; rowIdx < 9; rowIdx++) {
      for (colIdx = 0; colIdx < 9; colIdx++) {
        const square = grid[rowIdx][colIdx];
        if (square.immutable === false && square.solved !== true) {
          return false
        }
      }
    }
    return true;
  }
);