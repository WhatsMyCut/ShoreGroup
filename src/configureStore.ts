import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  StoreEnhancer,
  Store,
  StoreEnhancerStoreCreator,
  ReducersMapObject,
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, LOCATION_CHANGE } from 'connected-react-router';
import * as StoreModule from './store';
import { ApplicationState, reducers } from './store';
import { History } from 'history';

export default function configureStore(
  history: History,
  initialState?: ApplicationState,
) {
  // Build middleware. These are functions that can process the actions before they reach the store.
  const windowIfDefined =
    typeof window === 'undefined' ? null : (window as any);
  // If devTools is installed, connect to it
  const devToolsExtension =
    windowIfDefined &&
    (windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer);
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    devToolsExtension
      ? devToolsExtension()
      : <S>(next: StoreEnhancerStoreCreator<S>) => next,
  )(createStore);

  // Combine all reducers and instantiate the app-wide store instance
  const allReducers = buildRootReducer(reducers, history);
  const store = createStoreWithMiddleware(
    allReducers,
    initialState as any,
  ) as Store<ApplicationState>;

  return store;
}

const routerReducer = history => {
  const initialState = {
    location: history.location,
    action: history.action,
  };
  return (state = initialState, arg: any = {}) => {
    (window as any).initialReduxState.router.location.pathname =
      state.location.pathname;
    (window as any).initialReduxState.router.location.search =
      state.location.search;
    (window as any).initialReduxState.router.location.hash =
      state.location.hash;
    (window as any).localStorage.setItem(
      'initialReduxState',
      JSON.stringify((window as any).initialReduxState),
    );
    if (arg.type === LOCATION_CHANGE) {
      return { ...state, ...arg.payload };
    }
    return state;
  };
};

function buildRootReducer(allReducers: ReducersMapObject, history) {
  return combineReducers<ApplicationState>({
    ...allReducers,
    ...{ router: routerReducer(history) },
  } as any);
}
