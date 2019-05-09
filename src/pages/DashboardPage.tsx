/**
 * Job Detail Page
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppComponent from '../components/shared/AppComponent';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/LoginStore';
import { IUserInfoModel } from '../models/IUserInfoModel';
import {
  _getUserPersona,
  _getAccountPersona,
} from '../components/shared/AppPersona';
import { mergeStyleSets, getTheme } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

interface IProps {
  userInfo?: IUserInfoModel;
}

interface IState {
  userInfo?: IUserInfoModel;
}
class DashboardPage extends AppComponent<IProps, IState> {
  classNames: any;
  protected theme: any;
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }
  componentWillMount() {
    const theme = getTheme();
    this.classNames = mergeStyleSets({
      dashboardContainer: {
        display: 'flex',
        flexGrow: 1,
        flexStart: 1,
        flexBasis: '100%',
        flexDirection: 'column',
        selectors: {
          '& h1': {
            marginBottom: 20,
          },
        },
      },

      dashboardContent: {
        display: 'flex',
        flexDirection: 'row',
      },

      userInfoPanel: {
        flex: '1 1 70%',
        border: '1px solid' + theme.palette.themePrimary,
        borderRadius: 10,
        backgroundColor: theme.palette.white,
        color: theme.palette.black,
        minHeight: 100,
        width: 300,
        marginRight: 25,
      },

      userInfoPanelContent: {
        display: 'flex',
        flex: '1 1 100%',
        padding: 20,
      },

      userInfoPanelHeader: {
        backgroundColor: theme.palette.themeTertiary,
        fontWeight: 'bold',
        color: theme.palette.black,
        padding: 10,
      },

      userTaskPanel: {
        flex: '1 1 30%',
        border: '1px solid' + theme.palette.themePrimary,
        borderRadius: 10,
      },

      userCompanyInfo: {
        flex: '1 1 70%',
        borderRight: '1px solid' + theme.palette.themeLight,
      },

      userPersona: {
        flex: '1 1 30%',
        paddingLeft: 25,
      },

      sidePanel: {
        display: 'flex',
        flex: '1 1 100%',
        selectors: {
          '& ul': {
            listStyleType: 'none',
            paddingLeft: 0,
          },
          '& li': {
            display: 'flex',
            flex: '1 1 100%',
            flexDirection: 'row',
            width: '100%',
            verticalAlign: 'middle',
          },
          '& li *:last-child': {
            paddingTop: 5,
          },
          '& li i': {
            marginRight: 15,
          },
        },
      },
    });
  }

  private _getSidePanel = (): JSX.Element => {
    return (
      <div className={this.classNames.sidePanel}>
        <ul>
          <li>
            <Icon iconName={'PDF'} style={{ fontSize: 22 }} />
            <span>New User Guide</span>
          </li>
          <li>
            <Icon iconName={'PDF'} style={{ fontSize: 22 }} />
            <span>Release Notes (v0.1beta)</span>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { userInfo } = this.props;
    const user = userInfo ? userInfo.guid : '–';
    const persona = userInfo ? _getUserPersona(userInfo) : '–';
    const account = userInfo
      ? userInfo.accounts.filter(x => x.guid === userInfo.account)
      : [];
    //const company = userInfo && userInfo.account ? _getAccountPersona(account) : '–'
    return (
      <div className={this.classNames.dashboardContainer}>
        <h1>Welcome to Sepire!</h1>
        <div className={this.classNames.dashboardContent}>
          <div className={this.classNames.userInfoPanel}>
            <div className={this.classNames.userInfoPanelHeader}>
              Your Complichain
            </div>
            <div className={this.classNames.userInfoPanelContent}>
              <div className={this.classNames.userCompanyInfo}>company</div>
              <div className={this.classNames.userPersona}>{persona}</div>
            </div>
          </div>
          <div className={this.classNames.userTaskPanel}>
            <div className={this.classNames.userInfoPanelHeader}>
              Getting Started
            </div>
            <div className={this.classNames.userInfoPanelContent}>
              {this._getSidePanel()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.login,
  LoginStore.actionCreators,
)(DashboardPage as any);

export default (withRouter(component as any) as any) as typeof DashboardPage;
