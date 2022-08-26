import { authTokenName } from "../config";

export const authTokenHeadersGet = () => {

    const headers = { Authorization: null };
    const authToken = localStorage.getItem(authTokenName);

    if (authToken) {
        headers.Authorization = `Token ${authToken}`;
    };

    return headers;
};
