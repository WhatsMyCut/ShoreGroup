import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink, Redirect } from 'react-router-dom';
import Globals from '../../Globals';
import AccountService from '../../api/AccountService';
import AuthorizationService from '../../api/AuthorizationService';
import { Dropdown, Collapse } from 'bootstrap3-native';
import bind from 'bind-decorator';
import { IUserInfoModel } from '../../models/IUserInfoModel';

class TopMenu extends Component<
  {},
  { logoutAction: boolean; userInfo: IUserInfoModel }
> {
  constructor(props) {
    super(props);
    this.state = { logoutAction: false, userInfo: null };
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
    AuthorizationService.userinfo().then(value => {
      this.setState({ userInfo: value });
      console.log(value);
    });
  }

  private elDropdown: HTMLAnchorElement;
  private elCollapseButton: HTMLButtonElement;

  componentDidMount() {
    var dropdown = new Dropdown(this.elDropdown);
    var collapse = new Collapse(this.elCollapseButton);
  }

  componentDidUpdate() {}

  render() {
    var accountList = null;
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
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              ref={x => (this.elCollapseButton = x)}
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/">
              CompliChain
            </a>
          </div>
          <div
            id="navbar"
            className="navbar-collapse collapse nav navbar-nav navbar-right"
          >
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a
                  href="#"
                  ref={x => (this.elDropdown = x)}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* {Globals.serviceUser.login}&nbsp; */}
                  <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#" onClick={this.onClickSignOut}>
                      Sign out
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.onClickUserInfo}>
                      User Info
                    </a>
                  </li>
                  {accountList}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopMenu as any);
