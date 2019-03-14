import { clone } from "@Utils";
import { Action, Reducer } from "redux";
import { AppThunkAction, AppThunkActionAsync } from "./index";
import TaskService from "@Services/TaskService";
import { ITaskModel } from "@Models/ITaskModel";
import { wait } from "domain-wait";

export module TaskStore {

    export interface IState {
        tasks: ITaskModel[],
        indicators: {
            operationLoading: boolean;
        };
    }

    export enum Actions {
        FailureResponse = "TASK_FAILURE_RESPONSE",
        SearchRequest = "TASK_SEARCH_REQUEST",
        SearchResponse = "TASK_SEARCH_RESPONSE",
        AddRequest = "TASK_ADD_REQUEST",
        AddResponse = "TASK_ADD_RESPONSE",
        UpdateRequest = "TASK_UPDATE_REQUEST",
        UpdateResponse = "TASK_UPDATE_RESPONSE",
        DeleteRequest = "TASK_DELETE_REQUEST",
        DeleteResponse = "TASK_DELETE_RESPONSE"
    }

    interface IFailureResponse {
        type: Actions.FailureResponse;
    }

    interface IGetAllRequest {
        type: Actions.SearchRequest;
    }

    interface IGetAllResponse {
        type: Actions.SearchResponse;
        payload: ITaskModel[];
    }

    interface IAddRequest {
        type: Actions.AddRequest;
    }

    interface IAddResponse {
        type: Actions.AddResponse;
        payload: ITaskModel;
    }

    interface IUpdateRequest {
        type: Actions.UpdateRequest;
    }

    interface IUpdateResponse {
        type: Actions.UpdateResponse;
        payload: ITaskModel;
    }

    interface IDeleteRequest {
        type: Actions.DeleteRequest;
    }

    interface IDeleteResponse {
        type: Actions.DeleteResponse;
        id: number;
    }

    type KnownAction =
        IFailureResponse |
        IGetAllRequest | IGetAllResponse |
        IAddRequest | IAddResponse |
        IUpdateRequest | IUpdateResponse |
        IDeleteRequest | IDeleteResponse;

    export const actionCreators = {
        searchRequest: (term?: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
            await wait(async (transformUrl) => {
                // Wait for server prerendering.
                dispatch({ type: Actions.SearchRequest });
                var result = await TaskService.search(term);
                if (result.length) {
                    dispatch({ type: Actions.SearchResponse, payload: result });
                } else {
                    dispatch({ type: Actions.FailureResponse });
                }
            });
        },
        addRequest: (model: ITaskModel): AppThunkActionAsync<KnownAction, number> => async (dispatch, getState) => {
            dispatch({ type: Actions.AddRequest });
            var result = await TaskService.add(model);

            if (result) {
                model.taskID = result;
                dispatch({ type: Actions.AddResponse, payload: model });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }

            return result;
        },
        updateRequest: (model: ITaskModel): AppThunkActionAsync<KnownAction, ITaskModel> => async (dispatch, getState) => {
            dispatch({ type: Actions.UpdateRequest });
            var result = await TaskService.update(model);
            if (result) {
                dispatch({ type: Actions.UpdateResponse, payload: model });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }

            return result;
        },
        deleteRequest: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
            dispatch({ type: Actions.DeleteRequest });
            var result = await TaskService.delete(id);
            if (result) {
                dispatch({ type: Actions.DeleteResponse, id });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }
        }
    }

    const initialState: IState = {
        tasks: [],
        indicators: {
            operationLoading: false
        }
    };

    export const reducer: Reducer<IState> = (currentState: IState, incomingAction: Action) => {
        const action = incomingAction as KnownAction;

        var cloneIndicators = () => clone(currentState.indicators);
        (window as any).initialReduxState.tasks = { ...currentState, ...(window as any).initialReduxState.tasks};
        (window as any).localStorage.setItem('initialReduxState', JSON.stringify((window as any).initialReduxState));
        switch (action.type) {
            case Actions.FailureResponse:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                return { ...currentState, indicators };
            case Actions.SearchRequest:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.SearchResponse:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                return { ...currentState, indicators, tasks: action.payload };
            case Actions.UpdateRequest:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.UpdateResponse:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                var data = clone(currentState.tasks);
                var itemToUpdate = data.filter(x => x.taskID === action.payload.taskID)[0];
                itemToUpdate.name = action.payload.name;
                itemToUpdate.description = action.payload.description;
                return { ...currentState, indicators, tasks: data };
            case Actions.AddRequest:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.AddResponse:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                var data = clone(currentState.tasks);
                data.push(action.payload);
                return { ...currentState, indicators, tasks: data };
            case Actions.DeleteRequest:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.DeleteResponse:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                var data = clone(currentState.tasks).filter(x => x.taskID !== action.id);
                return { ...currentState, indicators, tasks: data };
            default:
                // The following line guarantees that every action in the KnownAction union has been covered by a case above
                const exhaustiveCheck: never = action;
        }

        return currentState || initialState;
    }
}