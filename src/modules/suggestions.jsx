const GET_SUGGESTION = "suggestions/GET_SUGGESTION";

export const getSuggestions = (result) => ({
  type: GET_SUGGESTION,
  suggestion: result,
});

const initialState = [];

export default function suggestions(state = initialState, action) {
  switch (action.type) {
    case GET_SUGGESTION:
      return action.suggestion;
    default:
      return state;
  }
}
