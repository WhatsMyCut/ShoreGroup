import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppComponent from '../../components/shared/AppComponent';
import { ApplicationState } from '../../store';
import * as LoginStore from '../../store/LoginStore';
import { IUserInfoModel } from '../../models/IUserInfoModel';

import { _getOwnerPersona, _getDefaultPersona } from '../shared/AppPersona';
import { NavLink, Redirect } from 'react-router-dom';
import Globals from '../../Globals';
import AccountService from '../../api/AccountService';
import bind from 'bind-decorator';

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownProps,
} from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IJobOwner } from '../../models/IJobModel';
import { mergeStyleSets, ITheme } from '@uifabric/styling';

interface IProps {
  userInfo?: IUserInfoModel;
  theme?: any;
}

interface IState {
  logoutAction: boolean;
  userInfo?: IUserInfoModel;
}
class TopMenu extends AppComponent<IProps, IState> {
  classNames: any;
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
    this.classNames = mergeStyleSets({
      topmenuContainer: {
        width: '100%',
        backgroundColor: props.theme.palette.themeLighterAlt,
      },
      navbarHeader: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '100%',
        width: '100%',
        height: 60,
        selectors: {
          '& .ms-Dropdown-container': {
            marginVertical: 'auto',
            float: 'right',
            paddingRight: 25,
            paddingTop: 10,
            paddingBottom: 10,
          },
          '& .ms-Dropdown-title': {
            border: '1px solid' + props.theme.palette.themeSecondary,
            height: 50,
          },
        },
      },
      navbarBrandContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        padding: 20,
        fontSize: 18,
        selectors: {
          '& a': {
            color: props.theme.palette.themeSecondary + ' !important',
          },
        },
      },
    });
  }

  @bind
  async onClickSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    AccountService.logout();
    this.setState({ logoutAction: true });
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }

  @bind
  async onClickUserInfo(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    // AuthorizationService.userinfo().then(value => {
    //   this.setState({ userInfo: value });
    //   console.log(value);
    // });
  }

  private elDropdown: HTMLAnchorElement;
  private elCollapseButton: HTMLButtonElement;

  componentDidMount() {
    const { userInfo } = this.props;
    // var dropdown = new Dropdown(this.elDropdown);
    // var collapse = new Collapse(this.elCollapseButton);
  }

  componentDidUpdate() {}

  render() {
    var accountList = null;
    const { userInfo } = this.props;
    const user = userInfo ? userInfo.name : '–';
    if (this.state.userInfo && this.state.userInfo.accounts) {
      accountList = this.state.userInfo.accounts.map(function(account) {
        return (
          <li>
            <a href="{account.guid}">{account.name}</a>
          </li>
        );
      });
    }

    if (this.state.logoutAction) {
      return <Redirect to="/login" />;
    }
    return (
      <div className={this.classNames.topmenuContainer}>
        <div className={this.classNames.navbarHeader}>
          <div className={this.classNames.navbarBrandContainer}>
            <a className={this.classNames.navbarBrand} href="/">
              CompliChain
            </a>
          </div>
          <Dropdown
            placeholder="Select an option"
            onRenderPlaceholder={this._onRenderPlaceholder}
            onRenderTitle={this._onRenderTitle}
            onRenderOption={this._onRenderOption}
            styles={{ root: { marginTop: 5 }, dropdown: { width: 220 } }}
            options={[
              { key: 'A', text: 'My Profile', data: { icon: 'EditProfile' } },
              { key: 'B', text: 'Security', data: { icon: 'Security' } },
              {
                key: 'C',
                text: 'Notifications',
                data: { icon: 'Notifications' },
              },
              { key: 'D', text: 'Theme', data: { icon: 'Theme' } },
              {
                key: 'divider_2',
                text: '-',
                itemType: DropdownMenuItemType.Divider,
              },
              { key: 'F', text: 'Log Out', data: { icon: 'FollowUser' } },
            ]}
          />
        </div>
      </div>
    );
  }
  private _onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: '8px' }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];
    const persona = _getDefaultPersona();

    return <div className="Placeholder">{persona}</div>;
  };

  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    const { userInfo } = this.props;

    const persona = _getDefaultPersona();

    return <div className="Placeholder">{persona}</div>;
  };
}

var component = connect(
  (state: ApplicationState) => state.login,
  LoginStore.actionCreators,
)(TopMenu as any);

export default (withRouter(component as any) as any) as typeof TopMenu;
