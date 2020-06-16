import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

const USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

const Table = () => {
  const { loading, error, data } = useQuery(USERS);
  const [addUser] = useMutation(ADD_USER, {
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery({ query: USERS });
      cache.writeQuery({
        query: USERS,
        data: { users: users.concat([createUser]) },
      });
    },
  });

  const [removeUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: USERS });
      cache.writeQuery({
        query: USERS,
        data: { users: users.filter(user => user.id !== deleteUser.id) },
      });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data?.users);
  }, [data]);
  // TODO добавить мутации и не забыть разделить handler, а то каша

  const [alert, setAlert] = React.useState({
    open: false,
    message: 'Ошибка валидации, повторите запрос',
  });

  const handleClose = () => {
    setAlert({
      open: false,
    });
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        TransitionComponent={Fade}
        message={alert.message}
      />
      <MaterialTable
        title="Список пользователей"
        columns={[
          {
            title: 'Имя',
            field: 'name',
          },
          {
            title: 'Email',
            field: 'email',
          },
        ]}
        data={users}
        isLoading={loading}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              addUser({
                variables: {
                  input: {
                    ...newData,
                  },
                },
              })
                .then(() => {
                  resolve();
                })
                .catch(err => {
                  // inside error we can check message, but validation not return from server
                  // console.log(err);
                  setAlert({
                    open: true,
                    message: 'Ошибка валидации, повторите запрос',
                  });
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const { name, email } = newData;
              updateUser({
                variables: {
                  id: oldData.id,
                  input: {
                    name,
                    email,
                  },
                },
              })
                .then(() => {
                  resolve();
                })
                .catch(err => {
                  // inside error we can check message, but validation not return from server
                  // console.log(err);
                  setAlert({
                    open: true,
                    message: 'Ошибка валидации, повторите запрос',
                  });
                  reject();
                });
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              removeUser({
                variables: {
                  id: oldData.id,
                },
              })
                .then(() => {
                  resolve();
                })
                .catch(err => {
                  // inside error we can check message, but validation not return from server
                  // console.log(err);
                  setAlert({
                    open: true,
                    message: 'Ошибка валидации, повторите запрос',
                  });
                  reject();
                });
            }),
        }}
      />
    </>
  );
};

export default Table;
