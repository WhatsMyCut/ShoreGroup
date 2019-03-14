import AuthorizedLayout from './containers/AuthorizedLayout';
import GuestLayout from "./containers/GuestLayout";
import LoginPage from './pages/LoginPage';
import AppRoute from "./components/shared/AppRoute";
import * as React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';

export const routes = <Switch>
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/" component={JobsPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/info" component={HomePage} />
</Switch>;