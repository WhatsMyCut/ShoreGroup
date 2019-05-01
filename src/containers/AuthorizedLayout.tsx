import React, { Component, ReactNode } from 'react';
import '../styles/authorizedLayout.scss';
import TopMenu from '../components/shared/TopMenu';
import NavMenu from '../components/shared/NavMenu';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/shared/Footer';
import { initializeIcons } from '@uifabric/icons';
import { mergeStyles, registerIcons, getTheme } from '@uifabric/styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
} from '@fortawesome/free-solid-svg-icons';
import loadThemeByName from '../styles/loadThemeByName';

interface IProps {
  children?: ReactNode;
}

type Props = IProps;

export default class AuthorizedLayout extends Component<Props, {}> {
  props: Props;

  constructor(props) {
    super(props);
    initializeIcons();
    registerIcons({
      icons: {
        Logo: <Icon className="logo" />,
        FileUpload: <FontAwesomeIcon icon={faCloudUploadAlt} />,
        FileDownload: <FontAwesomeIcon icon={faCloudDownloadAlt} />,
      },
    });
    const theme = getTheme();
    loadThemeByName('orange');
    console.log('Theme: ', theme);
  }

  public render() {
    return (
      <div id="authorizedLayout" className="layout">
        <NavMenu />
        <div className="mainContent">
          <TopMenu />
          <div className="panel-content">{this.props.children}</div>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    );
  }
}
