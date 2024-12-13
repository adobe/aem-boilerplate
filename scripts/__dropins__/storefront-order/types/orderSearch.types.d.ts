import { FieldsProps } from '.';

type errorInformationProps = {
    error: string;
};
export interface inLineAlertProps {
    text: string;
    type: 'success' | 'warning' | 'error';
}
export type RouteSignInProps = {
    render: boolean;
    formValues?: {
        number: number | string;
        email?: string;
    };
};
export interface OrderSearchProps {
    className?: string;
    onError?: (errorInformation: errorInformationProps) => void;
    isAuth: boolean;
    renderSignIn?: ({ render, formValues, }: RouteSignInProps) => boolean | undefined;
    routeCustomerOrder?: () => string;
    routeGuestOrder?: () => string;
}
export interface useOrderSearchProps extends Omit<OrderSearchProps, 'className'> {
}
export interface OrderSearchFormProps {
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    loading?: boolean;
    inLineAlert: inLineAlertProps;
    fieldsConfig?: FieldsProps[];
}
export interface useOrderSearch extends Omit<OrderSearchProps, 'className'> {
}
export {};
//# sourceMappingURL=orderSearch.types.d.ts.map