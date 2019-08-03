
const initialState = {
  easyMode: false,
};


// actions
const TOGGLE_EASY_MODE = 'sudoku/options/easy-mode';


// reducers
export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_EASY_MODE:
      return {
        ...state,
        easyMode: !state.easyMode,
      };

    default:
      return state;
  }
}


// action creators
export const toggleEasyMode = () => ({ type: TOGGLE_EASY_MODE });
