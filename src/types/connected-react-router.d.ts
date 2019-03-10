export const CALL_HISTORY_METHOD: any;
export class ConnectedRouter {
    static apply(p0: any, p1: any): any;
    static bind(p0: any): any;
    static call(p0: any): any;
    static displayName: string;
    constructor(props: any);
    forceUpdate(callback: any): void;
    render(): any;
    renderWrappedComponent(value: any): any;
    setState(partialState: any, callback: any): void;
}
export namespace ConnectedRouter {
    function WrappedComponent(props: any): any;
    namespace WrappedComponent {
        namespace propTypes {
            function context(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
            namespace context {
                // Too-deep object hierarchy from index.ConnectedRouter.WrappedComponent.propTypes.context
                const isRequired: any;
            }
        }
    }
}
export const LOCATION_CHANGE: any;
export function connectRouter(history: any): any;
export function createMatchSelector(path: any): any;
export function getAction(state: any): any;
export function getHash(state: any): any;
export function getLocation(state: any): any;
export function getSearch(state: any): any;
export const go: any;
export const goBack: any;
export const goForward: any;
export const onLocationChanged: any;
export const push: any;
export const replace: any;
export const routerActions: any;
export const routerMiddleware: any;