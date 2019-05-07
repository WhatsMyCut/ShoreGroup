import '../styles/authorizedLayout.scss';
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
import { mergeStyleSets, registerIcons, getTheme } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
  faAddressCard,
  faShieldAlt,
  faPalette,
  faBell,
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

const theme = loadThemeByName('teal');

class AuthorizedLayout extends Component<Props, {}> {
  props: Props;
  private fetch: () => void;
  constructor(props) {
    super(props);
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
      },
    });
    this.fetch = AwesomeDebouncePromise(() => {
      // AuthorizationService.userinfo().then(value => {
      //   const result = value['Result'] as IUserInfoModel;
      //   this.setState({ userInfo: result });
      //   console.log(result);
      // });
    }, 500);
  }

  componentDidMount() {
    this.props.loginRequest();
  }

  public render() {
    //const { userInfo } = this.state;
    return (
      <div id="authorizedLayout" className="layout">
        <NavMenu theme={theme} />
        <div className="mainContent">
          <TopMenu theme={theme} />
          <div className="panel-content">{this.props.children}</div>
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
