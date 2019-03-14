import * as React from "react";
import { Modal } from "bootstrap";

export interface IProps {
    title: JSX.Element | JSX.Element[] | any;
    buttons?: any;
    children?: JSX.Element | JSX.Element[] | any;
    onShow?: () => void;
    onHide?: () => void;
}

const ModalComponent = (props: IProps) => {

    let modalPlugin: Modal,
        elModal: HTMLElement;

    const show = () => modalPlugin.show();
    const hide = () => modalPlugin.hide();

    React.useLayoutEffect(() => {
        modalPlugin = new Modal(elModal);
        if (props.onShow) {
            elModal.addEventListener("show.bs.modal" as any, () => props.onShow());
        }
        if (props.onHide) {
            elModal.addEventListener("hide.bs.modal" as any, () => props.onHide());
        }

        return () => {
            modalPlugin.hide()
        }
    }, [elModal, props.onShow]);

    return <div className="modal fade" tabIndex={-1} role="dialog" ref={x => elModal = x}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                        {props.buttons}
                        </div>
                    </div>
                </div>
            </div>;
    
}