import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

type Props = RouteComponentProps<{}>;

const Divider = styled.hr`
  margin: 18px 0;
  height: 1px;
  border: none;
  background: #111;
`;
export default class HomePage extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Admin - CompliChain</title>
        </Helmet>
        <h3 className="text-center">CompliChain by Sepire</h3>
        <Divider />
        <NavLink to={'/info'}>Home</NavLink>
      </div>
    );
  }
}
