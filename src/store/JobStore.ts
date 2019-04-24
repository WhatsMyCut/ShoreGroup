import { clone } from '../Utils';
import { Action, Reducer } from 'redux';
import { AppThunkAction, AppThunkActionAsync } from './index';
import JobService from '../api/JobService';
import { IJobModel } from '../models/IJobModel';

export interface IState {
  jobs: IJobModel[];
  job?: IJobModel;
  indicators: {
    operationLoading: boolean;
  };
}

export enum Actions {
  FailureResponse = 'JOB_FAILURE_RESPONSE',
  FetchRequest = 'JOB_FETCH_REQUEST',
  FetchResponse = 'JOB_FETCH_RESPONSE',
  FetchByIdResponse = 'JOB_FETCH_BY_ID_RESPONSE',
  AddRequest = 'JOB_ADD_REQUEST',
  AddResponse = 'JOB_ADD_RESPONSE',
  UpdateRequest = 'JOB_UPDATE_REQUEST',
  UpdateResponse = 'JOB_UPDATE_RESPONSE',
  DeleteRequest = 'JOB_DELETE_REQUEST',
  DeleteResponse = 'JOB_DELETE_RESPONSE',
}

interface IFailureResponse {
  type: Actions.FailureResponse;
}

interface IFetchRequest {
  type: Actions.FetchRequest;
}

interface IFetchResponse {
  type: Actions.FetchResponse;
  payload: IJobModel[];
}

interface IFetchByIdResponse {
  type: Actions.FetchByIdResponse;
  payload: IJobModel;
}

interface IAddRequest {
  type: Actions.AddRequest;
}

interface IAddResponse {
  type: Actions.AddResponse;
  payload: IJobModel;
}

interface IUpdateRequest {
  type: Actions.UpdateRequest;
}

interface IUpdateResponse {
  type: Actions.UpdateResponse;
  payload: IJobModel;
}

interface IDeleteRequest {
  type: Actions.DeleteRequest;
}

interface IDeleteResponse {
  type: Actions.DeleteResponse;
  id: string;
}

type KnownAction =
  | IFailureResponse
  | IFetchRequest
  | IFetchResponse
  | IFetchByIdResponse
  | IAddRequest
  | IAddResponse
  | IUpdateRequest
  | IUpdateResponse
  | IDeleteRequest
  | IDeleteResponse;

export const actionCreators = {
  fetchRequest: (id?: string): AppThunkAction<KnownAction> => async (
    dispatch,
    getState,
  ) => {
    // Wait for server prerendering.
    dispatch({ type: Actions.FetchRequest });
    var fetched = await JobService.fetch(id);
    const result = fetched;
    console.log('jobservice: ', id, result);
    if (result && result.length) {
      dispatch({ type: Actions.FetchResponse, payload: result });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }
  },
  addRequest: (
    model: IJobModel,
  ): AppThunkActionAsync<KnownAction, string> => async (dispatch, getState) => {
    dispatch({ type: Actions.AddRequest });
    var result = await JobService.add(model);

    if (result) {
      model.id = result;
      dispatch({ type: Actions.AddResponse, payload: model });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }

    return result;
  },
  updateRequest: (
    model: IJobModel,
  ): AppThunkActionAsync<KnownAction, IJobModel> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.UpdateRequest });
    var result = await JobService.update(model);
    if (result) {
      dispatch({ type: Actions.UpdateResponse, payload: model });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }

    return result;
  },
  deleteRequest: (id: string): AppThunkAction<KnownAction> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.DeleteRequest });
    var result = await JobService.delete(id);
    if (result) {
      dispatch({ type: Actions.DeleteResponse, id });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }
  },
};

const initialJobState: IState = {
  jobs: [],
  job: {},
  indicators: {
    operationLoading: false,
  },
};

export const reducer: Reducer<IState> = (
  currentState: IState,
  incomingAction: Action,
) => {
  const action = incomingAction as KnownAction;

  var cloneIndicators = () => clone(currentState.indicators);
  (window as any).initialReduxState.jobs = {
    ...currentState,
    ...(window as any).initialReduxState.jobs,
  };
  (window as any).localStorage.setItem(
    'initialReduxState',
    JSON.stringify((window as any).initialReduxState),
  );
  //console.log('here4', action);
  switch (action.type) {
    case Actions.FailureResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      return { ...currentState, indicators };
    case Actions.FetchRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.FetchResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      return { ...currentState, indicators, jobs: action.payload };
    case Actions.FetchByIdResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var newState = { ...currentState, indicators, job: action.payload[0] };
      console.log('HERE8', newState);
      return newState;
    case Actions.UpdateRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.UpdateResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.jobs);
      var itemToUpdate = data.filter(x => x.id === action.payload.id)[0];
      itemToUpdate.name = action.payload.name;
      return { ...currentState, indicators, jobs: data };
    case Actions.AddRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.AddResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.jobs);
      data.push(action.payload);
      return { ...currentState, indicators, jobs: data };
    case Actions.DeleteRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.DeleteResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.jobs).filter(x => x.id !== action.id);
      return { ...currentState, indicators, jobs: data };
    default:
      // The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action;
  }

  return currentState || initialJobState;
};
