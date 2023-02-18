import { setAuthAction } from "@reducers/authReducer";
import TodoBackend from "@API/TodoBackend";
import { authTokenName, authTokenPrefix, todoUIEndpoints } from "@config/config";

/**
 * Запрос к API на получение токена аутентификации
 * 
 * @param {object} credentials креды для аутентификации
 * @param {function} dispatch изменение состояния в reducer-ax redux в случае успешной аутентификации
 * @param {function} navigate куда сделать редирект в случае усешного логина
 * @param {function} setMessage управление состоянием сообщения для модального окна 
 * @param {function} setModalActive управление состоянием активности модального окна 
 * 
 * @returns {Promise} ответ от API бэкэнда
 */
export const authTokenGetRequest = (credentials, dispatch, navigate, setMessage, setModalActive) => {

    return TodoBackend.authTokenGet(
        credentials
    ).then(
        response => {
            if (response.status === 200) {
                const token = response.data.token;

                // сохранение токена аутентификации в localStorage
                authTokenSet(token);

                // dispatch() параметром принимает action (object с полями type и payload)
                // далее происходит изменение состояния в соотвествии с payload
                dispatch(setAuthAction(true));

                // переход на главную страницу в случае успешной аутентификации
                navigate(todoUIEndpoints.main);
            };
        }
    ).catch(
        error => {
            setMessage(error.response.data.message);
            setModalActive(true);
        }
    );
};

/**
 * Запрос к API на регистрацию нового пользователя
 * 
 * @param {object} credentials креды для регистрации 
 * @param {function} navigate для проброса в authTokenGetRequest(), куда сделать редирект в случае усешной регистрации и логина
 * @param {function} setMessage управление состоянием сообщения для модального окна 
 * @param {function} setModalActive управление состоянием активности модального окна
 * 
 * @returns {Promise} ответ от API бэкэнда
 */
export const registrationRequest = (credentials, navigate, setMessage, setModalActive) => {

    return TodoBackend.registration(
        credentials
    ).then(
        response => {
            if (response.status === 200 || response.status === 201) {

                // // аутентификация в случае успешной регистрации
                // authTokenGet(credentials, dispatch, navigate, setMessage, setModalActive)

                // переход на страницу с сообщением о необходимости подтвердить акканут, в случае успешной регистрации
                navigate(todoUIEndpoints.registrationSucceeded);
            };
        }
    ).catch(
        error => {
            setMessage(error.response.data.message);
            setModalActive(true);
        }
    );
};

/**
 * Запрос к API на подтверждение профиля пользователя
 * 
 * @param {object} body тело запроса 
 * @param {function} dispatch для проброса в authTokenGetRequest(), изменение состояния в reducer-ax redux в случае успешной аутентификации
 * @param {function} navigate для проброса в authTokenGetRequest(), куда сделать редирект в случае усешной регистрации и логина
 * @param {function} setMessage управление состоянием сообщения для модального окна
 * @param {function} setModalActive управление состоянием активности модального окна
 * 
 * @returns {Promise} ответ от API бэкэнда
 */
export const profileConfirmationRequest = (body, dispatch, navigate, setMessage, setModalActive) => {

    return TodoBackend.profileConfirmation(
        body
    ).then(
        response => {
            if (response.status === 200) {

                const credentials = {
                    "username": response.data.username,
                    "password": body.password
                };

                // аутентификация в случае успешного подтверждения аккаунта
                authTokenGetRequest(credentials, dispatch, navigate, setMessage, setModalActive);
            }
        }
    ).catch(
        error => {
            setMessage(error.response.data.message);
            setModalActive(true);
        }
    );
};

/**
 * Формирование headers с токеном аутентификации 
 * 
 * @returns  {object} headers с токеном или без
 */
export const authTokenHeadersGet = () => {

    // формирование headers
    const headers = { Authorization: null };

    // получение токена аутентификации из localStorage
    const authToken = localStorage.getItem(authTokenName);

    // добавление токена в headers если он был в localStorage
    if (authToken) {
        headers.Authorization = `${authTokenPrefix} ${authToken}`;
    };

    return headers;
};

/**
 * Сохранение токена аутентификации в localStorage
 * 
 * @param {string} authToken токен аутентификации
 */
export const authTokenSet = (authToken) => {
    if (authToken) {
        localStorage.setItem(authTokenName, authToken);
    };
};

/**
 * Удаление токена аутентификации из localStorage
 */
export const authTokenRemove = () => {
    localStorage.removeItem(authTokenName);
};

/**
 * Изменение состояния в reducer-ax redux в зависимости от того аутентифицирован пользователь или нет
 * 
 * @param {function} dispatch изменение состояния в reducer-ax redux
 */
export const authDispatch = (dispatch) => {

    // получение headers
    const headers = authTokenHeadersGet();

    // измененение состояния reducer-ax redux в зависимости от того аутентифицирован пользователь или нет
    {
        headers.Authorization
            ? dispatch(setAuthAction(true))
            : dispatch(setAuthAction(false))
    };
};
