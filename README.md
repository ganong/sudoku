# Sudoku

## Running Locally

### Install Dependencies

`yarn`

### Run Locally

`yarn start`

## To Do

- add redux, react-redux - move state to redux
- Add complete game message with button to restart - use react-navigation
- Add Home screen with Start Game button
- Add Home button to game page (if you go home from game, abandon game for now)
- add redux-persist, redux-async-storage
- Learn how to Publish/Package to install on IOS and Android
- Add difficulties - Easy, Normal, Hard
- Add game timer
- Add a way to pause game timer (remove the board so player can't pause to figure out his/her next move)
- Save state to device
- Save game statistics
- Add statistics page with a way to get to it from the home screen
- If you go home from game page, ask if the user wants to save the game to continue later or to abandon it.
  - If there is a saved game, add Continue button to home page
- Add celebration animation on game complete
- Add animation when a row, column, or box is completed
- Add a way to take notes - place numbers that a square could be into that square
  - These notes should update if a number is placed in a row/column/box that makes this square invalid to be that number
- Add a way to do hints - track how many hints are used per game in statistics
- Update easy mode to be options to show grid highlights:
  - show highlights for all matching numbers
  - show highlights only for selected number
  - show no highlights
- Add a configurable amount of errors, after which, the game is lost (default to 5)