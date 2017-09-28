import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import './elemental.css';

import App from './app';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3300/api'
});

const client = new ApolloClient({ networkInterface });

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
);
