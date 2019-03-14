import "../styles/guestLayout.scss";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface IProps {
    children: any;
}

type Props = IProps & RouteComponentProps<any>;

const GuestLayout = (props: Props) => {
    return (
        <div id="guestLayout" className="layout">
            <div className="container container-content">
                {props.children}
            </div>
            <ToastContainer />
        </div>
    );
}

export default GuestLayout;