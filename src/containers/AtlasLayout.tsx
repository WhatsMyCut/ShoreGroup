import * as React from 'react';

interface IProps {
  children?: React.ReactNode;
}

type Props = IProps;

export default class AtlasLayout extends React.Component<Props, {}> {
  props: Props;

  public render() {
    return <div id="atlasLayout">{this.props.children}</div>;
  }
}
