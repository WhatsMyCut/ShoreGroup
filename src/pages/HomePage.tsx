import React, { Component, Fragment, useEffect } from 'react';
import Avatar from '@atlaskit/avatar';
import Drawer from '@atlaskit/drawer';
import CreateDrawer from '../components/drawers/CreateDrawer';
import SearchDrawer from '../components/drawers/SearchDrawer';
import { Helmet } from 'react-helmet';
import {
  DropdownItem,
  DropdownItemGroup,
  DropdownMenuStateless,
} from '@atlaskit/dropdown-menu';
import CreateIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import HelpIcon from '@atlaskit/icon/glyph/question-circle';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Icon from '@atlaskit/icon';

import {
  GlobalItem,
  GlobalNav,
  ThemeProvider,
  LayoutManager,
  NavigationProvider,
  MenuSection,
  HeaderSection,
  modeGenerator,
  Item,
} from '@atlaskit/navigation-next';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import BoardIcon from '@atlaskit/icon/glyph/board';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import styled from 'styled-components';
import Button, { ButtonGroup } from '@atlaskit/button';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import MobileHeader from '@atlaskit/mobile-header';
import '@atlaskit/css-reset';
import '../styles/atlaskit.scss';

const FakeSideBar = styled.div`
  background-color: white;
  height: 100vh;
  padding-top: 32px;
  text-align: center;
  width: 264px;
`;

const customGlyph = () => (
  <svg viewBox="0 0 78 61">
    <defs>
      <path
        id="dc8qa"
        d="M79.006 74.55c.995-.24 2.229-.882 2.661-1.588.43-.708.525-1.557.285-2.552-.224-.924-.662-1.672-1.407-2.085-1.132-.628-2.987-.393-3.982-.152 0 0-14.803 2.388-20.715 2.388-13.123 0-17.679-6.565-17.679-14.728S42.52 40.22 55.643 40.22l16.652-.016h16.861c1.023 0 1.827-.293 2.414-.877.584-.586.877-1.39.877-2.413 0-.951-.293-1.737-.877-2.357-.587-.623-1.39-.933-2.414-.933h-15.56l-17.748-.113C30.794 33.291 24 43.673 24 55.833c0 12.159 6.798 22.79131.848 22.32 11.217-.21 23.158-3.603 23.158-3.603z"
      />
      <path
        id="dc8qb"
        d="M46.536 52.662c-.995.24-2.229.884-2.661 1.589-.43.707-.527 1.558-.286 2.551.224.925.661 1.674 1.407 2.086 1.133.627 2.988.393 3.983.151 0 0 14.801-2.387 20.714-2.387 13.124 0 17.68 6.564 17.68 14.728 0 8.163-4.351 15.612-17.476 15.612l-16.651.016h-16.86c-1.025 0-1.828.294-2.414.878-.584.585-.877 1.389-.877 2.412 0 .952.293 1.738.877 2.36.586.62 1.39.93 2.414.93h15.56l17.747.113c25.054.22 31.848-10.161 31.848-22.321 0-12.16-6.798-22.792-31.848-22.32-11.216.21-23.157 3.602-23.157 3.602z"
      />
    </defs>
    <g>
      <g transform="translate(-24 -33)">
        <use fill="#fff" href="#dc8qa" />
      </g>
      <g transform="translate(-24 -33)">
        <use fill="#fff" href="#dc8qb" />
      </g>
    </g>
  </svg>
);

class GlobalItemWithDropdown extends Component<{}, {}> {
  state = {
    isOpen: false,
  };
  props: any;
  handleOpenChange = ({ isOpen }) => this.setState({ isOpen });
  render() {
    const { items, trigger: Trigger } = this.props;
    const { isOpen } = this.state;
    return (
      <DropdownMenuStateless
        boundariesElement="window"
        isOpen={isOpen}
        onOpenChange={this.handleOpenChange}
        position="right bottom"
        trigger={<Trigger isOpen={isOpen} />}
      >
        {items}
      </DropdownMenuStateless>
    );
  }
}

const ItemComponent = ({ dropdownItems: DropdownItems, ...itemProps }) => {
  if (DropdownItems) {
    return (
      <GlobalItemWithDropdown
        trigger={({ isOpen }) => (
          <GlobalItem isSelected={isOpen} {...itemProps} />
        )}
        items={<DropdownItems />}
      />
    );
  }
  return <GlobalItem {...itemProps} />;
};

const TestState = () => {
  const [dd, setDd] = React.useState('');
  if (dd === 'ff') {
    setTimeout(() => setDd(''), 1000);
  }
  return <div>{dd}</div>;
};

const ExampleDropdown = () => (
  <DropdownItemGroup title="Heading">
    <DropdownItem onClick={() => console.log('Dropdown item clicked')}>
      Dropdown item with onClick
    </DropdownItem>
    <DropdownItem href="//atlassian.com" target="_new">
      Dropdown item with href
    </DropdownItem>
  </DropdownItemGroup>
);

