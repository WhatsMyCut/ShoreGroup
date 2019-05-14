import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppComponent from '../../components/shared/AppComponent';
import { ApplicationState } from '../../store';
import * as LoginStore from '../../store/LoginStore';
import { IUserInfoModel } from '../../models/IUserInfoModel';

import { _getDefaultPersona, _getUserPersona } from '../shared/AppPersona';
import { Redirect } from 'react-router-dom';
import AccountService from '../../api/AccountService';
import bind from 'bind-decorator';
import { themes } from '../../styles/loadThemeByName';

import {
  IDropdownOption,
  IDropdownProps,
} from 'office-ui-fabric-react/lib/Dropdown';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets, ITheme, getTheme, IStyleSet } from '@uifabric/styling';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

interface IProps {
  userInfo?: IUserInfoModel;
  theme?: any;
  onChangeTheme?: any;
}

interface IState {
  logoutAction?: boolean;
  userInfo?: IUserInfoModel;
  theme?: ITheme;
  classNames?: any;
}
class TopMenu extends AppComponent<IProps, IState> {
  classNames: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      theme: props.theme,
      classNames: {},
    };
  }

  _updateClassNames() {
    const { theme } = this.props;
    const classNames = mergeStyleSets({
      topmenuContainer: {
        width: '100%',
        backgroundColor: theme.palette.themeLighterAlt,
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
            border: '1px solid' + theme.palette.themeSecondary,
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
            color: theme.palette.themeSecondary + ' !important',
          },
        },
      },
      personaCoin: {
        backgroundColor: theme.palette.themePrimary,
        borderRadius: '50%',
      },
      menuPersona: {
        padding: 5,
      },
      buttonIcon: {
        margin: 10,
        height: 40,
        width: 40,
        minWidth: 'auto',
        borderRadius: '50%',
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
      },
    });
    return classNames;
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

  componentWillReceiveProps(nextProps) {
    console.log('TopHERE', nextProps);
    //    nextProps.onChangeTheme();
    //    this._updateClassNames();
  }

  private _initials(string: string) {
    const spl = string.split(' ');
    let retVal = spl[0].charAt(0);
    if (spl[1]) {
      retVal += spl[1].charAt(0);
    }
    return retVal;
  }
  _renderPersona = (): JSX.Element => {
    const { userInfo, theme } = this.props;
    return (
      <div className={this.state.classNames.menuPersona}>
        {_getUserPersona(userInfo)}
      </div>
    );
  };

  _onChangeTheme = (theme: string) => {
    const { onChangeTheme } = this.props;
    onChangeTheme(theme);
  };

  _getThemesItems = () => {
    const retArr = [];
    const { theme } = this.props;
    if (themes) {
      const themeNames = Object.keys(themes);
      themeNames.map((x, i) => {
        const c = themes[x];
        const cPrime =
          c && c.palette
            ? c.palette.themePrimary
            : { palette: { themePrimary: '#000' } };
        const tPrime =
          theme && theme.palette
            ? theme.palette.themePrimary
            : { palette: { themePrimary: '#000' } };
        retArr.push({
          key: i,
          text: x,
          canCheck: true,
          isChecked: cPrime === tPrime,
          onClick: () => this._onChangeTheme(x),
        });
      });
    }
    return retArr;
  };

  _renderEmail = (text: string, subject: string): JSX.Element => {
    return (
      <a href={'mailto:support@sepire.com&Subject=' + encodeURI(subject)}>
        {text}
      </a>
    );
  };

  _getAccountItems = () => {
    const { userInfo, theme } = this.props;
    const accounts = userInfo ? userInfo.accounts : [];
    const selectedAccount = userInfo ? userInfo.account : '-';
    console.log('userInfo', userInfo, theme);
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

  _renderIcon = (): JSX.Element => {
    const { userInfo } = this.props;
    const name =
      userInfo && userInfo.name ? this._initials(userInfo.name) : '–';
    return <div className={'profileCoin'}>{name}</div>;
  };

  render() {
    var accountList = null;
    const { userInfo, theme } = this.props;
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
    const bgColor =
      theme && theme.palette ? theme.palette.themePrimary : '#000';

    return (
      <div className={this.state.classNames.topmenuContainer}>
        <div className={this.state.classNames.navbarHeader}>
          <div className={this.state.classNames.navbarBrandContainer}>
            <a className={this.state.classNames.navbarBrand} href="/">
              CompliChain
            </a>
          </div>
          <DefaultButton
            onRenderMenuIcon={this._renderIcon}
            styles={{
              root: {
                margin: 10,
                height: 40,
                width: 40,
                minWidth: 'auto',
                borderRadius: '50%',
                backgroundColor: bgColor,
                color: '#fff',
              },
            }}
            menuProps={{
              shouldFocusOnMount: true,
              items: [
                {
                  key: 'persona',
                  onRender: this._renderPersona,
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
                    items: this._getAccountItems(),
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
                    items: this._getThemesItems(),
                  },
                },
                {
                  key: 'divider_2',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'F',
                  text: 'Support',
                  iconProps: {
                    iconName: 'Support',
                  },
                  subMenuProps: {
                    items: [
                      {
                        key: 1,
                        name: this._renderEmail(
                          'Report a Site Issue',
                          'CompliChain Site Issue',
                        ),
                        iconProps: { iconName: 'Bug' },
                      },
                      {
                        key: 2,
                        name: this._renderEmail(
                          'Report Compliance Issue',
                          'Compliance Issue',
                        ),
                        iconProps: { iconName: 'BlockedSite' },
                      },
                      {
                        key: 3,
                        name: this._renderEmail('Request Help', 'Help'),
                        iconProps: { iconName: 'Help' },
                      },
                    ],
                  },
                },
                {
                  key: 'G',
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
