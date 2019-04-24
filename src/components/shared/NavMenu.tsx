import React, { Component, MouseEvent } from 'react';
import { withRouter } from 'react-router';
import { NavLink, Redirect } from 'react-router-dom';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost,
  DirectionalHint,
} from 'office-ui-fabric-react/lib/Tooltip';
import {
  IOverflowSetItemProps,
  OverflowSet,
} from 'office-ui-fabric-react/lib/OverflowSet';
import Globals from '../../Globals';
import AccountService from '../../api/AccountService';
import { Dropdown, Collapse } from 'bootstrap3-native';
import bind from 'bind-decorator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from '@uifabric/styling';
import { Z_FIXED } from 'zlib';

const noOp = () => undefined;

class NavMenu extends Component<
  {},
  { isAuthorized: boolean; isExpanded: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      isExpanded: false,
    };
  }

  @bind
  async onClickSignOut(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    AccountService.logout();
    this.setState({ isAuthorized: false });
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }

  // private elDropdown: HTMLAnchorElement;
  // private elCollapseButton: HTMLButtonElement;

  componentDidMount() {
    // var dropdown = new Dropdown(this.elDropdown);
    // var collapse = new Collapse(this.elCollapseButton);
  }

  componentDidUpdate() {}

  render() {
    if (!this.state.isAuthorized) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="sidebar">
        <OverflowSet
          vertical
          items={[
            {
              key: 'home',
              icon: 'Logo',
              name: 'Home',
              onClick: noOp,
              iconProps: { style: { color: '#000' } },
            },
            {
              key: 'addJob',
              icon: 'AddTo',
              name: 'Add Job',
              onClick: noOp,
            },
            {
              key: 'jobs',
              icon: 'BusinessCenterLogo',
              name: 'Jobs',
              ariaLabel: 'Jobs. Use left and right arrow keys to navigate',
              onClick: noOp,
            },
            {
              key: 'orders',
              icon: 'Product',
              name: 'Orders',
              onClick: noOp,
            },
            {
              key: 'tasks',
              icon: 'ClipboardList',
              name: 'Tasks',
              onClick: noOp,
            },
            {
              key: 'profile',
              icon: 'PlayerSettings',
              name: 'Profile',
              onClick: noOp,
            },
            {
              key: 'expand-collapse',
              icon: 'DoubleChevronRight',
              name: !this.state.isExpanded ? 'Expand' : 'Collapse',
              onClick: noOp,
              style: { position: 'fixed', bottom: 0 },
            },
          ]}
          overflowItems={[]}
          onRenderOverflowButton={this._onRenderOverflowButton}
          onRenderItem={this._onRenderItem}
        />
      </div>
    );
  }
  private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
    return (
      <TooltipHost
        content={item.name}
        calloutProps={{
          directionalHint: DirectionalHint.rightCenter,
          beakWidth: 12,
        }}
      >
        <CommandBarButton
          styles={{ root: { padding: '10px' } }}
          iconProps={{ iconName: item.icon }}
          onClick={item.onClick}
        />
      </TooltipHost>
    );
  };

  private _onRenderOverflowButton = (
    overflowItems: any[] | undefined,
  ): JSX.Element => {
    return (
      <CommandBarButton
        styles={{ root: { padding: '10px' }, menuIcon: { fontSize: '36px' } }}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
      />
    );
  };
}

export default withRouter(NavMenu as any);
