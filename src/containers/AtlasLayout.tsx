import React, { Component } from 'react';

interface IProps {
  children?: React.ReactNode;
}

type Props = IProps;

export default class AtlasLayout extends Component<Props, {}> {
  props: Props;

  public render() {
    return <div id="atlasLayout">{this.props.children}</div>;
  }
}
