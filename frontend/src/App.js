import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ruRU } from '@material-ui/core/locale';
import client from './configureApolloClient';
import Table from './components/Table';

const theme = createMuiTheme({}, ruRU);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Container fixed>
          <Table />
        </Container>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
