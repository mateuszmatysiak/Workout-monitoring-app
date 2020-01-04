const initialStore = [{}];

const rootReducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
