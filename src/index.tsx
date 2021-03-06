import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState } from './store';
import * as RoutesModule from './routes';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Globals from './Globals';
import { IPublicSession } from './models/IPublicSession';
import { IPrivateSession } from './models/IPrivateSession';
import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig';

Globals.reset();
Globals.init({
  public: window['publicSession'] as IPublicSession,
  private: {} as IPrivateSession,
});

document.addEventListener('DOMContentLoaded', () => {
  var preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
});

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing configuration
  // and injects the app into a DOM element.
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} children={RoutesModule.routes} />
    </Provider>,
    document.getElementById('root'),
  );
}

const DO_NOT_LOGIN = false;

runWithAdal(
  authContext,
  () => {
    renderApp();
  },
  DO_NOT_LOGIN,
);
