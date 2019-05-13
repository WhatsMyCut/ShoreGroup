import { clone } from '../Utils';
import { Action, Reducer } from 'redux';
import { AppThunkAction, AppThunkActionAsync } from './index';
import CommentService from '../api/CommentService';
import { ICommentModel } from '../models/ICommentModel';
import { IJobModel } from '../models/IJobModel';

export interface IState {
  job?: IJobModel;
  comments: ICommentModel[];
  comment?: ICommentModel;
  indicators: {
    operationLoading: boolean;
  };
}

export enum Actions {
  FailureResponse = 'COMMENT_FAILURE_RESPONSE',
  FetchRequest = 'COMMENT_FETCH_REQUEST',
  FetchResponse = 'COMMENT_FETCH_RESPONSE',
  FetchByIdResponse = 'COMMENT_FETCH_BY_ID_RESPONSE',
  AddRequest = 'COMMENT_ADD_REQUEST',
  AddResponse = 'COMMENT_ADD_RESPONSE',
  UpdateRequest = 'COMMENT_UPDATE_REQUEST',
  UpdateResponse = 'COMMENT_UPDATE_RESPONSE',
  DeleteRequest = 'COMMENT_DELETE_REQUEST',
  DeleteResponse = 'COMMENT_DELETE_RESPONSE',
}

interface IFailureResponse {
  type: Actions.FailureResponse;
}

interface IFetchRequest {
  type: Actions.FetchRequest;
}

interface IFetchResponse {
  type: Actions.FetchResponse;
  payload: ICommentModel[];
}

interface IFetchByIdResponse {
  type: Actions.FetchByIdResponse;
  payload: ICommentModel;
}

interface IAddRequest {
  type: Actions.AddRequest;
}

interface IAddResponse {
  type: Actions.AddResponse;
  payload: ICommentModel;
}

interface IUpdateRequest {
  type: Actions.UpdateRequest;
}

interface IUpdateResponse {
  type: Actions.UpdateResponse;
  payload: ICommentModel;
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
  fetchRequest: (
    job?: string,
    id?: string,
  ): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    // Wait for server prerendering.
    dispatch({ type: Actions.FetchRequest });
    var fetched = id
      ? await CommentService.fetch(job, id)
      : await CommentService.fetch(job);
    const result = fetched;
    if (result && !result.length) {
      const retArr = result['Result'];
      if (id) {
        dispatch({ type: Actions.FetchByIdResponse, payload: retArr });
      } else {
        dispatch({ type: Actions.FetchResponse, payload: retArr });
      }
    } else {
      dispatch({ type: Actions.FailureResponse });
    }
  },
  addRequest: (
    jobId: IJobModel,
    model: ICommentModel,
  ): AppThunkActionAsync<KnownAction, string> => async (dispatch, getState) => {
    dispatch({ type: Actions.AddRequest });
    var result = await CommentService.add(jobId, model);

    if (result) {
      model.Id = result;
      dispatch({ type: Actions.AddResponse, payload: model });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }

    return result;
  },
  updateRequest: (
    model: ICommentModel,
  ): AppThunkActionAsync<KnownAction, ICommentModel> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.UpdateRequest });
    var result = await CommentService.update(model);
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
    var result = await CommentService.delete(id);
    if (result) {
      dispatch({ type: Actions.DeleteResponse, id });
    } else {
      dispatch({ type: Actions.FailureResponse });
    }
  },
};

const initialCommentState: IState = {
  comments: [],
  comment: {},
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
  (window as any).initialReduxState.comments = {
    ...currentState,
    ...(window as any).initialReduxState.comments,
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
      return { ...currentState, indicators, comments: action.payload };
    case Actions.FetchByIdResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var newState = { ...currentState, indicators, job: action.payload };
      return newState;
    case Actions.UpdateRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.UpdateResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.comments);
      var itemToUpdate = data.filter(x => x.Id === action.payload.Id)[0];
      itemToUpdate.ContentText = action.payload.ContentText;
      return { ...currentState, indicators, comments: data };
    case Actions.AddRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.AddResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.comments);
      data.push(action.payload);
      return { ...currentState, indicators, comments: data };
    case Actions.DeleteRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.DeleteResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.comments).filter(x => x.Id !== action.id);
      return { ...currentState, indicators, comments: data };
    default:
      // The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action;
  }

  return currentState || initialCommentState;
};
