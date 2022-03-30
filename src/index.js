import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import AuthProvider from './auth.js';
import client from "./graphql/client"


ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

