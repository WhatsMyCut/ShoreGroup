﻿import '../styles/guestLayout.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface IProps {
  children: any;
}

type Props = IProps & RouteComponentProps<any>;

export default class GuestLayout extends React.Component<Props, {}> {
  props: Props;

  public render() {
    return (
      <div id="guestLayout" className="layout">
        <div className="container container-content">{this.props.children}</div>
        <ToastContainer />
      </div>
    );
  }
}
