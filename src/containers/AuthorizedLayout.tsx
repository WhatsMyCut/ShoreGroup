import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as LoginStore from '../store/LoginStore';
import { ApplicationState } from '../store/index';

import TopMenu from '../components/shared/TopMenu';
import NavMenu from '../components/shared/NavMenu';
import Footer from '../components/shared/Footer';

import { initializeIcons } from '@uifabric/icons';
import {
  mergeStyleSets,
  registerIcons,
  getTheme,
  ITheme,
} from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
  faAddressCard,
  faShieldAlt,
  faPalette,
  faBell,
  faHandsHelping,
} from '@fortawesome/free-solid-svg-icons';
import loadThemeByName from '../styles/loadThemeByName';
import AuthorizationService from '../api/AuthorizationService';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { IUserInfoModel } from '../models/IUserInfoModel';

interface IProps {
  children?: ReactNode;
}

type Props = RouteComponentProps<{}> &
  IProps &
  typeof LoginStore.actionCreators &
  LoginStore.IState;

interface IState {
  currentTheme?: string;
  classNames?: any;
}

class AuthorizedLayout extends Component<Props, IState> {
  props: Props;
  protected fetch: () => void;
  protected theme: ITheme;
  protected classNames: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTheme: 'default',
      classNames: this._updateClassNames(),
    };
    initializeIcons();
    registerIcons({
      icons: {
        Logo: <Icon className="logo" />,
        FileUpload: <FontAwesomeIcon icon={faCloudUploadAlt} />,
        FileDownload: <FontAwesomeIcon icon={faCloudDownloadAlt} />,
        EditProfile: <FontAwesomeIcon icon={faAddressCard} />,
        Security: <FontAwesomeIcon icon={faShieldAlt} />,
        Notifications: <FontAwesomeIcon icon={faBell} />,
        Theme: <FontAwesomeIcon icon={faPalette} />,
        Support: <FontAwesomeIcon icon={faHandsHelping} />,
      },
    });
  }

  private _updateClassNames() {
    const classNames = mergeStyleSets({
      layout: {
        display: 'flex',
        flex: '1 1 100%',
        background: '#fff',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
      mainContent: {
        display: 'flex',
        flex: '1 0 90%',
        flexDirection: 'column',
      },
      panelContent: {
        padding: '0 20px 30px',
      },
    });
    return classNames;
  }

  componentWillMount() {
    const { currentTheme } = this.state;
    this.onChangeTheme(currentTheme);
    this.props.loginRequest();
  }

  onChangeTheme = (theme: string) => {
    const { currentTheme } = this.state;
    console.log('onChangeTheme', currentTheme);
    if (theme !== currentTheme) {
      loadThemeByName(theme);
      this.setState({ currentTheme: theme });
    }
  };

  public render() {
    //const { userInfo } = this.state;
    const { currentTheme, classNames } = this.state;

    return (
      <div id="authorizedLayout" className={classNames.layout}>
        <NavMenu theme={currentTheme} />
        <div className={classNames.mainContent}>
          <TopMenu theme={currentTheme} onChangeTheme={this.onChangeTheme} />
          <div className={classNames.panelContent}>{this.props.children}</div>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.login,
  LoginStore.actionCreators,
)(AuthorizedLayout as any);

export default (withRouter(component as any) as any) as typeof AuthorizedLayout;
