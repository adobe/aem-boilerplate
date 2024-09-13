import { Order as OrderModel } from '../data/models';

export declare enum Actions {
    ADD_ORDER_REFERENCE = "ADD_ORDER_REFERENCE",
    LOADING = "LOADING",
    SET_DETAILS = "SET_DETAILS",
    ALERT = "ALERT",
    DISMISS_ALERT = "DISMISS_ALERT",
    DATA_FETCHED = "DATA_FETCHED",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
interface LoadingAction {
    type: Actions.LOADING;
}
interface SetDetailsAction {
    type: Actions.SET_DETAILS;
    details: OrderModel | null;
    alert?: Alert;
    fromSearchForm?: boolean;
}
export declare enum AlertType {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success"
}
export declare enum AlertCode {
    INVALID_ORDER = "invalid_order",
    INVALID_SEARCH = "invalid_search",
    UNKNOWN = "unknown_error"
}
export type Alert = {
    type: AlertType;
    code: AlertCode;
    message: string;
};
interface AlertAction {
    type: Actions.ALERT;
    alert: Alert;
}
interface DismissAlertAction {
    type: Actions.DISMISS_ALERT;
}
interface DataFetchedAction {
    type: Actions.DATA_FETCHED;
}
interface UnknownError {
    type: Actions.UNKNOWN_ERROR;
}
export interface State {
    isLoading: boolean;
    details: OrderModel | null;
    orderData?: OrderModel;
    orderRef?: string;
    alert?: Alert;
    isOrderFromSearchForm: boolean;
}
type Action = LoadingAction | SetDetailsAction | AlertAction | DismissAlertAction | DataFetchedAction | UnknownError;
export declare function orderConfirmationReducer(state: State, action: Action): State;
export {};
//# sourceMappingURL=orderConfirmation.d.ts.map