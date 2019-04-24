import React, { ComponentClass } from 'react';
import AuthorizedLayout from './containers/AuthorizedLayout';
import GuestLayout from './containers/GuestLayout';
import AtlasLayout from './containers/AtlasLayout';
import LoginPage from './pages/LoginPage';
import { AppRoute } from './components/shared/AppRoute';
import { Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

export const routes = (
  <Fabric>
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
        component={DashboardPage as ComponentClass<any, any>}
      />
      <AppRoute
        layout={AuthorizedLayout}
        exact
        path="/jobs"
        component={JobsPage as ComponentClass<any, any>}
      />
      <AppRoute
        layout={AuthorizedLayout}
        exact
        path="/jobs/:jobId"
        component={JobDetailPage as ComponentClass<any, any>}
      />
      <AppRoute
        layout={AuthorizedLayout}
        exact
        path=""
        component={JobDetailPage as ComponentClass<any, any>}
      />
      <AppRoute layout={AtlasLayout} exact path="/info" component={HomePage} />
    </Switch>
  </Fabric>
);
