import * as React from "react";

export interface IProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {

}

const MultiSelect = (props: IProps) => {
    let elSelect: HTMLSelectElement,
        renderKey = 0;

    const forceUpdate = () => {
        renderKey = Math.random();
    }

    function getValues(): string[] {
        return Array.apply(null, this.elSelect.options).filter(x => x.selected).map(x => x.value);
    }

    return <select ref={x => elSelect = x} key={renderKey} {...props} multiple={true}>{props.children}</select>;
}

export default MultiSelect;