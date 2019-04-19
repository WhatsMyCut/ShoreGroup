import React, { Component } from 'react';
import '../styles/authorizedLayout.scss';
import TopMenu from '../components/shared/TopMenu';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/shared/Footer';

interface IProps {
  children?: React.ReactNode;
}

type Props = IProps;

export default class AuthorizedLayout extends Component<Props, {}> {
  props: Props;

  public render() {
    return (
      <div id="authorizedLayout" className="layout">
        <TopMenu />
        <div className="container container-content">{this.props.children}</div>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}
