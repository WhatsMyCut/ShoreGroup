import React, { ComponentClass } from 'react';
import AuthorizedLayout from './containers/AuthorizedLayout';
import GuestLayout from './containers/GuestLayout';
import AtlasLayout from './containers/AtlasLayout';
import LoginPage from './pages/LoginPage';
import { AppRoute } from './components/shared/AppRoute';
import { Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';

export const routes = (
  <Switch>
    <AppRoute
      layout={GuestLayout}
      exact
      path="/login"
      component={LoginPage as ComponentClass<any, any>}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/"
      component={JobsPage as ComponentClass<any, any>}
    />
    <AppRoute layout={AtlasLayout} exact path="/info" component={HomePage} />
  </Switch>
);
