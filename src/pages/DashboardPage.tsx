/**
 * Job Detail Page
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppComponent from '../components/shared/AppComponent';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/LoginStore';
import { IUserInfoModel } from '../models/IUserInfoModel';

//type Props = RouteComponentProps<{}>;

interface IState {
  userInfo?: IUserInfoModel;
}
interface IProps {
  userInfo?: IUserInfoModel;
}
class DashboardPage extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }
  render() {
    console.log('DashboardPage', this.state, this.props);
    const { userInfo } = this.props;
    const user = userInfo ? userInfo.guid : '–';
    return (
      <div>
        <h1>Dashboard Page</h1>
        {user}
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.login,
  LoginStore.actionCreators,
)(DashboardPage as any);

export default (withRouter(component as any) as any) as typeof DashboardPage;
