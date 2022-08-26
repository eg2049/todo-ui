import { authTokenName, authTokenPrefix } from "../config";

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
