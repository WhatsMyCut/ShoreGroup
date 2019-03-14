import { Route, RouteProps, Redirect } from "react-router";
import * as React from "react";
import Globals from "../../Globals";
import { RouteComponentProps } from "react-router"

interface IProps extends RouteProps {
    layout: React.FC<any>,
    component?: React.FC<any> | React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> 
}

type Props = IProps;

const AppRoute = ({ component: Component, layout: Layout, path: Path, ...rest }: Props) => {
    var isLoginPath = Path === "/login";
    if (!Globals.isAuthenticated && !isLoginPath) {
        return <Redirect to="/login" />;
    }
    if (Globals.isAuthenticated && isLoginPath) {
        return <Redirect to="/" />;
    }

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />;
};

export default AppRoute;