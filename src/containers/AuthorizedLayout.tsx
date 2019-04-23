import React, { Component, ReactNode } from 'react';
import '../styles/authorizedLayout.scss';
import TopMenu from '../components/shared/TopMenu';
import NavMenu from '../components/shared/NavMenu';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/shared/Footer';
import { initializeIcons } from '@uifabric/icons';
import { mergeStyles, registerIcons } from '@uifabric/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  faPlusCircle,
  faBriefcase,
  faParachuteBox,
  faClipboardList,
  faUserCog,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

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
        PlusCircle: <Icon iconName="AddTo" />,
        Briefcase: <Icon iconName="BusinessCenterLogo" />,
        ParachuteBox: <Icon iconName="Product" />,
        ClipboardList: <Icon iconName="CheckList" />,
        ProfileCog: <Icon iconName="PlayerSettings" />,
        AngleDoubleRight: <FontAwesomeIcon icon={faAngleDoubleRight} />,
        Logo: <Icon className="logo" />,
      },
    });
  }

  public render() {
    return (
      <div id="authorizedLayout" className="layout">
        <NavMenu />
        <div className="mainContent">
          <TopMenu />
          <div className="panelContent">{this.props.children}</div>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    );
  }
}
