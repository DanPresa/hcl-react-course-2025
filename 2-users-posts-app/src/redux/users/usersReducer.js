const initialState = {
  loading: false,
  users: [],
  total: 0,
  skip: 0,
  limit: 0,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        total: action.payload.total,
        skip: action.payload.skip,
        limit: action.payload.limit,
      };

    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default usersReducer;
