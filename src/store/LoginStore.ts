import { IUserInfoModel } from '../models/IUserInfoModel';
import { clone } from '../Utils';
import { Action, Reducer } from 'redux';
import AuthorizationService from '../api/AuthorizationService';
import { AppThunkAction } from './index';

export interface IState {
  indicators: {
    operationLoading: boolean;
    loginSuccess: boolean;
  };
  userInfo?: IUserInfoModel;
}

export enum Actions {
  /**
   * You need to have the initial state to
   * reset the indicators (e.g. loginSuccess)
   * that call redirect or any other actions.
   * It must be called in method 'componentDidMount'
   * of a component.
   */
  Init = 'AUTH_INIT',
  Request = 'AUTH_REQUEST',
  Success = 'AUTH_SUCCESS',
  Failure = 'AUTH_FAILURE',
}

interface IInit {
  type: Actions.Init;
}

interface IRequest {
  type: Actions.Request;
}

interface ISuccess {
  type: Actions.Success;
  payload: IUserInfoModel;
}

interface IFailure {
  type: Actions.Failure;
}

type KnownAction = IInit | IRequest | ISuccess | IFailure;

export const actionCreators = {
  init: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: Actions.Init });
    return;
  },

  loginRequest: (): AppThunkAction<KnownAction> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.Request });

    var result = await AuthorizationService.userinfo();
    if (result['errors'] && result['errors'].length) {
      dispatch({ type: Actions.Failure });
      return;
    }
    const user = result['Result'] as IUserInfoModel;
    dispatch({ type: Actions.Success, payload: user });
    return;
  },
};

const initialState: IState = {
  indicators: {
    operationLoading: false,
    loginSuccess: false,
  },
};

export const reducer: Reducer<IState> = (
  currentState: IState,
  incomingAction: Action,
) => {
  const action = incomingAction as KnownAction;

  var cloneIndicators = () => clone(currentState.indicators);
  (window as any).initialReduxState.login = currentState;
  (window as any).localStorage.setItem(
    'initialReduxState',
    JSON.stringify((window as any).initialReduxState),
  );
  switch (action.type) {
    case Actions.Init:
      return initialState;
    case Actions.Request:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.Success:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      indicators.loginSuccess = true;
      return { ...currentState, indicators, userInfo: action.payload };
    case Actions.Failure:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      return { ...currentState, indicators };
    default:
      // The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action;
  }

  return currentState || initialState;
};

export default Object.assign({}, this);
