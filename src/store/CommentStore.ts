import { clone } from '../Utils';
import { Action, Reducer } from 'redux';
import { AppThunkAction, AppThunkActionAsync } from './index';
import CommentService from '../api/CommentService';
import { ICommentModel } from '../models/ICommentModel';
import { IJobModel } from '../models/IJobModel';

export interface IState {
  comments: ICommentModel[];
  comment?: ICommentModel;
  indicators: {
    operationLoading: boolean;
  };
}

export enum Actions {
  CFailureResponse = 'COMMENT_FAILURE_RESPONSE',
  CFetchRequest = 'COMMENT_FETCH_REQUEST',
  CFetchResponse = 'COMMENT_FETCH_RESPONSE',
  CFetchByIdResponse = 'COMMENT_FETCH_BY_ID_RESPONSE',
  CAddRequest = 'COMMENT_ADD_REQUEST',
  CAddResponse = 'COMMENT_ADD_RESPONSE',
  CUpdateRequest = 'COMMENT_UPDATE_REQUEST',
  CUpdateResponse = 'COMMENT_UPDATE_RESPONSE',
  CDeleteRequest = 'COMMENT_DELETE_REQUEST',
  CDeleteResponse = 'COMMENT_DELETE_RESPONSE',
}

interface ICFailureResponse {
  type: Actions.CFailureResponse;
}

interface ICFetchRequest {
  type: Actions.CFetchRequest;
}

interface ICFetchResponse {
  type: Actions.CFetchResponse;
  payload: ICommentModel[];
}

interface ICFetchByIdResponse {
  type: Actions.CFetchByIdResponse;
  payload: ICommentModel;
}

interface ICAddRequest {
  type: Actions.CAddRequest;
}

interface ICAddResponse {
  type: Actions.CAddResponse;
  payload: ICommentModel;
}

interface ICUpdateRequest {
  type: Actions.CUpdateRequest;
}

interface ICUpdateResponse {
  type: Actions.CUpdateResponse;
  payload: ICommentModel;
}

interface ICDeleteRequest {
  type: Actions.CDeleteRequest;
}

interface ICDeleteResponse {
  type: Actions.CDeleteResponse;
  id: string;
}

type KnownAction =
  | ICFailureResponse
  | ICFetchRequest
  | ICFetchResponse
  | ICFetchByIdResponse
  | ICAddRequest
  | ICAddResponse
  | ICUpdateRequest
  | ICUpdateResponse
  | ICDeleteRequest
  | ICDeleteResponse;

export const actionCreators = {
  fetchCommentsRequest: (
    job?: IJobModel,
    id?: string,
  ): AppThunkAction<KnownAction> => async (dispatch, getState) => {
    // Wait for server prerendering.
    dispatch({ type: Actions.CFetchRequest });
    var fetched = id
      ? await CommentService.fetchComments(job, id) // fetch one
      : await CommentService.fetchComments(job); // fetch all
    const result = fetched;
    if (result && !result.length) {
      const retArr = result['Result'];
      if (id) {
        dispatch({ type: Actions.CFetchByIdResponse, payload: retArr });
      } else {
        dispatch({ type: Actions.CFetchResponse, payload: retArr });
      }
    } else {
      dispatch({ type: Actions.CFailureResponse });
    }
  },
  addCommentsRequest: (
    job: IJobModel,
    model: ICommentModel,
  ): AppThunkActionAsync<KnownAction, string> => async (dispatch, getState) => {
    dispatch({ type: Actions.CAddRequest });
    var result = await CommentService.add(job, model);

    if (result) {
      model.Id = result;
      dispatch({ type: Actions.CAddResponse, payload: model });
    } else {
      dispatch({ type: Actions.CFailureResponse });
    }

    return result;
  },
  updateCommentRequest: (
    model: ICommentModel,
  ): AppThunkActionAsync<KnownAction, ICommentModel> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.CUpdateRequest });
    var result = await CommentService.update(model);
    if (result) {
      dispatch({ type: Actions.CUpdateResponse, payload: model });
    } else {
      dispatch({ type: Actions.CFailureResponse });
    }

    return result;
  },
  deleteCommentsRequest: (id: string): AppThunkAction<KnownAction> => async (
    dispatch,
    getState,
  ) => {
    dispatch({ type: Actions.CDeleteRequest });
    var result = await CommentService.delete(id);
    if (result) {
      dispatch({ type: Actions.CDeleteResponse, id });
    } else {
      dispatch({ type: Actions.CFailureResponse });
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
    case Actions.CFailureResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      return { ...currentState, indicators };
    case Actions.CFetchRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.CFetchResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      return { ...currentState, indicators, comments: action.payload };
    case Actions.CFetchByIdResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var newState = { ...currentState, indicators, job: action.payload };
      return newState;
    case Actions.CUpdateRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.CUpdateResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.comments);
      var itemToUpdate = data.filter(x => x.Id === action.payload.Id)[0];
      itemToUpdate.ContentText = action.payload.ContentText;
      return { ...currentState, indicators, comments: data };
    case Actions.CAddRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.CAddResponse:
      var indicators = cloneIndicators();
      indicators.operationLoading = false;
      var data = clone(currentState.comments);
      data.push(action.payload);
      return { ...currentState, indicators, comments: data };
    case Actions.CDeleteRequest:
      var indicators = cloneIndicators();
      indicators.operationLoading = true;
      return { ...currentState, indicators };
    case Actions.CDeleteResponse:
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