// eslint-disable-next-line react/no-multi-comp
class GlobalNavWithModalsAndDrawers extends Component {
  state = {
    isModalOpen: false,
    isDrawerOpen: false,
    isCreateOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });
  openDrawer = () => this.setState({ isDrawerOpen: true });
  closeDrawer = () => this.setState({ isDrawerOpen: false });
  openCreate = () => this.setState({ isCreateOpen: true });
  closeCreate = () => this.setState({ isCreateOpen: false });

  render() {
    const { isModalOpen, isDrawerOpen, isCreateOpen } = this.state;

    return (
      <Fragment>
        <ThemeProvider
          theme={theme => ({ ...theme, mode: customMode, context: 'product' })}
        >
          <GlobalNav
            itemComponent={ItemComponent}
            primaryItems={[
              {
                icon: () => (
                  <Icon glyph={customGlyph} label="Custom icon" size="medium" />
                ),
                id: 'logo',
                href: '#/',
                tooltip: 'CompliChain',
                onClick: () => console.log('Logo item clicked'),
              },
              {
                icon: CreateIcon,
                id: 'create',
                tooltip: 'Create New',
                onClick: this.openCreate,
              },
              {
                icon: SearchIcon,
                id: 'search',
                tooltip: 'Search Everything',
                onClick: this.openDrawer,
              },
            ]}
            secondaryItems={[
              {
                dropdownItems: () => (
                  <DropdownItemGroup title="Help">
                    <DropdownItem onClick={this.openModal}>
                      How-to: Creating a Job
                    </DropdownItem>
                    <DropdownItem onClick={this.openDrawer}>
                      Open a drawer
                    </DropdownItem>
                  </DropdownItemGroup>
                ),
                icon: HelpIcon,
                id: 'help',
                tooltip: 'Open dropdown',
              },
              {
                component: ({ className, onClick }) => (
                  <span className={className}>
                    <Avatar
                      borderColor="transparent"
                      isActive={false}
                      isHover={false}
                      src=""
                      size="small"
                      onClick={onClick}
                    />
                  </span>
                ),
                dropdownItems: ExampleDropdown,
                icon: null,
                id: 'profile',
                onClick: () => console.log('Profile item clicked'),
                tooltip: 'Item with an avatar opening a dropdown',
              },
            ]}
          />
        </ThemeProvider>
        <ModalTransition>
          {isModalOpen && (
            <Modal
              actions={[{ text: 'Close', onClick: this.closeModal }]}
              onClose={this.closeModal}
              heading="Modal Title"
            >
              Modal content
            </Modal>
          )}
        </ModalTransition>

        <Drawer onClose={this.closeDrawer} isOpen={isDrawerOpen} width="narrow">
          <SearchDrawer onResultClicked={res => console.log(res)} />
        </Drawer>

        <Drawer onClose={this.closeCreate} isOpen={isCreateOpen} width="narrow">
          <CreateDrawer onItemClicked={res => console.log(res)} />
        </Drawer>
      </Fragment>
    );
  }
}

