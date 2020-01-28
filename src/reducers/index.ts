const initialStore: any = [];

const rootReducer = (state = initialStore, action: any) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        token: action.payload.access_token,
        ...state,
      };
    case 'LOGOUT':
      return {
        token: action.payload,
        ...state,
      }
    default:
      return state;
  }
};

export default rootReducer;
