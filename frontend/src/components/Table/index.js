import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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

const Table = () => {
  const { loading, error, data } = useQuery(USERS);
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
      data={data?.users}
      isLoading={loading}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            console.log(newData);
            resolve();
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
