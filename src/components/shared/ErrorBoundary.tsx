import * as React from 'react';

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  state: {
    hasError: boolean;
  };
  props: any;
  setState(arg0: { hasError: boolean }): any {
    throw new Error('Method not implemented.');
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <b>Something went wrong.</b>;
    }
    return this.props.children as any;
  }
}
