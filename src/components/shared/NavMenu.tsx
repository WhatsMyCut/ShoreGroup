import React, { Component, MouseEvent } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import AccountService from '../../api/AccountService';
import bind from 'bind-decorator';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from '@uifabric/styling';
import { Z_FIXED } from 'zlib';

const noOp = () => undefined;

interface IState {
  isAuthorized: boolean;
  isExpanded: boolean;
}

class NavMenu extends Component<any, IState> {
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

  toggleExpanded() {
    console.log('toggleExpanded');
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    if (!this.state.isAuthorized) {
      return <Redirect to="/login" />;
    }
    const ILogoStyles = { color: '#000', height: 30, width: 30 };
    const expandIcon = this.state.isExpanded
      ? 'DoubleChevronLeft'
      : 'DoubleChevronRight';
    let ISidebarClassName = 'sidebar';
    ISidebarClassName += this.state.isExpanded ? 'expanded' : '';
    return (
      <div className={ISidebarClassName}>
        <IconButton
          type={'command'}
          href="/"
          iconProps={{ iconName: 'Logo', style: ILogoStyles }}
          style={{ height: 60 }}
          ariaLabel="Sephire. Use left and right arrow keys to navigate"
        />
        <IconButton
          href="/jobs/add"
          iconProps={{ iconName: 'AddTo' }}
          ariaLabel="Add New Job"
        />
        <IconButton
          href="/jobs"
          iconProps={{ iconName: 'BusinessCenterLogo' }}
          ariaLabel="Job List"
        />
        <IconButton
          href="/orders"
          iconProps={{ iconName: 'Product' }}
          ariaLabel="Job List"
        />
        <IconButton
          href="/tasks"
          iconProps={{ iconName: 'ClipboardList' }}
          ariaLabel="Task List"
        />
        <IconButton
          iconProps={{ iconName: 'PlayerSettings' }}
          ariaLabel="My Actions"
        />
        <IconButton
          iconProps={{ iconName: expandIcon, style: { fontSize: 14 } }}
          ariaLabel={this.state.isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => this.toggleExpanded}
        />
      </div>
    );
  }
}

export default withRouter(NavMenu as any);
