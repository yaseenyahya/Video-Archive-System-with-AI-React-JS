import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client/link/core';
import LocalStorage from './auth/LocalStorage';
import store from './store';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  setAuthUserUsername,
  setAuthUserPassword,
  setAuthUserId,
  setAuthUserDesignationName,
  setAuthUserDesignationId,
  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  setAuthUserSettingsJson,
  resetAuthUser,
} from './store/actions/AuthUserActions';
import { setSubscriptionConnected,setConfigData } from './store/actions/OtherActions';
import { createRoot } from 'react-dom/client';

// Function to render the React app
const render = (apolloClient) => {
  const root = createRoot(document.getElementById('root'));
  root.render(

      <SnackbarProvider maxSnack={3}>
        <App apolloClient={apolloClient} reduxStore={store} />
      </SnackbarProvider>
  
  );
};


fetch('/config/config.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((configData) => {
    const env = process.env.NODE_ENV;
    const config = configData[env];

    store.dispatch(setConfigData(config));
    // Create a WebSocketLink for subscriptions
    const wsLink = new WebSocketLink({
      uri: `${config.graphql_subscription_domain}${config.port !== '' ? ':' + config.port : ''}/${config.graphql_subscription_endpoint}`,
      options: {
        timeout: 600000,
        minTimeout: 600000,
        reconnect: true, // Enable automatic reconnection
        timeout: 30000, // Reconnect timeout in milliseconds
      },
    });

    // Split the link based on query type
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      new HttpLink({
        uri: `${config.graphql_domain}${config.port !== '' ? ':' + config.port : ''}/${config.graphql_endpoint}`,
      })
    );

    // Create an Apollo Client
    const apolloClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });

    // Set up WebSocket event handlers
    wsLink.subscriptionClient.onConnected(() => {
      store.dispatch(setSubscriptionConnected(true));
      console.log('WebSocket connected');
    });

    wsLink.subscriptionClient.onReconnected(() => {
      setTimeout(() => {
        store.dispatch(setSubscriptionConnected(true));
      }, 2000);
      console.log('WebSocket reconnected');
    });

    wsLink.subscriptionClient.onDisconnected(() => {
      store.dispatch(setSubscriptionConnected(false));
      console.log('WebSocket disconnected');
    });

    // Check if a username and password are stored in local storage
    const username = LocalStorage.getUsername();
    const password = LocalStorage.getPassword();

    if (username !== null && password !== null) {
      // Attempt to log in with stored credentials
      apolloClient
        .mutate({
          mutation: gql`
            mutation Login($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                id
                name
                avatar
                email
                country_code
                contact_no
                status
                role
                username
                password
                password
                designation {
                  id
                  name
                }
                settings_json
              }
            }
          `,
          variables: {
            username: username,
            password: password,
          },
        })
        .then((result) => {
          // Handle successful login
          const loginData = result.data.login;
          store.dispatch(setAuthUserUsername(loginData.username));
          store.dispatch(setAuthUserId(loginData.id));
          store.dispatch(setAuthUserDesignationName(loginData.designation.name));
          store.dispatch(setAuthUserDesignationId(loginData.designation.id));
          store.dispatch(setAuthUserRole(loginData.role));
          store.dispatch(setAuthUserName(loginData.name));
          store.dispatch(setAuthUserAvatar(loginData.avatar));
      
          store.dispatch(setAuthUserSettingsJson(loginData.settings_json));
          render(apolloClient);
        })
        .catch((error) => {
          // Handle login error
          console.error('Login error:', error);
          store.dispatch(resetAuthUser());
          render(apolloClient);
        });
    } else {
      // No stored credentials, render the app
      render(apolloClient);
    }
  });

// Measure performance in your app (optional)
reportWebVitals();
