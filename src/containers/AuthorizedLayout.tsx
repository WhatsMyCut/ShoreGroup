import TopMenu from "../components/shared/TopMenu";
import * as React from "react";
import "../styles/authorizedLayout.scss";
import { ToastContainer } from "react-toastify";
import Footer from "../components/shared/Footer";

interface IProps {
    children?: React.ReactNode;
}

type Props = IProps;

const AuthorizedLayout = (props: Props) => {
    return (
        <div id="authorizedLayout" className="layout">
            <TopMenu />
            <div className="container container-content">
                {props.children}
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default AuthorizedLayout;