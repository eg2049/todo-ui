import TodoBackend from "../API/TodoBackend";
import { authTokenName, authTokenPrefix, todoUIEndpoints } from "../config";

export const authTokenGet = (event, credentials, navigate) => {
    event.preventDefault();

    TodoBackend.authTokenGet(
        credentials
    ).then(
        response => {
            if (response.status === 200) {
                const token = response.data.token;
                authTokenSet(token);
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

export const registration = (event, credentials, navigate) => {
    event.preventDefault();

    TodoBackend.registration(
        credentials
    ).then(
        response => {
            if (response.status === 201) {
                authTokenGet(event, credentials, navigate)
            }
            else {
                console.log(response);
            };
        }
    ).catch(
        error => {
            console.log(error);
            console.log(error.response.data)
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