const ContainerNavigation = () => (
  <div data-webdriver-test-key="container-navigation">
    <HeaderSection>
      {({ css }) => (
        <div
          data-webdriver-test-key="container-header"
          style={{
            ...css,
            padding: 10,
          }}
        >
          <img
            alt="company"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAA8CAMAAAC+Y5Q2AAAAAXNSR0IB2cksfwAAAQJQTFRFAAAA8PDwyMjIl5eXlZWVlpaWlJSUvr6+qqqqk5OTwcHBm5ub3t7e3NzcnZ2doKCg4uLimJiY7u7us7OzqKiosrKy1NTUmZmZpaWl7+/vxsbGsbGx39/fnp6e4eHhtbW1v7+/6Ojo6urqrq6uuLi4w8PDq6urwMDAoaGh2NjYnJyczMzMo6OjpKSk6enpxcXFn5+fzc3N7Ozs6+vrt7e33d3dz8/P5+fnxMTE4ODgurq65ubmqamppqamr6+v1dXV2tra0NDQ29vbrKys1tbW19fXysrKx8fHmpqa7e3tu7u74+Pjy8vLtra2ubm52dnZ5eXloqKira2twsLCvb295OTkk128MQAAAFZ0Uk5TAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////+hc9syAAADZUlEQVR4nO2XaVPbMBCGWbxSEE4ITkIOCAQCoRAgMQkUCjQchTZADyjt//8r1eFrCNMPqDPbGfR+iFeyLL96vF4rU/DGNUVtgFoOALUBajkA1Aao5QBQG6CWA0BtgFoOALUBajkA1Aao5QBQG6CWA0BtgFoOALUBajkA1Aao5QBQG6CWJYBpD5HxHMAMN22UPznOUcwC9yPlAQpzHJEX59WYAEvm4rJfAfDMmAWoyt+aqDfMuWItvsUiQ3npkulvLgt5v+UV3WjJORFX7VZgB6COS2vQXvc2sgA6OAulTa4d847ufodbBYDtLt8BBaBlrhaoAOxGc1UDgPYq3zOtBMAWltvQ6Ajek40+hnKefSZkPECxWoLhgehaLcEKwAEe6uP7QRZAEKYjDIACy5nmAh7J83WhG8eCPQcgpzTnEgBL/IM+NpgHsMJOTK+6bZcPdHwqzmzWYAWAt5IwA2DOz4zQALpB0v4oAVR5X8U4egHAhpknAcCjJcO8dw5FL525GVxEUZ+VLNZgAyBfGyZxBsClN3cVdxsAySrgE1cAKqpSXONgAoB8BaL0iQDcBMni+AyIFDiURRLitMUibADsYxpni2DV80TFGDcA8HM87EQoAD28BvB3gSVFUC5eFUEfw2jBEYAvPLlDsAWoM2csx/XhLL25SPi+Qv8qAzaN07453N4JE7ycARD6cM/m4XkGNNJH/PcMkO/Q/5AB2ZTcMH5asa1e8FUdJmpAXQPIs/u9MUwAkDm1ErXiGoBpDajCclwDJIBmEL9ndDUAvnHzFdj5Dj/GNyryZAF8eABVtfVjMQCu4q9AGU81AAgeefUFABCyqBUDGMVfAU8uPs/uTK+qoj43+XckKjZrsNsH7OLPHgxHTNb2sdiG2xkmMSC/gKOxyO4Dcqx7qPYBuhgoAJc19QpPAmjzA9NK9gFFHMl9wDEXa7LxhKF87rcnTAIYosipfQDPfHReIcud4CJTO7xfMio9quhSRr+7Mgqa+nwEAK5Unwh1gisAgE8AmSLo16LP4Czq3SIUda+i1FE7QbFu0ryg5uG4rrcAZbUT1De3kPsvQG2AWg4AtQFqOQDUBqjlAFAboJYDQG2AWg4AtQFqOQDUBqjlAFAboJYDQG2AWg4AtQFqOQDUBqjlAFAboNabB/AHpxJ01AKEhfkAAAAASUVORK5CYII="
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={BoardIcon}
            text="Active Jobs"
            href="#/jobs/active"
            testKey="container-item-sprints"
          />
          <Item
            before={GraphLineIcon}
            text="Closed Jobs"
            href="#/jobs/closed"
            testKey="container-item-reports"
          />
          <Item
            before={BacklogIcon}
            text="All Jobs"
            href="#/jobs/"
            testKey="container-item-backlog"
          />
        </div>
      )}
    </MenuSection>
  </div>
);

const customMode = modeGenerator({
  product: {
    text: '#FFFFFF',
    background: '#f3755b',
    width: '185px',
  },
});

class MobileHeaderDemo extends Component {
  state = {
    drawerState: 'none',
  };

  navOpened = () => {
    this.setState({ drawerState: 'navigation' });
  };

  sidebarOpened = () => {
    this.setState({ drawerState: 'sidebar' });
  };

  drawerClosed = () => {
    this.setState({ drawerState: 'none' });
  };

  render() {
    return (
      <MobileHeader
        drawerState={this.state.drawerState}
        menuIconLabel={'Menu'}
        navigation={isOpen =>
          isOpen && (
            <LayoutManager
              globalNavigation={GlobalNavWithModalsAndDrawers}
              containerNavigation={ContainerNavigation}
              productNavigation={() => null}
            />
          )
        }
        secondaryContent={
          <ButtonGroup>
            <Button>One</Button>
            <Button
              iconBefore={<DetailViewIcon label="Show sidebar" />}
              onClick={this.sidebarOpened}
            />
          </ButtonGroup>
        }
        sidebar={isOpen =>
          isOpen && <FakeSideBar>Sidebar goes here...</FakeSideBar>
        }
        pageHeading="Manage Jobs"
        onNavigationOpen={this.navOpened}
        onSidebarOpen={this.sidebarOpened}
        onDrawerClose={this.drawerClosed}
      />
    );
  }
}
export default () => {
  const [wSize, setSize] = React.useState(0);
  const updateWindowDimensions = () => {
    setSize(window.innerWidth);
  };
  if (window.innerWidth !== wSize) {
    setSize(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Login - CompliChain</title>
      </Helmet>
      <NavigationProvider initialUIController={{ isResizeDisabled: true }}>
        <Fragment>
          {wSize < 800 ? (
            <Fragment>
              <MobileHeaderDemo />
              <div style={{ padding: 20 }}>
                <TestState />
              </div>
            </Fragment>
          ) : (
            <LayoutManager
              globalNavigation={GlobalNavWithModalsAndDrawers}
              containerNavigation={ContainerNavigation}
              productNavigation={() => null}
            >
              <div style={{ padding: 20 }}>
                <TestState />
              </div>
            </LayoutManager>
          )}
        </Fragment>
      </NavigationProvider>
    </>
  );
};

// export default class HomePage extends React.Component<Props, {}> {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//           <div>
//             <Helmet>
//                 <title>Admin - CompliChain</title>
//             </Helmet>
//             <h3 className="text-center">CompliChain by Sepire</h3>
//             <Divider />
//             <NavLink to={"/info"}>Home</NavLink>
//           </div>
//         );
//     }
// }
