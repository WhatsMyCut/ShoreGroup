import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from 'styled-components';
import { Helmet } from "react-helmet";
import { NavLink, Redirect } from "react-router-dom";

type Props = RouteComponentProps<{}>;

const Divider = styled.hr`
  margin: 18px 0;
  height: 1px;
  border: none;
  background: #111;
`;
export default class HomePage extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Helmet>
                <title>Admin - CompliChain</title>
            </Helmet>
            <h3 className="text-center">CompliChain by Sepire</h3>
            <Divider />
            <p className="text-center"><NavLink exact to={'/'} className="btn btn-primary large" activeClassName="active">Goto Jobs</NavLink></p>
            </div>;
    }
}