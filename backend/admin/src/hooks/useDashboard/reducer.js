/* eslint-disable no-param-reassign */
import produce from "immer";

export const initialState = {
  files: [],
  isLoading: true,
};

// eslint-disable-next-line consistent-return
const reducer = (state, action) => produce(state, draftState => {
  switch (action.type) {
    case "LOADING": {
      draftState = initialState;
      break;
    }
    case "GET_DATA_SUCCEEDED": {
      draftState.files = action.files;
      draftState.isLoading = false;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState = {
        ...initialState,
        isLoading: false,
      };
      break;
    }
    default:
      return draftState;
  }
});

export default reducer;
