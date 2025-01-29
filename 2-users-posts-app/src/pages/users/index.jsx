/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setFetchUsersRequest } from '../../redux/users/usersActions';

const UsersPage = ({ loading, users, error, setFetchUsersRequest }) => {
  useEffect(() => {
    setFetchUsersRequest();
  }, [setFetchUsersRequest]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Users List</h1>

      {users.map((users) => (
        <div key={users.id}>
          <p>{users.name}</p>
          <p>{users.email}</p>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.users.loading,
  users: state.users.users,
  error: state.users.error,
});

const mapDispatchToProps = (dispatch) => ({
  setFetchUsersRequest: () => dispatch(setFetchUsersRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
