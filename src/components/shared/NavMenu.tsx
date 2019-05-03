import React, { Component, MouseEvent } from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import AccountService from '../../api/AccountService';
import bind from 'bind-decorator';
import { Z_FIXED } from 'zlib';
import { NavLink } from 'react-router-dom';
import { getTheme, mergeStyleSets, ITheme } from '@uifabric/styling';

const noOp = () => undefined;

interface IState {
  isAuthorized: boolean;
  isExpanded: boolean;
}

const State: IState = {
  isAuthorized: true,
  isExpanded: false,
};

interface IProps {
  theme: any;
}
class NavMenu extends Component<IProps, IState> {
  private classNames: any;
  state: IState;
  theme: ITheme;
  constructor(props: IProps) {
    super(props);
    this.theme = props.theme;
    this.classNames = mergeStyleSets({
      sidebar: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 60,
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: '1px solid #ccc',
        backgroundColor: this.theme.palette.themePrimary,
        bottom: -10,
        height: window.innerHeight,
        maxWidth: 50,
        minWidth: 50,
      },
      jobDetailList: {
        width: '100%',
        fontSize: 'medium',
      },
      sidebarLink: {
        display: 'flex',
        width: '100%',
        color: this.theme.palette.white,
        paddingVertical: 30,
        paddingHorizontal: 0,
        fontSize: 22,
      },
      logoStyles: {
        color: this.theme.palette.white,
        height: 30,
        width: 30,
      },
    });
    this.state = State;
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
      return <NavLink to="/login" />;
    }
    const expandIcon = this.state.isExpanded
      ? 'DoubleChevronLeft'
      : 'DoubleChevronRight';
    let sidebarClassName = this.classNames.sidebar;
    sidebarClassName += this.state.isExpanded ? ' expanded' : '';
    let sidebarLinkClassName = this.classNames.sidebarLink;
    return (
      <div className={sidebarClassName}>
        <IconButton
          type={'command'}
          className={sidebarLinkClassName}
          href="/"
          iconProps={{
            iconName: 'Logo',
            className: this.classNames.logoStyles,
          }}
          style={{ height: 60 }}
          ariaLabel="Sephire. Use left and right arrow keys to navigate"
        />
        <IconButton
          href="/jobs/add"
          iconProps={{
            iconName: 'AddTo',
            className: this.classNames.sidebarLink,
          }}
          ariaLabel="Add New Job"
        />
        <IconButton
          href="/jobs"
          iconProps={{
            iconName: 'BusinessCenterLogo',
            className: this.classNames.sidebarLink,
          }}
          ariaLabel="Job List"
        />
        {/* <IconButton
          href="/orders"
          iconProps={{ iconName: 'Product', className: this.classNames.sidebarLink }}
          ariaLabel="Job List"
        />
        <IconButton
          href="/tasks"
          iconProps={{ iconName: 'ClipboardList', className: this.classNames.sidebarLink }}
          ariaLabel="Task List"
        /> */}
        <IconButton
          iconProps={{
            iconName: 'PlayerSettings',
            className: this.classNames.sidebarLink,
            style: { marginTop: 50 },
          }}
          ariaLabel="Admin"
        />
        <IconButton
          iconProps={{
            iconName: expandIcon,
            className: this.classNames.sidebarLink,
            style: { fontSize: 14, alignSelf: 'flex-end' },
          }}
          ariaLabel={this.state.isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => this.toggleExpanded}
        />
      </div>
    );
  }
}

export default NavMenu;
