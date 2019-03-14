import * as React from "react";

interface TProps {};
interface TState {};

const AppComponent = (props: TProps, state: TState) => {
    let renderKey = 0;

    const forceUpdate = () => {
        renderKey = Math.random();
    }
}

export default AppComponent;