import _ from 'lodash';
// const { performance } = require('perf_hooks');

// easy = 38
// medium = 30
// hard = 25
// expert = 23

function getEmptyGrid() {
  return _.range(9).map(f => _.fill(Array(9), 0));
}

function createGrid() {
  const grid = getEmptyGrid();

  _gridRecursive(grid);

  return grid;

  function _gridRecursive(grid) {
    let i, j;

    iloop:
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        // skip this number if it's already filled in
        if (grid[i][j] != 0) {
          continue;
        }

        const numbers = _.shuffle(_.range(1, 10));

        for (let n = 0; n < numbers.length; n++) {
          const num = numbers[n];
          if (isNumberValid(num, grid, i, j)) {
            grid[i][j] = num;
            if (isGridComplete(grid)) {
              return true;
            }
            if (_gridRecursive(grid)) {
              return true;
            }
          }
        }

        // didn't find any valid number, abort!
        break iloop;
      }
    }
    // if we're here, we aborted our looping above, so we need to set the last number to 0 to backtrack
    grid[i][j] = 0;
  }
}

function isNumberValid(number, grid, i, j) {
  // check if this number is already in the row
  if (grid[i].indexOf(number) > -1) {
    return false;
  }

  // check if this number is already in the column
  const column = grid.map(row => row[j]);
  if (column.indexOf(number) > -1) {
    return false;
  }

  // check if this number is already in the sqaure/box
  const boxI = Math.floor(i/3);
  const boxJ = Math.floor(j/3);
  for (let bi = boxI * 3, finishI = bi + 3; bi < finishI; bi++) {
    for (let bj = boxJ * 3, finishJ = bj + 3; bj < finishJ; bj++) {
      if (grid[bi][bj] == number) {
        return false;
      }
    }
  }

  return true;
}

function isGridComplete(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
}

function isSingleSolutionGrid(grid) {
  let counter = 0;
  const gridClone = _.cloneDeep(grid);

  _solveRecursive(gridClone);

  return counter === 1;

  function _solveRecursive(grid) {
    let i, j;

    iloop:
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        // skip this number if it's already filled in
        if (grid[i][j] != 0) {
          continue;
        }

        const numbers = _.shuffle(_.range(1, 10));

        for (let n = 0; n < numbers.length; n++) {
          const num = numbers[n];
          if (!isNumberValid(num, grid, i, j)) {
            continue;
          }

          grid[i][j] = num;

          if (isGridComplete(grid)) {
            counter++;
            // stop solving as we only care if it has more than two solutions
            if (counter > 1) {
              return true;
            }
            break;
          }

          if (_solveRecursive(grid)) {
            return true;
          }
        }

        // didn't find any valid number or already incremented the counter, abort!
        break iloop;
      }
    }
    // if we're here, we aborted our looping above, so we need to set the last number to 0 to backtrack
    grid[i][j] = 0;
  }
}

function buildGrid() {
  // const startTime = performance.now();

  const solvedGrid = createGrid();
  // console.log(solvedGrid);

  const grid = _.cloneDeep(solvedGrid);

  let numsToRemove = 43;
  let maxAttempts = 50;
  while (numsToRemove > 0 && maxAttempts > 0) {
    let row, col;
    do {
      row = _.random(0, 8);
      col = _.random(0, 8);
    } while (grid[row][col] === 0);

    const tempBackup = grid[row][col];
    grid[row][col] = 0;

    if (!isSingleSolutionGrid(grid)) {
      grid[row][col] = tempBackup;
      maxAttempts--;
      continue;
    }

    numsToRemove--;
  }

  // console.log(grid);
  // console.log('not removed', numsToRemove);
  console.log('Built grid');

  // const endTime = performance.now();
  // console.log(`time: ${endTime - startTime}ms`);

  return {
    // time: endTime - startTime,
    grid,
    solvedGrid,
  }
}

export default buildGrid;
