import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppComponent from '../../components/shared/AppComponent';
import { ApplicationState } from '../../store';
import * as LoginStore from '../../store/LoginStore';
import { IUserInfoModel } from '../../models/IUserInfoModel';

import { _getDefaultPersona, _getUserPersona } from '../shared/AppPersona';
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
import {
  IContextualMenuItem,
  ContextualMenuItemType,
  DirectionalHint,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IJobOwner, IJobAccount } from '../../models/IJobModel';
import { mergeStyleSets, ITheme } from '@uifabric/styling';
import { copySync } from 'fs-extra';
import { userInfo } from 'os';
import { IGroup } from 'office-ui-fabric-react';

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
          '& .ms-ContextualMenu-Callout': {
            border: '1px solid red',
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
      personaCoin: {
        backgroundColor: props.theme.palette.themePrimary,
        borderRadius: '50%',
      },
      menuPersona: {
        padding: 5,
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

  private _initials(string: string) {
    const spl = string.split(' ');
    let retVal = spl[0].charAt(0);
    if (spl[1]) {
      retVal += spl[1].charAt(0);
    }
    return retVal;
  }

  render() {
    var accountList = null;
    const { userInfo } = this.props;
    const user = userInfo ? userInfo.name : '–';
    const _renderIcon = (): JSX.Element => {
      const name =
        userInfo && userInfo.name ? this._initials(userInfo.name) : '–';
      return <div className={'profileCoin'}>{name}</div>;
    };

    const _renderPersona = (): JSX.Element => {
      return (
        <div className={this.classNames.menuPersona}>
          {_getUserPersona(userInfo)}
        </div>
      );
    };

    const _renderAccounts = () => {
      const { userInfo } = this.props;
      const accounts = userInfo ? userInfo.accounts : [];
      const selectedAccount = userInfo ? userInfo.account : '-';
      console.log('userInfo', userInfo || '–');
      const retArr = [];
      if (accounts && accounts.length) {
        for (let i = 0; i < accounts.length; i++) {
          const x = accounts[i];
          retArr.push({
            key: i,
            text: x.name,
            canCheck: true,
            isChecked: x.guid === selectedAccount,
            onClick: () => console.log('account clicked', x),
          });
        }
      }
      return retArr;
    };

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
          <DefaultButton
            onRenderMenuIcon={_renderIcon}
            styles={{
              root: {
                margin: 10,
                height: 40,
                width: 40,
                minWidth: 'auto',
                borderRadius: '50%',
                backgroundColor: this.props.theme.palette.themePrimary,
                color: this.props.theme.palette.white,
              },
            }}
            menuProps={{
              shouldFocusOnMount: true,
              items: [
                {
                  key: 'persona',
                  onRender: _renderPersona,
                  styles: { root: { padding: 5 } },
                },
                {
                  key: 'divider_1',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'A',
                  text: 'My Profile',
                  iconProps: {
                    iconName: 'EditProfile',
                  },
                },
                {
                  key: 'B',
                  text: 'Accounts',
                  iconProps: {
                    iconName: 'AccountManagement',
                  },
                  subMenuProps: {
                    items: _renderAccounts(),
                  },
                },
                {
                  key: 'C',
                  text: 'Security',
                  iconProps: { iconName: 'Security' },
                },
                {
                  key: 'D',
                  text: 'Notifications',
                  iconProps: { iconName: 'Notifications' },
                },
                {
                  key: 'E',
                  text: 'Theme',
                  iconProps: { iconName: 'Theme' },
                  subMenuProps: {
                    items: [
                      {
                        key: 'sub-a',
                        text: 'blue',
                        canCheck: true,
                        isChecked: true,
                        onClick: () => console.log('blue'),
                      },
                    ],
                  },
                },
                {
                  key: 'divider_2',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'F',
                  text: 'Log Out',
                  iconProps: {
                    iconName: 'FollowUser',
                  },
                },
              ],
            }}
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
