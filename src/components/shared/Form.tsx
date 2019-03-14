import * as React from "react";
import { NSerializeJson } from "nserializejson";
import { emptyForm } from "../../Utils";
import { NValTippy } from "nval-tippy";

export interface IProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    children: any;
}

const Form = (props: IProps) => {
    let validator: NValTippy;
    let elForm: HTMLFormElement;

    const isValid = () => {
        return validator.isValid();
    }
    
    function getData<T>(): T {
        return NSerializeJson.serializeForm(this.elForm) as any as T;
    }

    React.useLayoutEffect(() => {
        validator = new NValTippy(elForm);
    });

    return <form {...props} ref={x => elForm = x}>{props.children}</form>;
}

export default Form;
