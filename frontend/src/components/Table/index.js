import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data?.users);
  }, [data]);
  // TODO добавить мутации и не забыть разделить handler, а то каша

  return (
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
                console.log(err);
                reject();
              });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(newData);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};

export default Table;
