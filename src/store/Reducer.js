// Reducer function wijzigt de global state
const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.payload,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
