import { setAuthAction } from "../reducers/authReducer";
import TodoBackend from "../API/TodoBackend";
import { authTokenName, authTokenPrefix, todoUIEndpoints } from "../config";

export const authTokenGet = (event, credentials, dispatch, navigate) => {
    event.preventDefault();

    TodoBackend.authTokenGet(
        credentials
    ).then(
        response => {
            if (response.status === 200) {
                const token = response.data.token;
                authTokenSet(token);
                dispatch(setAuthAction(true))
                navigate(todoUIEndpoints.main);
            }
            else {
                console.log(response);
            };
        }
    ).catch(
        error => {
            console.error(error);
        }
    );
};

export const registration = (event, credentials, dispatch, navigate) => {
    event.preventDefault();

    TodoBackend.registration(
        credentials
    ).then(
        response => {
            if (response.status === 201) {
                authTokenGet(event, credentials, dispatch, navigate)
            }
            else {
                console.log(response);
            };
        }
    ).catch(
        error => {
            console.error(error);
        }
    )
};

export const authTokenHeadersGet = () => {

    const headers = { Authorization: null };
    const authToken = localStorage.getItem(authTokenName);

    if (authToken) {
        headers.Authorization = `${authTokenPrefix} ${authToken}`;
    };

    return headers;
};

export const authTokenSet = (authToken) => {
    if (authToken) {
        localStorage.setItem(authTokenName, authToken);
    };
};

export const authTokenRemove = () => {
    localStorage.removeItem(authTokenName);
};

export const authDispatch = (dispatch) => {
    const headers = authTokenHeadersGet();

    {
        headers.Authorization
            ? dispatch(setAuthAction(true))
            : dispatch(setAuthAction(false))
    };

};
