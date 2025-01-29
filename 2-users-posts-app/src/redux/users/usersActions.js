import axiosInstance from '../../config/api/axiosInstance';

export const setFetchUsersRequest = () => async (dispatch) => {
  dispatch({
    type: 'FETCH_USERS_REQUEST',
  });

  try {
    const { data } = await axiosInstance.get('/users');

    dispatch({
      type: 'FETCH_USERS_SUCCESS',
      payload: {
        users: data.users,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      },
    });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};
